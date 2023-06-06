<template>
  <router-link to="favorite" class="px-3 py-4 text-[#FFD700] font-bold bg-gray-700 rounded-[20px]">Favorite</router-link>

  <swiper class="mySwiper w-full h-[80vh] my-10">
    <swiper-slide v-for="movie in movies" :key="movie" class="w-full h-full">
      <router-link :to="{ name: 'Movie Details', params: { id: movie.id } }">
        <div class="w-full h-[80vh] relative">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
            alt=""
            class="group-hover:blur-sm duration-200 w-full h-full object-cover" />
          <div
            class="absolute inset-0 bg-opacity-50 bg-gray-800 p-10 flex items-center">
            <div class="w-[30ch] md:w-[50ch] lg:w-[100ch]">
              <h2 class="text-4xl my-3">{{ movie.title }}</h2>
              <p class="truncate">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>

  <div v-if="movies.length < 0" class="text-white text-center text-3xl">
    Loading...
  </div>
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
    <div v-for="movie in movies" :key="movie" class="group">
      <router-link :to="{ name: 'Movie Details', params: { id: movie.id } }">
        <div class="relative overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
            alt=""
            class="w-full h-full group-hover:blur-sm duration-200" />
          <div
            class="text-white absolute bg-red-600 bottom-[-120%] duration-300 group-hover:bottom-0 left-0 style w-full p-4">
            <div class="relative z-10">
              <h3 class="text-4xl font-bold mb-8">
                {{ movie.title }}
              </h3>
              <p class="h-14 truncate text-lg">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {};
  },
};
</script>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

onMounted(async () => {
  console.log("first")
  let data = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDdkMDhhYzY2ZjUyYTQwNWNkMGJjOGIwNmZjMmQ1NiIsInN1YiI6IjY0NjhiNGIxYzM1MTRjMDExZGNhY2NiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5v_gEaIShb6Jsp9FdUIG2PuNTypNSuy0w5NINp6yc_0",
      },
    }
  );
  console.log("second")

  let res = await data.data.results;
  console.log("third")

  movies.value = res;
  console.log("hello")
  console.log(movies.value);
});

const movies = ref([]);
</script>
<style>
.style {
}

.style:after {
  content: "";
  position: absolute;
  width: 100%;
  background-color: rgb(220 38 38);
  height: 500px;
  z-index: 1;
  left: -100px;
  top: -300px;
  transform: skew(60deg);
}
</style>
