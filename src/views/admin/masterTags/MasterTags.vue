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
            <h2>Tag</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>

          <!-- Filter Row -->
          <div class="row mb-3">
            <!-- Button trigger modal -->   
            <div class="col-md-2">
              <label for="filterNamaTag" class="form-label">Nama Tag</label>
              <input type="text" class="form-control" id="filterNamaTag" v-model="filter.nama" placeholder="Nama Tag">
            </div>
            <div class="col-md-1">
              <label for="getFilter" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" id="getFilter" type="button" @click="getFilterTags"><i class="bi bi-search"></i></button>
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
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">+ Tag</button>
              <!-- Modal -->
              <div class="modal fade" id="addUserModal" tabindex="-1" aria-tagledby="addUserModaltag" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addUserModaltag">Tambah Tag</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-tag="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="addTags">
                        <div class="mb-3">
                          <tag for="nama" class="form-tag">Tag</tag>
                          <input type="text" class="form-control" id="nama" v-model="new_tag.nama" required>
                        </div>
                        <div class="mb-3">
                          <label for="myColor" class="form-label">Warna</label>
                          <input type="color" class="form-control form-control-color" id="myColor" v-model="new_tag.color" title="Choose a color">
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
                  <th>Tag</th>
                  <th>Warna</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tag, index) in tags" :key="tag.id">
                  <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                  <td>{{ tag.nama }}</td>
                  <td>
                    <div :style="{backgroundColor: tag.color}" class="color-box">{{ tag.color }}</div>
                  </td>
                  <td>
                      <!-- DETAIL -->
                      <button class="btn btn-secondary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#detailUserModal" @click="getDetailTags(tag.id)">
                        <i class="bi bi-search"></i>
                      </button>
                      <!-- modal detail -->
                      <div class="modal fade" id="detailUserModal" tabindex="-1" aria-tagledby="detailUserModaltag" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="detailUserModaltag">Detail Tag</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-tag="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="addTags">
                              <div class="mb-3">
                                <tag for="nama" class="form-tag">Tag</tag>
                                <input type="text" class="form-control" id="nama" v-model="tag_detail.nama" required disabled>
                              </div>
                              <div class="mb-3">
                                <label for="myColor" class="form-label">Warna</label>
                                <input type="color" class="form-control form-control-color" id="myColor" v-model="tag_detail.color" title="Choose a color" disabled>
                              </div>
                              <br>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                      

                    <!-- EDIT -->
                    <button class="btn btn-warning btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#editTagsModal" @click="getDetailTags(tag.id)">
                          <i class="bi bi-pencil"></i>
                    </button>
                    <!-- modal edit -->
                    <div class="modal fade" id="editTagsModal" tabindex="-1" aria-tagledby="editTagsModaltag" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="editTagsModaltag">Edit Tag</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-tag="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="editTags(tag_detail.id)">
                              <div class="mb-3">
                                <tag for="nama" class="form-tag">Tag</tag>
                                <input type="text" class="form-control" id="nama" v-model="tag_detail.nama" required>
                              </div>
                              <div class="mb-3">
                                <label for="myColor" class="form-label">Warna</label>
                                <input type="color" class="form-control form-control-color" id="myColor" v-model="tag_detail.color" title="Choose a color">
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
                    <button class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="getDetailTags(tag.id)"> 
                      <i class="bi bi-trash"></i>
                    </button>
                    <!-- modal delete -->
                    <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-tagledby="deleteUserModaltag" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="deleteUserModaltag">Hapus Tag</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-tag="Close"></button>
                          </div>
                          <div class="modal-body">
                            <h6>Apkah ingin menghapus tag {{ tag_detail.nama }} ??</h6> 
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-primary"  @click="hapusTags(tag_detail.id)" data-bs-dismiss="modal">Hapus</button>
                          </div>
                        </div>
                      </div>
                    </div>


                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-tag="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" aria-tag="Previous" @click="currentPage > 1 && handlePageChange(currentPage - 1)">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li v-for="page in metadata?.total_page" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click="handlePageChange(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === metadata?.total_page }">
                <a class="page-link" href="#" aria-tag="Next" @click="currentPage < metadata?.total_page && handlePageChange(currentPage + 1)">
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

const tags = ref([]);
const tag_detail = ref({})
const perPage = ref(10);
const currentPage = ref(1);
const filter = ref({
  nama: '',
});
const metadata = ref();

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");

const showModal = ref(false);
const new_tag = ref({
  nama: '',
  color: '#FFFFFF'
});

const getListTags = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas_tag/list`, {
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
    tags.value = res.data?.data;
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

const getDetailTags = async (id) => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas_tag/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    tag_detail.value = res.data?.data;
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


const getFilterTags = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas_tag/list`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    tags.value = res.data?.data;
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
  await getListTags();
};

const addTags = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/tugas_tag/add`, new_tag.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    showModal.value = false;
    await getListTags();
    toast.success('Berhasil Menambahkan Tag', {
      autoClose: 2000,
    });
    new_tag.value = {}
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

const editTags = async (id) => {
  try {
    const res = await axios.put(
      `${endpoint}/tugas_tag/edit/${id}`, tag_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Mengupdate Tag', {
      autoClose: 2000,
    });
    await getListTags();
    await getDetailTags(id);
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const hapusTags = async (id) => {
  try {
    console.log('jalann')
    const res = await axios.delete(
      `${endpoint}/tugas_tag/delete/${id}`, tag_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Menghapus Tag', {
      autoClose: 2000,
    });
    await getListTags();
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
  await getListTags();
};

onMounted(() => {
  getListTags();
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