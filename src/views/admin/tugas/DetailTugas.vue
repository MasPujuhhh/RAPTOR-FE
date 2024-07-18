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
            <h2>
              {{ tugas.judul }} 
              <span :class="{'badge bg-success': tugas.status === 'done', 'badge bg-warning': tugas.status !== 'done'} ">
                 {{ tugas.status?.toUpperCase() }}
              </span>
            </h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>
          <!-- Form Add Tugas -->
          <div class="mb-3 row">
            <div class="col-md-8">
              <div class="mb-3 row">
                <label for="addJudul" class="form-label">Nama Tugas</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" id="addJudul" v-model="tugas.judul">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="addTag" class="form-label">Tag</label>
                <div class="col-sm-12">
                  <div v-html="show_tags"></div>
                  <Multiselect
                    v-model="tugas.tags"
                    mode="multiple"
                    :close-on-select="false"
                    :options="tags_option"
                    placeholder="Pilih Tag"
                    style="width: 100%;"
                    disabled="true"
                  ></Multiselect>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="addUser" class="form-label">User</label>
                <div class="col-sm-12">
                  <div v-html="show_user"></div>
                  <Multiselect
                    v-model="tugas.users"
                    mode="multiple"
                    :close-on-select="false"
                    :options="user_option"
                    placeholder="Pilih User"
                    style="width: 100%;"
                    track-by="id"
                    disabled="true"
                  ></Multiselect>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-6">
                  <div class="mb-3 row">
                    <label for="addCategory" class="form-label">Kategori</label>
                    <div class="col-sm-12">
                      <select id="addCategory" class="form-select" v-model="tugas.kategori">
                        <option disabled>Pilih Kategori</option>
                        <option v-for="kategori in kategori_parent_option" :key="kategori.nama" :value="kategori.nama">
                          {{ kategori.nama }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="mb-3 row">
                    <label for="addPrioritas" class="form-label">Prioritas</label>
                    <div class="col-sm-12">
                      <select id="addPrioritas" class="form-select" v-model="tugas.prioritas">
                        <option disabled>Pilih Prioritas</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                        <option value="Hold">Hold</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-6">
                  <div class="mb-3 row">
                    <label for="addTanggalMulai" class="form-label">Mulai</label>
                    <div class="col-sm-12">
                      <input type="date" class="form-control" id="addTanggalMulai" v-model="tugas.tanggal_mulai">
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="mb-3 row">
                    <label for="addTanggalSelesai" class="form-label">Selesai</label>
                    <div class="col-sm-12">
                      <input type="date" class="form-control" id="addTanggalSelesai" v-model="tugas.tanggal_selesai">
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-3">
                    <button class="btn btn-primary" @click="updateTugas(tugas.id)">Update Tugas</button>
                  </div>
                </div>
              </div>
              <br>
              <!-- sub_tugas Section -->
              <div class="row mb-3">
                <div class="col-md-12">
                  <h5>Sub Tugas</h5>
                  <div v-for="(sub, index) in tugas.sub_tugas" :key="index" class="subtask-item mb-3 d-flex flex-column">
                    <div class="d-flex w-100">
                      <div class="subtask-number">
                        <h3>{{ index + 1 }}.</h3>
                      </div>
                      <div class="subtask-details d-flex w-100">
                        <div class="form-group me-2">
                          <input type="text" id="subNamaTugas" class="form-control" v-model="sub.judul" placeholder="Judul Sub Tugas" disabled>
                        </div>
                        <div class="form-group me-2">
                          <select id="addCategory" class="form-select" v-model="sub.category_id" disabled>
                            <option disabled>Pilih Kategori</option>
                            <option v-for="kategori in kategori_children_option" :key="kategori.id" :value="kategori.id">
                              {{ kategori.deskripsi }}
                            </option>
                          </select>
                        </div>
                        <div class="form-group me-2">
                          <input type="date" class="form-control" id="addTenggat" v-model="sub.tanggal_selesai" disabled>
                        </div>
                        <div class="form-group me-2">
                          <select id="addCategory" class="form-select" v-model="sub.user_id" disabled>
                            <option disabled>Pilih User</option>
                            <option v-for="user in tugas.users" :key="user.id" :value="user.id">
                              {{ user.nama_lengkap }} ({{ user.nama_role }})
                            </option>
                          </select>
                        </div>
                        <button v-if="sub.status == ''" class="btn btn-danger" @click="hapusSubTugasFromAPI(sub.sub_tugas_id)"><i class="bi bi-trash"></i></button>
                        <button v-if="sub.status !=''" class="btn btn-success" disabled><i class="bi bi-check-circle"></i></button>
                      </div>
                    </div>
                    <div style="width: 92%; margin: 0; padding: 0;">
                      <p v-if="sub.alasan" class="text-danger mb-0">terlambat karena "{{ sub.alasan }}"</p>
                    </div>
                  </div>
                  <div v-for="(sub, index) in new_sub_tugas" :key="index" class="subtask-item mb-3">
                    <div class="subtask-number">
                      <h3>&nbsp&nbsp&nbsp</h3>
                    </div>
                    <div class="subtask-details d-flex w-100">
                      <div class="form-group me-2">
                        <input type="text" id="subNamaTugas" class="form-control" v-model="sub.judul" placeholder="Judul Sub Tugas">
                      </div>
                      <div class="form-group me-2">
                        <select id="addCategory" class="form-select" v-model="sub.category_id">
                          <option disabled>Pilih Kategori</option>
                          <option v-for="kategori in kategori_children_option" :key="kategori.id" :value="kategori.id">
                            {{ kategori.deskripsi }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group me-2">
                        <input type="date" class="form-control" id="addTenggat" v-model="sub.tanggal_selesai">
                      </div>
                      <div class="form-group me-2">
                        <select id="addCategory" class="form-select" v-model="sub.user_id">
                          <option disabled>Pilih User</option>
                          <option v-for="user in tugas.users" :key="user.id" :value="user.id">
                            {{ user.nama_lengkap }} ({{ user.nama_role }})
                          </option>
                        </select>
                      </div>
                      <button class="btn btn-danger" @click="removeSubtask(index)"><i class="bi bi-trash"></i></button>
                    </div>
                  </div>
                  <button class="btn btn-secondary" @click="addSubTugas" style="margin-right: 1%">Tambah Sub Tugas</button>
                  <button class="btn btn-primary" @click="submitSubTugas">Simpan Sub Tugas</button>
                </div>
              </div>
                <!-- <div class="row mb-3">
                  <div class="col-md-3">
                    <button class="btn btn-primary" @click="submitTugas">Simpan Sub Tugas</button>
                  </div>
                </div> -->
            </div>  
            <!-- RIGTH CONTENT -->
            <div class="col-md-4 rounded border border-1 d-flex flex-column" style="padding:1rem">
              <h5>Aktivitas</h5>
              <div class="row mb-3" style="padding-left:0.5rem;padding-right: 1rem;">
                <div class="col-md-12 px-1">
                  <div v-if="!show_history">
                    <h6 style="padding-bottom: 0; padding-top: 0.1rem; cursor: pointer" @click="show_history = !show_history"><i class="bi bi-chevron-down"></i>&nbspLihat lebih banyak</h6>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{{ (tugas.histories?.[tugas.histories.length -1])?.keterangan }}</li>
                    </ul>
                  </div>
                  <div v-else>
                    <h6 style="padding-bottom: 0; padding-top: 0.1rem; cursor: pointer" @click="show_history = !show_history"><i class="bi bi-chevron-up"></i>&nbspLihat lebih sedikit</h6>
                    <ul class="list-group list-group-flush">
                      <li  v-for="history in tugas.histories" :key="history.id" class="list-group-item">{{ history.keterangan }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row mb-3 h-100 d-flex flex-column justify-content-between">
                <div class="col-md-12" >
                  <h5>Komentar</h5>
                  <div v-if="!tugas.comments?.length">
                    <p>belum ada komentar</p>
                  </div>
                  <div style="overflow-y:auto;">
                    <div v-for="comment in tugas.comments" :key="comment.id" class="comment-item mb-3" >
                      <div class="card w-100">
                        <div class="card-body">
                          <div class="d-flex">
                            <div>
                              <img :src="`${endpoint}${comment.foto_profile}`"  class="profile-pic" alt="..." style="width: 3rem; height: 3rem; object-fit: cover; margin-right: 0.5rem; border-radius: 50%; margin-bottom:1rem">
                            </div>
                            <div class="d-flex justify-content-between w-100">
                              <div>
                              <h5 class="card-title">{{ comment.nama_lengkap }}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">{{ comment.nama_role }}</h6>
                            </div>
                            <div class="d-flex" style="width: 40%;">
                              <p style="margin-right: 5%;">{{ moment(comment.createdAt).format('L') }}, {{ moment(comment.createdAt).format('HH:mm') }}</p>
                              <i class="bi bi-trash" style="cursor:pointer;" @click="hapusComment(comment.comment_id)"></i>
                            </div>
                            </div>
                          </div>
                          <p class="card-text">{{ comment.comment }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Ketikan komentar" v-model="newCommentText">
                  <button class="btn btn-primary" type="button" @click="addComment"><i class="bi bi-send"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import SidebarAdmin from '../../../components/SidebarAdmin.vue';
import HeaderAdmin from '../../../components/HeaderAdmin.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import Multiselect from '@vueform/multiselect';
import { useRoute } from 'vue-router';
import moment from "moment";
import "moment/locale/id";

const route = useRoute();
const tugasId = ref(route.params.id);

const endpoint = import.meta.env.VITE_ENDPOINT;

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");

const tugas = ref({
  judul: '',
  kategori: '',
  prioritas: '',
  tags: [],
  users: [],
  tanggal_mulai: '',
  tanggal_selesai: '',
  sub_tugas: [],
  comments:[],
  daily_reports:[],
  histories:[]
});

const new_sub_tugas = ref([])

const kategori_parent_option = ref([]);
const kategori_children_option = ref([]);

let show_history = ref(false)


const tags_option = ref([]);
const show_tags = computed(() => {
  let html = tugas.value.tags?.map(tag => `<span class="badge me-1" style="background-color:${tag.color}; color:black; margin-bottom: 1rem;"> <i class="bi bi-tag"></i> ${tag.nama}</span>`).join('');
  return `<h4>${html}</h4>`
});


const user_option = ref([]);
const show_user = computed(() => {
  return tugas.value.users?.map(user => `
    <img src="${endpoint}${user.foto_profile}"  class="profile-pic" alt="..." style="width: 5rem; height: 5rem; object-fit: cover; margin-top: 20px; border-radius: 50%; margin-bottom:1rem" alt="Avatar" title="${user.nama_lengkap}">
  `).join('');
});

const getTags = async () => {
  try {
    const res = await axios.get(`${endpoint}/tugas_tag/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    
    const data = res.data?.data;
    for (let i = 0; i < data.length; i++) {
      data[i].value = { id: data[i].id, nama: data[i].nama, color: data[i].color };
      data[i].label = data[i].nama;
    }
    tags_option.value = res.data?.data;
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const getUser = async () => {
  try {
    const res = await axios.get(`${endpoint}/user/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const data = res.data?.data;

    for (let i = 0; i < data.length; i++) {
      data[i].value = { id: data[i].id, nama_lengkap: data[i].nama_lengkap, foto_profile: data[i].foto_profile, nama_role: data[i].nama_role };
      data[i].label = `${data[i].nama_lengkap} (${data[i].nama_role})`;
    }

    user_option.value = res.data?.data;
    console.log(user_option);
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const getKategoriParent = async () => {
  try {
    const res = await axios.get(`${endpoint}/tugas_category/all-name`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    kategori_parent_option.value = res.data?.data;
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const getKategoriChildren = async (kategori) => {
  try {
    const res = await axios.get(`${endpoint}/tugas_category/all-by-name?nama=${kategori}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    kategori_children_option.value = res.data?.data;
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const newCommentText = ref('');

const updateTugas = async (id) => {
  try {
    const res = await axios.put(`${endpoint}/tugas/edit/${id}`, tugas.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    await getDetailTugas()
    toast.success('Berhasil Update Tugas', {
      autoClose: 2000,
    });
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};


const addComment = async () => {
  try {
    let payload = {
      tugas_id:tugas.value.id,
      comment:newCommentText.value
    }

    const res = await axios.post(`${endpoint}/comment/add`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    await getDetailTugas()
    newCommentText.value = ''
    toast.success('Berhasil Menambahkan Komentar', {
      autoClose: 2000,
    });
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const hapusComment = async (id) => {
  try {
    console.log(id)
    const res = await axios.delete(`${endpoint}/comment/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    await getDetailTugas()
    newCommentText.value = ''
    toast.success('Berhasil Menghapus Komentar', {
      autoClose: 2000,
    });
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};


const getDetailTugas = async () => {
  try {
    console.log(tugasId)
    const res = await axios.get(`${endpoint}/tugas/detail/${tugasId.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    tugas.value = res.data?.data;
    console.log(res);
    await getKategoriChildren(tugas.value.kategori);
    getTags()
    getUser()
  } catch (error) {
    console.log(error)
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const hapusSubTugasFromAPI = async (id) => {
  try {
    console.log(id)
    const res = await axios.delete(`${endpoint}/sub_tugas/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    await getDetailTugas()
  } catch (error) {
    console.log(error)
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};



const addSubTugas = async () => {
  new_sub_tugas.value.push({ judul: '', category_id: '', tanggal_selesai: '', user_id: '' });
  await getKategoriChildren(tugas.value.kategori);
  console.log(kategori_children_option);
};

const removeSubtask = (index) => {
  new_sub_tugas.value.splice(index, 1);
};

const submitSubTugas = async () => {
  let payload = {
    tugas_id : tugas.value.id,
    sub_tugas : new_sub_tugas.value 
  }
  try {
    const res = await axios.post(`${endpoint}/sub_tugas/add`,payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    toast.success('Berhasil Menambahkan Sub Tugas', {
      autoClose: 2000,
    });
    new_sub_tugas.value = []
    getDetailTugas();
  } catch (error) {
    console.log(error);
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

onMounted(() => {
  getKategoriParent();
  getDetailTugas();
  getTags();
  getUser();
});

watch(tugas.value, (newVal) => {
  if (newVal.kategori) {
    getKategoriChildren(newVal.kategori);
  }
}, { deep: true });

</script>

<style scoped>
.avatar-img {
  width: 10px; /* Sesuaikan ukuran foto profil */
  height: 10px; /* Sesuaikan ukuran foto profil */
  border-radius: 50%; /* Membuat foto profil menjadi bulat */
  margin-right: 8px;
}

.avatar-img:hover {
  cursor: pointer;
}

/* Gaya tooltip */
.avatar-img::before {
  content: attr(title);
  position: absolute;
  bottom: -20px; /* Sesuaikan posisi tooltip */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0; /* Mulai dengan tidak terlihat */
  pointer-events: none; /* Agar tooltip tidak mengganggu klik */
  transition: opacity 0.3s ease;
}

.avatar-img:hover::before {
  opacity: 1; /* Tampilkan tooltip saat dihover */
}

.subtask-item {
  display: flex;
  align-items: center;
}

.subtask-number {
  margin-right: 1rem;
}

.subtask-details {
  flex-grow: 1;
}

.form-group {
  flex: 1;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>
