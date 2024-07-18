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
      z-index: 99;
    "
    class="navbar navbar-expand-xl navbar-dark bg-white"
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
          <div v-if="is_admin" style="height: 3rem; align-items: center; cursor: pointer;" @click="PortalAdmin">
              <i style="font-size:30px;" class="bi bi-box-arrow-right me-1"></i>
          </div>
          <div v-if="is_admin" style=" height: 2rem; align-items: center; margin-right: 2rem;">
            <p style="height: 100%; font-size: larger; align-items: center; cursor: pointer;" @click="PortalAdmin">Portal Admin</p>
          </div>

          <div style="height: 3rem; align-items: center;">
            <i
              style="font-size:30px;"
              class="bi bi-journal-album"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"

            ></i>
          </div>
          <div style=" height: 2rem; align-items: center; margin-left: 0.5rem;">
            <p style="height: 100%; font-size: larger; align-items: center; cursor: pointer;" data-bs-toggle="dropdown">Aktivitas</p>
            <ul style="position: absolute; left: 83%" class="dropdown-menu">
              <li style="cursor: pointer;"><a class="dropdown-item" @click="DailyReport">Daily Report</a></li>
              <li style="cursor: pointer;"><a class="dropdown-item" @click="Tugas">Tugas</a></li>
              <li style="cursor: pointer;"><a class="dropdown-item" @click="Absensi">Absensi</a></li>
              <li style="cursor: pointer;"><a class="dropdown-item" @click="Pengumuman">Pengumuman</a></li>
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
              <li><a class="dropdown-item" @click="pindahProfile">Profil</a></li> 
              <li><a class="dropdown-item" @click="logout">Logout</a></li>
            </ul>
          </div>

          <div style="height: 2rem; align-items: center; cursor: pointer; margin-left: 0.5rem;">
            <p style="height: 100%; font-size: larger; align-items: center;" data-bs-toggle="dropdown">{{ me?.nama_lengkap }}</p>
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
  const me = ref()

  let kategori = ref({});
  let endpoint = import.meta.env.VITE_ENDPOINT;

  const router = useRouter();

  let is_admin = ref(false)
  let token = localStorage.getItem("token");
  let check_admin = localStorage.getItem("authAdmin")

  const getUser = async () => {
    try {
      let res = await axios.get(`${endpoint}/user/detail_by_token`, { headers: { Authorization: `Bearer ${token}` } });
      const data = res.data?.data;
      nama_lengkap.value = data.nama_lengkap.split(' ').length >= 2 ? `${data.nama_lengkap.split(' ')[0]}  ${data.nama_lengkap?.split(' ')[1]}` : data.nama_lengkap.split(' ')[0]
    } catch (error) {
      console.log(error)
    }
  }

  const PortalAdmin = async () => {
    try {
      router.push({ path: "/admin" });
    } catch (error) {
      console.log(error);
    }
  };

  const renderMe = async () => {
    try {
      const res = await axios.get(
        `${endpoint}/user/detail_by_token`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      me.value = res.data?.data;
      if (check_admin) {
        is_admin.value = true
      }
    } catch (error) {
      const data = error.response?.data.errors;
      if (data) {
        toast.error(`CODE ${data.code} : ${data.message}`, {
          autoClose: 2000,
        });
      }
      console.log(data);
      }
    };

  const pindahProfile = async () => {
    try {
      router.push({ path: "/profile" });
    } catch (error) {
      console.log(error);
    }
  };

  const DailyReport = async () => {
    try {
      router.push({ path: "/daily-report" });
    } catch (error) {
      console.log(error);
    }
  };

  const Tugas = async () => {
    try {
      router.push({ path: "/tugas" });
    } catch (error) {
      console.log(error);
    }
  };

  const Absensi = async () => {
    try {
      router.push({ path: "/absensi" });
    } catch (error) {
      console.log(error);
    }
  };

  const Pengumuman = async () => {
    try {
      router.push({ path: "/pengumuman" });
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
    renderMe()
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
