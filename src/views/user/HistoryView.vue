<template>
  <header>
    <Navbar></Navbar>
  </header>
  <!-- pembungkus -->
  <div
    style="
      width: 90%;
      min-height: 60vh;
      margin-top: 100px;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4);
      background-color: white;
      border-radius: 15px;
    "
    class="container-fluid"
  >
    <!-- tabel -->
    <h1 style="color: black">
      History
      <div
        style="
          width: 100%;
          height: 90%;
          display: flex;
          margin-top: 20px;
          justify-content: center;
        "
        class="outer-table"
      >
        <div style="width: 100%" class="table-responsive">
          <!-- inner table -->
          <table class="table table-bordered table-hover align-middle">
            <thead
              style="height: 60px; padding: 0; text-align: center"
              class="table table-light align-middle"
            >
              <tr>
                <th
                  scope="col"
                  style="width: 200px; font-weight: bold; font-size: 18px"
                >
                  ID Transaksi
                </th>
                <th
                  scope="col"
                  style="width: 300px; font-weight: bold; font-size: 18px"
                >
                  Tanggal
                </th>
                <th
                  scope="col"
                  style="width: 200px; font-weight: bold; font-size: 18px"
                >
                  Costumer
                </th>
                <th
                  scope="col"
                  style="width: 400px; font-weight: bold; font-size: 18px"
                >
                  Jumlah Pesanan
                </th>
                <th
                  scope="col"
                  style="width: 175px; font-weight: bold; font-size: 18px"
                >
                  Harga
                </th>
                <th
                  scope="col"
                  style="width: 175px; font-weight: bold; font-size: 18px"
                >
                  Status Pembayaran
                </th>
                <th
                  scope="col"
                  style="width: 200px; font-weight: bold; font-size: 18px"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody style="text-align: center" class="table align-middle">
              <tr v-for="u in item" style="height: 60px">
                <td>{{ u.kode_transaksi }}</td>
                <td>{{ u.tanggal_pesanan }}</td>
                <td>{{ user }}</td>
                <td>{{ u.jumlah_produk }}</td>
                <td>{{ u.total_harga }}</td>
                <td v-if="u.status_pembayaran == 0">
                  <button
                    style="
                      background-color: red;
                      color: #fff;
                      font-weight: bold;
                    "
                    type="button"
                    class="btn btn-sm"
                  >
                    Pending
                  </button>
                </td>
                <td v-else="">
                  <button
                    style="
                      background-color: #157046;
                      color: #fff;
                      font-weight: bold;
                    "
                    type="button"
                    class="btn btn-success btn-sm"
                  >
                    success
                  </button>
                </td>

                <td>
                  <div style="display: flex; justify-content: center">
                    <button
                      @click="pindahDetail(u.kode_transaksi)"
                      type="button"
                      class="btn btn-secondary"
                      style="box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8)"
                    >
                      <i class="bi bi-search"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- inner table -->
      </div>
    </h1>
  </div>
  <div style="width: 100%; height: 20vh" class="divider"></div>
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
  import moment from "moment";
  import "moment/locale/id";

  const router = useRouter();
  const store = useCounterStore();

  const { id_transaksi } = storeToRefs(store);
  const { simpanIdTransaksi, simpanIdProduk } = store;

  let valid = localStorage.getItem("tokenUser");

  let item = ref([]);
  let user = ref("");
  let best = ref([]);

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const viewHistory = async () => {
    try {
      let res = await axios.get(`${endpoint}/transaksi/`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;

      for (let i = 0; i < data.length; i++) {
        let date = moment(data[i].tanggal_pesanan).format("LLL");
        data[i].tanggal_pesanan = date;
        item.value.push(data[i]);
      }

      console.log(data);

      let resp = await axios.get(`${endpoint}/user/${data[0].user_id}`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      const datau = resp.data?.data;

      user.value = `${datau.nama_depan} ${datau.nama_belakang}`;
      // console.log(datau);
      // console.log(item.value, "iniValue");
    } catch (error) {
      console.log(error);
    }
  };

  const pindahDetail = async (id) => {
    // console.log(id);
    await simpanIdTransaksi(id);
    console.log(id_transaksi.value);
    router.push({ path: "/detail-history" });
  };

  onMounted(() => {
    viewHistory();
  });
</script>

<style scoped>
  td {
    font-size: 15px;
  }

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
    transform: scale(120%);
  }
  .best-section .container-category .content-category {
    transition: all 0.4s ease-in-out;
  }
  .best-section .container-category .content-category:hover {
    background-color: #dfd7bf !important;
  }
</style>
