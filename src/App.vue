<template>
  <div class="container mx-auto max-w-[95%]">
    <nav
      class="py-5 block text-center md:text-right md:flex items-center gap-2">
      <router-link to="/">
        <h1
          class="text-3xl font-bold text-red-600 flex-1 pb-2 mb-3 md:mb-0"
          @click="openSearch = false">
          Cinema
        </h1>
      </router-link>

      <div class="flex-1 relative">
        <input
          type="text"
          class="w-full md:w-1/2 p-2 outline-none rounded relative"
          @keyup.enter="search"
          v-model="inputSearch"
          @input="debouncedSearch"
          @click="openSearch = true"
          placeholder="Search for movie!" />
        <div
          v-if="inputSearch.length > 0 && openSearch"
          class="hideScroll z-[1000] md:w-1/2 absolute top-[110%] right-0 w-full bg-gray-800 rounded p-3 text-white overflow-y-scroll max-h-[80vh]">
          <div class="" v-if="movieSearch.length === 0">Loading...</div>
          <div class="rounded grid gap-2" v-else>
            <div class=" " v-for="movie in movieSearch" key="movie">
              <router-link
                :to="{ name: 'Movie Details', params: { id: movie.id } }"
                @click="openSearch = false"
                class="hover:bg-gray-700 duration-300 grid colsSpan gap-4 items-center p-2 rounded grid-flow-col">
                <div class="aspect-square w-[80px] h-[80px] relative">
                  <img
                    :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
                    class="w-full h-full rounded" />
                </div>
                <div class="text-left w-full">
                  <h3 class="text-sm sm:text-base">{{ movie.title }}</h3>
                  <p class="w-[30ch] break-words truncate text-xs">
                    {{ movie.overview }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div @click="openSearch = false">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const debounce = require("lodash/debounce");

const openSearch = ref(false);
const search = async () => {
  let data = await axios.get("https://api.themoviedb.org/3/search/movie", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDdkMDhhYzY2ZjUyYTQwNWNkMGJjOGIwNmZjMmQ1NiIsInN1YiI6IjY0NjhiNGIxYzM1MTRjMDExZGNhY2NiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5v_gEaIShb6Jsp9FdUIG2PuNTypNSuy0w5NINp6yc_0",
    },
    params: {
      query: inputSearch.value,
    },
  });
  let info = await data.data.results;
  movieSearch.value = [...info];
};
const debouncedSearch = debounce(search, 300);
const inputSearch = ref("");

const movieSearch = ref([]);
</script>

<style>
.colsSpan {
  grid-auto-columns: auto 1fr;
}

.hideScroll::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hideScroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
