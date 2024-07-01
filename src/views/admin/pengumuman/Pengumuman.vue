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
            <h2>Pengumuman</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>

          <!-- Filter Row -->
          <div class="row mb-3">
            <!-- Button trigger modal -->   
            <div class="col-md-2">
              <label for="filterNamaTag" class="form-label">Judul</label>
              <input type="text" class="form-control" id="filterNamaTag" v-model="filter.judul" placeholder="Judul Pengumuman">
            </div>
            <div class="col-md-1">
              <label for="getFilter" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" id="getFilter" type="button" @click="getFilterpengumuman"><i class="bi bi-search"></i></button>
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
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">+ Pengumuman</button>
              <!-- Modal -->
              <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addUserModalLabel">Tambah Pengumuman</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="addpengumuman">
                        <div class="mb-3">
                          <label for="fileInput" class="form-label">Pilih File</label>
                          <input type="file" class="form-control" id="fileInput" @change="handleFileUpload" multiple>
                        </div>
                        <div class="mb-3">
                          <label for="nama" class="form-label">Judul</label>
                          <input type="text" class="form-control" id="judul" v-model="new_pengumuman.judul" required>
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlTextarea1" class="form-label">Deskripsi</label>
                          <textarea class="form-control" id="exampleFormControlTextarea1" @keydown.enter.prevent="handleEnterKey" rows="6" v-model="new_pengumuman.deskripsi" required></textarea>
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
                  <th>Judul</th>
                  <th>Deskripsi</th> 
                  <th>Dibuat Oleh</th> 
                  <th>Dibuat Pada</th> 
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tag, index) in pengumuman" :key="tag.id">
                  <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                  <td style="max-width: 8rem;">{{ tag.judul }}</td>
                  <td  style="max-width: 20rem;"> {{ truncateDescription(tag.deskripsi, 300) }}</td>
                  <td>{{ tag.created_by   }}</td>
                  <td>{{ moment(tag.createdAt).format('LL') }}</td>
                  
                  <td>
                      <!-- DETAIL -->
                      <button class="btn btn-secondary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#detailUserModal" @click="getDetailpengumuman(tag.id)">
                        <i class="bi bi-search"></i>
                      </button>
                      <!-- modal detail -->
                      <div class="modal fade" id="detailUserModal" tabindex="-1" aria-tagledby="detailUserModaltag" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="addUserModalLabel">{{ pengumuman_detail.judul }}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="addpengumuman">
                              <div v-if="pengumuman_detail.files?.length" class="mb-3">
                                <label for="fileInput" class="form-label">File Tambahan</label>
                                <div v-for="file in pengumuman_detail.files" :key="file.id">
                                  <a :href="`${endpoint}${file.file}`" target="_blank" rel="noopener noreferrer">{{ file.file.split('XXX')[1] }}</a>
                                </div>
                              </div>
                              <div class="mb-3">
                                <hr>
                                <p v-for="line in pengumuman_detail.deskripsi?.split('\n')">{{ line }}</p>
                              </div>
                              <br>
                              <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
                               <p>{{ pengumuman_detail.created_by }}, {{ moment(pengumuman_detail.createdAt).format('LL') }}</p>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- DELETE -->
                    <button class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="getDetailpengumuman(tag.id)"> 
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
                            <h6>Apkah ingin menghapus pengumuman {{ pengumuman_detail.judul }} ??</h6> 
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-primary"  @click="hapuspengumuman(pengumuman_detail.id)" data-bs-dismiss="modal">Hapus</button>
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
import moment from "moment";
import "moment/locale/id";

const endpoint = import.meta.env.VITE_ENDPOINT;

const pengumuman = ref([]);
const pengumuman_detail = ref({})
const perPage = ref(10);
const currentPage = ref(1);
const filter = ref({
  nama: '',
});
const metadata = ref();

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");

const showModal = ref(false);

const new_pengumuman = ref({
  judul: '',
  deskripsi: '',
  files: []
});

const handleEnterKey = (event) => {
  const textarea = event.target;
  const value = textarea.value;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  // Sisipkan karakter newline di posisi kursor
  textarea.value = value.substring(0, start) + '\n' + value.substring(end);

  // Pindahkan kursor ke posisi yang benar
  textarea.selectionStart = textarea.selectionEnd = start + 1;

  // Perbarui nilai v-model
  new_pengumuman.value.deskripsi = textarea.value;

  // Cegah perilaku default (yang akan mengirimkan form)
  event.preventDefault();
};


const handleFileUpload = (event) => {
  new_pengumuman.value.files = event.target.files
};

const getListPengumuman = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/pengumuman/list`, {
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
    pengumuman.value = res.data?.data;
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

const truncateDescription = (description, limit) => {
  if (description.length <= limit) return description;
  return description.substring(0, limit) + '...';
};

const getDetailpengumuman = async (id) => {
  try {
    const res = await axios.get(
      `${endpoint}/pengumuman/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    pengumuman_detail.value = res.data?.data;
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


const getFilterpengumuman = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/pengumuman/list`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    pengumuman.value = res.data?.data;
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
  await getListPengumuman();
};

const addpengumuman = async () => {
  try {
    const formData = new FormData();
    formData.append("judul", new_pengumuman.value.judul);
    formData.append("deskripsi", new_pengumuman.value.deskripsi);

    for (let i = 0; i < new_pengumuman.value.files.length; i++) {
      formData.append("files", new_pengumuman.value.files[i]);
    }

    console.log(new_pengumuman.value.files);
    console.log(...formData);

    const res = await axios.post(
      `${endpoint}/pengumuman/add`, 
      formData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Ensure this is set
        },
      }
    );

    showModal.value = false;
    await getListPengumuman();
    toast.success('Berhasil Menambahkan Pengumuman', {
      autoClose: 2000,
    });
   new_pengumuman.value = {
      judul: '',
      deskripsi: '',
      files: []
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

const editpengumuman = async (id) => {
  try {
    const res = await axios.put(
      `${endpoint}/pengumuman/edit/${id}`, pengumuman_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Mengupdate Tag', {
      autoClose: 2000,
    });
    await getListPengumuman();
    await getDetailpengumuman(id);
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const hapuspengumuman = async (id) => {
  try {
    console.log('jalann')
    const res = await axios.delete(
      `${endpoint}/pengumuman/delete/${id}`, pengumuman_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Menghapus Pengumuman', {
      autoClose: 2000,
    });
    await getListPengumuman();
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
  await getListPengumuman();
};

onMounted(() => {
  getListPengumuman();
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