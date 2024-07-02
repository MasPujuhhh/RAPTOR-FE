<template>
  <div class="wrapper" style="display: flex; width: 100%; height: 100%">
    <!-- left -->
    <SidebarAdmin></SidebarAdmin>

    <!-- right -->
    <div
      style="
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      "
      class="right"
    >
      <div class="header">
        <HeaderAdmin></HeaderAdmin>
      </div>

      <!-- content -->
      <div
        style="
          width: 100%;
          min-height: 100vh;
          height: 100%;
          display: flex;
          margin-top: 5rem;
          flex-direction: column;
          align-items: center;
          padding-left: 300px;
          padding-bottom: 1%;
          gap: 20px;
        "
        class="container-content"
      >
        <div class="admin-dashboard">
          <div class="card-container">
            <!-- Header Cards -->
            <div class="header-card">
              <div class="card-detail">
                <div class="card-detail-item">
                  <h3>{{ dashboard.jml_user }}</h3>
                  <h6>USER</h6>
                </div>
                <i class="bi bi-people-fill" style="font-size: 40px;"></i>
              </div>
            </div>
            <div class="header-card">
              <div class="card-detail">
                <div class="card-detail-item">
                  <h3>{{ dashboard.jml_daily_report }}</h3>
                  <h6>DAILY REPORT</h6>
                </div>
                <i class="bi bi-journals" style="font-size: 40px;"></i>
              </div>
            </div>
            <div class="header-card">
              <div class="card-detail">
                <div class="card-detail-item">
                  <h3>{{ dashboard.jml_tugas }}</h3>
                  <h6>TUGAS</h6>
                </div>
                <i class="bi bi-clipboard" style="font-size: 40px;"></i>
              </div>
            </div>
            <div class="header-card">
              <div class="card-detail">
                <div class="card-detail-item">
                  <h3>{{ dashboard.jml_tugas_done }}</h3>
                  <h6>TUGAS SELESAI</h6>
                </div>
                <i class="bi bi-clipboard-check" style="font-size: 40px;"></i>
              </div>
            </div>
          </div>
          <div class="header">
            <div class="date">
              <VueDatePicker v-model="date" style="width: 19%"></VueDatePicker>
              <h2 style="width: 19%">{{ moment(date).format('LL') }}</h2>
            </div>
          </div>
          <div style="margin-bottom: 1rem">
            <hr style="margin: 0px" />
            <hr style="margin: 0px" />
          </div>
          <div>
            <div v-if="!dashboard.jadwal" class="notif">
              <div class="title-notif">
                <h5>Jadwal Belum Dibuka</h5>
                <i class="bi bi-bell-fill" style="font-size: 30px"></i>
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-warning" @click="openSchedule(date)" type="button">Open Schedule</button>
              </div>
            </div>
            <div class="card-container">
              <!-- Body Cards -->
              <div class="body-card">
                <div class="body-card-title" style="margin-bottom: 1rem">Daily Report Terbaru
                  <i class="bi bi-file-earmark-check" style="margin-left: 0.5rem; font-size: 30px;"></i>
                </div>
                <div class="body-card-content">
                  <ol v-if="dashboard.daily_report" class="list-group list-group-numbered">
                    <li v-for="item in dashboard.daily_report" class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto text-start">
                        <div class="fw-bold" style="margin: 0;">{{ item.judul }}</div>
                        <div><p>{{ item.nama_lengkap }} ({{ item.alias }})</p></div>
                        <div>{{ item.deskripsi }}</div>
                      </div>
                      <span class="badge bg-secondary">{{ moment(item.createdAt).format('L') }}, {{ moment(item.createdAt).format('HH:mm') }}</span>
                    </li>
                  </ol>
                  <div v-if="!dashboard.daily_report?.length">
                    <p>Tidak Ada Data</p>
                  </div>
                </div>
              </div>
              <div class="body-card">
                <div class="body-card-title">Statistik Absen
                  <i class="bi bi-pie-chart" style="margin-left: 0.5rem; font-size: 30px;"></i>
                </div>
                <div class="body-card-content">
                  <canvas id="chartAbsen" ref="chartAbsen" style="width: 25rem; height: 25rem"></canvas>
                  <div v-if="dashboard.absensi?.masuk == null">
                    <p>Tidak Ada Data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- content end -->
    </div>
  </div>
</template>

<script setup>
import SidebarAdmin from "../../components/SidebarAdmin.vue";
import HeaderAdmin from "../../components/HeaderAdmin.vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import moment from "moment";
import "moment/locale/id";
import Chart from 'chart.js/auto';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, onMounted, watch } from 'vue';

const store = useCounterStore();
const { id_transaksi, data_transaksi } = storeToRefs(store);
const { simpanIdTransaksi, simpanDataTransaksi } = store;

const router = useRouter();

let token = localStorage.getItem("token");
let checker = ref([]);
let dashboard = ref({});
let date = ref(new Date());
const chartAbsen = ref(null);
let nilai_chartAbsen = ref(null);

const endpoint = import.meta.env.VITE_ENDPOINT;

const renderDashboard = async (jadwal = null) => {
  if (!jadwal) {
    jadwal = new Date()
  }
  jadwal = jadwal.toISOString().split('T')[0]
  try {
    let res = await axios.get(`${endpoint}/dashboard/`, {
      params: {
        jadwal
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = res.data?.data;
    dashboard.value = data;
    await renderPieAbsen(data.absensi);
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

const openSchedule = async (d) => {
  let payload = { jadwal: d.toISOString().split('T')[0] }
  try {
    let res = await axios.post(`${endpoint}/dashboard/open_schedule`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    toast.success('berhasil membuka jadwal', { autoClose: 2000 });
    await renderDashboard(d);
  } catch (error) {
    const data = error.response?.data;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
}

const renderPieAbsen = async (absensi) => {
  try {
    let data_absen = [0, 0, 0];
    if (absensi.masuk) {
      data_absen[0] = absensi.masuk;
    }
    if (absensi.wfh || absensi.izin_sakit) {
      data_absen[2] = absensi.wfh || 0;
    }
    if (absensi.tanpa_keterangan) {
      data_absen[1] = absensi.tanpa_keterangan;
    }

    if (nilai_chartAbsen.value) {
      nilai_chartAbsen.value.destroy();
    }

    const data = {
      labels: ['Masuk', 'Tanpa Keterangan', 'WFH/ Izin/ Sakit'],
      datasets: [
        {
          data: data_absen,
          backgroundColor: ['#50C878', '#FF6384', '#FFCE56'],
          hoverBackgroundColor: ['#50C878', '#FF6384', '#FFCE56'],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    setTimeout(() => {
      if (!chartAbsen.value) {
        return;
      }
      const ctx = chartAbsen.value.getContext('2d');
      let x = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options,
      });
      nilai_chartAbsen.value = x;
    }, 500);
  } catch (error) {
    console.log(error);
  }
}

const renderDailyReport = async (date) => {
  try {
    let tanggal = date.toLocaleDateString().split('/');
    for (let i = 0; i < tanggal.length; i++) {
      if (parseInt(tanggal[i]) < 10) {
        tanggal[i] = '0' + tanggal[i];
      }
    }
    let format = `${tanggal[2]}-${tanggal[0]}-${tanggal[1]}`;

    let res = await axios.get(`${endpoint}/logbook/getDataLogbookByDateAndNeedAproval/${format}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    let data = res.data?.data;
    butuh_persetujuan.value = data;
  } catch (error) {
    console.log(error);
  }
}

const renderDateNow = () => {
  date.value = new Date();
  renderDailyReport(date);
};

const pindahDetail = (id) => {
  router.push({ path: `/admin/logbook/${id}` });
}

onMounted(() => {
  renderDashboard();
});

watch(date, (newDate) => {
  renderDashboard(newDate);
});

</script>

<style scoped>
.admin-dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
}

.header {
  width: 100%;
  text-align: right;
  margin-bottom: 20px;
}

.date {
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}

.notif {
  width: 100%;
  background-color: #fff;
  margin-bottom: 1rem;
  padding: 2rem 5rem;
  border-radius: 1rem;
}

.title-notif {
  display: flex;
  justify-content: space-between;
}

.card-container {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.header-card {
  width: 100%;
  background-color: #fff;
  padding: 1.5rem;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.card-detail {
  width: 100%;
  text-align: left;
  display: flex;
}

.card-detail-item {
  width: 80%;
}

.body-card {
  width: 100%;
  height: fit-content;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.body-card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  border-bottom: 2px solid black;
  padding: 1rem;
}

.body-card-content {
  font-size: 14px;
}
</style>
