// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-swiper", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Prompt: [400, 700],
    },
    display: "swap",
  },
});
