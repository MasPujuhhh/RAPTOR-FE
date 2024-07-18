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
              <!-- <div class="mb-3 row">
                <label for="addJudul" class="form-label">Nama Tugas</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" id="addJudul" v-model="tugas.judul">
                </div>
              </div> -->
              <div class="mb-3 row">
                <label for="addTag" class="form-label">Tag</label>
                <div class="col-sm-12">
                  <div v-html="show_tags"></div>
                  <!-- <Multiselect
                    v-model="tugas.tags"
                    mode="multiple"
                    :close-on-select="false"
                    :options="tags_option"
                    placeholder="Pilih Tag"
                    style="width: 100%;"
                    disabled="true"
                  ></Multiselect> -->
                </div>
              </div>
              <div class="mb-3 row">
                <label for="addUser" class="form-label">User</label>
                <div class="col-sm-12">
                  <div v-html="show_user"></div>
                  <!-- <Multiselect
                    v-model="tugas.users"
                    mode="multiple"
                    :close-on-select="false"
                    :options="user_option"
                    placeholder="Pilih User"
                    style="width: 100%;"
                    track-by="id"
                    disabled="true"
                  ></Multiselect> -->
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-6">
                  <div class="mb-3 row">
                    <label for="addCategory" class="form-label">Kategori</label>
                    <h4 for="addTanggalMulai" class="form-label">{{ tugas.kategori }}</h4>
                    <!-- <div class="col-sm-12">
                      <select id="addCategory" class="form-select" v-model="tugas.kategori">
                        <option disabled>Pilih Kategori</option>
                        <option v-for="kategori in kategori_parent_option" :key="kategori.nama" :value="kategori.nama">
                          {{ kategori.nama }}
                        </option>
                      </select>
                    </div> -->
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="mb-3 row">
                    <label for="addPrioritas" class="form-label">Prioritas</label>
                    <h4 for="addTanggalMulai" class="form-label">{{ tugas.prioritas}}</h4>
                    <!-- <div class="col-sm-12">
                      <select id="addPrioritas" class="form-select" v-model="tugas.prioritas">
                        <option disabled>Pilih Prioritas</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                        <option value="Hold">Hold</option>
                      </select>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-6">
                  <div class="mb-3 row">
                    <label for="addTanggalMulai" class="form-label">Mulai</label>
                    <h4 for="addTanggalMulai" class="form-label">{{ moment(tugas.tanggal_mulai).format('LL') }}</h4>
                    <!-- <div class="col-sm-12">
                      <input type="date" class="form-control" id="addTanggalMulai" v-model="tugas.tanggal_mulai">
                    </div> -->
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="mb-3 row">
                    <label for="addTanggalSelesai" class="form-label">Selesai</label>
                    <h4 for="addTanggalMulai" class="form-label">{{ moment(tugas.tanggal_selesai).format('LL') }}</h4>
                    <!-- <div class="col-sm-12">
                      <input type="date" class="form-control" id="addTanggalSelesai" v-model="tugas.tanggal_selesai">
                    </div> -->
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-3">
                    <!-- <button class="btn btn-primary" @click="updateTugas(tugas.id)">Update Tugas</button> -->
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
                        <h3 class="me-3">{{ index + 1 }}</h3>
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
                        <i v-if="sub.is_done" class="bi bi-check-circle align-item-center"></i>
                        <!-- <div v-if="sub.is_done" class="btn btn-success rounded-circle" style="height: 50%; width: 1%;" disabeled></div> -->
                        
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
                      <!-- <button class="btn btn-danger" @click="removeSubtask(index)"><i class="bi bi-trash"></i></button> -->
                    </div>
                  </div>
                  <!-- <button class="btn btn-secondary" @click="addSubTugas" style="margin-right: 1%">Tambah Sub Tugas</button>
                  <button class="btn btn-primary" @click="submitSubTugas">Simpan Sub Tugas</button> -->
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
  </main>
</template>

<script setup>
  import Navbar from "@/components/Navbar.vue";
  import { onMounted, ref, watch, computed } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter, useRoute } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  import moment from "moment";
  import "moment/locale/id";
  import Multiselect from '@vueform/multiselect';

  const store = useCounterStore();
  const { data_user } = storeToRefs(store);

  const router = useRouter();
  const route = useRoute();
  let absens = ref({});
  let foto_absen = ref();
  let token = localStorage.getItem("token");
  let idUser = localStorage.getItem("idUser");

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

  const new_sub_tugas = ref([])

  const kategori_parent_option = ref([]);
  const kategori_children_option = ref([]);
  const newCommentText = ref('');

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

  const endpoint = import.meta.env.VITE_ENDPOINT;

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

  const renderDetailtugas = async () => {
  try {
    const res = await axios.get(`${endpoint}/tugas/detail/${route.params.id}`, {
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

const hapusComment = async (id) => {
  try {
    console.log(id)
    const res = await axios.delete(`${endpoint}/comment/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    renderDetailtugas()
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
    renderDetailtugas()
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


  onMounted(() => {
    renderDetailtugas()
    getKategoriParent()
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
