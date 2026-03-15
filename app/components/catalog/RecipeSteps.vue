<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-bold text-2xl text-gray-900">Préparation pas à pas</h2>
      <span class="bg-primary/10 text-primary font-bold text-xs px-4 py-2 rounded-full uppercase tracking-widest">
        {{ steps.length }} étapes
      </span>
    </div>

    <div class="space-y-6">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all cursor-pointer"
        @click="activeStep = activeStep === index ? -1 : index"
      >
        <!-- Step Header -->
        <div class="flex items-center gap-6 p-6" :class="activeStep === index ? 'pb-2' : ''">
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-lg flex-shrink-0 transition-all"
            :class="activeStep === index ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'"
          >
            {{ index + 1 }}
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-gray-900">{{ step.title }}</h3>
          </div>
          <Icon name="heroicons:chevron-down"
            class="w-5 h-5 text-gray-300 transition-transform duration-300"
            :class="activeStep === index ? 'rotate-180 text-primary' : ''"
          />
        </div>

        <!-- Step Content (Accordion) -->
        <div v-show="activeStep === index" class="px-6 pb-6">
          <div class="ml-[4.5rem] space-y-4">
            <!-- Step Image -->
            <div v-if="step.image" class="rounded-2xl overflow-hidden shadow-md aspect-video">
              <NuxtImg :src="step.image" class="w-full h-full object-cover" />
            </div>
            <!-- Step Description -->
            <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              <template v-for="(part, pIdx) in parseContent(step.content)" :key="pIdx">
                <a 
                  v-if="part.type === 'link'" 
                  :href="part.value" 
                  target="_blank" 
                  class="text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  {{ part.text || part.value }}
                  <Icon name="heroicons:arrow-top-right-on-square" class="w-3 h-3" />
                </a>
                <span v-else>{{ part.value }}</span>
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bon Appétit -->
    <div class="bg-gradient-to-br from-secondary/10 to-primary/10 p-8 rounded-[32px] text-center">
      <p class="text-4xl mb-3">🍽</p>
      <h3 class="font-display font-bold text-xl text-gray-900 mb-2">Bon appétit !</h3>
      <p class="text-gray-500 text-sm">Partagez vos photos de plats réussis dans les avis !</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  steps: {
    title: string
    content: string
    image?: string
  }[]
}>()

const activeStep = ref(0)

function parseContent(content: string) {
  if (!content) return []
  
  // Regex simple pour détecter les URL commençant par http/https
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = urlRegex.exec(content)) !== null) {
    // Ajouter le texte avant le lien
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        value: content.substring(lastIndex, match.index)
      })
    }
    
    // Ajouter le lien
    parts.push({
      type: 'link',
      value: match[0],
      text: match[0].replace(/https?:\/\/(www\.)?/, '').split('/')[0] // Version courte du lien
    })
    
    lastIndex = urlRegex.lastIndex
  }

  // Ajouter le reste du texte
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      value: content.substring(lastIndex)
    })
  }

  return parts
}
</script>
