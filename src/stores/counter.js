import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const data_user = ref({});
    const token = ref("");
    const id_produk = ref("");
    const data_produk = ref({});
    const produk_atas = ref([]);
    const produk_bawah = ref([]);
    const nama_kategori = ref("");
    const user_chat = ref("");
    const tokenAdmin = ref("");
    const id_client = ref("");
    const id_kategori = ref("");
    const id_varian = ref("");
    const id_cart = ref("");
    const id_transaksi = ref("");

    function simpanUser(data, tokeen) {
      data_user.value = data;
      token.value = tokeen;
    }
    function simpanToken(t) {
      tokenAdmin.value = t;
    }

    function simpanProduk(t, b) {
      produk_atas.value = t;
      produk_bawah.value = b;
    }

    function simpanIdProduk(id) {
      id_produk.value = id;
    }

    function simpanDataProduk(data) {
      data_produk.value = data;
    }

    function simpanKategori(nama) {
      nama_kategori.value = nama;
    }

    function simpanIdUsers(id) {
      id_client.value = id;
    }

    function simpanIdKategori(id) {
      id_kategori.value = id;
    }

    function simpanIdVarian(id) {
      id_varian.value = id;
    }

    function simpanIdCart(id) {
      id_cart.value = id;
    }

    function simpanIdTransaksi(id) {
      id_transaksi.value = id;
    }

    function simpanUserChat(nama) {
      user_chat.value = nama;
    }

    return {
      data_user,
      token,
      id_produk,
      produk_atas,
      produk_bawah,
      nama_kategori,
      user_chat,
      tokenAdmin,
      id_client,
      id_kategori,
      id_varian,
      id_cart,
      id_transaksi,
      simpanUser,
      simpanProduk,
      simpanDataProduk,
      simpanIdProduk,
      simpanKategori,
      simpanToken,
      simpanIdUsers,
      simpanIdKategori,
      simpanIdVarian,
      simpanIdCart,
      simpanIdTransaksi,
      simpanUserChat,
    };
  },
  { persist: true }
);
