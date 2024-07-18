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
            <h2>Tambah Tugas</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>
          <!-- Form Add Tugas -->
          <div class="mb-3 row">
            <div class="col-md-10">
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
              </div>
              <br>
              <!-- sub_tugas Section -->
              <div class="row mb-3">
                <div class="col-md-12">
                  <h5>Sub Tugas</h5>
                  <div v-for="(sub, index) in tugas.sub_tugas" :key="index" class="subtask-item mb-3">
                    <!-- <div class="subtask-number">
                      <h3>{{ index + 1 }}.</h3>
                    </div> -->
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
                            {{ user.nama_lengkap }} ({{ user.nama }})
                          </option>
                        </select>
                      </div>
                      <button class="btn btn-danger" @click="removeSubtask(index)"><i class="bi bi-trash"></i></button>
                    </div>
                  </div>
                  <button class="btn btn-secondary" @click="addSubtask">Tambah Sub Tugas</button>
                </div>
              </div>
                <div class="row mb-3">
                  <div class="col-md-2">
                    <button type="button" class="btn btn-primary" @click="submitTugas">Submit</button>
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
import { routerKey, useRouter } from "vue-router";

const router = useRouter();

const endpoint = import.meta.env.VITE_ENDPOINT;

const tugas = ref({
  judul: '',
  kategori: '',
  prioritas: '',
  tags: [],
  users: [],
  tanggal_mulai: '',
  tanggal_selesai: '',
  sub_tugas: []
});

const kategori_parent_option = ref([]);
const kategori_children_option = ref([]);


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

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");


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
    console.log(tags_option);
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

const getRole = async () => {
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

const getUser = async () => {
  try {
    const res = await axios.get(`${endpoint}/user/all_by_division`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    const data = res.data?.data;

    for (let i = 0; i < data.length; i++) {
      data[i].value = { id: data[i].id, nama_lengkap: data[i].nama_lengkap, foto_profile: data[i].foto_profile, nama: data[i].nama };
      data[i].label = `${data[i].nama_lengkap} (${data[i].nama})`;
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

const addSubtask = async () => {
  tugas.value.sub_tugas.push({ judul: '', category_id: '', tanggal_selesai: '', user_id: '' });
  await getKategoriChildren(tugas.value.kategori);
  console.log(kategori_children_option);
};

const removeSubtask = (index) => {
  tugas.value.sub_tugas.splice(index, 1);
};

const submitTugas = async () => {
  tugas.value.tags = tugas.value.tags.map(item => item.id);
  tugas.value.users = tugas.value.users.map(item => item.id);

  console.log(tugas.value);
  try {
    const res = await axios.post(`${endpoint}/tugas/add`, tugas.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    toast.success('Berhasil Menambahkan Tugas', {
      autoClose: 2000,
    });
    setTimeout(() => {
      router.push({ path: "/admin/tugas" });
    }, 1500);
    // Reset form after submission
    tugas.value = {
      judul: '',
      kategori: '',
      prioritas: '',
      tags: [],
      users: [],
      tanggal_mulai: '',
      tanggal_selesai: '',
      sub_tugas: []
    };
    
    toast.success(pesan, { autoClose: 2000 });
        setTimeout(() => {
          busy.value = !busy.value;
          router.push({ path: "/master/produk" });
        }, 1000);
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
