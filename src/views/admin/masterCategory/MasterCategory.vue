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
            <h2>Kategori</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>


          <div class="row mb-3">
            <!-- Button trigger modal -->   
            <div class="col-md-2">
              <label for="kategori" class="form-label">Kategori</label>
              <select id="kategori" class="form-select" v-model="filter.nama">
                <option value="" selected disabled>Select Kategori</option>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="SOSMED">SOSMED</option>|
              </select>
            </div>
            <div class="col-md-1">
              <label for="getFilter" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" id="getFilter" type="button" @click="getListFilteredCategory"><i class="bi bi-search"></i></button>
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
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">+ Kategori</button>
              <!-- Modal -->
              <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addUserModalLabel">Tambah Kategori</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="submitUser">
                        <div class="mb-3">
                          <label for="kategori" class="form-label">Kategori</label>
                          <select class="form-select" id="kategori" v-model="new_category.nama" required>
                            <option value="" selected disabled>Select Kategori</option>
                            <option value="DEVELOPER">DEVELOPER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="SOSMED">SOSMED</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="deskripsi" class="form-label">Deskripsi</label>
                          <input type="text" class="form-control" id="deskripsi" v-model="new_category.deskripsi" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Tambah</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

    
          <!-- List Table -->
          <div class="table-responsive" style="width: 95%;">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Kategori</th>
                  <th>Deskripsi</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(category, index) in categories" :key="category.id">
                  <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                  <td>{{ category.nama }}</td>
                  <td>{{ category.deskripsi }}</td>
                  <td>
                      <!-- DETAIL -->
                      <button class="btn btn-secondary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#detailUserModal" @click="getCategoryDetail(category.id)">
                        <i class="bi bi-search"></i>
                      </button>
                      <!-- modal detail -->
                      <div class="modal fade" id="detailUserModal" tabindex="-1" aria-labelledby="detailUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="detailUserModalLabel">Detail Kategori</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="submitUser">
                              <div class="mb-3">
                                <label for="kategori" class="form-label">Kategori</label>
                                <select class="form-select" id="kategori" v-model="category_detail.nama" required disabled>
                                  <option value="" selected disabled>Select Kategori</option>
                                  <option value="DEVELOPER">DEVELOPER</option>
                                  <option value="ADMIN">ADMIN</option>
                                  <option value="SOSMED">SOSMED</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label for="deskripsi" class="form-label">Deskripsi</label>
                                <input type="text" class="form-control" id="deskripsi" v-model="category_detail.deskripsi" required disabled>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                      

                    <!-- EDIT -->
                    <button class="btn btn-warning btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#editUserModal" @click="getCategoryDetail(category.id)">
                          <i class="bi bi-pencil"></i>
                    </button>
                    <!-- modal edit -->
                    <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="editUserModalLabel">Edit Kategori</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="editCategory(category.id)">
                              <div class="mb-3">
                                <label for="kategori" class="form-label">Kategori</label>
                                <select class="form-select" id="kategori" v-model="category_detail.nama" required>
                                  <option value="" selected disabled>Select Kategori</option>
                                  <option value="DEVELOPER">DEVELOPER</option>
                                  <option value="ADMIN">ADMIN</option>
                                  <option value="SOSMED">SOSMED</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label for="deskripsi" class="form-label">Deskripsi</label>
                                <input type="text" class="form-control" id="deskripsi" v-model="category_detail.deskripsi" required>
                              </div>
                              <button type="submit" class="btn btn-primary">Edit</button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- DELETE -->
                    <button class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="getCategoryDetail(category.id)"> 
                      <i class="bi bi-trash"></i>
                    </button>
                    <!-- modal delete -->
                    <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="deleteUserModalLabel">Hapus Kategori</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <h6>Apkah ingin menghapus kategori {{ category_detail.nama }} deskripsi {{ category_detail.deskripsi }}  ??</h6> 
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-primary"  @click="hapusCategory(category_detail.id)" data-bs-dismiss="modal">Hapus</button>
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

const categories = ref([]);
const filter = ref({
  nama: ''
})

const category_detail = ref({})
const perPage = ref(10);
const currentPage = ref(1);
const metadata = ref();
const new_category = ref({})

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");


const getListCategories = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas_category/list`, {
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
    categories.value = res.data?.data;
    metadata.value = res.data?.metadata;
    console.log(categories.value);
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

const getCategoryDetail = async (id) => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas_category/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    category_detail.value = res.data?.data;
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


const getListFilteredCategory = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas_category/list`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    categories.value = res.data?.data;
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
  filter.value = {
    nama:''
  };
  currentPage.value = 1;
  await getListCategories();
};

const submitUser = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/tugas_category/add`, new_category.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    await getListCategories();
    toast.success('Berhasil Menambahkan Kategori', {
      autoClose: 2000,
    });
    new_category.value = {}
  } catch (error) {
    console.log(error)
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};

const editCategory = async (id) => {
  try {
    const res = await axios.put(
      `${endpoint}/tugas_category/edit/${id}`, category_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Mengupdate Kategori', {
      autoClose: 2000,
    });
    await getListCategories();
    await getCategoryDetail(id);
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const hapusCategory = async (id) => {
  try {
    const res = await axios.delete(
      `${endpoint}/tugas_category/delete/${id}`, category_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Menghapus Kategori', {
      autoClose: 2000,
    });
    await getListCategories();
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
  await getListCategories();
};

onMounted(() => {
  getListCategories();
});
</script>