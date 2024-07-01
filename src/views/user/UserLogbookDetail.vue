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
              <!-- {{ data_id }} -->
              <h2 style="width:25%" >{{ moment(data_id?.date).format('LL') !== 'Invalid data_id.Date' ? `${moment(data_id?.date).format('dddd')}, ${moment(data_id?.date).format('LL')}` : ''  }}</h2>
              <!-- <h3>{{ moment(data_id?.date_now).format('MMMM Do YYYY, h:mm:ss a') }}</h3> -->
            </div>
          </div>
  
          <div class="flex-container">
              <div style="width: 30%;">
                  <div class="left-content">
                      <div class="todo">
                          <div class="title" style="justify-content: end;">
                            <select v-model="todo_id" class="form-select" aria-label="Default select example" disabled>
                                <option :value="data_id?.todo[0].id" selected>{{ data_id?.todo[0].title }}</option>
                            </select>

                          </div>
                          <div class="title">
                              <div class="todo-head"
                                  style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding: 0.5rem; border-bottom: 2px solid black;">
                                  <h4>TODO</h4>
                                  <h6> {{ data_id?.todo ? data_id?.todo[0]?.due_date ? `Tenggat, ${moment(data_id?.todo[0]?.due_date).format('LL')}` : `tidak ada tenggat` : ''   }}  </h6>
                              </div>
                          </div>
                          <div style="display: flex; justify-content: space-between; height: 1.8rem; ">
                              <p v-if="data_id ? data_id?.progress == 100 : ''">done</p>
                              <p v-else>on-progress</p>
                              <p>{{ data_id ? data_id?.progress : '-' }}%</p>
                          </div>
                          <div class="progress mb-4">
                              <div class="progress-bar progress-bar-striped bg-success" role="progressbar"
                                  :style="data_id ? data_id?.persen_progress : ''" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                          <div class="todo-body">
                              <h5 class="pt-3">{{ data_id?.todo ? data_id?.todo[0]?.title : '' }}</h5>
                              <ol v-if="data_id?.todo ? data_id?.todo.length : ''" class="list-group list-group-numbered">
                                  <li v-if="data_id?.todo[0].id !== 'tes'" v-for="list in data_id?.todo" class="list-group-item d-flex justify-content-between align-items-start">
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
                    <div class="title">
                        <div class="todo-head"
                            style="margin-bottom: 1rem; padding: 0.5rem; border-bottom: 2px solid black;">
                            <h4>LOGBOOK</h4>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 14px; padding: 0rem 1rem 0 1rem;">
                            <p>Tanggal :  {{ moment(data_id?.date).format('ll') }}</p>
                            <p>Keterangan :  {{ data_id?.absen }}</p>
                            <p>Status :  {{ data_id?.info }}</p>
                        </div>
                    </div>
                    <div class="textarea" style="width: 100%;">
                        <textarea v-model="textAreaValue" placeholder="Masukkan teks di sini" style="padding: 0.5rem; height: 250px;" disabled></textarea>
                        <div style="border-top: 1px black; border-style:groove; margin-bottom: 0.8rem;"></div>
                        <div v-if="data_id?.comment">
                            <h6>Komentar</h6>
                            <textarea v-model="commentAreaValue" placeholder="Masukkan komentar di sini" style="padding: 0.5rem;" disabled></textarea>
                        </div>
                    </div>
                    <!-- <button @click="submitForm">Kirim</button> -->
                </div>
  
                <!-- <div class="right-content">
                  <div class="title">
                      {{ data_id }}
                      <div class="todo-head"
                          style="margin-bottom: 1rem; padding: 0.5rem; border-bottom: 2px solid black;">
                          <h4>LOGBOOK</h4>
                      </div>
                      <div v-if="data_id ? data_id?.status == 0 : ''" style="width: 60%; display: flex; justify-content: space-between; font-size: 16px; padding: 0rem 1rem 0 1rem;">
                          <p>Keterangan :  
                          </p>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" v-model="keterangan" value="1">
                            <label class="form-check-label" for="inlineRadio1">Masuk</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" v-model="keterangan" value="0">
                            <label class="form-check-label" for="inlineRadio2">Ijin/Sakit</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" v-model="keterangan" value="">
                            <label class="form-check-label" for="inlineRadio3">Tidak Masuk</label>
                          </div>
                      </div>
  
                      <div v-if="logbook ? logbook[0]?.status == 1 : ''" style="display: flex; justify-content: space-between; font-size: 14px; padding: 0rem 1rem 0 1rem;">
                          <p>Tanggal :  {{ moment(logbook[0]?.date).format('ll') }}</p>
                          <p>Keterangan :  {{ logbook[0]?.absen }}</p>
                          <p>Status :  {{ logbook[0]?.info }}</p>
                      </div>
                      <div v-if="logbook ? logbook[0]?.status == 2 : ''" style="display: flex; justify-content: space-between; font-size: 14px; padding: 0rem 1rem 0 1rem;">
                          <p>Tanggal :  {{ moment(logbook[0]?.date).format('ll') }}</p>
                          <p>Keterangan :  {{ logbook[0]?.absen }}</p>
                          <p>Status :  {{ logbook[0]?.info }}</p>
                      </div>
                      <div v-if="logbook ? logbook[0]?.status == 3 : ''" style="display: flex; justify-content: space-between; font-size: 14px; padding: 0rem 1rem 0 1rem;">
                          <p>Tanggal :  {{ moment(logbook[0]?.date).format('ll') }}</p>
                          <p>Keterangan :  {{ logbook[0]?.absen }}</p>
                          <p>Status :  {{ logbook[0]?.info }}</p>
                      </div>
                  </div>
                  <div class="textarea" style="width: 100%;">
                      <textarea v-if="logbook ? logbook[0]?.status == 0 : ''" v-model="textAreaValue" placeholder="Masukkan teks di sini" style="font-size: 1.2rem; padding: 1rem; height: 400px;" ></textarea>
                      <textarea v-if="logbook ? logbook[0]?.status == 1 : ''" v-model="logbook[0].description" :placeholder="logbook ? logbook[0].description : ''" style="font-size: 1.2rem; padding: 1rem; height: 400px;" disabled></textarea>
                      <textarea v-if="logbook ? logbook[0]?.status == 2 : ''" v-model="logbook[0].description"  style="font-size: 1.2rem; padding: 1rem; height: 400px;" ></textarea>
                      <textarea v-if="logbook ? logbook[0]?.status == 3 : ''" v-model="logbook[0].description" :placeholder="logbook ? logbook[0].description : ''" style="font-size: 1.2rem; padding: 1rem; height: 400px;" disabled></textarea>
  
                      <div style="border-top: 1px black; border-style:groove; margin-bottom: 0.8rem;"></div>
  
                      <div v-if="logbook ? logbook[0]?.status == 2 : ''">
                        <h6>Komentar</h6>
                        <textarea v-model="commentAreaValue" :placeholder="logbook[0]?.comment ? logbook[0]?.comment : '-'" style="padding: 0.5rem;" disabled></textarea>
                      </div>
  
                      <div v-if="logbook ? logbook[0]?.status == 3 : ''">
                        <h6>Komentar</h6>
                        <textarea v-model="commentAreaValue" :placeholder="logbook[0]?.comment ? logbook[0]?.comment : '-'" style="padding: 0.5rem;" disabled></textarea>
                      </div>
                  </div>
                  <div style="display: flex; justify-content: end;">
                      <button v-if="logbook ? logbook[0]?.status == 0 : ''" @click="kirim(logbook[0].id)" type="button" class="btn btn-success" >
                          Kirim
                      </button> 
  
                      <button v-if="logbook ? logbook[0]?.status == 1 : ''" @click="" type="button" class="btn btn-success" disabled>
                          Menunggu Persetujuan
                      </button>
  
                      <button v-if="logbook ? logbook[0]?.status == 2 : ''" @click="kirim(logbook[0].id)" type="button" class="btn btn-success">
                          Kirim Ulang
                      </button> 
                  </div>
              </div> -->
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
    

    let tes = ref('tes')

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
  
    // let date_now = ref()
    const date = ref();
  
    const textAreaValue = ref('');
  
    const user_id = ref('')
    const commentAreaValue = ref('');
  
  
    // console.log(todo.value)
    const endpoint = import.meta.env.VITE_ENDPOINT;
  
    const renderLogbookById = async () => {
        try {
        let res = await axios.get(`${endpoint}/logbook/getDataLogbookById/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        

        const data = res.data?.data;
        data_id.value = data;
        date.value = data.date
        todo_id.value = data.todo[0].id

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
        
        if (data.todo[0].id == 'tes') {
            data.progress = '100'
        }
        data.persen_progress = `width:${data.progress}%`
        user_id.value = data.user_id
        textAreaValue.value = data.description
        commentAreaValue.value = data.comment
        console.log(data_id.value)
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
        let tanggal = date.toLocaleDateString().split('/')
        for (let i = 0; i < tanggal.length; i++) {
          if (parseInt(tanggal[i]) < 10) {
            tanggal[i] = '0' + tanggal[i]
          }
        }
        let format = `${tanggal[2]}-${tanggal[0]}-${tanggal[1]}`
        let res = await axios.get(`${endpoint}/logbook/getDataLogbookByUserId/${format}`, {
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
        // console.log('id', id)
        // console.log('description', textAreaValue.value)
        // console.log('keterangan', keterangan.value)
        // console.log('todo_id', todo_id.value)
        let x = {
          description:textAreaValue.value,
          keterangan:keterangan.value,
          todo_id:todo_id.value
        }
  
        let res = await axios.post(`${endpoint}/logbook/createLogbook/${id}`, x, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        refresh.value = res.data?.data[1]
  
        // console.log(refresh.value)
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
      date.value = new Date()
      // console.log(date.value)
      // renderNeedAproval(date)
      renderLogbook(date.value);
    };
  
    const pindahDetail = (id) => {
      router.push({ path: `/admin/logbook/${id}` })
    }
  
    
  
    onMounted(async () => {
      renderLogbookById()
    //   renderDateNow()
    //   renderUsers();
    //   renderTodo();
      // renderLogbook()
      // setTimeout(() => { renderLogbook(date.value); }, 10)
      // renderTask();
      // renderTaskDone();
      // renderNeedAproval(newDate);
    });
  
    // watch(date, (newDate) => {
    // // renderPieAbsen(newDate);
    // // renderPieLogbook(newDate);
    // // renderNeedAproval(newDate);
    //   renderLogbook(newDate)
    // });
  
    // watch(todo_id, (newTodoId)=>{
    //   renderTodoList(newTodoId)
    // })
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