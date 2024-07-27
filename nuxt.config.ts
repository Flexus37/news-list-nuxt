// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_vars.scss" as *;'
        }
      }
    }
  },

  modules: ["@nuxt/image", '@pinia/nuxt'],
  pinia: {
    storesDirs: ['./store/**']
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Список новостей'
    }
  }
})