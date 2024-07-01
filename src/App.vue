<!-- <script setup>
  import { RouterLink, RouterView } from "vue-router";
  import Navbar from "./components/Navbar.vue";
  import moment from "moment";

  let endpoint = import.meta.env.VITE_ENDPOINT;
</script>

<template>
  <RouterView />
</template>

<style scoped>
  .hero-section {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-image: radial-gradient(
      circle 400px at 6.8% 8.3%,
      rgba(255, 244, 169, 1) 0%,
      rgba(255, 244, 234, 1) 100.2%
    );
    height: 700px;
  }

  .hero-button {
    display: flex;
    gap: 2rem;
  }

  .hero-order {
    padding: 0.6rem 1.8rem;
    width: 10rem;
    height: 3rem;
    border: none;
    background-color: #96705f;
    color: #fff;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    opacity: 1;
  }

  .hero-order:hover {
    background-color: var(--main-color);
  }

  .hero-menu {
    width: 10rem;
    height: 3rem;
    border: none;
    background-color: #e5e5e5;
    color: var(--main-color);
    font-weight: 600;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
  }

  .hero-menu:hover {
    background-color: #96705f;
    color: #fff;
  }
</style> -->
<template>
  <!-- <div class="wrapper" style="display: flex; width: 100%; height: 100%"> -->
      <RouterView />
  <!-- </div> -->
</template>

<script setup>
  import SidebarAdmin from "./components/SidebarAdmin.vue";
  import HeaderAdmin from "./components/HeaderAdmin.vue";
  import { RouterLink, RouterView } from "vue-router";
  import Navbar from "./components/Navbar.vue";
  import moment from "moment";

  let endpoint = import.meta.env.VITE_ENDPOINT;
</script>

<style scoped>
  .right {
    margin-left: 250px; /* Adjust based on sidebar width */
  }
</style>