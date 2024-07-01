<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <!-- pembungkus -->
    <div
      style="
        width: 90%;
        height: 700px;
        margin-top: 100px;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
        background-color: white;
        border-radius: 15px;
        padding:1rem
      "
      class="container-fluid"
    >
      <!-- tabel -->

      <div style="width: 100%; height: 10%">
        <h1 style="color: black; width: 25%">Profile</h1>
      </div>
      <figure style="display: flex; align-items: center; gap: 40px" class="figure">
        <img
          :src="`${endpoint}${user.foto_profile}`"
          style="width: 200px; height: 200px; margin-top: 30px; border-radius: 50%;"
          class="figure-img img-fluid"
          alt="..."
        />
        <div style="display: flex; flex-direction: column" class="text-figur">
          <h2>{{ user.nama_lengkap }}</h2>
          <h4>{{ `${user.nama} | ${user.alias}` }}</h4>
          <div class="gap-2">
            <button type="button" class="btn btn-danger me-2" @click="deleteGambar"><i class="bi bi-trash"></i></button>
            <label for="fileInput" class="btn btn-warning mb-0">
              <i class="bi bi-pencil"></i>
              Edit
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".png, .jpg, .jpeg"
              style="display: none"
              @change="handleFileChange"
            />
          </div>
        </div>
      </figure>
      <div
        style="display: flex; flex-direction: column; flex-wrap: wrap; gap: 5px"
        class="form-container"
      >
        <form class="row g-3 ">
          <div class="col-md-12 fs-5">
            <label for="inputEmail4" class="form-label">Nama Lengkap</label>
            <input
              v-model="user.nama_lengkap"
              type="text"
              class="form-control fs-5"
              id="inputEmail"
              :placeholder="user.email || 'Silahkan isi Email'"
            />
          </div>
          <div class="col-md-6 fs-5">
            <label for="inputEmail4" class="form-label">Email</label>
            <input
              v-model="user.email"
              type="text"
              class="form-control fs-5"
              id="inputEmail"
              :placeholder="user.email || 'Silahkan isi Email'"
            />
          </div>
          <div class="col-md-6 fs-5">
            <label for="phone" class="form-label">Telepon</label>
            <input
              v-model="user.telepon"
              type="text"
              class="form-control fs-5"
              id="phone"
              :placeholder="user.telepon || 'Silahkan Isi Telepon'"
            />
          </div>
          <div class="col-md-6 fs-5">
            <label for="tipe" class="form-label">Tipe</label>
            <input
              v-model="user.tipe"
              type="text"
              class="form-control fs-5"
              id="tipe"
              :placeholder="user.tipe || 'Silahkan Isi Tipe'"
              disabled
            />
          </div>
          <div class="col-md-6 fs-5">
            <label for="inputPassword4" class="form-label">Kantor</label>
            <input
              v-model="user.lokasi"
              type="text"
              class="form-control fs-5"
              id="inputPassword"
              :placeholder="user.lokasi || 'Silahkan isi Kantor'"
              disabled
            />
          </div>
          <div class="col-12">
            <button
              style="width: 20%"
              v-if="busy == false"
              type="button"
              @click="save"
              class="btn btn-primary"
            >
              Save Changes
            </button>
            <button
              style="width: 20%"
              v-else-if="busy == true"
              type="button"
              class="btn btn-primary"
              disabled
            >
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </form>
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

  const store = useCounterStore();
  const { data_user } = storeToRefs(store);

  const router = useRouter();
  let user = ref({});
  let token = localStorage.getItem("token");
  let idUser = localStorage.getItem("idUser");

  let busy = ref(false);


  const endpoint = import.meta.env.VITE_ENDPOINT;

  // console.log(data_user.value);
  // console.log(user.value);
  // console.log(token.value)

  const viewProfile = async () => {
    try {
      let res = await axios.get(`${endpoint}/user/detail_by_token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data.data;
      user.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const save = async () => {
    busy.value = !busy.value;
    try {
      console.log(user.value)

      // console.log(token.value);
      let res = await axios.put(`${endpoint}/user/edit_user`, user.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;

      toast.success('berhasil update profile', { autoClose: 2000 });
      setTimeout(() => {
        busy.value = !busy.value;
        router.push({ path: "/profile" });
      }, 1500);
    } catch (error) {
      console.log(error)
      const err = error.response.data.errors
      toast.error(`CODE ${err.code} ${err.message}`, {
            autoClose: 2000,
      });
      setTimeout(() => {
        busy.value = !busy.value;
      }, 1500);
    }
  };

  const handleFileChange = async (event) => {
  const file = event.target.files[0];
    if (!file) return;

    // Lakukan sesuatu dengan file yang dipilih, misalnya mengirim ke server
    const formData = new FormData();
    formData.append('foto_profil', file);
    // });

    try {
      console.log(...formData)
      let res = await axios.put(`${endpoint}/user/change_picture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data?.data;

      toast.success('berhasil update profile', { autoClose: 2000 });
      viewProfile()
    } catch (error) {
      console.log(error)
      const err = error.response.data.errors
      toast.error(`CODE ${err.code} ${err.message}`, {
            autoClose: 2000,
      });
    }
  };

  const deleteGambar = async (event) => {
    try {
      let res = await axios.put(`${endpoint}/user/delete_picture`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;

      toast.success('berhasil update profile', { autoClose: 2000 });
      viewProfile()
    } catch (error) {
      console.log(error)
      const err = error.response.data.errors
      toast.error(`CODE ${err.code} ${err.message}`, {
            autoClose: 2000,
      });
    }
  };

  onMounted(() => {
    viewProfile();
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
