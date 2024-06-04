<script setup></script>

<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-lg font-bold">MyLogo</div>
      <div class="space-x-4">
        <NuxtLink to="/" class="text-gray-300 hover:text-white">Home</NuxtLink>
        <NuxtLink to="/addNew" class="text-gray-300 hover:text-white"
          >Add new</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-exact-active {
  color: rgb(127, 178, 255);
}
</style>
