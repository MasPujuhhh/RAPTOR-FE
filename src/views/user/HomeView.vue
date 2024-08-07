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

const me = ref()

const date = ref(new Date());
const show_history = ref(false)
const show_pengumuman = ref(true);
const showtask = ref(false);
const editTask = ref(null);
const tugas = ref([]);
const tugas_id = ref("");
const tugas_detail = ref();
const sub_tugas = ref();
const daily_report = ref([]);
const new_report = ref({ deskripsi: "", tugas_id: "", label_id: "" });
const detail_report = ref({ deskripsi: "", tugas_id: "", label_id: "" });
const labels = ref([]);
const absensi = ref({})
const newCommentText = ref()
const sub_tugas_detail = ref()
const modal_subtugas = ref(false)
const alasan_terlambat = ref()

const pengumuman = ref([])
const unread_pengumuman = ref([])

const endpoint = import.meta.env.VITE_ENDPOINT;
let token = localStorage.getItem("token");

const goToPengumuman = () => {
  router.push('/pengumuman');
};

const togglePengumuman = () => {
  show_pengumuman.value = !show_pengumuman.value;
};

function cekTerlambat(dueDate, currentDate) {
  // Atur waktu kedua tanggal ke tengah malam
  dueDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);


  // Ubah tanggal menjadi milidetik
  var dueDateTime = dueDate.getTime();
  var currentDateTime = currentDate.getTime();

  return dueDateTime < currentDateTime ? true : false
}

const getDetailSubTugas = (data, e) => {
  e.target.checked = false
  modal_subtugas.value = true
  sub_tugas_detail.value = data
}

const renderMe = async () => {
  try {
    const res = await axios.get(`${endpoint}/user/detail_by_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    me.value = res.data.data
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


const unreadPengumuman = (data) => {
  return data.filter(item => !item.is_read);
};

const renderPengumuman = async () => {
  try {
    const res = await axios.get(`${endpoint}/pengumuman/all_by_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    pengumuman.value = res.data.data
    unread_pengumuman.value = unreadPengumuman(res.data.data)
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
      params: { jadwal }
    });
    const data = res.data?.data;

    absensi.value.id = data?.id
    absensi.value.jadwal = data?.jadwal.split('T')[0]
    if (!data?.check_in || !data?.keterangan) {
      absensi.value.keterangan = 'belum-absen-pagi'
    }
    if (data?.check_in && !data?.check_out) {
      absensi.value.keterangan = 'belum-absen-sore'
    }
    if (data?.check_in && data?.check_out) {
      absensi.value.keterangan = 'sudah-absen'
    }
    if (data == null) {
      absensi.value.keterangan = 'belum-tersedia'
    }

    console.log('absensi', absensi.value)

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
    console.log('toekennn', endpoint)
    const res = await axios.get(`${endpoint}/tugas/all_by_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log('res',res.data)

    if (res.data.data.length == 0) {
      console.log('jalannnnnnn')
      tugas.value.push({
        id: "aRh0ymVac_gmST2UGkHTy",
        judul: "Standby"
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
    console.log('res', res);
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
    let jadwal = date.value?.toLocaleDateString('id-ID', options).split('/').reverse().join('-');
    new_report.value.jadwal = jadwal
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
    renderDailyReport(date.value)
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
  detail_report.value = { ...daily_report.value[index] };
};

const saveEditReport = async (index) => {
  daily_report.value[index] = { ...detail_report.value };
  try {
    let payload = {
      deskripsi: daily_report.value[index].deskripsi,
      tugas_id: daily_report.value[index].tugas_id,
      label_id: daily_report.value[index].label_id,
    }
    const res = await axios.put(`${endpoint}/daily/edit/${daily_report.value[index].id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    toast.success('Berhasil Mengupdate Daily Report', {
      autoClose: 2000,
    });
    renderDailyReport()
    detail_report.value = { deskripsi: "", tugas_id: "", label: "" };
    editTask.value = null;
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

const deleteReport = async (index) => {
  try {
    const res = await axios.delete(`${endpoint}/daily/delete/${index}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    toast.success('Berhasil Menghapus Daily Report', {
      autoClose: 2000,
    });
    renderDailyReport()
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


const addComment = async () => {
  try {
    let payload = {
      tugas_id: tugas_detail.value.id,
      comment: newCommentText.value
    }
    console.log(payload)

    const res = await axios.post(`${endpoint}/comment/add`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    renderDetailTugas(tugas_detail.value.id)
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
    renderDetailTugas(tugas_detail.value.id)
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
}; const cancelAddDaily = () => {
  showtask.value = false;
  new_report.value = { deskripsi: "", tugas_id: "", label_id: "" };
};



const doneSubTugas = async (sub_tugas_id) => {
  try {

    let payload = {}
    if (alasan_terlambat.value) {
      payload.alasan = alasan_terlambat.value
    }
    const res = await axios.put(`${endpoint}/sub_tugas/done/${sub_tugas_id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    toast.success('Berhasil Menyelesaikan Sub Tugas', {
      autoClose: 2000,
    });
    renderDetailTugas(tugas_id.value);
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

const navigateAbsen = (jadwal, tipe) => {
  router.push({
    path: `/absen/${jadwal}`,
    query: { tipe }
  })
}


watch(tugas_id, (new_tugas_id) => {
  renderDetailTugas(new_tugas_id);
});

watch(date, (new_date) => {
  renderDailyReport(new_date);
  renderAbsen(new_date);
});

onMounted(() => {
  renderMe();
  renderTugas();
  renderLabel();
  renderPengumuman();
  renderDailyReport(date.value);
  renderAbsen(date.value);
});
</script>

<template>
  <div class="container-fluid d-flex flex-column align-items-center min-vh-100" style="margin-top: 5rem">
    <Navbar></Navbar>
    <!-- PENGUMUMANNN -->
    <div class="row bg-warning text-white rounded-4 p-2 w-100 d-flex justify-content-between mb-4"
      v-if="unread_pengumuman?.length >= 1 && show_pengumuman" @click="goToPengumuman" style="cursor: pointer">
      <div class="d-flex justify-content-between">
        <div>
          <h4>Pengumuman Baru</h4>
          <h6>{{ unread_pengumuman[0].judul }}</h6>
        </div>
        <div>
          <h5 class="text-end" style="cursor:pointer" @click.stop="togglePengumuman">
            <i class="bi bi-x-lg"></i>
          </h5>
          <h4><i class="bi bi-bell-fill"></i> {{ unread_pengumuman?.length }}</h4>
        </div>
      </div>
    </div>
    <div class="row w-100 mb-5">
      <div class="col p-3 d-flex justify-content-between align-items-center rounded-4 bg-white shadow">
        <VueDatePicker v-model="date" :value="date" class="w-25"></VueDatePicker>
        <!-- ABSENSIII -->
        <h3>
          <button v-if="absensi?.keterangan == 'belum-tersedia'" class="btn btn-sm btn-secondary" disabled><i
              class="bi bi-x-circle" style="margin-right: 0.3rem;"></i>Belum Tersedia</button>
          <button v-if="absensi?.keterangan == 'belum-absen-pagi'" @click="navigateAbsen(absensi.jadwal, 'check_in')"
            class="btn btn-sm btn-danger"><i class="bi bi-dash-circle" style="margin-right: 0.31rem;"></i>Check
            In</button>
          <button v-if="absensi?.keterangan == 'belum-absen-sore'" @click="navigateAbsen(absensi.jadwal, 'check_out')"
            class="btn btn-sm btn-danger"><i class="bi bi-dash-circle" style="margin-right: 0.31rem;"></i>Check
            Out</button>
          <button v-if="absensi?.keterangan == 'sudah-absen'" class="btn btn-sm btn-success" disabled><i
              class="bi bi-check-circle" style="margin-right: 1rem;"></i>Sudah Absen</button>
          {{ moment(date).format("LL") }}
        </h3>

      </div>
    </div>

    <!-- TUGAS -->
    <div class="row d-flex w-100 min-vh-100">
      <div class="col col-4 d-flex justify-content-center p-3 h-25">
        <div class="d-flex flex-column align-items-center bg-white w-100 p-4 rounded-3 shadow">
          <h4 for="select-tugas justify-content-start" class="w-100" style="text-align: left;">Detail Tugas</h4>
          <select name="select" id="select-tugas" class="form-select mb-3" v-model="tugas_id">
            <option value="" selected disabled>Select Tugas</option>
            <option v-for="item in tugas" :value="item.id">{{ item.judul }}</option>
          </select>
          <div v-if="tugas_id"
            class="fw-bold fs-5 border-bottom border-2 border-black w-100 mb-4 d-flex justify-content-between">
            <p></p>
            <p>Tenggat, {{ moment(tugas_detail?.tanggal_mulai).format('LL') }} - {{
              moment(tugas_detail?.tanggal_selesai).format('LL') }}</p>
          </div>
          {{ tugas?.judul }}
          <h6 v-if="tugas_id && tugas_id != 'aRh0ymVac_gmST2UGkHTy'" class="w-100" style="text-align: left;">progress
            bar {{ `${tugas_detail?.sub_tugas_progress}` }}</h6>
          <div v-if="tugas_id && tugas_id != 'aRh0ymVac_gmST2UGkHTy'" class="progress w-100 mb-4" style="height: 26px">
            <div class="progress-bar bg-success" role="progressbar"
              :style="{ width: `${tugas_detail?.sub_tugas_progress}` }" aria-valuenow="25" aria-valuemin="0"
              aria-valuemax="100">
              {{ tugas_detail?.sub_tugas_progress }}
            </div>
          </div>
          <div v-if="tugas_id" class="w-100">
            <span class="fs-2 fw-bold">
              {{ tugas_detail?.judul }}
              <span
                :class="{ 'badge bg-success': tugas_detail?.status === 'done', 'badge bg-warning fs-6 fw-bold': tugas_detail?.status !== 'done' }">
                {{ tugas_detail?.status?.toUpperCase() }}
              </span>
            </span>
            <p style="margin: 0;">{{ tugas_detail?.kategori }}</p>
            <div class="mt-2">
              <span v-for="tag in tugas_detail?.tags" class="badge me-1"
                :style="{ backgroundColor: tag?.color, color: 'black', marginBottom: '1rem' }"> <i
                  class="bi bi-tag"></i>{{ tag?.nama }}</span>
            </div>
            <div class="mt-2">
              <img v-for="user in tugas_detail?.users" :src="`${endpoint}${user.foto_profile}`" class="profile-pic"
                alt="..."
                style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%; margin-right: 1rem;"
                :alt="Avatar" :title="user.nama_lengkap">
            </div>
            <p class="d-flex justify-content-between fw-semibold mt-4">
            <h5 class="m-0">Sub Tugas</h5>
            <span class="badge rounded-pill bg-secondary">{{ sub_tugas?.length }}</span>
            </p>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between" v-for="sub in sub_tugas">
                <span>
                  <input v-if="me.id == sub.user_id" type="checkbox" class="form-check-input me-2"
                    data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;"
                    :checked="sub.is_done" :disabled="sub.is_done" @change="getDetailSubTugas(sub, $event)">

                  <span class="me-2 fw-bold w-25">{{ sub.judul }}</span>
                  <div class="ms-4 text-start">
                    <div>
                      <p style="margin: 0;">{{ sub.nama_kategori }} - {{ sub.deskripsi_kategori }}</p>
                      <p style="margin: 0;" class="text-danger">{{ sub.alasan ? `terlambat karena "${sub.alasan}"` : ''
                        }}</p>
                      <div class="d-flex justify-content-start align-items-center">
                        <img :src="`${endpoint}${sub.foto_profile}`" class="profile-pic" alt="..."
                          style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%; margin-right: 1rem;"
                          :alt="Avatar" :title="sub.nama_lengkap">
                        <p style="margin-top: 1rem; font-size: large;">{{ sub.nama_lengkap }}</p>
                      </div>
                      <span class="badge bg-secondary">Tenggat, {{ moment(sub.tanggal_selesai).format('L') }}</span>
                    </div>
                  </div>
                </span>
                <span v-if="sub.is_done"><i class="bi bi-check-circle-fill"></i></span>
              </li>
            </ul>

            <!-- MODAL DONE TUGAS -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <div>
                      <h5 class="modal-title" id="exampleModalLabel">Apakah Yakin Menyelesaikan Tugas {{
                        sub_tugas_detail?.judul }}</h5>
                      <p class="text-danger">Perubahan tidak dapat diedit!!</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div v-if="cekTerlambat(new Date(sub_tugas_detail?.tanggal_selesai), new Date())" class="modal-body">
                    <h6>Terlambat Menyelesaikan Tugas!!</h6>
                    <div>
                      <textarea type="text" class="form-control" id="filterNamaLengkap" v-model="alasan_terlambat"
                        placeholder="Alasan Terlambat" />
                      <p v-if="cekTerlambat(new Date(sub_tugas_detail?.tanggal_selesai), new Date()) && !alasan_terlambat"
                        class="text-danger">Silahkan isi alasan keterlambatan</p>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                    <button type="button" class="btn btn-primary" @click="doneSubTugas(sub_tugas_detail?.sub_tugas_id)"
                      :disabled="cekTerlambat(new Date(sub_tugas_detail?.tanggal_selesai), new Date()) && !alasan_terlambat">Simpan</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- COMMENT -->
            <hr class="mt-4">
            <div class="rounded border border-1 d-flex flex-column" style="padding:1rem">
              <h5>Aktivitas</h5>
              <div class="row mb-3" style="padding-left:0.5rem;padding-right: 1rem;">
                <div class="col-md-12 px-1">
                  <div v-if="!show_history">
                    <h6 style="padding-bottom: 0; padding-top: 0.1rem; cursor: pointer"
                      @click="show_history = !show_history"><i class="bi bi-chevron-down"></i>&nbspLihat lebih banyak
                    </h6>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">{{ (tugas_detail?.histories?.[tugas_detail.histories.length
                        -1])?.keterangan }}</li>
                    </ul>
                  </div>
                  <div v-else>
                    <h6 style="padding-bottom: 0; padding-top: 0.1rem; cursor: pointer"
                      @click="show_history = !show_history"><i class="bi bi-chevron-up"></i>&nbspLihat lebih sedikit
                    </h6>
                    <ul class="list-group list-group-flush">
                      <li v-for="history in tugas_detail.histories" :key="history.id" class="list-group-item">{{
                        history.keterangan }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="row mb-3 h-100 d-flex flex-column justify-content-between">
                <div class="col-md-12">
                  <h5>Komentar</h5>
                  <div v-if="!tugas_detail?.comments?.length">
                    <p>belum ada komentar</p>
                  </div>
                  <div style="overflow-y:auto;">
                    <div v-for="comment in tugas_detail?.comments" :key="comment.id" class="comment-item mb-3 w-100">
                      <div class="card w-100 ">
                        <div class="card-body">
                          <div class="d-flex">
                            <div>
                              <img :src="`${endpoint}${comment.foto_profile}`" class="profile-pic" alt="..."
                                style="width: 3rem; height: 3rem; object-fit: cover; margin-right: 0.5rem; border-radius: 50%; margin-bottom:1rem">
                            </div>
                            <div class="d-flex justify-content-between w-100">
                              <div>
                                <h5 class="card-title">{{ comment.nama_lengkap }}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{{ comment.nama_role }}</h6>
                              </div>
                              <div class="d-flex" style="width: 40%;">
                                <p style="margin-right: 5%;">{{ moment(comment.createdAt).format('L') }}, {{
                                  moment(comment.createdAt).format('HH:mm') }}</p>
                                <i class="bi bi-trash" style="cursor:pointer;"
                                  @click="hapusComment(comment.comment_id)"></i>
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

      <!-- DAILY REPORT -->
      <div class="col col-8 d-flex justify-content-center align-items-start p-3">
        <div class="d-flex flex-wrap justify-content-center bg-secondary w-100 p-4 rounded-3 shadow gap-3"
          style="overflow-y: scroll">
          <div class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3"
            style="width: 45%; min-height: 300px; max-height: 350px" v-for="(report, index) in daily_report"
            :key="index">
            <template v-if="editTask === index">
              <div class="h-50">
                <textarea v-model="detail_report.deskripsi" type="text" class="form-control h-100" />
              </div>
              <div class="d-flex gap-2 justify-content-center border-top border-black py-1 h-25">
                <div class="d-flex h-75 gap-4" style="width: 100%">
                  <select v-model="detail_report.tugas_id" class="form-select form-select-sm">
                    <option v-for="task in tugas" :key="task.id" :value="task.id">{{ task.judul }}</option>
                  </select>
                  <select v-model="detail_report.label_id" class="form-select form-select-sm">
                    <option class="bgprimary" v-for="label in labels" :key="label.id" :value="label.id">{{ label.nama }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center border-top border-black pt-3">
                <button class="btn btn-danger" @click="editTask = null">cancel</button>
                <button class="btn btn-success" @click="saveEditReport(index)">update</button>
              </div>
            </template>
            <template v-else>
              <div class="h-50 overflow-y-scroll" style="max-height: 1000px">
                <p style="text-align: justify;">
                  {{ report?.deskripsi }}
                </p>
              </div>
              <div class="d-flex gap-1 justify-content-between border-top border-black pt-2">
                <img :src="`${endpoint}${report?.foto_profile}`" class="profile-pic" alt="..."
                  style="width: 2.5rem; height: 2.5rem; object-fit: cover; border-radius: 50%; margin-right: 1rem;"
                  :alt="Avatar" :title="report?.nama_lengkap">
                <h6>{{ report?.judul }}</h6>
                <h6>
                  <span class="badge" :style="`background-color:${report?.color}; color:black;`"><i
                      class="bi bi-bookmark-fill"></i>{{ report?.nama_label }}</span>
                </h6>
                <h6>{{ moment(report?.createdAt).format("ll") }}</h6>
              </div>
              <div class="d-flex justify-content-between align-items-center border-top border-black pt-3">
                <button class="btn btn-warning text-white" @click="editReport(index)">edit</button>
                <button class="btn btn-danger" @click="deleteReport(report?.id)">delete</button>
              </div>
            </template>
          </div>

          <div class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3"
            style="width: 45%; min-height: 300px; max-height: 350px" v-if="showtask">
            <div class="h-50">
              <textarea v-model="new_report.deskripsi" type="text" class="form-control h-100"
                placeholder="Deskripsi Daily Report" />
            </div>
            <div class="d-flex gap-2 justify-content-center border-top border-black py-1 h-25">
              <div class="d-flex h-75 gap-4" style="width: 100%">
                <select v-model="new_report.tugas_id" class="form-select form-select-sm">
                  <option value="" selected disabled>Select Tugas</option>
                  <option v-for="task in tugas" :key="task.id" :value="task.id">{{ task.judul }}</option>
                </select>
                <select v-model="new_report.label_id" class="form-select form-select-sm">
                  <option value="" selected disabled>Select Label</option>
                  <option v-for="label in labels" :key="label.id" :value="label.id"
                    :style="`background-color:${label.color}`"><i class="bi bi-bookmark-fill"></i>{{ label.nama }}
                  </option>
                </select>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center border-top border-black pt-3">
              <button class="btn btn-danger" @click="cancelAddDaily">
                cancel
              </button>
              <button class="btn btn-success" @click="addDailyReport">tambah</button>
            </div>
          </div>
          <button class="bg-white shadow rounded-3 border-0 btn fs-1"
            style="width: 45%; min-height: 300px; max-height: 350px" @click="showtask = true">
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
  width: calc(45% - 1rem);
  /* Ensure cards take up 45% width with some gap */
  min-width: 300px;
  /* Minimum width for cards */
  max-width: 400px;
  /* Maximum width for cards */
  min-height: 200px;
  /* Minimum height for cards */
  max-height: 300px;
  /* Maximum height for cards */
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
