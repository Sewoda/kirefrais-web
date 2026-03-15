<template>
  <div class="font-sans">
    <div class="mb-8">
      <NuxtLink to="/auth/connexion" class="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white border border-gray-100 text-gray-500 hover:text-primary transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 mb-6">
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h2 class="font-display font-bold text-2xl text-gray-900 mb-2 tracking-tight">Mot de passe oublié ?</h2>
      <p class="text-gray-500 font-medium text-sm leading-relaxed">Entrez votre adresse email, nous vous enverrons un lien pour réinitialiser votre mot de passe en toute sécurité.</p>
    </div>

    <!-- Succès -->
    <div v-if="success" class="bg-green-50 border border-green-100 rounded-2xl p-6 text-center shadow-sm">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
        <Icon name="heroicons:envelope-open" class="w-8 h-8 text-green-500" />
      </div>
      <h3 class="font-display font-bold text-lg text-green-900 mb-2">Checkez vos emails !</h3>
      <p class="text-green-700 text-sm mb-6 leading-relaxed">
        Un lien de réinitialisation a été envoyé à <strong>{{ form.email }}</strong>. <br>
        Veuillez consulter votre boîte de réception ou vos spams.
      </p>
      <NuxtLink to="/auth/connexion" class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 text-sm w-full">
        <Icon name="heroicons:arrow-left-on-rectangle" class="w-4 h-4" />
        Retour à la connexion
      </NuxtLink>
    </div>

    <!-- Formulaire d'envoi -->
    <form v-else @submit.prevent="handleReset" class="space-y-6">
      <div>
        <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Adresse Email</label>
        <div class="relative group">
          <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <Icon name="heroicons:envelope" class="w-5 h-5" />
          </div>
          <input
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            placeholder="votre@email.com"
            class="w-full pl-14 pr-5 py-4 rounded-xl border border-gray-100 bg-gray-50 text-sm font-semibold text-gray-900
                   focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
            :class="{ 'border-red-200 bg-red-50 focus:border-red-500': error }"
          />
        </div>
        <p v-if="error" class="mt-2 text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1 uppercase tracking-widest">
          <Icon name="heroicons:exclamation-circle" class="w-4 h-4 shrink-0" />
          {{ error }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
               text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 active:scale-95"
      >
        <span v-if="!loading" class="text-sm">Envoyer le lien</span>
        <Icon v-if="loading" name="heroicons:arrow-path" class="w-6 h-6 animate-spin" />
        <Icon v-else name="heroicons:paper-airplane" class="w-5 h-5 -rotate-45 -mt-1" />
      </button>
    </form>
    
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth', middleware: ['guest'] })
useSeoMeta({ title: 'Mot de passe oublié — Kirefrais' })

const { api } = useApi()

const form = reactive({ email: '' })
const error = ref('')
const loading = ref(false)
const success = ref(false)

async function handleReset() {
  error.value = ''

  if (!form.email || !form.email.includes('@')) {
     error.value = 'Veuillez entrer une adresse email valide.'
     return
  }

  loading.value = true
  try {
    // Si vous implémentez l'oubli de mdp côté Laravel :
    await api('/auth/forgot-password', {
      method: 'POST',
      body: form,
    })
    
    success.value = true
    toast.success('Email envoyé !')
  } catch (err: any) {
    // Check if Laravel validation block is returned
    const apiError = err?.data?.errors?.email?.[0] || err?.data?.message
    error.value = apiError ?? "Une erreur est survenue lors de l'envoi."
    toast.error("Veuillez vérifier l'adresse email.")
  } finally {
    loading.value = false
  }
}
</script>
