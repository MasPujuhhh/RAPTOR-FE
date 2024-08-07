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
            <h2>Presensi</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>

          <!-- Filter Row -->
          <div class="row mb-3">
            <!-- Button trigger modal -->                
            <!-- <div class="col-md-2">
              <label for="filterNamaTugas" class="form-label">Pilih User</label>
              <select id="filterNamaTugas" class="form-select" v-model="filter.user">
                <option disabled>Pilih User</option>
                <option v-for="user in users" :key="user.id" :value="{user_id:user.id, nama_lengkap:user.nama_lengkap}">
                  {{ user.nama_lengkap }}
                </option>
              </select>
            </div> -->
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
          <div v-if="absens?.length" class="d-flex justify-content-between w-75 mt-4">
            <div class="d-flex justify-content-between w-75 mb-3">
              <h6>Nama Lengkap : {{ me?.nama_lengkap }}</h6>
              <h6>Tanggal : {{ filter.tanggal_mulai && filter.tanggal_selesai ? `${moment(filter.tanggal_mulai).format('LL')} - ${moment(filter.tanggal_selesai).format('LL')}` : filter.tanggal_mulai ? `lebih dari `+ moment(filter.tanggal_mulai).format('LL') : filter.tanggal_selesai ? `kurang dari `+ moment(filter.tanggal_selesai).format('LL') : 'Semua' }} </h6>
              <h6>Jumlah : {{ absens?.length }}</h6>
            </div>
            <!-- <button class="btn btn-success" id="filerHapus" type="button" @click="x"><i class="bi bi-file-earmark-spreadsheet"></i> Cetak</button> -->
          </div>
          
          <div class="table-responsive" style="width: 95%;">
            <p v-if="!absens?.length" class="text-danger">Silahkan Pilih Filter Terlebih dahulu!!</p>
            <table v-if="absens?.length" class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tanggal (In - Out)</th>
                  <th>Nama Lengkap</th>
                  <th>Status</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Keterangan</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(absen, index) in absens" :key="absen.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ moment(absen.jadwal ).format('LL') }}  (08.00 - 17.00)</td>
                  <td>{{ absen.nama_lengkap }}</td>
                  <td>{{ absen.status ? absen.status : '-' }}</td>
                  <td>{{ absen.check_in ? moment(absen.check_in).format('HH:mm') : '-' }}</td>
                  <td>{{ absen.check_out ? moment(absen.check_out).format('HH:mm') : '-' }}</td>
                  <td>{{ absen.check_in ? cekTerlambat(absen.jadwal, absen.check_in) : '-' }}</td>
                  <td>

                    <!-- DELETE -->
                    <button v-if="!absen.check_out" class="btn btn-warning btn-sm me-2" type="button" @click="navigateAbsen(absen?.jadwal.split('T')[0], !absen.check_in ? 'check_in' : 'check_out' )"> 
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button v-if="absen.status" class="btn btn-info btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="getFotoAbsen(absen.id)"> 
                      <i class="bi bi-image-fill"></i>
                    </button>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- modal delete -->
          <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteUserModalLabel">Foto Absen</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="d-flex flex-row mx-auto justify-content-evenly w-100">
                    <div  v-if="absen_detail?.foto_absen_pagi">
                      <h6>Foto Check In ( {{ moment(absen_detail?.check_in).format('HH:mm') }} WIB)</h6>
                      <img class="d-block mx-auto border" :src="endpoint+absen_detail?.foto_absen_pagi" alt="" style="transform: scaleX(-1);">
                    </div>
                    <div  v-if="absen_detail?.foto_absen_sore">
                      <h6>Foto Check Out ( {{ moment(absen_detail?.check_out).format('HH:mm') }} WIB)</h6>
                      <img class="d-block mx-auto border" :src="endpoint+absen_detail?.foto_absen_sore" alt="" style="transform: scaleX(-1);">
                    </div>
                    <div v-if="absen_detail?.foto_dokumen">
                      <h6>Foto Tambahan</h6>
                      <img class="d-block mx-auto border" :src="endpoint+absen_detail?.foto_dokumen" alt="">
                    </div>
                  </div>
                  <div>
                    <div v-if="absen_detail?.koordinat" class="mt-5">
                      <h6 class="d-block mx-auto text-center">Titik Koordinat</h6>
                      <iframe class="d-block mx-auto" :src="`https://www.google.com/maps?q=${JSON.parse(absen_detail?.koordinat).latitude},${JSON.parse(absen_detail?.koordinat).longitude}&hl=es;z=14&output=embed`" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
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
    import moment from "moment";
    import "moment/locale/id";
  
    const store = useCounterStore();
    const { data_user } = storeToRefs(store);
  
    const router = useRouter();
    let absens = ref({});
    let absen_detail = ref();
    let token = localStorage.getItem("token");
    let idUser = localStorage.getItem("idUser");
  
    let busy = ref(false);

    const cekTerlambat = (tenggat, tanggal) => {
  const jamTenggat = 8.5;
  const tenggatBaru = new Date(tenggat);
  tenggatBaru.setHours(jamTenggat, 30, 0, 0);
  const tanggalBaru = new Date(tanggal);
  const jamTertinggal = new Date(tenggatBaru).getHours() - tanggalBaru.getHours();
  const menitTertinggal = new Date(tenggatBaru).getMinutes() - tanggalBaru.getMinutes();

  if (jamTertinggal < 0 || (jamTertinggal === 0 && menitTertinggal < 0)) {
    return 'terlambat'
  } else {
    return 'tepat waktu'
  }
};
  
    const filter = ref({
      tanggal_mulai:"",
      tanggal_selesai:""
    });
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

    const navigateAbsen = (jadwal, tipe) => {
      router.push({
        path: `/absen/${jadwal}`,
        query: { tipe }
      })
    }
  
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

    const getFotoAbsen = async (id) => {
      try {
        const res = await axios.get(
          `${endpoint}/absensi/detail/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        absen_detail.value = res.data?.data;
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

    const getListFilteredtugases = async () => {
      try {
        filter.value.user_id = me.value.id
        const res = await axios.get(
          `${endpoint}/absensi/all`, {
            params: filter.value,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        absens.value = res.data?.data;
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

    const resetFilters = async () => {
      filter.value = ref({
      tanggal_mulai:"",
      tanggal_selesai:""
    });
    absens.value = []
  };
  
    onMounted(() => {
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
  