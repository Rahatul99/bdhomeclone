<template>
  <div class="container mx-auto bg-gray-100">
    <div class="flex justify-center bg-red-700 p-2">
      <h1 class="text-xl font-bold text-white">Useful Links</h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
      <div
        v-for="(newsItems, category) in allNews"
        :key="category"
        class="bg-white shadow-md rounded-lg border border-gray-200"
      >
        <div
          class="flex justify-between items-center text-center bg-red-600 p-4 rounded-t-lg"
        >
          <h2 class="text-lg font-bold text-white">
            {{ category }}
          </h2>
          <button
            class="text-white bg-red-700 hover:bg-red-800 rounded-full w-8 h-8 flex items-center justify-center"
            @click="openModal(category)"
          >
            +
          </button>
        </div>
        <ul class="p-4">
          <li v-for="item in newsItems" :key="item._id" class="mb-2">
            <NuxtLink
              :to="item.link"
              target="_blank"
              class="text-black hover:bg-red-700 hover:text-white rounded px-2 py-1 transition-colors duration-200 ease-in-out"
            >
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    id="small-modal"
    tabindex="-1"
    :class="{ hidden: !showModal }"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto bg-gray-900 bg-opacity-50"
  >
    <div class="relative w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Add New Link
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
            @click="toggleModal"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-gray-700 dark:text-gray-300"
                >Name</label
              >
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="category"
                class="block text-gray-700 dark:text-gray-300 mb-2"
              >
                Select a category
              </label>
              <div class="relative">
                <select
                  id="category"
                  v-model="form.category"
                  class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                  required
                >
                  <option :value="selectedCategory" selected>
                    {{ selectedCategory }}
                  </option>
                </select>
                <div
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12l-6-6h12z" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label for="link" class="block text-gray-700 dark:text-gray-300"
                >Link</label
              >
              <input
                type="url"
                id="link"
                v-model="form.link"
                class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <div class="flex justify-center">
              <button
                type="submit"
                class="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNewsStore } from "~/store/useNewsStore";

const showModal = ref(false);
const selectedCategory = ref("");
const form = ref({
  name: "",
  category: "",
  link: "",
});

const { fetchNews, groupedNews, addNews } = useNewsStore();
// onMounted(() => {
//   fetchNews();
// });
// watchEffect(() => {
//   fetchNews();
// });
const allNews = computed(() => groupedNews());

const toggleModal = () => {
  showModal.value = !showModal.value;
};
const openModal = (category = "") => {
  selectedCategory.value = category;
  form.value.category = category;
  toggleModal();
};

const submitForm = async () => {
  toggleModal();
  try {
    await addNews({
      name: form.value.name,
      category: form.value.category,
      link: form.value.link,
    });
    form.value.name = "";
    form.value.category = "";
    form.value.link = "";
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: auto;
}
</style>
