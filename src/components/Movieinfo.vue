<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const id = route.params.id;

const fetch = async () => {
  let data = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDdkMDhhYzY2ZjUyYTQwNWNkMGJjOGIwNmZjMmQ1NiIsInN1YiI6IjY0NjhiNGIxYzM1MTRjMDExZGNhY2NiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5v_gEaIShb6Jsp9FdUIG2PuNTypNSuy0w5NINp6yc_0",
    },
  });
  movieInfo.value = data.data;

  let { data: favData } = await  axios.get("http://localhost:5001/fav")
  favMovies.value = favData
  isFav.value = Boolean(Object.values(favData).filter(e => e.id === movieInfo.value.id).length)
}

onMounted(async () => {
  let data = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDdkMDhhYzY2ZjUyYTQwNWNkMGJjOGIwNmZjMmQ1NiIsInN1YiI6IjY0NjhiNGIxYzM1MTRjMDExZGNhY2NiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5v_gEaIShb6Jsp9FdUIG2PuNTypNSuy0w5NINp6yc_0",
    },
  });
  movieInfo.value = data.data;

  let { data: favData } = await  axios.get("http://localhost:5001/fav")
  favMovies.value = favData
  isFav.value = Boolean(Object.values(favData).filter(e => e.id === movieInfo.value.id).length)
});

async function AddOrRemove() {
  if(isFav.value){

    isFav.value = false
    axios.delete(`http://localhost:5001/fav/${movieInfo.value.id}`).then(e =>{
       isFav.value = false
  fetch()

    })


  }else{

  axios.post("http://localhost:5001/fav",{
    data: {
      ...movieInfo.value
    }
  }).then(e => {
      isFav.value = true
  fetch()

  })




  }


}

const movieInfo = ref({});
const favMovies = ref({});
const isFav = ref("")
</script>

<template>
  <div v-if="movieInfo.length > 0" class="text-center text-white">
    Loading...
  </div>
  <div v-else class="text-white md:flex gap-5">
    <div class="w-[50vh] max-w-[100%] mx-auto md:mx-0">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`"
        alt=""
        class="w-full h-full rounded" />
    </div>
    <div class="flex-1">
      <h1 class="text-3xl font-bold my-5">{{ movieInfo.title }}</h1>
      <p>{{ movieInfo.overview }}</p>
      <p class="mt-3 font-bold">
        Want to See ? Check it out on
        <a :href="movieInfo.homepage" target="_blank" class="text-blue-500"
          >Website</a
        >
      </p>
      <svg
        @click="AddOrRemove"
        xmlns="http://www.w3.org/2000/svg"
        :fill="isFav ? '#FFD700' : 'none'"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        stroke="#FFD700"
        class="w-12 h-12 mt-3 cursor-pointer">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    </div>
  </div>
</template>
