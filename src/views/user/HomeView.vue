<script setup>
import Navbar from "../../components/Navbar.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import axios from "axios";
import moment from "moment";
import { ref, onMounted, watch } from "vue";
import "moment/locale/id";
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const date = ref(new Date());
const show = ref(false);
const showtask = ref(false);
const editTask = ref(null);
const tugas = ref([]);
const tugas_id = ref();
const tugas_detail = ref();
const sub_tugas = ref(); 
const daily_report = ref([]);
const new_report = ref({ deskripsi: "", tugas_id: "", label_id: "" });
const labels = ref([]);
const absensi = ref({})

const endpoint = import.meta.env.VITE_ENDPOINT;
let token = localStorage.getItem("token");

const renderAbsen = async (jadwal = null) => {
  try {
    if (!jadwal) {
      jadwal = new Date();
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    jadwal = jadwal.toLocaleDateString('id-ID', options).split('/').reverse().join('-');
    const res = await axios.get(`${endpoint}/absensi/detail_by_date`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params:{jadwal}
    });
    const data = res.data?.data;
    console.log('absen',data)
    
    if (!data?.foto_absen || !data?.keterangan) {
      absensi.value.keterangan = 'belum-absen'
    }
    if (data?.foto_absen && data?.keterangan) {
      absensi.value.keterangan = 'sudah-absen'
    }
    if (data == null) {
      absensi.value.keterangan = 'belum-tersedia'
    }

    console.log(absensi.value)

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

const renderTugas = async () => {
  try {
    const res = await axios.get(`${endpoint}/tugas/all_by_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.data.data.length == 0) {
      console.log('jalannnnnnn')
      tugas.value.push({
        judul:"standby"
      })
    } else {
      tugas.value = res.data.data;
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

const renderDetailTugas = async (tugas_id) => {
  try {
    const res = await axios.get(`${endpoint}/tugas/detail/${tugas_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.data);
    tugas_detail.value = res.data.data;
    sub_tugas.value = res.data.data.sub_tugas;
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

const renderDailyReport = async (jadwal) => {
  try {
    if (!jadwal) {
      jadwal = new Date();
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    jadwal = jadwal.toLocaleDateString('id-ID', options).split('/').reverse().join('-');
    const res = await axios.get(`${endpoint}/daily/all_by_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: { jadwal }
    });
    console.log(res);
    daily_report.value = res.data.data;
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

const addDailyReport = async () => {
  try {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    date.value = date.value.toLocaleDateString('id-ID', options).split('/').reverse().join('-');
    new_report.value.jadwal = date.value
    console.log(new_report.value)
    const res = await axios.post(`${endpoint}/daily/add`, new_report.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    toast.success('Berhasil Menambahkan Daily Report', {
      autoClose: 2000,
    });
    renderDailyReport()
    new_report.value = ref({ deskripsi: "", tugas_id: "", label_id: "" })
    showtask.value = false
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

const editReport = (index) => {
  editTask.value = index;
  new_report.value = { ...daily_report.value[index] };
};

const saveEditReport = (index) => {
  daily_report.value[index] = { ...new_report.value };
  new_report.value = { deskripsi: "", tugas_id: "", label: "" };
  editTask.value = null;
};

const deleteReport = (index) => {
  daily_report.value.splice(index, 1);
};

watch(tugas_id, (new_tugas_id) => {
  renderDetailTugas(new_tugas_id);
});

watch(date, (new_date) => {
  renderDailyReport(new_date);
});

onMounted(() => {
  renderTugas();
  renderLabel();
  renderDailyReport(date.value);
  renderAbsen(date.value);
});
</script>

<template>
  <div class="container-fluid d-flex flex-column align-items-center min-vh-100" style="margin-top: 5rem">
    <Navbar></Navbar>
    <!-- PENGUMUMANNN -->
    <div class="row bg-success text-white rounded-4 p-2 w-100 d-flex justify-content-center align-items-center text-center mb-4" v-if="!show">
      <div class="col">
        <h1>ini notif</h1>
      </div>
    </div>
    <div class="row w-100 mb-5">
      <div class="col p-3 d-flex justify-content-between align-items-center rounded-4 bg-white shadow">
        <VueDatePicker v-model="date" :value="date" class="w-25"></VueDatePicker>
         <!-- ABSENSIII -->
        <h3>
          <button v-if="absensi?.keterangan == 'belum-tersedia'" class="btn btn-sm btn-secondary" disabled><i class="bi bi-x-circle" style="margin-right: 0.3rem;"></i>Belum Tersedia</button>
          <button v-if="absensi?.keterangan == 'belum-absen'" @click="() => router.push({ path: '/absen' })" class="btn btn-sm btn-danger"><i class="bi bi-dash-circle" style="margin-right: 0.31rem;"></i>Belum Absen</button>
          <button v-if="absensi?.keterangan == 'sudah-absen'" class="btn btn-sm btn-success" disabled><i class="bi bi-check-circle" style="margin-right: 1rem;"></i>Sudah Absen</button>
          {{ moment(date).format("LL") }}</h3>
          
      </div>
    </div>

    <!-- TUGAS -->
    <div class="row d-flex w-100 min-vh-100">
      <div class="col col-4 d-flex justify-content-center p-3 h-25">
        <div class="d-flex flex-column align-items-center bg-white w-100 p-4 rounded-3 shadow">
          <label for="select-tugas justify-content-start">Select Tugas</label>
          <select name="select" id="select-tugas" class="form-select mb-3" v-model="tugas_id">
            <option v-for="item in tugas" :value="item.id">{{ item.judul }}</option>
          </select>
          <div v-if="tugas_id" class="fw-bold fs-5 border-bottom border-2 border-black w-100 mb-4 d-flex justify-content-between">
            <p></p>
            <p>Tenggat, {{ moment(tugas_detail?.tanggal_mulai).format('LL') }} - {{ moment(tugas_detail?.tanggal_selesai).format('LL') }}</p>
          </div>
          <p v-if="tugas_id">progress bar</p>
          <div v-if="tugas_id" class="progress w-100 mb-4" style="height: 26px">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              :style="{ width: `${tugas_detail?.sub_tugas_progress}%` }"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {{ tugas_detail?.sub_tugas_progress }}
            </div>
          </div>
          <div v-if="tugas_id" class="w-100">
            <span class="fs-2 fw-bold">
              {{ tugas_detail?.judul }}
              <span :class="{'badge bg-success': tugas_detail?.status === 'done', 'badge bg-warning fs-6 fw-bold': tugas_detail?.status !== 'done'}">
                {{ tugas_detail?.status?.toUpperCase() }}
              </span>
            </span>
            <p style="margin: 0;">{{ tugas_detail?.kategori }}</p>
            <div class="mt-2">
              <span v-for="tag in tugas_detail?.tags" class="badge me-1" :style="{ backgroundColor: tag?.color, color: 'black', marginBottom: '1rem' }"> <i class="bi bi-tag"></i>{{ tag?.nama }}</span>
            </div>
            <div class="mt-2">
              <img v-for="user in tugas_detail?.users" :src="`${endpoint}${user.foto_profile}`" class="profile-pic" alt="..." style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%; margin-right: 1rem;" :alt="Avatar" :title="user.nama_lengkap">
            </div>
            <p class="d-flex justify-content-between fw-semibold mt-4">
              <p></p>
              <span class="badge rounded-pill bg-secondary">{{ sub_tugas.length }}</span>
            </p>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between" v-for="sub in sub_tugas">
                <span :class="sub.is_done ? 'text-decoration-line-through' : ''">
                  <input type="checkbox" class="form-check-input me-2" @change="sub.is_done = !sub.is_done" style="cursor: pointer;" :checked="sub.is_done" :disabled="sub.is_done">
                  <span class="me-2 fw-bold">{{ sub.judul }}</span>
                  <div class="ms-4 text-start">
                    <div>
                      <p style="margin: 0;">{{ sub.nama_kategori }} - {{ sub.deskripsi_kategori }}</p>
                      <p style="margin: 0;" class="text-danger">{{ sub.alasan ? `terlambat karena ${sub.alasan}` : '' }}</p>
                      <div class="d-flex justify-content-start align-items-center">
                        <img :src="`${endpoint}${sub.foto_profile}`" class="profile-pic" alt="..." style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%; margin-right: 1rem;" :alt="Avatar" :title="sub.nama_lengkap">
                        <p style="margin-top: 1rem; font-size: large;">{{ sub.nama_lengkap }}</p>
                      </div>
                      <span class="badge bg-secondary">Tenggat, {{ moment(sub.tanggal_selesai).format('L') }}, {{ moment(sub.created_at).format('HH:mm') }}</span>
                    </div>
                  </div>
                </span>
                <span v-if="sub.is_done"><i class="bi bi-check-circle-fill"></i></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- DAILY REPORT -->
      <div class="col col-8 d-flex justify-content-center p-3">
        <div class="d-flex flex-wrap justify-content-center bg-secondary w-100 p-4 rounded-3 shadow gap-3" style="overflow-y: scroll">
          <div
            v-for="(report, index) in daily_report"
            :key="index"
            class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3"
            style="width: 45%; min-height: 25%; max-height: 30%"
          >
            <template v-if="editTask === index">
              <div class="d-flex gap-2 justify-content-center border-bottom border-black py-1 h-25">
                <div class="d-flex h-75 gap-4 overflow-y-scroll" style="width: 100%; max-height: 1000px;">
                  <textarea v-model="new_report.deskripsi" class="form-control form-control-sm"></textarea>
                </div>
              </div>
              <div class="d-flex gap-2 justify-content-center py-1 h-25">
                <div class="d-flex h-75 gap-4" style="width: 100%">
                
                  <select v-model="new_report.tugas_id" class="form-select form-select-sm">
                    <option v-for="task in tugas" :key="task.id" :value="task.id">{{ task.judul }}</option>
                  </select>
                  <select v-model="new_report.label_id" class="form-select form-select-sm">
                    <option v-for="label in labels" :key="label.id" :value="label.id">{{ label.nama }}</option>
                  </select>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center border-top border-black pt-3">
                <button class="btn btn-danger" @click="editTask = null">cancel</button>
                <button class="btn btn-success" @click="saveEditReport(index)">save</button>
              </div>
            </template>
            <template v-else>
              <div class="h-50"><p>{{ report.deskripsi }}</p></div>
              <div class="border-top border-black h-25">
                <h6>{{ report.judul }}</h6>
                <h6>{{ report.nama_label }}</h6>
                <h6>{{ moment(report.createdAt).format("LL") }}</h6>
              </div>
              <div class="d-flex justify-content-between align-items-center border-top border-black pt-3">
                <button class="btn btn-warning text-white" @click="editReport(index)">edit</button>
                <button class="btn btn-danger" @click="deleteReport(index)">delete</button>
              </div>
            </template>
          </div>
          <div
            v-if="showtask"
            class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3"
            style="width: 45%; min-height: 25%; max-height: 30%"
          >
            <div class="d-flex gap-2 justify-content-center border-bottom border-black py-1 h-25">
              <div class="d-flex h-75 gap-4 overflow-y-scroll" style="width: 100%; max-height: 1000px;">
                <textarea v-model="new_report.deskripsi" class="form-control form-control-sm"></textarea>
              </div>
            </div>
            <div class="d-flex gap-2 justify-content-center py-1 h-25">
              <div class="d-flex h-75 gap-4" style="width: 100%">
                <select v-model="new_report.tugas_id" class="form-select form-select-sm">
                  <option v-for="task in tugas" :key="task.id" :value="task.id">{{ task.judul }}</option>
                </select>
                <select v-model="new_report.label_id" class="form-select form-select-sm">
                  <option v-for="label in labels" :key="label.id" :value="label.id">{{ label.nama }}</option>
                </select>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center border-top border-black pt-3">
              <button class="btn btn-danger" @click="showtask = false">cancel</button>
              <button class="btn btn-success" @click="addDailyReport">add</button>
            </div>
          </div>
          <button
            class="bg-white shadow rounded-3 border-0 btn fs-1"
            style="width: 45%; min-height: 25%; max-height: 30%;"
            @click="showtask = true"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-img {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}

.avatar-img:hover {
  cursor: pointer;
}

.avatar-img::before {
  content: attr(title);
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.avatar-img:hover::before {
  opacity: 1;
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

/* Additional CSS for cards */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-height: 100vh;
  overflow-y: auto;
}

.card {
  width: calc(45% - 1rem); /* Ensure cards take up 45% width with some gap */
  min-width: 300px; /* Minimum width for cards */
  max-width: 400px; /* Maximum width for cards */
  min-height: 200px; /* Minimum height for cards */
  max-height: 300px; /* Maximum height for cards */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
}

.card textarea {
  resize: none;
}

.card-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>

