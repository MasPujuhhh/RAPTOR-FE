<template>
  <div
    style="
      width: 100%;
      height: 100%;
      /* background-color: white; */
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 60px;
    "
    class="container-fluid"
  >
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <div
        style="
          width: 100vw;
          height: 100vh;
          position: fixed;
          background-color: #fff;
          opacity: 0.5;
          display: flex;
          padding-bottom: 100px;
          justify-content: center;
          align-items: center;
          gap: 5px;
          scroll-behavior: smooth;
        "
        v-if="visible"
      >
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden-focusable">Loading...</span>
        </div>
        <div class="spinner-grow text-secondary" role="status">
          <span class="visually-hidden-focusable">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="visually-hidden-focusable">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
          <span class="visually-hidden-focusable">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="visually-hidden-focusable">Loading...</span>
        </div>
      </div>
      <!-- container order -->
      <div
        style="
          width: 85%;
          min-height: 100vh;
          height: 100%;
          display: flex;
          border-radius: 20px;
          padding: 0;
          margin-top: 5vh;
          margin-bottom: 5vh;
          /* background-color: purple; */
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
        "
        class="container-fluid"
      >
        <!-- transaction section -->
        <div style="width: 60%; height: 100%" class="container-transaksi">
          <!-- header transaction -->
          <div
            style="
              width: 100%;
              min-height: 10vh;
              height: 10%;
              display: flex;
              align-items: center;
              padding: 10px;
              justify-content: space-between;
              border-bottom: 1px solid rgba(0, 0, 0, 0.4);
            "
            class="container-header"
          >
            <h2 style="font-weight: bolder">Detail History</h2>
            <h6>{{ cart.length }} Items</h6>
          </div>

          <!-- body transaction -->
          <div
            style="
              width: 100%;
              height: 90%;
              display: flex;
              padding: 10px;
              justify-content: center;
              /* align-items: center; */
            "
            class="container-body"
          >
            <!-- content transaction -->
            <table class="table table-hover align-middle">
              <tbody>
                <tr v-for="produk in cart">
                  <td style="width: 200px">
                    <img
                      :src="
                        'http://localhost:8001/assets/img/' +
                        produk.gambar_produk
                      "
                      alt="my image"
                      style="width: 80px"
                    />
                  </td>
                  <td style="width: 300px">
                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        padding-top: 25px;
                      "
                      class="brand"
                    >
                      <h6>{{ produk.nama_kategori }}</h6>
                      <h3>{{ produk.nama_produk }}</h3>
                    </div>
                  </td>
                  <!-- jumlah -->
                  <td style="padding-top: 50px; width: 100px">
                    <h6>{{ produk.jumlah_produk }}</h6>
                  </td>
                  <!-- harga -->
                  <td>
                    <div style="padding-top: 45px" class="price">
                      <h6>IDR {{ produk.total_harga }}</h6>
                    </div>
                  </td>
                  <td>
                    <div style="padding-top: 30px">
                      <button
                        @click="review(produk.id)"
                        class="btn btn-warning"
                      >
                        <i class="bi bi-star-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Summary Section -->
        <div
          style="
            width: 40%;
            min-height: 90vh;
            /* height: 100%; */
            display: flex;
            flex-direction: column;
            background-color: #f3f3f3;
            /* gap: 30px; */
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
          "
          class="container-summary"
        >
          <!-- summary header section -->
          <div
            style="
              width: 100%;
              min-height: 10vh;
              /* background-color: #f3f3f3; */
              display: flex;
              align-items: center;
              padding-left: 10px;
              border-top-right-radius: 20px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.4);
            "
            class="summary-header"
          >
            <h2 style="font-weight: bolder">Summary</h2>
          </div>
          <!-- summary content -->
          <div
            style="
              min-height: 90vh;
              height: 100%;
              display: flex;
              flex-direction: column;
              /* background-color: #f3f3f3; */
              gap: 40px;
              border-bottom-right-radius: 20px;
            "
            class="summary-content"
          >
            <!-- total pembelian -->
            <div
              style="
                min-height: 10vh;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 10px;
                padding-right: 10px;
              "
              class="content-total"
            >
              <h6>ITEMS {{ cart.length }}</h6>
              <h6>IDR {{ totalHargaItem }}</h6>
            </div>
            <!-- metode pengiriman/pembayaran -->
            <div
              style="
                display: flex;
                flex-direction: column;
                /* background-color: #f3f3f3; */
                padding: 10px;
                border-top: 1px solid rgba(0, 0, 0, 0.4);
                border-bottom: 1px solid rgba(0, 0, 0, 0.4);
              "
              class="content-payment"
            >
              <form style="display: flex; flex-direction: column; gap: 30px">
                <!-- pembayaran -->
                <div class="mb-3">
                  <h5>Costumer</h5>
                  <h6>{{ cus }}</h6>
                </div>
                <!-- kode promo -->
                <div class="mb-3">
                  <h5>Tanggal Pesanan</h5>
                  <h6>{{ tanggal }}</h6>
                </div>
              </form>
            </div>
            <!-- total pembayaran -->
            <div
              style="
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 10px;
                padding-right: 10px;
              "
              class="content-total"
            >
              <h6>TOTAL PRICE</h6>
              <h6>IDR {{ totalHargaItem }}</h6>
            </div>
            <div
              style="padding-left: 10px; border-bottom-right-radius: 20px"
              class="content-checkout"
            >
              <!-- Checkout button -->
              <h5>Status Pembayaran:</h5>
              <button
                v-if="status != 0"
                style="
                  background-color: #157046;
                  color: #fff;
                  font-weight: bold;
                "
                type="button"
                class="btn btn-success"
              >
                Success
              </button>
              <button
                v-else-if="status == 0"
                style="color: #fff; font-weight: bold"
                type="button"
                class="btn btn-danger"
              >
                Pending
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import Navbar from "@/components/Navbar.vue";
  import { onMounted, ref, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import moment from "moment";
  import "moment/locale/id";

  moment.locale("id-ID");

  const store = useCounterStore();
  const { id_transaksi, data_transaksi } = storeToRefs(store);
  const { simpanIdTransaksi, simpanDataTransaksi, simpanIdProduk } = store;

  const router = useRouter();

  let cart = ref([]);
  let item = ref("");
  let totalHargaItem = ref();
  let total = ref("");
  let yes = ref([]);
  let list_pId = ref([]);
  let cus = ref("");
  let tanggal = ref("");
  let status = ref(null);

  const endpoint = import.meta.env.VITE_ENDPOINT;

  // let visible = ref(false);

  let valid = localStorage.getItem("tokenUser");

  const viewDetail = async () => {
    try {
      // console.log(id_transaksi.value, "ininn detail");
      // console.log(yes.value, "inni box");
      let res = await axios.get(
        `${endpoint}/transaksi/detail/${id_transaksi.value}`,
        {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res);
      const data = res.data?.data;
      let harga = 0;
      let current = data[0].tanggal_pesanan;
      const date = moment(current).format("LLL");
      cus.value = `${data[0].nama_depan} ${data[0].nama_belakang}`;
      tanggal.value = date;
      status.value = data[0].status_pembayaran;

      // console.log(res);

      for (let i = 0; i < data.length; i++) {
        cart.value.push(data[i]);
        // list_pId.value.push(data[i].id);
        console.log(data[i]);
        harga += Number(data[i].total_harga);
      }

      totalHargaItem.value = harga;
      console.log(totalHargaItem.value);
    } catch (error) {
      console.log(error);
    }
  };

  const review = async (id) => {
    try {
      console.log(id);
      await simpanIdProduk(id);
      router.push({ path: "/rating" });
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(() => {
    viewDetail();
  });
</script>
