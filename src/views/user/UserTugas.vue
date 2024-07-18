<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <!-- pembungkus -->
    <div
      style="
        width: 90%;
        height: 700px;
        margin-top: 100px;
        background-color: white;
        padding:1rem
      "
      class="container-fluid"
    >
    <div>
          <h2>Tugas</h2>
          <hr style="margin-bottom: 0.3rem;">
          <hr style="margin-top: 0.3rem;">
        </div>

        <!-- Filter Row -->
        <div class="row mb-3">
          <div class="col-md-2">
              <label for="filterNamaTugas" class="form-label">Nama Tugas</label>
              <input type="text" id="filterNamaTugas" class="form-control" v-model="filter.judul" placeholder="Nama Tugas">
            </div>
            <div class="col-md-2">
              <label for="TnggalMulai" class="form-label">Tanggal Mulai</label>
              <input type="date" id="TnggalMulai" class="form-control" v-model="filter.tanggal_mulai" placeholder="Tanggal Mulai">
            </div>
            <div class="col-md-2">
              <label for="TanggalSelelasi" class="form-label">Tanggal Selesai</label>
              <input type="date" id="TanggalSelelasi" class="form-control" v-model="filter.tanggal_selesai" placeholder="Tanggal Selesai">
            </div>

            <div class="col-md-1">
              <label for="filerSubmit" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" id="filerSubmit" type="button" @click="getListFilteredtugases"><i class="bi bi-search"></i></button>
              </div>
            </div>
            <div class="col-md-1">
              <label for="filerHapus" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-danger" id="filerHapus" type="button" @click="resetFilters"><i class="bi bi-trash"></i></button>
              </div>
            </div>
        </div>

        <!-- User List Table -->
        
        <div class="table-responsive" style="width: 95%;">
          <table class="table table-striped">
            <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Tugas</th>
                  <th>Kategori</th>
                  <th>Tanggal Mulai</th>
                  <th>Tanggal Selesai</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tugas, index) in tugases" :key="tugas.id">
                  <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                  <td>{{ tugas.judul }}</td>
                  <td>{{ tugas.kategori }}</td>
                  <td>{{ moment(tugas.tanggal_mulai ).format('LL') }}</td>
                  <td>{{ moment(tugas.tanggal_selesai ).format('LL') }}</td>
                  <td>
                    <span :class="{'badge bg-success': tugas.is_done == true, 'badge bg-warning': tugas.is_done == false}">
                      {{ tugas.is_done ? 'DONE' : 'ON-PROGRESS'}}
                    </span>
                  </td>
                  <td>
                  <!-- DELETE -->
                  <button class="btn btn-secondary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="$router.push(`/tugas/detail/${tugas.id}`)"> 
                    <i class="bi bi-search"></i>
                  </button>
                  
                </td>
              </tr>
            </tbody>
          </table>
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
  import moment from "moment";
  import "moment/locale/id";

  const store = useCounterStore();
  const { data_user } = storeToRefs(store);

  const router = useRouter();
  let absens = ref({});
  let foto_absen = ref();
  let token = localStorage.getItem("token");
  let idUser = localStorage.getItem("idUser");


  let busy = ref(false);

  const filter = ref({
    user:'',
    nama_lengkap: '',
    tipe: '',
    alias: '',
    lokasi: '',
  });
  


  let currentPage = ref(1)
  let perPage = ref(10)
  let tugases = ref()
  const metadata = ref();
  const roles = ref([])
  const showModal = ref(false);
  const newUser = ref({
    nama_lengkap: '',
    email: '',
    tipe:'',
    lokasi: '',
    role_id:'',
    is_active: false
  });
  const me = ref()

  const new_pass = ref({})

  const endpoint = import.meta.env.VITE_ENDPOINT;

  const renderMe = async () => {
    try {
      const res = await axios.get(`${endpoint}/user/detail_by_token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      me.value = res.data.data
    } catch (error) {
      const data = error.response?.data.errors;
      if (data) {
        toast.error(`CODE ${data.code} : ${data.message}`, {
          autoClose: 2000,
        });
      }
      console.log(error);
    }
  };

  const getListTugas = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas/list_by_token`, {
        params: {
          per_page: perPage.value,
          page: currentPage.value,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    tugases.value = res.data?.data;
    metadata.value = res.data?.metadata;
    console.log(res);
  } catch (error) {
    const data = error.response?.data.errors
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(error);
  }
};

  const getListFilteredtugases = async () => {
    try {
      filter.value.user_id = me.value.id
      const res = await axios.get(
        `${endpoint}/user/detail_by_token`, {
          params: filter.value,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      tugases.value = res.data?.data;
      metadata.value = res.data?.metadata;
    } catch (error) {
      const data = error.response?.data.errors;
      if (data) {
        toast.error(`CODE ${data.code} : ${data.message}`, {
          autoClose: 2000,
        });
      }
      console.log(error);
    }
  };

  onMounted(() => {
    getListTugas()
    renderMe()
  });
</script>

<style scoped>
  label {
    color: black;
    font-weight: bold;
  }
  input {
    color: gray;
  }
</style>
