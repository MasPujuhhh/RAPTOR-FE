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
          /* box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.4); */
          background-color: white;
          border-radius: 15px;
          padding:1rem
        "
        class="container-fluid"
      >
        <!-- tabel -->
  
        <div>
            <h2>Daily Report</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>

          <!-- Filter Row -->
          <div class="row mb-3">
            <!-- Button trigger modal -->                
            <!-- <div class="col-md-2">
              <label for="filterNamaTugas" class="form-label">Pilih User</label>
              <select id="filterNamaTugas" class="form-select" v-model="filter.user">
                <option value="" selected disabled>Pilih User</option>
                <option v-for="user in users" :key="user.id" :value="{user_id:user.id, nama_lengkap:user.nama_lengkap}">
                  {{ user.nama_lengkap }}
                </option>
              </select>
            </div> -->
            <div class="col-md-2">
              <label for="filterNamaTugas" class="form-label">Pilih Tugas</label>
              <select id="filterNamaTugas" class="form-select" v-model="filter.tugas">
                <option value="" selected disabled>Pilih Tugas</option>
                <option v-for="tugas in tugases" :key="tugas.id" :value="{tugas_id:tugas.id, judul:tugas.judul}">
                  {{ tugas.judul }}
                </option>
              </select>
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
          <div v-if="d_reports?.length != 0" class="d-flex justify-content-between w-75 mt-4">
            <div class="d-flex justify-content-between w-75">
              <h6>Nama Lengkap : {{ filter.user.nama_lengkap }}</h6>
              <h6>Tugas : {{ filter.tugas.judul }}</h6>
              <h6>Tanggal : {{ filter.tanggal_mulai && filter.tanggal_selesai ? `${moment(filter.tanggal_mulai).format('LL')} - ${moment(filter.tanggal_selesai).format('LL')}` : filter.tanggal_mulai ? `lebih dari `+filter.tanggal_mulai : filter.tanggal_selesai ? `kurang dari `+filter.tanggal_selesai : '' }} </h6>
              <h6>Jumlah : {{ d_reports?.length }}</h6>
            </div>
            <button class="btn btn-success" id="filerHapus" type="button" @click="x"><i class="bi bi-file-earmark-spreadsheet"></i> Cetak</button>
          </div>
          <div class="table-responsive" style="width: 95%;">
            <p v-if="!d_reports?.length" class="text-danger">Silahkan Pilih Filter Terlebih dahulu!!</p>
            <table v-if="d_reports?.length" class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Jadwal</th>
                  <th>Nama Lengkap (Role)</th>
                  <th>Tugas</th>
                  <th>Daily Report</th>
                  <th>Label</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(report, index) in d_reports" :key="report.id">
                  <td style="width: 3%">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                  <td style="width: 7%">{{ moment(report.jadwal).format('LL') }}</td>
                  <td style="width: 15%">{{ report.nama_lengkap  }} ({{ report.nama_role }})</td>
                  <td style="width: 10%">{{ report.judul }}</td>
                  <td style="width: 25%">{{ report.deskripsi?.length > 200 ? `${report.deskripsi?.substring(0, 200)}...` : report.deskripsi }}</td>
                  <td style="width: 10%"><span class="badge" :style="`background-color:${report?.color}; color:black;` "><i class="bi bi-bookmark-fill"></i>{{ report?.nama_label }}</span></td>
                  <td style="width: 10%">
                    <!-- DELETE -->
                    <button class="btn btn-warning btn-sm" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getDetailReport(report?.daily_report_id)"> 
                      <i class="bi bi-pencil"></i>
                    </button>

                    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Launch demo modal
                    </button> -->
                  </td>
                </tr>
              </tbody>
            </table>


            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ moment(detail_report.jadwal).format('LL') }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="h-100">
                      <textarea type="text" v-model="detail_report.deskripsi" class="form-control h-100" />
                    </div>
                    <div class="d-flex gap-2 justify-content-center border-top border-black py-1 h-25">
                      <div class="d-flex h-75 gap-4" style="width: 100%">
                        <select v-model="detail_report.tugas_id" class="form-select form-select-sm">
                          <option v-for="task in tugases" :key="task.id" :value="task.id">{{ task.judul }}</option>
                        </select>
                        <select v-model="detail_report.label_id" class="form-select form-select-sm">
                          <option class="bgprimary" v-for="label in labels" :key="label.id" :value="label.id" >{{ label.nama }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateDetail(detail_report.id)">Save changes</button>
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
import { ref,computed, onMounted, watch  } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import moment from "moment";
import "moment/locale/id";
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';

const endpoint = import.meta.env.VITE_ENDPOINT;

const d_reports = ref([]);
const tugases = ref([])
const labels = ref([])
const foto_absen = ref()
const users = ref([])
const judul_excel = ref()

const user_detail = ref({})
const perPage = ref(25);
const currentPage = ref(1);
const filter = ref({
  user:'',
  tugas:'',
  user_id:'',
  tanggal_mulai:'',
  tanggal_selesai:''
});
const metadata = ref();

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");

const showModal = ref(false);
const newUser = ref({
  nama_lengkap: '',
  email: '',
  role_perusahaan: '',
  role_alias: '',
  lokasi: '',
  is_active: false
});

const detail_report = ref({
  deskripsi:'',
  tugas_id:'',
  label_id:''
})

const renderLabel = async () => {
  try {
    const res = await axios.get(`${endpoint}/report_label/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    labels.value = res.data.data;
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

const renderMe = async () => {
    try {
      const res = await axios.get(`${endpoint}/user/detail_by_token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      filter.value.user = res.data.data
      console.log(filter.value)
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

const renderUser = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    users.value = res.data?.data;
  } catch (error) {
    const data = error.response?.data;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};

const renderTugas = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas/all_by_token`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    tugases.value = res.data?.data;
  } catch (error) {
    const data = error.response?.data;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};

const getDetailReport = async (id) => {
  try {
    const res = await axios.get(
      `${endpoint}/daily/detail/${id}`, {
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
    detail_report.value = res.data?.data;
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};

const updateDetail = async (id) => {
  try {
    let payload = {
      deskripsi:detail_report.value.deskripsi,
      tugas_id:detail_report.value.tugas_id,
      label_id:detail_report.value.label_id,
    }
    const res = await axios.put(
      `${endpoint}/daily/edit/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Mengupdate Daily Report', {
      autoClose: 2000,
    });
    getListFilteredtugases()
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};

const getListFilteredtugases = async () => {
  try {
    judul_excel.value = "RAPTOR-LAPORAN-HARIAN"
    filter.value.user_id = filter.value?.user.id
    filter.value.judul_tugas = filter.value?.tugas.judul

    if (filter.value.user != '') {
      judul_excel.value += `-${filter.value.user.nama_lengkap}`
    }

    if (filter.value.tugas != '') {
      judul_excel.value += `-${filter.value.tugas.judul}`
    }

    if (filter.value.tanggal_mulai != '' && filter.value.tanggal_selesai == '') {
      judul_excel.value += `-(>=${moment(filter.value.tanggal_mulai).format('LL')})`
    }

    if (filter.value.tanggal_selesai != '' && filter.value.tanggal_mulai == '') {
      judul_excel.value += `-(<=${moment(filter.value.tanggal_selesai).format('LL')})`
    }

    if (filter.value.tanggal_selesai != '' && filter.value.tanggal_mulai != '') {
      judul_excel.value += `-(${moment(filter.value.tanggal_mulai).format('LL')}-${moment(filter.value.tanggal_selesai).format('LL')})`
    }


    const res = await axios.get(
      `${endpoint}/daily/all`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    d_reports.value = res.data?.data;
    console.log(res.data.data)
    if(!d_reports.value.length){
      toast.success(`CODE 200 : Data Kosong`, {
        autoClose: 2000,
      });
    }
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
  filter.value = {
    user:'',
    tugas:'',
    user_id:'',
    tanggal_mulai:'',
    tanggal_selesai:''
  };
  currentPage.value = 1;
  d_reports.value = []
};
onMounted(() => {
  renderUser()
  renderTugas()
  renderMe()
  renderLabel()
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
  