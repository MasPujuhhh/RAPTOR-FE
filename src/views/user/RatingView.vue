<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <!-- pembungkus -->
    <div
      style="
        width: 90%;
        min-height: 70vh;
        margin-top: 100px;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
        background-color: white;
        border-radius: 15px;
      "
      class="container-fluid"
    >
      <div v-for="produk in item" class="row align-items-start">
        <div
          style="
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #513d34;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
            border-bottom-left-radius: 15px;
            border-top-left-radius: 15px;
          "
          class="col-5"
        >
          <!-- image product -->
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 90%;
              height: 400px;
            "
            class="container-fluid"
          >
            <img
              style="
                border-radius: 10px;
                width: 300px;
                box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
              "
              :src="'http://localhost:8001/assets/img/' + produk.gambar_produk"
            />
            <h1 style="color: white">{{ produk.nama_produk }}</h1>
          </div>
        </div>
        <!-- deskripsi product section -->
        <div
          style="
            height: 70vh;
            display: flex;
            flex-direction: column;
            padding-top: 30px;
            /* justify-content: center; */
            align-items: center;
          "
          class="col-7"
        >
          <div
            style="display: flex; flex-direction: column; gap: 10px"
            class="container-fluid"
          >
            <h1 style="color: black">Rating</h1>
            <p style="color: black; text-align: justify">
              Silahkan Review Produk Kami, Terimakasih Sudah Membeli Produk Kami
            </p>
          </div>
          <div
            style="width: 70%; height: 400px"
            class="card rounded shadow my-2"
          >
            <div style="font-weight: bolder" class="card-header">Penilaian</div>
            <div
              style="
                display: flex;
                justify-content: center;
                width: 90%;
                height: 20px;
              "
              class="container-fluid"
            ></div>
            <!-- image star -->
            <div
              style="
                width: 100%;
                height: 20px;
                display: flex;
                padding-left: 20px;
                /* gap: 10px; */
                /* background-color: black; */
              "
              class="container-fluid"
            >
              <div class="select">
                <select
                  style="width: 300px; height: 40px; font-size: 20px"
                  v-model="rating"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Review Produk</option>
                  <option value="1">🤮 Sangat Tidak Puas</option>
                  <option value="2">🤢 Tidak Puas</option>
                  <option value="3">😐 Mantap</option>
                  <option value="4">😲 Puas</option>
                  <option value="5">😝 Sangat Puas</option>
                </select>
              </div>
            </div>
            <div style="position: relative" class="card-body">
              <div class="mb-3">
                <textarea
                  v-model="komentar"
                  style="
                    width: 75%;
                    height: 40%;
                    position: absolute;
                    top: 70px;
                    left: 3%;
                  "
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="tambahkan komentar"
                ></textarea>
              </div>
              <button
                v-if="busy == false"
                @click="kirim"
                style="
                  width: 15%;
                  position: absolute;
                  top: 70px;
                  left: 80%;
                  background-color: #131b1b;
                "
                class="btn btn-dark"
              >
                Kirim
              </button>
              <button
                v-if="busy == true"
                style="
                  width: 15%;
                  position: absolute;
                  top: 70px;
                  left: 80%;
                  background-color: #131b1b;
                "
                class="btn btn-dark"
                disabled
              >
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
          </div>
        </div>
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
  const { id_produk, data_produk, token } = storeToRefs(store);
  const { simpanDataProduk } = store;

  const router = useRouter();

  const endpoint = import.meta.env.VITE_ENDPOINT;

  let item = ref([]);
  let rating = ref("Review Produk");
  let komentar = ref("");

  let busy = ref(false);

  let valid = localStorage.getItem("tokenUser");

  const items = async () => {
    try {
      let res = await axios.get(`${endpoint}/produk/${id_produk.value}`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      const pesan = res.data?.pesan;

      item.value.push(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const kirim = async () => {
    try {
      let x = {
        produk_id: id_produk.value,
        bintang: rating.value,
        komentar: komentar.value,
      };

      busy.value = !busy.value;

      let res = await axios.post(`${endpoint}/penilaian/`, x, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      // console.log(res);

      toast.success("Berhasil Review Produk", {
        autoClose: 2000,
      });

      setTimeout(() => {
        busy.value = !busy.value;
        router.push({ path: "/" });
      }, 1500);
    } catch (error) {
      console.log(error.response);
      busy.value = !busy.value;
    }
  };

  onMounted(() => {
    items();
  });
</script>
