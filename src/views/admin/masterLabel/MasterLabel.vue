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
            <h2>Label</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>

          <!-- Filter Row -->
          <div class="row mb-3">
            <!-- Button trigger modal -->   
            <div class="col-md-2">
              <label for="filterNamaLabel" class="form-label">Nama Label</label>
              <input type="text" class="form-control" id="filterNamaLabel" v-model="filter.nama" placeholder="Nama Label">
            </div>
            <div class="col-md-1">
              <label for="getFilter" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" id="getFilter" type="button" @click="getFilterLabel"><i class="bi bi-search"></i></button>
              </div>
            </div>
            <div class="col-md-1">
              <label for="deleteFilter" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-danger" id="deleteFilter" type="button" @click="resetFilters"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>

          <!-- Add User Button -->
          <div class="row mb-3 justify-content-end">
            <div class="col-md-2">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">+ Label</button>
              <!-- Modal -->
              <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addUserModalLabel">Tambah Label</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="addLabel">
                        <div class="mb-3">
                          <label for="nama" class="form-label">Label</label>
                          <input type="text" class="form-control" id="nama" v-model="new_label.nama" required>
                        </div>
                        <div class="mb-3">
                          <label for="myColor" class="form-label">Warna</label>
                          <input type="color" class="form-control form-control-color" id="myColor" v-model="new_label.color" title="Choose a color">
                        </div>
                        <br>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

    
          <!-- User List Table -->
          <div class="table-responsive" style="width: 95%;">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Label</th>
                  <th>Warna</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(label, index) in labels" :key="label.id">
                  <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                  <td>{{ label.nama }}</td>
                  <td>
                    <div :style="{backgroundColor: label.color}" class="color-box">{{ label.color }}</div>
                  </td>
                  <td>
                      <!-- DETAIL -->
                      <button class="btn btn-secondary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#detailUserModal" @click="getDetailLabel(label.id)">
                        <i class="bi bi-search"></i>
                      </button>
                      <!-- modal detail -->
                      <div class="modal fade" id="detailUserModal" tabindex="-1" aria-labelledby="detailUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="detailUserModalLabel">Detail Label</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="addLabel">
                              <div class="mb-3">
                                <label for="nama" class="form-label">Label</label>
                                <input type="text" class="form-control" id="nama" v-model="label_detail.nama" required disabled>
                              </div>
                              <div class="mb-3">
                                <label for="color" class="form-label">Warna</label>
                                <input type="text" class="form-control" id="color" v-model="label_detail.color" required disabled>
                              </div>
                              <br>
                              <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                      

                    <!-- EDIT -->
                    <button class="btn btn-warning btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#editLabelModal" @click="getDetailLabel(label.id)">
                          <i class="bi bi-pencil"></i>
                    </button>
                    <!-- modal edit -->
                    <div class="modal fade" id="editLabelModal" tabindex="-1" aria-labelledby="editLabelModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="editLabelModalLabel">Edit Label</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="editLabel(label_detail.id)">
                              <div class="mb-3">
                                <label for="nama" class="form-label">Label</label>
                                <input type="text" class="form-control" id="nama" v-model="label_detail.nama" required>
                              </div>
                              <div class="mb-3">
                                <label for="color" class="form-label">Warna</label>
                                <input type="text" class="form-control" id="color" v-model="label_detail.color" required>
                              </div>
                              <br>
                              <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                              <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- DELETE -->
                    <button class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="getDetailLabel(label.id)"> 
                      <i class="bi bi-trash"></i>
                    </button>
                    <!-- modal delete -->
                    <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="deleteUserModalLabel">Hapus Label</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <h6>Apkah ingin menghapus Label {{ label_detail.nama }} ??</h6> 
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-primary"  @click="hapusLabel(label_detail.id)" data-bs-dismiss="modal">Hapus</button>
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
// import { onMounted } from 'vue';

const endpoint = import.meta.env.VITE_ENDPOINT;

const labels = ref([]);
const label_detail = ref({})
const perPage = ref(10);
const currentPage = ref(1);
const filter = ref({
  nama: ''
});
const metadata = ref();

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");

const showModal = ref(false);
const new_label = ref({
  nama:'',
  color:'#FFFFFF'
});

const getListLabel = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/report_label/list`, {
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
    labels.value = res.data?.data;
    metadata.value = res.data?.metadata;
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

const getDetailLabel = async (id) => {
  try {
    const res = await axios.get(
      `${endpoint}/report_label/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    label_detail.value = res.data?.data;
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


const getFilterLabel = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/report_label/list`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    labels.value = res.data?.data;
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
    nama: '',
  };
  currentPage.value = 1;
  await getListLabel();
};

const addLabel = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/report_label/add`, new_label.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    showModal.value = false;
    await getListLabel();
    toast.success('Berhasil Menambahkan Label', {
      autoClose: 2000,
    });
    new_label.value = {}
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

const editLabel = async (id) => {
  try {
    const res = await axios.put(
      `${endpoint}/report_label/edit/${id}`, label_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Mengupdate Label', {
      autoClose: 2000,
    });
    await getListLabel();
    await getDetailLabel(id);
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const hapusLabel = async (id) => {
  try {
    console.log('jalann')
    const res = await axios.delete(
      `${endpoint}/report_label/delete/${id}`, label_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Menghapus Label', {
      autoClose: 2000,
    });
    await getListLabel();
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
  await getListLabel();
};

onMounted(() => {
  getListLabel();
});
</script>

<style>
.color-box {
  width: 8rem; /* Ubah ukuran sesuai kebutuhan */
  height: 2rem; /* Ubah ukuran sesuai kebutuhan */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black; /* Outline tipis */
  text-align: center;
  box-sizing: border-box; /* Pastikan padding dan border termasuk dalam ukuran total */
}
</style>