export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@sidebase/nuxt-auth',
    '@vee-validate/nuxt',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  googleFonts: {
    families: {
      'Sora': [600, 700],
      'Plus Jakarta Sans': [400, 500, 600, 700],
      'JetBrains Mono': [400, 500],
    },
    display: 'swap',
    preload: true,
  },

  auth: {
    baseURL: process.env.NUXT_PUBLIC_API_BASE || 'https://kirefrais-main-50gxdo.free.laravel.cloud/api',
    provider: { type: 'local' },
  },

  app: {
    head: {
      title: 'Kirefrais',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
      script: [
        { src: 'https://checkout.cinetpay.com/js/cinetpay.js' },
        { src: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=' + process.env.NUXT_PUBLIC_GOOGLE_MAPS_KEY }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://kirefrais-main-50gxdo.free.laravel.cloud/api',
      googleMapsKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_KEY,
      pusherKey: process.env.NUXT_PUBLIC_PUSHER_KEY,
      pusherCluster: process.env.NUXT_PUBLIC_PUSHER_CLUSTER,
      cinetpayApiKey: process.env.NUXT_PUBLIC_CINETPAY_API_KEY,
      cinetpaySiteId: process.env.NUXT_PUBLIC_CINETPAY_SITE_ID,
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/admin/**': { ssr: false },
    '/livreur/**': { ssr: false },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
