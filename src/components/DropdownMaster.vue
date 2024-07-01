<template>
  <div class="dropdown">
    <button @click="toggleDropdown" style="position: relative">
      <i class="bi bi-stack"></i>
      Master
      <i
        style="position: absolute; left: 170px"
        :class="isOpen ? 'bi bi-chevron-right' : 'bi bi-chevron-down'"
      ></i>
    </button>
    <ul v-if="isOpen" class="dropdown-list">
      <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import { useCounterStore } from "../stores/counter";
  import { storeToRefs } from "pinia";

  const router = useRouter();

  const store = useCounterStore();
  const { token } = storeToRefs(store);
  const { simpanToken } = store;

  const isOpen = ref(false);
  const items = ["User", "Produk", "Varian", "Kategori", "Custom"]; // Ganti dengan opsi yang diinginkan
  let valid = ref("");

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  watch(token, (oldValue, newValue) => {
    valid.value = token.value;
    console.log(valid, "ini watch");
  });

  const selectItem = async (item) => {
    // Lakukan apa pun yang diperlukan saat item dipilih
    console.log(token.value);
    let a = item.toLowerCase();
    await simpanToken(token.value);
    router.push({ path: `/master/${a}` });
    console.log("Selected:", a);
    isOpen.value = false;
  };
</script>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
    width: 200px;
    margin-top: 40px;
  }

  .dropdown button {
    width: 100%;
    height: 55px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    gap: 20px;
    padding-left: 17px;
    padding-right: 10px;
    background-color: chocolate;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .dropdown-list {
    width: 100%;
    position: relative;
    top: 10px;
    left: 0;
    list-style: none;
    margin-bottom: 10px;
    background-color: chocolate;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    border-radius: 10px;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-in;
  }

  .dropdown-list li {
    padding: 8px 16px;
    cursor: pointer;
    font-weight: bold;
  }

  .dropdown-list li:hover {
    background-color: #f0f0f0;
    border-radius: 10px;
    color: black;
  }
</style>
