<script setup>
import Navbar from "../../components/Navbar.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import axios from "axios";
import moment from "moment";
import { ref, onMounted, watch } from "vue";
import "moment/locale/id";
import { toast } from "vue3-toastify";

const date = ref(new Date());
const show = ref(false);
const showtask = ref(false);
const tugas = ref([]);
const tugas_id = ref()
const tugas_detail = ref()
const sub_tugas = ref() 
const daily_report = ref([])
const tasks = ref([
  {
    name: "dashboar skdbdsjbdf dbfsdhfbshd sdhfbjshdf hsdfgsdfgsdfhjsdhgfhjs sdkfnksdd",
    is_check: false,
    label: "on going",
    created_at: "2024-06-12",
  },
  {
    name: "baj",
    is_check: false,
    label: "done",
    created_at: "2024-06-12",
  },
]);

const taskPlus = [
  {
    name: "plus",
    is_check: false,
    label: "plus",
    created_at: "2024-06-12",
  },
];

const endpoint = import.meta.env.VITE_ENDPOINT;
let token = localStorage.getItem("token");

const renderTugas = async () => {
  try {
    const res = await axios.get(`${endpoint}/tugas/all_by_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    tugas.value = res.data.data;
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
    tugas_detail.value = res.data.data
    sub_tugas.value = res.data.data.sub_tugas
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
      jadwal = new Date()
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
    console.log(res)
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

const addTask = () => {
  tasks.value = [...tasks.value, ...taskPlus];
  showtask.value = false;
};

watch(tugas_id, (new_tugas_id) => {
  renderDetailTugas(new_tugas_id);
});

watch(date, (new_date) => {
  renderDailyReport(new_date);
});

onMounted(() => {
  renderTugas();
  renderDailyReport(date.value)
});
</script>

<template>
  <div
    class="container-fluid d-flex flex-column align-items-center min-vh-100"
    style="margin-top: 5rem"
  >
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
        <h3>
          {{moment(date).format("LL")}}
        </h3>
      </div>
    </div>


    <!-- ABSENSIII -->
    <div class="row w-100 mb-4">
      <div class="col d-flex justify-content-end">
        <button class="btn btn-lg btn-secondary">klik akuh</button>
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
          <p v-if="tugas_id" >progress bar</p>
          <div v-if="tugas_id" class="progress w-100 mb-4" style="height: 26px">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              :style="tugas_detail?.sub_tugas_progress ? `width:${tugas_detail?.sub_tugas_progress}` : `width:${tugas_detail?.sub_tugas_progress}`"
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
              <span :class="{'badge bg-success ': tugas_detail?.status === 'done', 'badge bg-warning fs-6 fw-bold': tugas_detail?.status !== 'done'}">
                {{ tugas_detail?.status?.toUpperCase() }}
              </span>
            </span>
            <p style="margin: 0;">{{ tugas_detail?.kategori }}</p>
            <div class="mt-2">
              <span v-for="tag in tugas_detail?.tags" class="badge me-1" :style="`background-color:${tag?.color}; color:black; margin-bottom: 1rem;`"> <i class="bi bi-tag"></i>{{ tag?.nama }}</span>
            </div>
            <div class="mt-2">
              <img v-for="user in tugas_detail?.users" :src="`${endpoint}${user.foto_profile}`"  class="profile-pic" alt="..." style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%; margin-right: 1rem;" :alt="Avatar" :title="user.nama_lengkap">
            </div>
            <p class="d-flex justify-content-between fw-semibold mt-4">
              <p></p>
              <span class="badge rounded-pill bg-secondary">{{sub_tugas.length}}</span>
            </p>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between" v-for="sub in sub_tugas">
                <span :class="sub.is_done ? `text-decoration-line-through` : ``">
                  <input type="checkbox" class="form-check-input me-2" @change="sub.is_done = !sub.is_done" style="cursor: pointer;" :checked="sub.is_done" :disabled="sub.is_done">
                    <span class="me-2 fw-bold"> {{ sub.judul }}</span>
                    <div class="ms-4 text-start">
                        <div>
                          <p style="margin: 0;">{{ sub.nama_kategori }} - {{ sub.deskripsi_kategori }}</p>
                          <p style="margin: 0;" class="text-danger">{{ sub.alasan ? `terlambat karena ${sub.alasan}` : ''}}</p>
                          <div class="d-flex justify-content-start align-items-center">
                            <img :src="`${endpoint}${sub.foto_profile}`"  class="profile-pic" alt="..." style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%; margin-right: 1rem;" :alt="Avatar" :title="sub.nama_lengkap">
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
          {{ daily_report }}
          <div class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3" style="width: 45%; min-height: 25%" v-for="report in daily_report">
            <div class="d-flex gap-2 justify-content-between border-bottom border-black py-1 h-25">
              <h6>{{ report.judul }}</h6>
              <h6>{{ report.nama_label }}</h6>
              <h6>{{ moment(report.createdAt).format("LL") }}</h6>
            </div>
            <div class="h-50"></div>
            <div class="d-flex justify-content-between align-items-center border-top border-black pt-3">
              <button class="btn btn-warning text-white">edit</button>
              <button class="btn btn-danger">delete</button>
            </div>
          </div>
          <div
            class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3"
            style="width: 45%; min-height: 25%"
            v-if="showtask"
          >
            <div
              class="d-flex gap-2 justify-content-center border-bottom border-black py-1 h-25"
            >
              <div class="d-flex h-75 gap-4" style="width: 100%">
                <input type="text" class="form-control form-control-sm" />
                <select type="text" class="form-select form-select-sm"></select>
              </div>
            </div>
            <div class="h-50">
              <textarea type="text" class="form-control h-100"></textarea>
            </div>
            <div
              class="d-flex justify-content-between align-items-center border-top border-black pt-3"
            >
              <button class="btn btn-danger" @click="showtask = false">
                cancel
              </button>
              <button class="btn btn-success" @click="addTask()">add</button>
            </div>
          </div>
          <button
            class="bg-white shadow rounded-3 border-0 btn fs-1"
            style="width: 45%; min-height: 25%"
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