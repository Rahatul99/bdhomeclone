<template>
  <div>
    <div class="flex justify-center bg-green-800 p-3">
      <h1 class="text-3xl font-semibold text-white">Useful Links</h1>
    </div>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          v-for="(newsItems, category) in groupedNews"
          :key="category"
          class="bg-white shadow-md rounded-lg p-4"
        >
          <h2 class="text-xl font-semibold mb-2">
            {{ category }}
          </h2>
          <ul class="list-disc list-inside">
            <li v-for="item in newsItems" :key="item._id">
              <NuxtLink
                :to="item.link"
                target="_blank"
                class="hover:bg-green-800 hover:text-white rounded px-2 py-1"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFetch } from "#app";

const config = useRuntimeConfig();
const newsData = ref([]);

const { data, error } = await useFetch(`${config.public.BASE_URL}/news`);

if (data.value) {
  newsData.value = data.value;
}
if (error.value) {
  console.error(error.value);
}

const groupedNews = computed(() => {
  return newsData.value.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}
</style>
