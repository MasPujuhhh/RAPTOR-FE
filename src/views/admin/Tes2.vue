<template>
  <div>
    <h1>HTML Geolocation</h1>
    <p>Click the button to get your coordinates.</p>
    <button @click="getLocation">Try It</button>
    <p v-html="demo"></p>

    <iframe v-if="showmap" :src="`https://www.google.com/maps?q=${location?.latitude},${location.longitude}&hl=es;z=14&output=embed`" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


  </div>
</template>

<script setup>
import { ref } from 'vue';

const showmap = ref(false)
const demo = ref('');
const location = ref({
  latitude:null,
  longitude:null
})

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    demo.value = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  demo.value = `Latitude: ${position.coords.latitude}<br>Longitude: ${position.coords.longitude}`;
  location.value.latitude = position.coords.latitude
  location.value.longitude = position.coords.longitude
  showmap.value = true
}
</script>

<style scoped>
/* Add any styles here if needed */
</style>