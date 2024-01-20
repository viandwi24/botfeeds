// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-headlessui",
    "dayjs-nuxt",
    "nuxt-lodash",
    "nuxt-api-party"
  ],
  app: {
    // baseURL: "/webui"
  },
  apiParty: {
    endpoints: {
      api: {
        url: process.env.ENGINE_API_URL || `http://localhost:3001`
      }
    }
  },
  runtimeConfig: {
    public: {
      engineApiUrl: process.env.ENGINE_API_URL || `http://localhost:3001`
    }
  }
})