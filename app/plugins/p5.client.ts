import p5 from "p5";

declare module "#app" {
  interface NuxtApp {
    $p5: typeof p5;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("p5", p5);
});
