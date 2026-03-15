<template>
  <div class="font-sans">
    <h2 class="font-display font-bold text-3xl text-gray-900 mb-2 tracking-tight">Créer un compte</h2>
    <p class="text-gray-500 font-medium text-sm mb-10 leading-relaxed">Rejoignez la communauté Kirefrais et cuisinez local.</p>

    <form @submit.prevent="handleRegister" class="space-y-6">
      <!-- Nom complet -->
      <div>
        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Nom complet</label>
        <div class="relative group">
          <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <Icon name="heroicons:user" class="w-5 h-5" />
          </div>
          <input
            v-model="form.name"
            type="text"
            placeholder="Votre nom"
            class="w-full pl-14 pr-5 py-4 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
            :class="{ 'border-red-200 bg-red-50 focus:border-red-500': errors.name }"
          />
        </div>
        <p v-if="errors.name" class="mt-2 text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1 uppercase tracking-widest">
          <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
          {{ errors.name }}
        </p>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Adresse Email</label>
        <div class="relative group">
          <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <Icon name="heroicons:envelope" class="w-5 h-5" />
          </div>
          <input
            v-model="form.email"
            type="email"
            placeholder="votre@email.com"
            class="w-full pl-14 pr-5 py-4 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
            :class="{ 'border-red-200 bg-red-50 focus:border-red-500': errors.email }"
          />
        </div>
        <p v-if="errors.email" class="mt-2 text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1 uppercase tracking-widest">
          <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
          {{ errors.email }}
        </p>
      </div>

      <!-- Téléphone -->
      <div>
        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Téléphone (WhatsApp)</label>
        <div class="relative group">
          <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <Icon name="heroicons:phone" class="w-5 h-5" />
          </div>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+228 90 00 00 00"
            class="w-full pl-14 pr-5 py-4 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
            :class="{ 'border-red-200 bg-red-50 focus:border-red-500': errors.phone }"
          />
        </div>
        <p v-if="errors.phone" class="mt-2 text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1 uppercase tracking-widest">
          <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
          {{ errors.phone }}
        </p>
      </div>

      <!-- Mot de passe -->
      <div>
        <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Mot de passe</label>
        <div class="relative group">
          <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <Icon name="heroicons:lock-closed" class="w-5 h-5" />
          </div>
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="w-full pl-14 pr-14 py-4 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
            :class="{ 'border-red-200 bg-red-50 focus:border-red-500': errors.password }"
          />
          <button
            type="button"
            class="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-900 transition-colors"
            @click="showPassword = !showPassword"
          >
            <Icon :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
          </button>
        </div>
        <p v-if="errors.password" class="mt-2 text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1 uppercase tracking-widest">
          <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
          {{ errors.password }}
        </p>
      </div>

      <div v-if="serverError" class="p-5 bg-red-50 border border-red-100 rounded-xl flex gap-4">
        <Icon name="heroicons:exclamation-triangle" class="w-5 h-5 text-red-500 shrink-0" />
        <p class="text-[10px] text-red-600 font-bold uppercase tracking-widest leading-normal">{{ serverError }}</p>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
               text-white font-bold py-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 active:scale-95"
      >
        <span v-if="!loading" class="text-sm uppercase tracking-widest">Créer mon compte</span>
        <Icon v-if="loading" name="heroicons:arrow-path" class="w-6 h-6 animate-spin" />
        <Icon v-else name="heroicons:user-plus" class="w-5 h-5" />
      </button>
    </form>

    <p class="text-center text-xs text-gray-400 font-medium mt-12">
      Déjà inscrit ?
      <NuxtLink to="/auth/connexion" class="text-primary font-black uppercase tracking-widest ml-1 hover:underline">
        Se connecter
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth', middleware: ['guest'] })
useSeoMeta({ title: 'Inscription — Kirefrais' })

const { api }   = useApi()
const authStore = useAuthStore()

const form = reactive({ name: '', email: '', phone: '', password: '' })
const errors = reactive({ name: '', email: '', phone: '', password: '' })
const loading = ref(false)
const serverError = ref('')
const showPassword = ref(false)

async function handleRegister() {
  Object.keys(errors).forEach(k => errors[k as keyof typeof errors] = '')
  serverError.value = ''

  if (!form.name) errors.name = 'Le nom est requis.'
  if (!form.email.includes('@')) errors.email = 'Email invalide.'
  if (!form.phone) errors.phone = 'Le téléphone est requis.'
  if (form.password.length < 6) errors.password = 'Minimum 6 caractères.'

  if (Object.values(errors).some(v => v)) return

  loading.value = true
  try {
    const data = await api<{ user: any, token: string }>('/auth/register', {
      method: 'POST',
      body:   form,
    })

    authStore.setAuth(data.user, data.token)
    toast.success('Bienvenue chez Kirefrais !')
    navigateTo('/')
  } catch (err: any) {
    serverError.value = err?.data?.message ?? 'Une erreur est survenue lors de l\'inscription.'
    toast.error('Erreur d\'inscription')
  } finally {
    loading.value = false
  }
}
</script>
