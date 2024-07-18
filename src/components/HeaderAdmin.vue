
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <div style="margin-left: 1%; display: flex; align-items: center;">
        <router-link to="/admin" class="navbar-brand" style="font-weight: 700; letter-spacing: 0.05em; font-size: 1.5rem;">
          <!-- <img src="@/components/icons/logo-rapier.png" style="height: 15%; width: 12%; margin-right: 3%;" alt=""> -->
          RAPTOR
        </router-link>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item me-2" style="cursor: pointer">
            <div class="nav-link" @click="PortalUser">
              <i class="bi bi-box-arrow-right me-1"></i>Portal User
            </div>
          </li>
          <li class="nav-item">
            <div class="nav-link">
              <i class="bi bi-person-circle"></i>&nbsp {{ user?.alias }}
            </div>
          </li>
          <li class="nav-item " style="cursor: pointer">
            <div class="nav-link" @click="logout()">
              <i class="bi bi-box-arrow-right"></i>&nbspLogout
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import axios from "axios";
import { ref,computed, onMounted, watch  } from 'vue';
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  const router = useRouter();

  const user = ref()
  const token = localStorage.getItem("token");
  const endpoint = import.meta.env.VITE_ENDPOINT;

  const getUserByToken = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/user/detail_by_token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    user.value = res.data?.data;
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

  const PortalUser = async () => {
    try {
      router.push({ path: "/" });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    localStorage.clear();
    router.push({ path: "/login" });
    toast.success("Logout Berhasil!!", { autoClose: 2000 });
  };

onMounted(() => {
  getUserByToken();
});

</script>

<style scoped>
.navbar {
  z-index: 1050; /* Ensure the navbar is on top */
}

.nav-link {
  display: flex;
  align-items: center;
  font-size: 18px;
}
</style>