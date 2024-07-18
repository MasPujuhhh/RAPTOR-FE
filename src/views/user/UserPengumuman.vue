<template>
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <!-- pembungkus -->
      <div
        style="
          width: 95%;
          height: 700px;
          margin-top: 100px;
          background-color: white;
          padding:1rem
        "
        class="container-fluid"
      >
        <h2 class="mb-4">Pengumuman</h2>
        <div class="list-group">
          <a v-for="item in pengumumans" href="#" @click="readpengumuman(item)" class="list-group-item list-group-item-action" :style="!item.is_read ? `background-color:white` : `background-color:rgba(189, 195, 199, 0.3)`"  aria-current="true">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ item.judul }}</h5>
              <small>{{ moment(item.createdAt).format('LL') }}, {{ moment(item.createdAt).format('HH:mm')}}</small>
            </div>
            <p class="mb-3" style="width: 90%; text-align: justify;" >{{ truncateString(item.deskripsi, 400) }}</p>
            <small>{{ item.created_by }}</small>
          </a>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
    import Navbar from "@/components/Navbar.vue";
    import { onMounted, ref, watch } from "vue";
    import axios from "axios";
    import { useCounterStore } from "@/stores/counter";
    import { storeToRefs } from "pinia";
    import { routerKey, useRouter } from "vue-router";
    import { toast } from "vue3-toastify";
    import "vue3-toastify/dist/index.css";
    import moment from "moment";
    import "moment/locale/id";
  
    const store = useCounterStore();
    const { data_user } = storeToRefs(store);
  
    const router = useRouter();
    let pengumumans = ref({});
    let token = localStorage.getItem("token");
    let idUser = localStorage.getItem("idUser");
  
    let busy = ref(false);
  
  
    const endpoint = import.meta.env.VITE_ENDPOINT;

    function truncateString(str, length) {
      if (str.length > length) {
        return str.substring(0, length) + '...';
      }
      return str;
    }

  
    const renderPengumuman = async () => {
      try {
        let res = await axios.get(`${endpoint}/pengumuman/all_by_token`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data.data;
        pengumumans.value = data;
      } catch (error) {
        const data = error.response?.data.errors;
        if (data) {
          toast.error(`CODE ${data.code} : ${data.message}`, {
            autoClose: 2000,
          });
        }
        console.log(error);
      }
    };
  
    const readpengumuman = async (obj) => {
      try {
        if (!obj.is_read) {
          let res = await axios.put(`${endpoint}/pengumuman/read_pengumuman/${obj.id}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          const data = res.data?.data;
        }
        router.push({ path: `/pengumuman/${obj.id}` });
      } catch (error) {
        const data = error.response?.data.errors;
        if (data) {
          toast.error(`CODE ${data.code} : ${data.message}`, {
            autoClose: 2000,
          });
        }
        console.log(error);
      }
    };
  
    onMounted(() => {
      renderPengumuman();
    });
  </script>
  
  <style scoped>
    label {
      color: black;
      font-weight: bold;
    }
    input {
      color: gray;
    }
  </style>
  