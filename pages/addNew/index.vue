<template>
  <div class="flex justify-center items-center">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-6 text-center">Add New Link</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="category" class="block text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            v-model="form.category"
            class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="link" class="block text-gray-700">Link</label>
          <input
            type="url"
            id="link"
            v-model="form.link"
            class="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  category: "",
  link: "",
});

const submitForm = () => {
  console.log("Form submitted:", form.value);
  // Handle form submission here, e.g., send data to an API
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
