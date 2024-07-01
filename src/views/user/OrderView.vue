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
            <h2 style="font-weight: bolder">Shopping Cart</h2>
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
                    <div
                      style="
                        display: flex;
                        padding-top: 30px;
                        gap: 10px;
                        justify-content: center;
                        align-items: center;
                      "
                      class="action"
                    >
                      <button
                        @click="simpanId(produk.id)"
                        type="button"
                        class="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDelete"
                        style="
                          box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                        "
                      >
                        <i class="bi bi-trash3-fill"></i>
                      </button>
                      <!-- modal delete -->
                      <div
                        class="modal fade"
                        id="modalDelete"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden-focusable="true"
                      >
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1
                                style="font-weight: bold"
                                class="modal-title fs-5"
                                id="exampleModalLabel"
                              >
                                Confirm Required
                              </h1>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div style="font-weight: bold" class="modal-body">
                              Are you sure delete this item?
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-bs-dismiss="modal"
                                @click="deleteCart"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- modal delete end -->
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
                  <label for="payment" class="form-label">PAYMENT</label>
                  <select
                    style="width: 80%"
                    id="payment"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Payment Methods</option>
                    <option value="1">CASH</option>
                  </select>
                </div>
                <!-- kode promo -->
                <div class="mb-3">
                  <label for="'giveCode'" class="form-label">GIVE CODE</label>
                  <input
                    style="width: 80%"
                    type="text"
                    class="form-control"
                    id="giveCode"
                    placeholder="Enter your code here"
                  />
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
              <button
                v-if="busy == false"
                style="
                  width: 60%;
                  background-color: #131b1b;
                  position: relative;
                  bottom: 10px;
                "
                type="submit"
                class="btn btn-dark"
                @click="checkout"
              >
                Checkout
              </button>
              <button
                v-if="busy == true"
                style="
                  width: 60%;
                  background-color: #131b1b;
                  position: relative;
                  bottom: 10px;
                "
                type="submit"
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
  import "vue3-toastify/dist/index.css";

  const router = useRouter();

  const store = useCounterStore();
  const { id_cart } = storeToRefs(store);
  const { simpanIdCart } = store;

  let busy = ref(false);

  let cart = ref([]);
  let item = ref("");
  let totalHargaItem = ref("");
  let total = ref("");
  let yes = ref([]);
  let list_pId = ref([]);
  let user = ref({});

  let visible = ref(false);

  let valid = localStorage.getItem("tokenUser");

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const viewCart = async () => {
    try {
      // console.log(yes.value, "inni box");
      let res = await axios.get(`${endpoint}/cart/`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });
      const data = res.data?.data;
      let harga = 0;
      console.log(data);
      // console.log(res);
      const idUsr = data[0].user_id;

      for (let i = 0; i < data.length; i++) {
        cart.value.push(data[i]);
        list_pId.value.push(data[i].id);
        harga += data[i].total_harga;
      }

      totalHargaItem.value = harga;

      let resp = await axios.get(`${endpoint}/user/${idUsr}`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });

      let dataUser = resp.data?.data;

      user.value = dataUser;
      // console.log(dataUser);
    } catch (error) {
      console.log(error);
    }
  };

  const simpanId = async (id) => {
    // console.log(id);
    await simpanIdCart(id);
  };

  const deleteCart = async () => {
    try {
      let res = await axios.delete(`${endpoint}/cart/${id_cart.value}`, {
        headers: {
          Authorization: `Bearer ${valid}`,
          "Content-Type": "application/json",
        },
      });
      const pesan = res.data.status;
      toast.success(pesan, { autoClose: 2000 });
      setTimeout(() => {
        location.reload();
      }, 1500);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async () => {
    busy.value = !busy.value;
    try {
      if (
        !user.value.nama_depan ||
        !user.value.nama_belakang ||
        !user.value.alamat
      ) {
        toast.error("Silahkan Lengkapi Profile Anda Terlebih Dahulu", {
          autoClose: 2000,
        });
        setTimeout(() => {
          // router.push({ path: "/profile" });
        }, 1500);
      } else {
        let current = new Date();
        let x = {
          list_produk_id: list_pId.value,
          tanggal_pesanan: current,
        };
        // console.log(x);

        // console.log(x, "iniii x");

        let res = await axios.post(`${endpoint}/transaksi/`, x, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });

        // console.log(res);
        // console.log(current)
        visible.value = true;
        toast.success(
          "Checkout Berhasil!, Mohon Tunggu Admin Konfirmasi Pembayaran",
          { autoClose: 2000 }
        );
        setTimeout(() => {
          visible.value = false;
          busy.value = !busy.value;
          location.reload();
        }, 3000);
        // console.log(yes.value);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        busy.value = !busy.value;
      }, 1500);
    }
  };

  onMounted(() => {
    viewCart();
  });
</script>
