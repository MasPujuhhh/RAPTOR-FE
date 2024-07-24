<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <SidebarAdmin></SidebarAdmin>

      <!-- Main Content -->
      <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <HeaderAdmin></HeaderAdmin>
        <div
          style="
            width: 100%;
            height: 100%;
            display: flex;
            margin-top: 10vh;
            flex-direction: column;
            padding-left: 20px;
            padding-bottom: 1%;
          "
          class="container-content"
        >
        <div>
            <h2>Tugas</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>

          <!-- Filter Row -->
          <div class="row mb-3">
            <!-- Button trigger modal -->                
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


          <!-- Add User Button -->
          <div class="row mb-3 justify-content-end">
            <div class="col-md-2">
              <button type="button" class="btn btn-primary" @click="$router.push('/admin/tugas/add')">+ Tugas</button>
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
                  <th>Jumlah Tugas</th>
                  <th>Jumlah User</th>
                  <th>Jumlah Komentar</th>
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
                  <td>{{ tugas.jumlah_tugas }}</td>
                  <td>{{ tugas.jumlah_user }}</td>
                  <td>{{ tugas.jumlah_comment }}</td>
                  <td>
                    <span :class="{'badge bg-success': tugas.status === 'done', 'badge bg-warning': tugas.status !== 'done'}">
                      {{ tugas.status?.toUpperCase() }}
                    </span>
                  </td>
                  <td>
                    <!-- DETAIL -->
                    <button class="btn btn-secondary btn-sm me-2" type="button" @click="$router.push(`/admin/tugas/detail/${tugas.id}`)">
                      <i class="bi bi-search"></i>
                    </button>
                      
                    <!-- EDIT -->
                    <!-- <button class="btn btn-warning btn-sm me-2" type="button" @click="$router.push(`/admin/tugas/edit/${tugas.id}`)">
                      <i class="bi bi-pencil"></i>
                    </button> -->

                    <!-- DELETE -->
                    <button class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="getDetailUser(tugas.id)"> 
                      <i class="bi bi-trash"></i>
                    </button>
                    <!-- modal delete -->
                    <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="deleteUserModalLabel">Delete User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <h6>Apkah ingin menghapus tugas {{ tugas_detail.judul }} ??</h6> 
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-primary"  @click="hapusTugas(tugas_detail.id)" data-bs-dismiss="modal">Hapus</button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" aria-label="Previous" @click="currentPage > 1 && handlePageChange(currentPage - 1)">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li v-for="page in metadata?.total_page" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click="handlePageChange(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === metadata?.total_page }">
                <a class="page-link" href="#" aria-label="Next" @click="currentPage < metadata?.total_page && handlePageChange(currentPage + 1)">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import SidebarAdmin from '../../../components/SidebarAdmin.vue';
import HeaderAdmin from '../../../components/HeaderAdmin.vue';
// import { ref, computed } from
import { ref,computed, onMounted, watch  } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import moment from "moment";
import "moment/locale/id";
// import { onMounted } from 'vue';

const endpoint = import.meta.env.VITE_ENDPOINT;

const tugases = ref([]);
const tugas_detail = ref({})
const perPage = ref(10);
const currentPage = ref(1);
const filter = ref({
  judul:'',
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


const getListTugas = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas/list`, {
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
    console.log(tugases.value);
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

const getDetailUser = async (id) => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    tugas_detail.value = res.data?.data;
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
    console.log(filter.value)
    const res = await axios.get(
      `${endpoint}/tugas/list`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    tugases.value = res.data?.data;
    metadata.value = res.data?.metadata;
    console.log(metadata.value);
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
    judul:'',
    tanggal_mulai:'',
    tanggal_selesai:''
  };
  currentPage.value = 1;
  await getListTugas();
};


const hapusTugas = async (id) => {
  try {
    console.log('jalann')
    const res = await axios.delete(
      `${endpoint}/tugas/delete_tugas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Menghapus Tugas', {
      autoClose: 2000,
    });
    await getListTugas();
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

// Handle page change
const handlePageChange = async (page) => {
  currentPage.value = page;
  await getListTugas();
};

onMounted(() => {
  getListTugas();
});
</script>