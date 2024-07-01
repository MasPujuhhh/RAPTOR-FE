<template>
  <!-- navigasi section -->
  <nav
    style="
      background-color: var(#FFFFFF);
      height: 60px;
      top: 0;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      position: fixed;
      width: 100%;
      /* z-index: 99; */
    "
    class="navbar navbar-expand-xl navbar-dark"
  >
    <div class="container-fluid" style="width: 100%">
      <div
        class="collapse navbar-collapse d-flex justify-content-between mx-4"
        id="navbarSupportedContent"
      >
        <a href="/" style="font-weight: 700"
          ><span style="color: #4a1d1f; font-weight: 700"></span>RAPTOR</a
        >

        <div style="display: flex; height: 100%; align-items: center;">

          <div style="height: 3rem; align-items: center;">
            <i
              style="font-size:30px;"
              class="bi bi-journal-album"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"

            ></i>
            <ul style="position: absolute; left: 83%" class="dropdown-menu">
              <li><a class="dropdown-item" @click="logbook">Loogbook</a></li>
              <li><a class="dropdown-item" @click="todo">To-do</a></li>
              <li><a class="dropdown-item" @click="certificate">Sertifikat</a></li>
            </ul>
          </div>

          <div style=" height: 2rem; align-items: center; margin-left: 0.5rem;">
            <p style="height: 100%; font-size: larger; align-items: center; cursor: pointer;" data-bs-toggle="dropdown">activity</p>
            <ul style="position: absolute; left: 83%" class="dropdown-menu">
              <li><a class="dropdown-item" @click="logbook">Loogbook</a></li>
              <li><a class="dropdown-item" @click="todo">To-do</a></li>
              <li><a class="dropdown-item" @click="certificate">Sertifikat</a></li>
            </ul>
          </div>

          <div style="height: 3rem; align-items: center;">
            <i
              style="font-size:30px; margin-left: 2rem;"
              class="bi bi-person-circle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"

            ></i>
            <ul style="position: absolute; left: 90%" class="dropdown-menu">
              <li><a class="dropdown-item" @click="pindahProfile">Profile</a></li> 
              <li><a class="dropdown-item" @click="logout">Logout</a></li>
            </ul>
          </div>

          <div style="height: 2rem; align-items: center; cursor: pointer; margin-left: 0.5rem;">
            <p style="height: 100%; font-size: larger; align-items: center;" data-bs-toggle="dropdown">{{ nama_lengkap }}</p>
            <ul style="position: absolute; left: 90%" class="dropdown-menu">
              <li><a class="dropdown-item" @click="pindahProfile">Profile</a></li> 
              <li><a class="dropdown-item" @click="logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { onMounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";

  const store = useCounterStore();
  // const { token } = storeToRefs(store);
  const { simpanKategori } = store;
  const nama_lengkap = ref()

  let kategori = ref({});
  let valid = localStorage.getItem("tokenUser");
  let endpoint = import.meta.env.VITE_ENDPOINT;

  const router = useRouter();

  let token = localStorage.getItem("tokenUser") || localStorage.getItem("token")  ;

  const getUser = async () => {
    try {
      let res = await axios.get(`${endpoint}/user/detail_by_token`, { headers: { Authorization: `Bearer ${token}` } });
      const data = res.data?.data;
      nama_lengkap.value = data.nama_lengkap.split(' ').length >= 2 ? `${data.nama_lengkap.split(' ')[0]}  ${data.nama_lengkap?.split(' ')[1]}` : data.nama_lengkap.split(' ')[0]
    } catch (error) {
      console.log(error)
    }
  }

  const pindahProfile = async () => {
    try {
      router.push({ path: "/profile" });
    } catch (error) {
      console.log(error);
    }
  };

  const logbook = async () => {
    try {
      router.push({ path: "/logbook" });
    } catch (error) {
      console.log(error);
    }
  };

  const todo = async () => {
    try {
      router.push({ path: "/todo" });
    } catch (error) {
      console.log(error);
    }
  };

  const certificate = async () => {
    try {
      router.push({ path: "/sertifikat" });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    localStorage.clear();
    toast.success("Logout Berhasil!!", { autoClose: 2000 });
    setTimeout(() => {
      router.push({ path: "/login" });
    }, 1500);
  };

  onMounted(() => {
    getUser()
  });
</script>

<style scoped>
  .nav-item {
    height: 100% !important;
    width: 100% !important;
  }

  .nav-item a {
    font-size: 1.1rem;
    text-align: center;
    /* transition: all 0.3s ease-in !important; */
    font-weight: 700;
    cursor: pointer;
    color: var(--bg-color);
  }

  a {
    text-decoration: none;
    color: var(--bg-color);
    font-size: 1.6rem;
    font-weight: 700;
  }

  .nav-item a:hover {
    color: #7f675c;
  }

  .navbar-login {
    font-size: 1.1rem;
    font-weight: 700;
    transition: all 0.3s ease-in;
  }

  .navbar-login:hover {
    opacity: 0.7;
  }

  a i {
    transition: all 0.3s ease-in-out;
  }

  a i:hover {
    color: #7f675c;
  }

  .dropdown-menu li a {
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease-in;
  }
  .dropdown-menu li a:hover {
    font-weight: bold;
    border-radius: 5px;
    color: #fff;
    background-color: chocolate;
  }
</style>
