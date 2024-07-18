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
        <h2 class="mb-4">{{ pengumumans.judul }}</h2>
        <div v-if="pengumumans.files?.length">
          <p v-for="file in pengumumans.files" class="mb-1"><a :href="endpoint+file.file">{{ file.file.split('XXX')[1] }}</a></p>
        </div>

        <!-- <p class="mt-4">{{ pengumumans.deskripsi }}</p> -->
        <p v-for="line in pengumumans.deskripsi?.split('\n')">{{ line }}</p>

        <p>{{ pengumumans.created_by }}, {{ moment(item?.createdAt).format('LL') }} {{ moment(item?.createdAt).format('HH:mm')}}</p>
      </div>
    </main>
  </template>
  
  <script setup>
    import Navbar from "@/components/Navbar.vue";
    import { onMounted, ref, watch } from "vue";
    import axios from "axios";
    import { useCounterStore } from "@/stores/counter";
    import { storeToRefs } from "pinia";
    import { routerKey, useRouter, useRoute } from "vue-router";
    import { toast } from "vue3-toastify";
    import "vue3-toastify/dist/index.css";
    import moment from "moment";
    import "moment/locale/id";
  
    const store = useCounterStore();
    const { data_user } = storeToRefs(store);
  
    const router = useRouter();
    const route = useRoute()
    let pengumumans = ref({});
    let token = localStorage.getItem("token");
    let idUser = localStorage.getItem("idUser");
  
    let busy = ref(false);
  
  
    const endpoint = import.meta.env.VITE_ENDPOINT;

    function truncateString(str, length) {
      if (str?.length > length) {
        return str.substring(0, length) + '...';
      }
      return str;
    }

  
    const renderPengumuman = async () => {
      try {
        let res = await axios.get(`${endpoint}/pengumuman/detail/${route.params.id}`, {
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
  