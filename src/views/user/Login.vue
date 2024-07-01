<template>
  <div class="login-container">
    <div class="login-box">
      <img src="@/components/icons/LOGO_RAPIER-removebg-preview.png" alt="Logo" class="logo" />
      <h1>RAPTOR</h1>
      <h6>Rapier Technology</h6>
      <h6 style="margin-top:0; margin-bottom:2rem">Operational Report</h6>
      <form @submit.prevent="signIn">
        <div class="input-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button v-if="!busy" type="submit">Login</button>
        <button v-else type="button" disabled>
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const email = ref("");
const password = ref("");
let token = "";
const store = useCounterStore();
const { simpanUser, simpanToken } = store;
const router = useRouter();
const busy = ref(false);

toast.info("Hello, Please Login First", {
  autoClose: 2000,
});

const endpoint = import.meta.env.VITE_ENDPOINT;

const signIn = async () => {
  let list = ['SPR','CEO','PDL','HDI','AAF']
  busy.value = true;
  try {
    const payload = { email: email.value, password: password.value };
    const res = await axios.post(`${endpoint}/user/login`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const data = res.data?.data;
    const pesan = res.data?.message;
    const token = data.token;

    toast.success(pesan, { autoClose: 2000 });

    setTimeout(() => {
      localStorage.setItem("token", token);

      if (!list.includes(data.nama)) {
        localStorage.setItem("authUser", true);
        router.push({ path: "/" });
      } else {
        localStorage.setItem("authAdmin", true);
        localStorage.setItem("role", data.nama);
        router.push({ path: "/admin" });
      }
      busy.value = false;
    }, 1500);
  } catch (error) {
    const data = error.response?.data.errors;
    toast.error(`CODE ${data.code} : ${data.message}`, { autoClose: 2000 });
    setTimeout(() => busy.value = false, 1500);
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Quicksand", sans-serif;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-box {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.logo {
  width: 150px;
  margin-bottom: 20px;
}

h3 {
  color: #333333;
  font-size: 2rem;
  margin-bottom: 10px;
}

h5 {
  color: #666666;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  outline: none;
}

input:focus {
  border-color: #007bff;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
