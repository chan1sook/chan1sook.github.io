<template>
  <div class="h-screen p-4 dark:text-gray-200 flex flex-col justify-center items-center">
    <CircuitBackground />
    <h1 class="text-center text-4xl font-bold my-2">ยินดีต้อนรับ</h1>
    <img src="/my_avatar_1.jpg" class="my-4 h-48" />
    <div class="my-2 flex flex-col items-center justify-center">
      <div class="text-center text-xl font-bold my-1">chan1sook</div>
      <div class="text-center">ณัฐวัฒน์ เราเจริญศิลป์ (น้ำแข็ง)</div>
      <div class="text-center">อายุ {{ myAge }} ปี</div>
    </div>
    <div class="my-4 w-full max-w-screen-sm">
      <Swiper :modules="[SwiperAutoplay, SwiperEffectCreative, SwiperPagination]" :slides-per-view="1" :loop="true"
        :effect="'creative'" :autoplay="{
          delay: 8000,
          disableOnInteraction: true,
        }" :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }" pagination>
        <SwiperSlide v-for="workplace, i in workplaces" :key="i">
          <div
            class="transition duration-200 rounded-lg shadow-lg border-2 p-4 pb-8 flex flex-col items-center justify-center job-container"
            :data-current-job="!isOldWorkplace(workplace)" :data-job-type="workplace.type">
            <div class="text-center text-xl">
              <span v-if="isOldWorkplace(workplace)">อดีต</span>
              <span v-else>ปัจจุบัน</span>
              เป็น{{ workplace.job }}ที่
            </div>
            <div class="text-center text-3xl font-bold my-2">{{ workplace.place }}</div>
            <div class="text-center text-lg">
              {{ dayjs(workplace.start).format("YYYY") }} -
              <span v-if="isOldWorkplace(workplace)">
                {{ dayjs(workplace.end).format("YYYY") }}
              </span>
              <span v-else>ปัจจุบัน</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="text-xl flex flex-row flex-wrap items-center justify-center gap-2">
      <font-awesome icon="cog" />
      <a href="https://www.facebook.com/chan1sook/" target="_blank" rel="noopener noreferrer"
        title="Chan1sook's Facebook Page" class="transition-all fb-link">
        <FontAwesomeIcon :icon="faFacebook" />
      </a>
      <a href="https://www.youtube.com/chan1sook/" target="_blank" rel="noopener noreferrer"
        title="Chan1sook's Youtube Channel" class="transition-all yt-link">
        <FontAwesomeIcon :icon="faYoutube" />
      </a>
      <a href="https://twitter.com/chan1sook" target="_blank" rel="noopener noreferrer" title="Chan1sook's Twitter Page"
        class="transition-all tw-link">
        <FontAwesomeIcon :icon="faTwitter" />
      </a>
      <a href="https://github.com/chan1sook" target="_blank" rel="noopener noreferrer" title="Chan1sook's Github Page"
        class="transition-all">
        <FontAwesomeIcon :icon="faGithub" />
      </a>
      <a href="https://medium.com/@chan2sook" target="_blank" rel="noopener noreferrer" title="Chan1sook's Medium Page"
        class="transition-all">
        <FontAwesomeIcon :icon="faMedium" />
      </a>
    </div>
    <div class="fixed bottom-2 right-2">
      <div class="flex flex-col justify-center ml-3" title="Switch Dark/Light Theme">
        <input type="checkbox" id="light-switch" class="sr-only" v-model="darkMode" />
        <label class="relative cursor-pointer p-2" for="light-switch">
          <span>
            <svg class="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-slate-300"
                d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
              <path class="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
            </svg>
            <svg class="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path class="fill-slate-400"
                d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
              <path class="fill-slate-500"
                d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
            </svg>
          </span>
          <span class="sr-only">Switch to light / dark version</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook, faYoutube, faTwitter, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons'

import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)

const darkMode = ref(false);

useHead({
  title: "chan1sook.com - ยินดีต้อนรับ",
  meta: [
    {
      name: 'description', content: 'เว็บไซต์ของ chan1sook'
    }
  ],
  bodyAttrs: {
    "class": () => darkMode.value ? "dark" : ""
  }
})

useSeoMeta({
  title: 'chan1sook.com - ยินดีต้อนรับ',
  ogTitle: 'chan1sook.com - ยินดีต้อนรับ',
  description: 'เว็บไซต์ของ chan1sook',
  ogDescription: 'เว็บไซต์ของ chan1sook',
  ogImage: 'https://chan1sook.com/my_avatar_1.jpg',
  twitterCard: 'summary_large_image',
})

const birthday = new Date("1995-07-24");
type WorkplaceType = { place: string, job: string, start: Date, end?: Date, type?: string }
const workplaces: WorkplaceType[] = [
  { type: "modern", place: "Logisenses", job: "โปรแกรมเมอร์", start: new Date("2018-06-18"), end: new Date("2024-08-15"), },
  { type: "gov", place: "สพป. ลพบุรี เขต 1", job: "นักวิชาการคอมพิวเตอร์", start: new Date("2024-08-26"), }
]

const myAge = dayjs().diff(birthday, 'year');
const isOldWorkplace = (workplace: WorkplaceType) => {
  return typeof workplace.end !== 'undefined'
}
</script>

<style>
body {
  font-family: 'Prompt', 'Roboto', sans-serif;
}
</style>
<style scoped>
.fb-link {
  color: #4267b2;
}

.fb-link:hover {
  color: #0042c7;
}

.fb-link:active {
  color: #8b9dc3;
}

.yt-link {
  color: #ff0000;
}

.yt-link:hover {
  color: #cc0000;
}

.yt-link:active {
  color: #ec4949;
}

.tw-link {
  color: #1da1f2;
}

.tw-link:hover {
  color: #1886ca;
}

.tw-link:active {
  color: #48b9ff;
}

.job-container {
  @apply border-dashed bg-slate-100 bg-gradient-to-b from-slate-50 to-slate-200 border-slate-300;
}

.job-container.dark,
.dark .job-container {
  @apply bg-slate-800 from-slate-800 to-slate-900 border-slate-600;
}

.job-container[data-current-job="true"] {
  @apply border-solid bg-cyan-100 from-cyan-50 to-cyan-200 border-cyan-400;
}

.job-container[data-current-job="true"].dark,
.dark .job-container[data-current-job="true"] {
  @apply bg-cyan-800 from-cyan-800 to-cyan-900 border-cyan-600;
}

.job-container[data-job-type="modern"] {
  @apply bg-green-100 from-green-50 to-green-200 border-green-400;
}

.job-container[data-job-type="modern"].dark,
.dark .job-container[data-job-type="modern"] {
  @apply bg-green-800 from-green-800 to-green-900 border-green-600;
}

.job-container[data-job-type="modern"][data-current-job="true"] {
  @apply bg-blue-100 from-blue-50 to-blue-200 border-blue-400;
}

.job-container[data-job-type="modern"][data-current-job="true"].dark,
.dark .job-container[data-job-type="modern"][data-current-job="true"] {
  @apply bg-blue-800 from-blue-800 to-blue-900 border-blue-600;
}

.job-container[data-job-type="gov"] {
  @apply bg-yellow-100 from-yellow-50 to-yellow-200 border-yellow-400;
}

.job-container[data-job-type="gov"].dark,
.dark .job-container[data-job-type="gov"] {
  @apply bg-yellow-800 from-yellow-800 to-yellow-900 border-yellow-600;
}

.job-container[data-job-type="gov"][data-current-job="true"] {
  @apply bg-teal-100 from-teal-50 to-teal-200 border-teal-400;
}

.job-container[data-job-type="gov"][data-current-job="true"] dark,
.dark .job-container[data-job-type="gov"][data-current-job="true"] {
  @apply bg-teal-800 from-teal-800 to-teal-900 border-teal-600;
}
</style>