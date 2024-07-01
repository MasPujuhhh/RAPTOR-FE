<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <!-- hero section -->

    <!-- best seller section -->
    <div class="bs-section">
      <div class="best-section">
        <div class="bs-title">
          <h1
            style="
              text-align: end;
              color: #96705f;
              font-weight: 700;
              font-size: 3rem;
            "
          >
            Try Our Cake
          </h1>
          <div></div>
          <p style="font-size: 1.4rem; font-weight: 600; margin-top: 10px">
            Here's our best creations that everyone loves. Lightness and <br />
            sweetness of the cake make you want more and more. Start <br />
            from cake, bread and other creations.
          </p>
        </div>
        <!-- list items -->
        <div
          style="
            width: 100%;
            min-height: 80vh;
            height: 100%;
            /* background-color: aqua; */
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
          "
          class="container-item"
        >
          <!-- items -->
          <div
            style="display: flex; gap: 30px; flex-wrap: wrap"
            class="cake-item"
          >
            <div @click="detail(item.id)" v-for="item in produk" class="item">
              <img
                style="width: 250px; border-radius: 15px"
                :src="'http://localhost:8001/assets/img/' + item.gambar_produk"
                alt="keren"
              />
              <h3 style="font-size: 1.5rem">
                {{ item.nama_produk }}
              </h3>
              <div class="rating">
                <!-- <ion-icon name="star"></ion-icon> -->
                <i
                  v-for="i in 5"
                  :v-if="
                    i <= item.bintang
                      ? (star = 'bi bi-star-fill')
                      : (star = 'bi bi-star')
                  "
                  style="font-size: 1.2rem; margin-right: 2px; color: #ffa903"
                  :class="star"
                ></i>
                <span
                  style="font-size: 1rem; font-weight: 600; margin-left: 5px"
                >
                  {{ item.bintang }} | ({{
                    item.jumlah_penilaian
                  }}
                  rating)</span
                >
                <h3 style="font-size: 1rem">
                  {{ item.jumlah_terjual }} terjual
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
  import Navbar from "@/components/Navbar.vue";
  import { onMounted, onUnmounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";

  let valid = localStorage.getItem("tokenUser");
  const endpoint = import.meta.env.VITE_ENDPOINT;
  //   const props = defineProps(["list_top", "list_bottom"]);

  const router = useRouter();

  const store = useCounterStore();
  const { id_produk, nama_kategori } = storeToRefs(store);
  const { simpanIdProduk } = store;

  let produk = ref([]);

  let kategori = nama_kategori.value;

  // console.log(kategori);

  const viewProduct = async () => {
    try {
      let res = await axios.get(
        `${endpoint}/produk/kategori/${nama_kategori.value}`,
        {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data?.data;
      // console.log(produk);
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        produk.value.push(data[i]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const detail = async (id) => {
    try {
      await simpanIdProduk(id);
      // console.log(id, "ini id");
      // console.log(id_produk.value, "ini pinia");
      router.push({ path: "/detail-product" });
    } catch (error) {
      console.log(error);
    }
  };

  // watch(nama_kategori, (newValue, oldValue) => {
  //   kategori.value = nama_kategori.value;
  //   console.log(kategori, "ini watch");
  // });

  onMounted(() => {
    viewProduct();
  });
</script>

<style scoped>
  /* best selling section */

  .bs-section {
    width: 100%;
    height: 100%;
    /* min-height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff4ea;
  }

  .best-section {
    width: 80%;
    height: 100%;
    min-height: 700px;
    margin-top: 8rem;
  }

  .bs-title div {
    height: 100px;
    width: 2px;
    margin-top: 10px;
    background-color: #96705f;
  }

  .bs-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6rem;
  }

  /* ! item section */
  .cake-item {
    display: flex;
    /* justify-content: space-between; */
  }

  .item {
    transition: all 0.4s ease-in-out;
  }

  .item:hover {
    cursor: pointer;
    transform: scale(110%);
  }

  .cake-item > a {
    color: #000;
    text-decoration: none;
  }
</style>
