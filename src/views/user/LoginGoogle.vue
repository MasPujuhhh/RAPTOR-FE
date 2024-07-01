<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      position: fixed;
      background-color: #fff;
      opacity: 0.5;
      display: flex;
      padding-bottom: 100px;
      justify-content: center;
      align-items: center;
      gap: 5px;
      scroll-behavior: smooth;
    "
    v-if="visible"
  >
    <div class="spinner-grow text-primary" role="status">
      <span class="visually-hidden-focusable">Loading...</span>
    </div>
    <div class="spinner-grow text-secondary" role="status">
      <span class="visually-hidden-focusable">Loading...</span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="visually-hidden-focusable">Loading...</span>
    </div>
    <div class="spinner-grow text-danger" role="status">
      <span class="visually-hidden-focusable">Loading...</span>
    </div>
    <div class="spinner-grow text-warning" role="status">
      <span class="visually-hidden-focusable">Loading...</span>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { useRouter, useRoute } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";

  const route = useRoute();
  const router = useRouter();

  const token = ref("");

  let visible = ref(true);

  const getToken = async () => {
    token.value = route.query.token;
    localStorage.setItem("tokenUser", token.value);
    localStorage.setItem("authUser", true);
    toast.success("Berhasil Login!", { autoClose: 2000 });
    setTimeout(() => {
      visible.value = false;
      router.push({ path: "/" });
    }, 3000);
    console.log(token.value);
  };

  onMounted(() => {
    getToken();
  });
</script>
