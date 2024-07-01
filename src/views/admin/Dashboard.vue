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
      
      <!-- Integrate the HTML structure here -->
      <div class="admin-dashboard">
        <div class="card-container">
          <!-- Header Cards -->
          <div class="header-card">
            <div class="card-detail">
              <div class="card-detail-item">
                <h3>{{ users }}</h3>
                <h6>USER</h6>
              </div>
              <i class="bi bi-people-fill" style="font-size: 40px;"></i>
            </div>
          </div>
          <div class="header-card">
            <div class="card-detail">
              <div class="card-detail-item">
                <h3>{{ certificates }}</h3>
                <h6>SERTIFIKAT</h6>
              </div>
              <i class="bi bi-award" style="font-size: 40px;"></i>
            </div>
          </div>
          <div class="header-card">
            <div class="card-detail">
              <div class="card-detail-item">
                <h3>{{ logbook }}</h3>
                <h6>LOGBOOK</h6>
              </div>
              <i class="bi bi-journals" style="font-size: 40px;"></i>
            </div>
          </div>
          <div class="header-card">
            <div class="card-detail">
              <div class="card-detail-item">
                <h3>{{ task }}</h3>
                <h6>TUGAS</h6>
              </div>
              <i class="bi bi-clipboard" style="font-size: 40px;"></i>
            </div>
          </div>
          <div class="header-card">
            <div class="card-detail">
              <div class="card-detail-item">
                <h3>{{ task_done }}</h3>
                <h6>TUGAS SELESAI</h6>
              </div>
              <i class="bi bi-clipboard-check" style="font-size: 40px;"></i>
            </div>
          </div>
        </div>
        <div class="header">
          <div class="date">
            <VueDatePicker v-model="date" style="width:19%"></VueDatePicker>
            <h2 style="width:19%" >{{ moment(date).format('LL') !== 'Invalid Date' ? moment(date).format('LL') : ''  }}</h2>
            <!-- <h3>{{ moment(date_now).format('MMMM Do YYYY, h:mm:ss a') }}</h3> -->
          </div>
        </div>
        <div style="margin-bottom: 1rem;">
          <hr style="margin: 0px;" />
          <hr style="margin: 0px;" />
        </div>
        <div>
          {{ checker }}
          <div v-if="!checker.length" class="notif">
            <div class="title-notif">
              <h5>Jadwal Belum Dibuka</h5>
              <!-- <i class="bi bi-search"></i> -->
              <i class="bi bi-bell-fill" style="font-size:30px;"></i>
            </div>
            <div class="d-grid gap-2">
              <button class="btn btn-warning"  @click="openSchedule(date)" type="button">Open Schedule</button>
            </div>
          </div>
          <!-- {{ checker }} -->
          <div class="card-container">
            <!-- Body Cards -->
            <div class="body-card">
              <div class="body-card-title" style="margin-bottom: 1rem">Butuh Persetujuan<i class="bi bi-file-earmark-check" style="margin-left: 0.5rem; font-size: 30px;"></i></div>
              <div class="body-card-content">
                <ul v-if="butuh_persetujuan" class="list-group">
                  <li v-for="bp in butuh_persetujuan" class="list-group-item d-flex justify-content-between align-items-center">
                    {{ bp.company_role }} - {{ bp.username }} | {{ bp.fullname }}
                    <span>{{ moment(bp.date).format('LL') }}</span>
                    <span>
                      <button @click="pindahDetail(bp.id)" type="button"
                          class="btn btn-secondary btn-sm">
                          <i class="bi bi-search"></i>
                      </button>
                    </span>
                  </li>
                </ul>
                <ul v-if="!butuh_persetujuan?.length && checker?.length" class="list-group">
                  <li>Tidak Ada Data</li>
                </ul>
              </div>
            </div>
            <div class="body-card">
              <div class="body-card-title">Statistik Absen <i class="bi bi-pie-chart" style="margin-left: 0.5rem; font-size: 30px;"></i></div>
              <div class="body-card-content">
                <canvas  :id="chartAbsen" ref="chartAbsen" v-if="checker?.length" style="width: 25rem; height:25rem"></canvas>
              </div>
            </div>
            <div class="body-card">
              <div class="body-card-title">Statistik Logbook <i class="bi bi-pie-chart" style="margin-left: 0.5rem; font-size: 30px;"></i></div>
              <div class="body-card-content">
                <canvas  :id="chartLogbook" ref="chartLogbook" v-if="checker?.length" style="width: 25rem; height:25rem"></canvas>
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
  // import { onMounted, ref, useSSRContext, watch } from "vue";
  import axios from "axios";
  import { useCounterStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  import { routerKey, useRouter } from "vue-router";
  import { toast } from "vue3-toastify";
  import "vue3-toastify/dist/index.css";
  import moment from "moment";
  import "moment/locale/id";
  import Chart from 'chart.js/auto';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'

  import { ref, onMounted, watch  } from 'vue';

  const formattedDate = ref('');  

  const store = useCounterStore();
  const { id_transaksi, data_transaksi } = storeToRefs(store);
  const { simpanIdTransaksi, simpanDataTransaksi } = store;

  const router = useRouter();


  let token = localStorage.getItem("token");
  let visible = ref(true);

  let checker = ref([])

  let users = ref()
  let certificates = ref()
  let logbook = ref()
  let task = ref()
  let task_done = ref()

  // let date_now = ref()
  const date = ref(new Date());

  const chartAbsen = ref(null);
  const chartLogbook = ref(null);

  let nilai_chartAbsen = ref()
  let nilai_chartLogbook = ref()

  let butuh_persetujuan = ref([])


  const endpoint = import.meta.env.VITE_ENDPOINT;

  const openSchedule = async (d) => {
    let date = d.toLocaleDateString()
    let x = {date}
    // console.log(x)
    try {
        let res = await axios.post(`${endpoint}/schedule`, x, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        // console.log(res.data)
        const pesan = res.data?.status;
        toast.success(pesan, { autoClose: 2000 });
        setTimeout(() => {
            location.reload();
        }, 1000);
    } catch (error) {
        // const pesan = res.data?.status;
        console.log(error)
        toast.error(error.response.data.message, { autoClose: 2000 });
    }
}


  const renderUsers = async () => {
    try {
      let res = await axios.get(`${endpoint}/user/getDataOnlyUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      users.value = data.length;
    } catch (error) {
      console.log(error);
    }
  };

  const renderCertificate = async () => {
    try {
      let res = await axios.get(`${endpoint}/certificate/getCertificate`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      certificates.value = data.length;
    } catch (error) {
      console.log(error);
    }
  };

  const renderLogbook = async () => {
    try {
      let res = await axios.get(`${endpoint}/logbook/getDataLogbookForDashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      logbook.value = data.length;
    } catch (error) {
      console.log(error);
    }
  };

  const renderTask = async () => {
    try {
      let res = await axios.get(`${endpoint}/todo/getTodo`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data?.data;
      task.value = data.length;
    } catch (error) {
      console.log(error);
    }
  };

  const renderTaskDone = async () => {
    try {
      let res = await axios.get(`${endpoint}/todo/getTodoDone`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = res.data?.data;
      task_done.value = data.length;
    } catch (error) {
      console.log(error);
    }
  };
  
  const renderPieAbsen = async (date) => {
    try {
      let tanggal = date.toLocaleDateString().split('/')
      for (let i = 0; i < tanggal.length; i++) {
        if (parseInt(tanggal[i]) < 10) {
          tanggal[i] = '0' + tanggal[i]
        }
      }

      let format = `${tanggal[2]}-${tanggal[0]}-${tanggal[1]}`
      let res = await axios.get(`${endpoint}/attendance/getDataAttendanceByDate/${format}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let absen = res.data?.data || []
      console.log(absen)
      checker.value = absen

      let data_absen = [0,0,0]
      for (let i = 0; i < absen.length; i++) {
        if (absen[i].keterangan == 1) {
          data_absen[0] += 1
        }
        if (absen[i].keterangan == null) {
          data_absen[1] += 1
        }
        if (absen[i].keterangan == 0) {
          data_absen[2] += 1
        }   
      }

      if (nilai_chartAbsen.value) {
        nilai_chartAbsen.value.destroy()
      }

      const data = {
        labels: ['Masuk', 'Tidak Masuk', 'Izin/ Sakit'],
        datasets: [
          {
            data: data_absen,
            backgroundColor: ['#50C878' , '#FF6384', '#FFCE56'],
            hoverBackgroundColor: [ '#50C878',  '#FF6384', '#FFCE56'],
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };
    
      // if (chartAbsen.value) {
        
        setTimeout(() => { 
          // console.log(chartAbsen?.value)
          if (!chartAbsen.value) {
            return
          }
          const ctx = chartAbsen.value?.getContext('2d');
          let x = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options,
          });
          nilai_chartAbsen.value = x  
        }, 500)
        
      // }
    } catch (error) {
      console.log(error)
    }
    
  }

  const renderPieLogbook = async (date) => {
    try {
      let tanggal = date.toLocaleDateString().split('/')
      for (let i = 0; i < tanggal.length; i++) {
        if (parseInt(tanggal[i]) < 10) {
          tanggal[i] = '0' + tanggal[i]
        }
      }
      let format = `${tanggal[2]}-${tanggal[0]}-${tanggal[1]}`

      let res = await axios.get(`${endpoint}/logbook/getDataLogbookByDate/${format}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let absen = res.data?.data
      let data_absen = [0,0]
      for (let i = 0; i < absen.length; i++) {
        if (absen[i].status != 0) {
          data_absen[0] += 1
        }
        else {
          data_absen[1] += 1
        }
      }

      if (nilai_chartLogbook.value) {
        nilai_chartLogbook.value.destroy()
      }

      const data = {
        labels: ['Mengisi', 'Belum Mengisi'],
        datasets: [
          {
            data: data_absen,
            backgroundColor: ['#50C878', '#FF6384'],
            hoverBackgroundColor: ['#50C878', '#FF6384' ],
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
      };
    
      // if (chartLogbook.value) {
        
        setTimeout(() => { 
          // console.log(chartLogbook?.value)
          if (!chartAbsen.value) {
            return
          }
          const ctx = chartLogbook?.value.getContext('2d');
          let x = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options, });
          nilai_chartLogbook.value = x
        }, 500)
        
      // }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(date)

  const renderNeedAproval = async (date) => {
    try {
      // date = date || new Date()
      // console.log(date)
      let tanggal = date.toLocaleDateString().split('/') 
      for (let i = 0; i < tanggal.length; i++) {
        if (parseInt(tanggal[i]) < 10) {
          tanggal[i] = '0' + tanggal[i]
        }
      }
      let format = `${tanggal[2]}-${tanggal[0]}-${tanggal[1]}`
      // console.log(format)

      let res = await axios.get(`${endpoint}/logbook/getDataLogbookByDateAndNeedAproval/${format}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let data = res.data?.data
      console.log(data, 'ini bth')
      butuh_persetujuan.value = data
      
    } catch (error) {
      console.log(error)
    }
  }
 
  const renderDateNow =  () => {
    date.value = new Date()
    renderNeedAproval(date)
  };

  const pindahDetail = (id) => {
    router.push({ path: `/admin/logbook/${id}` })
  }

  

  onMounted(() => {
    renderDateNow()
    renderUsers();
    renderCertificate();
    renderLogbook();
    renderTask();
    renderTaskDone();
    // renderNeedAproval(newDate);
  });

  watch(date, (newDate) => {
  renderPieAbsen(newDate);
  renderPieLogbook(newDate);
  renderNeedAproval(newDate);

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
    display:flex;
    justify-content:space-between;
  }

  .notif{
    width: 100%;
    background-color: #fff;
    margin-bottom: 1rem;
    padding: 2rem 5rem 2rem 5rem;
    border-radius: 1rem;
  }

  .title-notif{
    display:flex;
    justify-content: space-between
  }

  .card-container {
    width: 100%;
    height: 8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    /* max-width: 800px; */
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