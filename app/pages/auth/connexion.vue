<template>
  <div class="font-sans">
    <h2 class="font-display font-bold text-2xl text-gray-900 mb-1 tracking-tight">Bon retour !</h2>
    <p class="text-gray-500 font-medium text-sm mb-6 leading-relaxed">Connectez-vous pour gérer vos kits et vos livraisons.</p>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Adresse Email</label>
        <div class="relative group">
          <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <Icon name="heroicons:envelope" class="w-5 h-5" />
          </div>
          <input
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="votre@email.com"
            class="w-full pl-14 pr-5 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-900
                   focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
            :class="{ 'border-red-200 bg-red-50 focus:border-red-500': errors.email }"
          />
        </div>
        <p v-if="errors.email" class="mt-2 text-[10px] text-red-500 font-bold ml-1 flex items-center gap-1 uppercase tracking-widest">
          <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
          {{ errors.email }}
        </p>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-sm font-medium text-gray-700 leading-none">Mot de passe</label>
          <NuxtLink to="/auth/mot-de-passe" class="text-xs text-primary font-black hover:underline">
            Oublié ?
          </NuxtLink>
        </div>
        <div class="relative group">
          <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
            <Icon name="heroicons:lock-closed" class="w-5 h-5" />
          </div>
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="••••••••"
            class="w-full pl-14 pr-14 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-bold text-gray-900
                   focus:outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
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
               text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 active:scale-95 mb-8"
      >
        <span v-if="!loading" class="text-sm">Se connecter</span>
        <Icon v-if="loading" name="heroicons:arrow-path" class="w-6 h-6 animate-spin" />
        <Icon v-else name="heroicons:arrow-right" class="w-5 h-5" />
      </button>
    </form>

    <div class="relative py-10">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-50" />
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-5 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Ou continuer avec</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <button
        class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-100
               rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 text-sm shadow-sm"
        @click="loginWithGoogle"
      >
        <Icon name="logos:google-icon" class="w-4 h-4" />
        Google
      </button>
      <button
        class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-100
               rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 text-sm shadow-sm"
        @click="loginWithFacebook"
      >
        <Icon name="logos:facebook" class="w-4 h-4" />
        Facebook
      </button>
    </div>

    <p class="text-center text-xs text-gray-400 font-medium mt-12">
      Pas encore membre ?
      <NuxtLink to="/auth/inscription" class="text-primary font-black uppercase tracking-widest ml-1 hover:underline">
        S'inscrire
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth', middleware: ['guest'] })
useSeoMeta({ title: 'Connexion — Kirefrais' })

const { api }   = useApi()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const errors      = reactive({ email: '', password: '' })
const loading     = ref(false)
const serverError = ref('')
const showPassword = ref(false)

async function handleLogin() {
  errors.email   = ''
  errors.password = ''
  serverError.value = ''

  if (!form.email || !form.email.includes('@')) {
    errors.email = 'Veuillez entrer une adresse email valide.'
    return
  }
  if (!form.password || form.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères.'
    return
  }

  loading.value = true
  try {
    const data = await api<{ user: any, token: string }>('/auth/login', {
      method: 'POST',
      body:   form,
    })

    authStore.setAuth(data.user, data.token)
    toast.success(`Heureux de vous revoir, ${data.user.name} !`)

    if (data.user.role === 'admin')   return navigateTo('/admin/dashboard')
    if (data.user.role === 'livreur') return navigateTo('/livreur/dashboard')
    navigateTo('/')
  } catch (err: any) {
    serverError.value = err?.data?.message ?? 'Impossible de vous connecter. Vérifiez vos identifiants.'
    toast.error('Erreur de connexion')
  } finally {
    loading.value = false
  }
}

const config = useRuntimeConfig()

function loginWithGoogle() {
  window.location.href = `${config.public.apiBase}/auth/google/redirect`
}

function loginWithFacebook() {
  window.location.href = `${config.public.apiBase}/auth/facebook/redirect`
}
</script>
