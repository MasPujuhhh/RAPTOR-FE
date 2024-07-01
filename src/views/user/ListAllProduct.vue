<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <!-- hero section -->

    <!-- best seller section -->
    <div style="background-color: #fff4ea" class="bs-section">
      <div class="best-section">
        <!-- category section -->
        <div
          style="
            width: 100%;
            height: 200px;
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          "
          class="container-category"
        >
          <!-- item category -->
          <div
            style="
              width: 15%;
              height: 100%;
              background-color: #f5eded;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              position: relative;
              border-radius: 15px;
              box-shadow: -0.05rem 0.3rem 0.6rem rgba(0, 0, 0, 0.6);
            "
            class="content-category"
            v-for="nama in kategori"
            @click="pindahCategory(nama.nama_kategori)"
          >
            <img
              style="width: 90px"
              :src="'http://localhost:8001/assets/img/' + nama.gambar_kategori"
              alt="my image"
            />
            <h5 style="position: absolute; top: 170px; font-weight: bold">
              {{ nama.nama_kategori }}
            </h5>
          </div>
          <!-- item category end -->
        </div>
        <!-- category end -->
        <div
          style="
            width: 100%;
            height: 2px;
            background-color: gainsboro;
            margin-bottom: 50px;
            margin-top: 50px;
            border-radius: 10px;
          "
          class="divider"
        ></div>
        <!-- best seller -->
        <div class="container-bestseller">
          <div class="bestseller-text">
            <h2 style="font-weight: bold">BEST SELLER</h2>
            <div
              style="
                width: 15%;
                height: 2px;
                margin-bottom: 50px;
                margin-top: 5px;
                border-radius: 10px;
              "
              class="divider"
            ></div>
            <div class="bestseller-item">
              <div
                style="
                  width: 100%;
                  height: 100%;
                  /* background-color: aqua; */
                  display: flex;
                  flex-direction: column;
                  flex-wrap: wrap;
                "
                class="container-item"
              >
                <!-- category -->

                <div
                  style="display: flex; gap: 30px; flex-wrap: wrap"
                  class="cake-item"
                >
                  <div @click="detail(bs.id)" v-for="bs in best" class="item">
                    <img
                      style="width: 250px; border-radius: 15px"
                      :src="
                        'http://localhost:8001/assets/img/' + bs.gambar_produk
                      "
                      alt="keren"
                    />
                    <h3 style="font-size: 1.5rem">
                      {{ bs.nama_produk }}
                    </h3>
                    <div class="rating">
                      <!-- <ion-icon name="star"></ion-icon> -->
                      <i
                        v-for="i in 5"
                        :v-if="
                          i <= bs.bintang
                            ? (star = 'bi bi-star-fill')
                            : (star = 'bi bi-star')
                        "
                        style="
                          font-size: 1.2rem;
                          margin-right: 2px;
                          color: #ffa903;
                        "
                        :class="star"
                      ></i>
                      <span
                        style="
                          font-size: 1rem;
                          font-weight: 600;
                          margin-left: 5px;
                        "
                      >
                        {{ bs.bintang }} | ({{
                          bs.jumlah_penilaian
                        }}
                        rating)</span
                      >
                      <h3 style="font-size: 1rem">
                        {{ bs.jumlah_terjual }} terjual
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- best-seller end -->
        <div
          style="
            width: 100%;
            height: 2px;
            background-color: gainsboro;
            margin-bottom: 50px;
            margin-top: 50px;
            border-radius: 10px;
          "
          class="divider"
        ></div>
        <!-- list items -->
        <div class="allItems-text">
          <h2 style="font-weight: bold">ALL PRODUCT</h2>
          <div
            style="
              width: 15%;
              height: 2px;
              margin-bottom: 50px;
              margin-top: 5px;
              border-radius: 10px;
            "
            class="divider"
          ></div>
        </div>
        <div
          style="
            width: 100%;
            height: 100%;
            /* background-color: aqua; */
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
          "
          class="container-item"
        >
          <!-- category -->

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
        <!-- items -->
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

  const props = defineProps(["list_top", "list_bottom"]);

  const router = useRouter();

  const store = useCounterStore();
  const { id_produk } = storeToRefs(store);
  const { simpanIdProduk, simpanKategori } = store;

  let valid = localStorage.getItem("tokenUser");

  const endpoint = import.meta.env.VITE_ENDPOINT;

  let star = "bi bi-star-fill";
  let nilai = 4.5;
  let produk = ref([]);
  let kategori = ref({});
  let best = ref([]);

  const viewCategory = async () => {
    try {
      let res = await axios.get(`${endpoint}/kategori`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      kategori.value = data;
      // console.log(data);
      // console.log(kategori.value);
    } catch (error) {
      console.log(error);
    }
  };

  const viewProduct = async () => {
    try {
      let res = await axios.get(`${endpoint}/produk`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      // console.log(produk);

      for (let i = 0; i < data.length; i++) {
        produk.value.push(data[i]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewBestSeller = async () => {
    try {
      let res = await axios.get(`${endpoint}/produk/top`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      // console.log(produk);

      for (let i = 0; i < 5; i++) {
        best.value.push(data[i]);
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

  const pindahCategory = async (nama) => {
    try {
      await simpanKategori(nama);
      router.push({ path: `/kategori/${nama}` });
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    viewProduct();
    viewCategory();
    viewBestSeller();
  });
</script>

<style scoped>
  /* best selling section */

  .bs-section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff4ea;
  }

  .best-section {
    width: 80%;
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
    gap: 100px;
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

  /* category */
  .container-category .content-category img {
    transition: all 0.4s ease-in-out;
  }
  .container-category .content-category img:hover {
    cursor: pointer;
    transform: scale(120%);
  }
  .best-section .container-category .content-category {
    transition: all 0.4s ease-in-out;
  }
  .best-section .container-category .content-category:hover {
    cursor: pointer;
    background-color: #dfd7bf !important;
  }
</style>
