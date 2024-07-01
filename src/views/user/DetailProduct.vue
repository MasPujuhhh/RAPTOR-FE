<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <div
      style="
        width: 90%;
        height: 700px;
        margin-top: 85px;
        border-radius: 15px;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
        background-color: #513d34;
      "
      class="container-fluid"
      v-for="produk in item"
    >
      <div class="row align-items-start">
        <!-- image product section -->
        <div
          style="
            height: 700px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            justify-content: center;
            align-items: center;
            /* background-color: bisque; */
            border-top-left-radius: 15px;
            /* border-top-right-radius: 5px;
              border-bottom-right-radius: 5px; */
            border-bottom-left-radius: 15px;
            /* box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4); */
          "
          class="col-5"
        >
          <!-- large image -->
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              width: 70%;
              height: 600px;
              border-radius: 15px;
              background-color: bisque;
              box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
            "
            class="container-fluid"
          >
            <img
              style="
                max-width: 350px;
                min-width: 200px;
                box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
                border-radius: 15px;
              "
              :src="'http://localhost:8001/assets/img/' + produk.gambar_produk"
              alt="My image"
            />
          </div>
        </div>
        <!-- deskripsi product section -->
        <div
          style="
            height: 700px;
            display: flex;
            flex-direction: column;
            padding-top: 45px;
            /* justify-content: center; */
            /* align-items: center; */
          "
          class="col-7"
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin-bottom: 50px;
              padding-right: 30px;
            "
            class="container-fluid"
          >
            <h1 style="color: white">{{ produk.nama_produk }}</h1>
            <!-- label category -->
            <div style="display: flex; gap: 10px" class="label-category">
              <button type="button" class="btn btn-secondary btn-sm">
                {{ produk.nama_kategori }}
              </button>
              <button
                v-for="(varian, index) in produk.nama_varian"
                style="background-color: burlywood"
                type="button"
                class="btn btn-secondary btn-sm"
              >
                {{ varian }}
              </button>
            </div>
            <div class="rating">
              <!-- <ion-icon name="star"></ion-icon> -->
              <i
                v-for="i in 5"
                :v-if="
                  i <= produk.bintang
                    ? (star = 'bi bi-star-fill')
                    : (star = 'bi bi-star')
                "
                style="font-size: 1.2rem; margin-right: 2px; color: #ffa903"
                :class="star"
              ></i>
              <span
                style="
                  font-size: 1rem;
                  font-weight: 600;
                  margin-left: 5px;
                  color: #fff;
                "
              >
                {{ produk.bintang }} | ({{
                  produk.jumlah_penilaian
                }}
                rating)</span
              >
              <h3 style="font-size: 1rem; color: #fff">
                {{ produk.jumlah_terjual }} terjual
              </h3>
            </div>
            <p style="color: white; text-align: justify">
              {{ produk.deskripsi }}
            </p>
            <h2 style="color: white; margin-top: 10px; margin-bottom: 0px">
              IDR {{ formatCash(produk.harga_produk) }}
            </h2>
          </div>
          <div
            style="width: 70%; position: ; left: 10px; bottom: 10px"
            class="card rounded shadow my-2"
          >
            <div style="font-weight: bolder" class="card-header">
              Pesan Produk
            </div>
            <div style="position: relative" class="card-body">
              <form>
                <fieldset disabled>
                  <div class="mb-3">
                    <label for="disabledTextInput" class="form-label"
                      >Stok</label
                    >
                    <input
                      style="width: 20%"
                      type="text"
                      id="disabledTextInput"
                      class="form-control"
                      :placeholder="produk.stok_produk"
                    />
                  </div>
                </fieldset>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label"
                    >Quantity</label
                  >
                  <input
                    v-model="quantity"
                    style="width: 20%"
                    type="number"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="0"
                  />
                </div>
                <button
                  v-if="busy == false"
                  style="
                    position: absolute;
                    top: 133px;
                    left: 160px;
                    background-color: #131b1b;
                  "
                  type="button"
                  class="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add To Cart
                </button>
                <button
                  v-else-if="busy == true"
                  style="
                    position: absolute;
                    width: 100px;
                    height: 40px;
                    top: 133px;
                    left: 160px;
                    background-color: #131b1b;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  type="button"
                  class="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  disabled
                >
                  <div class="spinner-border text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
        <!-- modal confirm buy -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div
                style="background-color: #131b1b; color: white"
                class="modal-header"
              >
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Confirm Required
                </h1>
                <button
                  style="background-color: white"
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <!-- content confirm -->
              <div class="modal-body">
                <h6>Quantity: {{ quantity }}</h6>
                <p>are you sure you want to add this item to your cart?</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <!-- button confirm pembelian = add event click di sini -->
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  @click="cart"
                >
                  Confirm
                </button>
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

  let valid = localStorage.getItem("tokenUser");

  const endpoint = import.meta.env.VITE_ENDPOINT;

  let item = ref([]);
  let quantity = ref("" || 0);
  let harga = ref("");

  let busy = ref(false);

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

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

  const cart = async () => {
    busy.value = !busy.value;
    try {
      let x = {
        jumlah_produk: quantity.value,
      };
      // console.log(x);

      if (quantity.value == "0" || quantity.value <= "0") {
        toast.error("Quantity harus lebih dari 0", { autoClose: 3000 });
        busy.value = !busy.value;
      } else if (quantity.value > item.value[0].stok_produk) {
        toast.error("Quantity melebihi stok produk", { autoClose: 3000 });
        busy.value = !busy.value;
      } else {
        let res = await axios.post(`${endpoint}/cart/${id_produk.value}`, x, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });

        const pesan = res.data?.pesan;
        toast.success(pesan, { autoClose: 2000 });
        setTimeout(() => {
          busy.value = !busy.value;
          router.push({ path: "/order" });
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        busy.value = !busy.value;
      }, 1500);
    }
  };

  watch(
    data_produk,
    (newValue, oldValue) => {
      item.value = data_produk.value;
      console.log(item.value, "ini watchh");
    },
    {
      deep: true,
    }
  );
  // console.log(item.value[0]);
  onMounted(() => {
    items();
  });
</script>
