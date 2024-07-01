<template>
    <Navbar></Navbar>
    <!-- hero section -->
    <!-- content -->
    <div style="
      margin-top: 5rem;
  " class="container-content">
  
          <div class="header">
            <div class="date">
              <VueDatePicker v-model="date" style="width:19%" :disabled="true"></VueDatePicker>
              <h2 style="width:25%" >{{ moment(date).format('LL') !== 'Invalid Date' ? `${moment(date).format('dddd')}, ${moment(date).format('LL')}` : ''  }}</h2>
            </div>
          </div>
          <div class="flex-container">
              <div style="width: 30%;">
                  <div class="left-content">
                      <div class="todo">
                          <div class="title" style="justify-content: end;">
                            <select v-model="todo_id" class="form-select" aria-label="Default select example">
                                <option v-for="i in list_todo" :key="i.id" :value="i.id">{{ i.title }}</option>
                            </select>
                          </div>
                          <div class="title">
                              <div class="todo-head"
                                  style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding: 0.5rem; border-bottom: 2px solid black;">
                                  <h4>TODO</h4>
                                  <h6> {{ todo ? todo[0]?.due_date ? `Tenggat, ${moment(todo[0]?.due_date).format('LL')}` : `tidak ada tenggat` : ''   }}  </h6>
                              </div>
                          </div>
                          <div>
                          </div>
                          <div style="display: flex; justify-content: space-between; height: 1.8rem; ">
                            <!-- {{ todo[0]. }} -->
                              <p v-if="todo ? todo[0]?.progress == 100 : ''">done</p>
                              <p v-else>on-progress</p>
                              <p>{{ todo ? todo[0]?.progress : '-' }}%</p>
                          </div>
                          <div class="progress mb-4">
                            
                              <div class="progress-bar progress-bar-striped bg-success" role="progressbar"
                                  :style="todo ? todo[0]?.persen_progress : ''" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <div class="todo-body">
                              <!-- {{ todo }} -->
                              <h5 class="pt-3">{{ todo ? todo[0]?.title : '' }}</h5>
                              <ol v-if="todo ? todo.length : ''" class="list-group list-group-numbered">
                                  <li v-for="list in todo[0]?.todo" class="list-group-item d-flex justify-content-between align-items-start">
                                      <div v-if="list.done" class="ms-2 me-auto"><del>{{ list.description }}</del></div>
                                      <i v-if="list.done" class="bi bi-check-circle-fill"></i>
                                      <div v-if="!list.done" class="ms-2 me-auto">{{ list.description }}</div>
                                  </li>
                              </ol>
                          </div>
                      </div>
                  </div>
              </div>
  
              <div class="right-content">
                  <!-- {{ logbook ? logbook[0] : '' }} -->
                  <div class="title">
                      <div class="todo-head"
                          style="margin-bottom: 1rem; padding: 0.5rem; border-bottom: 2px solid black;">
                          <h4>LOGBOOK</h4>
                      </div>
                      <div v-if="logbook?.status == 0 || logbook?.status == 2" style="width: 60%; display: flex; justify-content: space-between; font-size: 16px; padding: 0rem 1rem 0 1rem;">
                          <p>Keterangan :  
                          </p>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="keterangan" value="1" :checked="logbook?.keterangan == 1">
                            <label class="form-check-label" for="inlineRadio1">Masuk</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" v-model="keterangan" value="0" :checked="logbook?.keterangan == 0">
                            <label class="form-check-label" for="inlineRadio2">Ijin/Sakit</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" v-model="keterangan" value='2' :checked="logbook?.keterangan == null">
                            <label class="form-check-label" for="inlineRadio3">Tidak Masuk</label>
                          </div>
                      </div>
  
                      <div v-if="logbook ? logbook?.status == 1 : ''" style="display: flex; justify-content: space-between; font-size: 14px; padding: 0rem 1rem 0 1rem;">
                          <p>Tanggal :  {{ moment(logbook?.date).format('ll') }}</p>
                          <p>Keterangan :  {{ logbook?.absen }}</p>
                          <p>Status :  {{ logbook?.info }}</p>
                      </div>
                      <div v-if="logbook ? logbook?.status == 3 : ''" style="display: flex; justify-content: space-between; font-size: 14px; padding: 0rem 1rem 0 1rem;">
                          <p>Tanggal :  {{ moment(logbook?.date).format('ll') }}</p>
                          <p>Keterangan :  {{ logbook?.absen }}</p>
                          <p>Status :  {{ logbook?.info }}</p>
                      </div>
                  </div>
                  <div class="textarea" style="width: 100%;">
                      <textarea v-if="logbook ? logbook?.status == 0 : ''" v-model="textAreaValue" placeholder="Masukkan teks di sini" style="font-size: 1.2rem; padding: 1rem; height: 400px;" ></textarea>
                      <textarea v-if="logbook ? logbook?.status == 1 : ''" v-model="logbook.description" :placeholder="logbook ? logbook.description : ''" style="font-size: 1.2rem; padding: 1rem; height: 400px;" disabled></textarea>
                      <textarea v-if="logbook ? logbook?.status == 2 : ''" v-model="logbook.description"  style="font-size: 1.2rem; padding: 1rem; height: 400px;" ></textarea>
                      <textarea v-if="logbook ? logbook?.status == 3 : ''" v-model="logbook.description" :placeholder="logbook ? logbook.description : ''" style="font-size: 1.2rem; padding: 1rem; height: 400px;" disabled></textarea>
  
                      <div style="border-top: 1px black; border-style:groove; margin-bottom: 0.8rem;"></div>
  
                      <div v-if="logbook ? logbook?.status == 2 : ''">
                        <h6>Komentar</h6>
                        <textarea v-model="commentAreaValue" :placeholder="logbook?.comment ? logbook?.comment : '-'" style="padding: 0.5rem;" disabled></textarea>
                      </div>
  
                      <div v-if="logbook ? logbook?.status == 3 : ''">
                        <h6>Komentar</h6>
                        <textarea v-model="commentAreaValue" :placeholder="logbook?.comment ? logbook?.comment : '-'" style="padding: 0.5rem;" disabled></textarea>
                      </div>
                  </div>
                  <div style="display: flex; justify-content: end;">
                      <button v-if="logbook ? logbook?.status == 0 : ''" @click="kirim(logbook.id)" type="button" class="btn btn-success" >
                          Kirim
                      </button> 
  
                      <button v-if="logbook ? logbook?.status == 1 : ''" @click="" type="button" class="btn btn-success" disabled>
                          Menunggu Persetujuan
                      </button>
  
                      <button v-if="logbook ? logbook?.status == 2 : ''" @click="kirim(logbook.id)" type="button" class="btn btn-success">
                          Kirim Ulang
                      </button> 
                  </div>
                  <!-- <button @click="submitForm">Kirim</button> -->
                  
              </div>
          </div>
      </div>
      <!-- content end -->
  </template>
  
  
  <script setup>
    import Navbar from "@/components/Navbar.vue";
    import axios from "axios";
    import { useCounterStore } from "@/stores/counter";
    import { storeToRefs } from "pinia";
    import { routerKey, useRouter, useRoute } from "vue-router";
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
    const route = useRoute()
  
  
    let token = localStorage.getItem("tokenUser");
    let visible = ref(true);
  
    let checker = ref()
    
    let list_todo = ref()
    let todo_id = ref()
    let todo = ref()
    let refresh = ref()

    let data_id = ref()
  
  
    const keterangan = ref()
  
    let users = ref()
    let logbook = ref()
    let task = ref()
    let task_done = ref()
    const date = ref();
  
    const textAreaValue = ref('');
    const user_id = ref('')
    const commentAreaValue = ref('');
  
    const endpoint = import.meta.env.VITE_ENDPOINT;

    
    const renderLogbookById = async () => {
        try {
        // console.log(route.params.id)
        let res = await axios.get(`${endpoint}/logbook/getDataLogbookById/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = res.data?.data;
        // date.value = data.date
        // todo_id.value = data.todo[0]?.id

        if (data.status == 0) {
            data.info = 'Belum Mengumpulkan'
            data.bg = 'table-ligth'
        } else if (data.status == 1) {
            data.info = 'Menunggu Persetujuan'
            data.bg = 'table-warning'
        } else if (data.status == 2) {
            data.info = 'Kirim Ulang'
            data.bg = 'table-info'
        } else {
            data.info = 'Disetujui'
            data.bg = 'table-success'
        }

        if (data.keterangan == null) {
            data.absen = 'alfa'
        } else if (data.keterangan == 0) {
            data.absen = 'Izin/ Sakit'
        } else if (data.keterangan == 1) {
            data.absen = 'Masuk'
        } 
        
        if (data.todo[0]?.id == 'tes') {
            data.progress = '100'
        }
        logbook.value = data;
        keterangan.value = logbook.value.keterangan
        date.value = data.date
        console.log(logbook.value)
      } catch (error) {
        console.log(error);
      }
    }
  
  
    const renderUsers = async () => {
      try {
        let res = await axios.get(`${endpoint}/user/getDataUserByToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        
        const data = res.data?.data;
        users.value = data;
        // console.log(users.value.id)
      } catch (error) {
        console.log(error);
      }
    };
  
    const renderTodo = async () => {
      try {
        let res = await axios.get(`${endpoint}/todo/getTodoByToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        const data = res.data?.data;
        list_todo.value = data;
        const selectedLogbook = list_todo.value.find(logbook => logbook.title === logbook.title);
        if (selectedLogbook) {
            todo_id.value = selectedLogbook.id;
        }
      } catch (error) {
        console.log(error);
      }
    };
  
  
    const renderTodoList = async (todo_id) => {
      try {
        let res = await axios.get(`${endpoint}/todo/getTodoByTokenAndById/${todo_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(todo.value);
  
        const data = res.data?.data;
        data[0].persen_progress = `width:${data[0].progress}%`
        todo.value = data;
      } catch (error) {
        console.log(error);
      }
    }
  
    const renderLogbook = async (date) => {
      try {

        // console.log(date, typeof date)
        date = date?.split('T')[0]
        let res = await axios.get(`${endpoint}/logbook/getDataLogbookByUserId/${date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        
        const data = res.data?.data;
        for (const key in data) {
            if (data[key].status == 0) {
                data[key].info = 'Belum Mengumpulkan'
                data[key].bg = 'table-ligth'
            } else if (data[key].status == 1) {
                data[key].info = 'Menunggu Persetujuan'
                data[key].bg = 'table-warning'
            } else if (data[key].status == 2) {
                data[key].info = 'Kirim Ulang'
                data[key].bg = 'table-info'
            } else {
                data[key].info = 'Disetujui'
                data[key].bg = 'table-success'
            }
  
            if (data[key].keterangan == null) {
                data[key].absen = '-'
            } else if (data[key].keterangan == 0) {
                data[key].absen = 'Izin/ Sakit'
            } else if (data[key].keterangan == 1) {
                data[key].absen = 'Masuk'
            } 
        }
  
        
        logbook.value = data;
        console.log(logbook.value)
      } catch (error) {
        console.log(error);
      }
    };
  
    const kirim = async (id) => {
      try {

        let description = logbook.value.status == 0 ? textAreaValue.value : logbook.value.description
        let x = {
          description,
          keterangan:keterangan.value,
          todo_id:todo_id.value
        }

        console.log('id =',id, 'x =',x )
  
        let res = await axios.post(`${endpoint}/logbook/createLogbook/${route.params.id}`, x, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        console.log(res.data?.data[1])
        refresh.value = res.data?.data[1]
        let pesan = res.data?.status

        toast.success(pesan, { autoClose: 2000 });
        setTimeout(() => {
          location.reload();
        }, 1000);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.pesan, {
              autoClose: 2000,
        });
      }
    }
   
    const renderDateNow =  () => {
      renderLogbook(date.value);
    };
  
    const pindahDetail = (id) => {
      router.push({ path: `/admin/logbook/${id}` })
    }
  
    
  
    onMounted(async () => {
      renderLogbookById()
      renderUsers();
      renderTodo();
    });
  
    // watch(date, (newDate) => {
    //   renderLogbook(newDate)
    // });
  
    watch(todo_id, (newTodoId)=>{
      renderTodoList(newTodoId)
    })
  </script>
  
  
  <style scoped>
  
    .header {
      width: 100%;
      text-align: right;
      /* margin-bottom: 20px; */
      padding: 0 4rem 0 4rem;
    }
  
    .date {
      font-size: 18px;
      display:flex;
      justify-content:space-between;
    }
  .flex-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 2rem 4rem 0 4rem;
      /* background-color: white; */
  }
  
  .left-content {
      width: 100%;
      background-color: #fff;
      padding: 2rem;
      box-sizing: border-box;
      border-radius: 10px;
  }
  
  .right-content {
      width: 67%;
      background-color: #fff;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 10px;
  }
  
  .todo {
      margin-bottom: 1rem;
      /* background-color: #fff; */
  }
  
  .title {
      font-size: 24px;
      margin-bottom: 10px;
  }
  
  .list-group {
      list-style: none;
      padding: 0;
      margin: 0;
  }
  
  .list-item {
      margin-bottom: 5px;
  }
  
  .progress-bar {
      width: 100%;
      background-color: #ddd;
      height: 20px;
      border-radius: 5px;
  }
  
  .progress-fill {
      height: 100%;
      background-color: #4caf50;
      border-radius: 5px;
  }
  
  .right-content textarea {
      width: 100%;
      height: 100px;
      margin-bottom: 10px;
  }
  
  .right-content button {
      padding: 10px;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }
  </style>