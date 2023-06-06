
  <template>
  <router-link to="favorite" class="px-3 py-4 text-gray-700 bg-[#FFD700] font-bold  rounded-[20px]">Favorite</router-link>
  <div v-if="movies.length < 0" class="text-white text-center text-3xl">
    Loading...
  </div>
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
    <div v-for="movie in movies" :key="movie" class="group">
      <router-link :to="{ name: 'Movie Details', params: { id: movie.id } }">
        <div class=" relative overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.img}`"
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

  <script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

onMounted(async () => {
  let {data} = await axios.get("http://localhost:5001/fav");
  console.log(data)




   movies.value = data;

   console.log(movies.value[0].title);
});

const movies = ref([]);
</script>