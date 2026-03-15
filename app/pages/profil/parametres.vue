<template>
  <ProfileLayout>
    <div class="space-y-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div class="flex items-center gap-4">
          <NuxtLink to="/profil" class="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-primary transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 shrink-0">
            <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          </NuxtLink>
          <div>
            <h1 class="font-display font-bold text-2xl text-gray-900 tracking-tight">Préférences</h1>
            <p class="text-gray-500 font-medium text-sm mt-0.5">Gérez vos informations personnelles et votre sécurité</p>
          </div>
        </div>
        <button 
           @click="saveProfile"
           :disabled="saving"
           class="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm w-full md:w-auto disabled:opacity-50"
        >
          <Icon name="heroicons:check" class="w-5 h-5" v-if="!saving" />
          <Icon name="heroicons:arrow-path" class="w-5 h-5 animate-spin" v-else />
          Enregistrer
        </button>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Informations personnelles -->
        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 rounded-2xl bg-primary-light/50 flex items-center justify-center text-primary shrink-0">
               <Icon name="heroicons:user" class="w-6 h-6" />
            </div>
            <h2 class="font-display font-bold text-xl text-gray-900">Profil public</h2>
          </div>

          <form @submit.prevent="saveProfile" class="space-y-6">
            <div class="flex items-center gap-6 mb-2">
               <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-display font-bold shadow-inner relative group-hover:bg-primary-light transition-colors">
                  {{ form.name.charAt(0) || 'U' }}
                  <button type="button" class="absolute bottom-0 right-0 w-7 h-7 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-primary transition-all border border-gray-100 cursor-pointer">
                    <Icon name="heroicons:camera" class="w-3.5 h-3.5" />
                  </button>
               </div>
               <div>
                  <p class="text-sm font-bold text-gray-900 mb-1">Photo de profil</p>
                  <p class="text-xs text-gray-500 mb-3">JPG, GIF ou PNG. 1MB max.</p>
               </div>
            </div>

            <div>
              <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Nom complet</label>
              <input v-model="form.name" required type="text" placeholder="John Doe" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner" />
            </div>
            
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Numéro de téléphone</label>
              <div class="relative flex items-center">
                 <div class="absolute left-0 top-0 bottom-0 px-4 bg-gray-100 border border-gray-100 border-r-transparent rounded-l-xl flex items-center text-sm font-bold text-gray-500">
                    +228
                 </div>
                 <input v-model="form.phone" type="tel" placeholder="90 00 00 00" class="pl-16 w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-primary transition-all shadow-inner" />
              </div>
            </div>
          </form>
        </div>

        <!-- Sécurité du compte -->
        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
          <div class="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 rounded-2xl bg-secondary-light/50 flex items-center justify-center text-secondary shrink-0">
               <Icon name="heroicons:shield-check" class="w-6 h-6" />
            </div>
            <h2 class="font-display font-bold text-xl text-gray-900">Sécurité</h2>
          </div>

          <form @submit.prevent="updatePassword" class="space-y-6">
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Email de connexion</label>
              <!-- L'email est souvent grisé / bloqué à la modification -->
              <input v-model="form.email" readonly disabled type="email" class="w-full bg-gray-100/50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-500 cursor-not-allowed shadow-inner" />
              <p class="text-[10px] text-gray-400 mt-2 font-medium">Pour changer l'email lié à votre compte, veuillez contacter le support.</p>
            </div>

            <div class="pt-4 border-t border-gray-50">
               <h3 class="text-sm font-bold text-gray-800 mb-6">Changer de mot de passe</h3>
               <div class="space-y-5">
                 <div>
                   <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Mot de passe actuel</label>
                   <input v-model="pwd.current" type="password" placeholder="••••••••" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-secondary transition-all shadow-inner" />
                 </div>
                 
                 <div>
                   <label class="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Nouveau mot de passe</label>
                   <input v-model="pwd.new" type="password" placeholder="••••••••" class="w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:border-secondary transition-all shadow-inner" />
                 </div>

                 <button 
                    type="submit" 
                    :disabled="pwdSaving || !pwd.current || !pwd.new"
                    class="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                 >
                   <Icon name="heroicons:lock-closed" class="w-4 h-4" />
                   {{ pwdSaving ? 'Mise à jour...' : 'Mettre à jour le mot de passe' }}
                 </button>
               </div>
            </div>
          </form>
        </div>
        
        <!-- Danger Zone (Optionnel) -->
        <div class="lg:col-span-2 bg-red-50/50 rounded-3xl p-8 border border-red-100 shadow-sm mt-4">
           <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                 <h3 class="font-display font-bold text-lg text-red-700 mb-1">Supprimer le compte</h3>
                 <p class="text-red-500 text-sm font-medium">Cette action est irréversible. Toutes vos données (historique, adresses, abonnements) seront effacées.</p>
              </div>
              <button class="bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 font-bold px-6 py-3 rounded-xl transition-all shadow-sm shrink-0 whitespace-nowrap text-sm">
                 Supprimer mon compte
              </button>
           </div>
        </div>
      </div>
    </div>
  </ProfileLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ middleware: ['auth'] })
useSeoMeta({ title: 'Paramètres du Profil — Kirefrais' })

const { user } = useCurrentUser()
const { api } = useApi()

const saving = ref(false)
const pwdSaving = ref(false)

// Init form from the existing authenticated user details
const form = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: '' // Si l'API renvoie le phone, ajoutez-le ici: user.value?.phone
})

const pwd = reactive({
  current: '',
  new: ''
})

async function saveProfile() {
  if (!form.name) return toast.error('Le nom est requis.')
  
  saving.value = true
  try {
    // Modifier le payload selon comment l'API backend Laravel est configurée (par exemple PUT /profile ou PUT /user)
    await api('/user/profile', { method: 'PUT', body: { name: form.name, phone: form.phone } })
    toast.success('Profil mis à jour avec succès !')
  } catch(err: any) {
    toast.error('Erreur lors de la sauvegarde du profil. Il sera mis à jour à la prochaine connexion.')
    console.error(err)
  } finally {
    saving.value = false
  }
}

async function updatePassword() {
  if (!pwd.current || !pwd.new) return
  
  pwdSaving.value = true
  try {
    await api('/user/password', { method: 'PUT', body: { 
      current_password: pwd.current, 
      password: pwd.new, 
      password_confirmation: pwd.new 
    }})
    toast.success('Mot de passe mis à jour !')
    pwd.current = ''
    pwd.new = ''
  } catch(e) {
    toast.error('Erreur: Vérifiez votre mot de passe actuel.')
  } finally {
    pwdSaving.value = false
  }
}
</script>
