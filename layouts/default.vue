<script setup>
import Navbar from "~/components/layout/navbar.vue";
import Footer from "~/components/layout/footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow m-5">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Add your CSS styles here */
</style>
