<template>
  <v-select :options="books" label="title">
    <template #option="{ option }">
      <h3 style="margin: 0">{{ option.title }}</h3>
      <em>{{ option.author.firstName }} {{ option.author.lastName }}</em>
    </template>
  </v-select>
</template>

<script setup>
import { ref } from 'vue';

const books = ref([
  {
    title: "Old Man's War",
    author: {
      firstName: 'John',
      lastName: 'Scalzi',
    },
  },
]);
</script>

<!-- Optionally, you can import styles directly in your Vue 3 setup -->
<style>
/* Add scoped styles here if needed */
@import "vue-select/dist/vue-select.css";
</style>


