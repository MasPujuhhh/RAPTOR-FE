<template>

    <Navbar></Navbar>
    <div class="wrapper" style="display: flex; width: 100%; height: 100%">
      <!-- left -->
      <!-- <SidebarAdmin></SidebarAdmin> -->
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
        <!-- <div class="header">
          <HeaderAdmin></HeaderAdmin>
        </div> -->
  
        <!-- content -->
        <div
          style="
            width: 100%;
            min-height: 100vh;
            height: 100%;
            display: flex;
            margin-top: 10vh;
            flex-direction: column;
            align-items: center;
            padding-left: 50px;
            padding-bottom: 1%;
            gap: 20px;
          "
          class="container-content"
        >
          <!-- header -->
          <!-- <div
            style="
              width: 100%;
              min-height: 9vh;
              height: 20%;
              display: flex;
              align-items: center;
              padding-left: 20px;
            "
            class="content-header"
          >
            <h2 style="font-weight: bold; font-size: 30px">Master User</h2>
          </div> -->
          <!-- header end -->
          <!-- table -->
          <div
            style="
              width: 90%;
              min-height: 85vh;
              height: 100%;
              background-color: #d0d4ca;
              display: flex;
              flex-direction: column;
              padding-top: 1%;
              align-items: center;
              gap: 10px;
              border-radius: 10px;
              box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
            "
            class="container-table"
          >
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 98%;
                height: 10%;
                padding-left: 20px;
                padding-right: 20px;
              "
              class="table-header"
            >
              <h4 style="font-weight: bold">Histori Tugas</h4>
            </div>
            <div
              style="
                width: 98%;
                height: 96%;
                display: flex;
                justify-content: center;
              "
              class="outer-table"
            >
            
              <div class="table-responsive">
                <!-- inner table -->
                <table class="table table-bordered table-hover align-middle">
                  <thead
                    style="height: 60px; padding: 0; text-align: center"
                    class="table table-light align-middle"
                  >
                    <tr>
                      <th
                        scope="col"
                        style="width: 60px; font-weight: bold; font-size: 18px"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        style="width: 600px; font-weight: bold; font-size: 18px"
                      >
                        Judul
                      </th>
                      <th
                        scope="col"
                        style="width: 500px; font-weight: bold; font-size: 18px"
                      >
                        Tenggat
                      </th>
                      <th
                        scope="col"
                        style="width: 700px; font-weight: bold; font-size: 18px"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        style="width: 400px; font-weight: bold; font-size: 18px"
                      >
                        Dibuat Oleh
                      </th>
                      <th
                        scope="col"
                        style="width: 300px; font-weight: bold; font-size: 18px"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style="height: 60px; padding: 0; text-align: center"
                    class="table align-middle"
                  >
                    <tr
                      v-for="(u, i) in todos"
                      style="height: 60px"
                      :class="u.bg"
                    >
                      <td scope="row">{{ i + 1 }}</td>
                      <td>{{ u.title }}</td>
                      <td>{{ u.due_date ? moment(u.due_date).format('LLL') : 'tidak ada' }}</td>
                      <td>{{ u.todo_done ? 'selesai' : 'onprogress' }} <br> {{ u.todo_done ? u.info : '' }}</td>
                      <td>{{ u.created_by }}</td>
                      <!-- <td>{{ u.expired_at }}</td> -->
                      <td>
                        <!-- action -->
                        <div
                          style="
                            display: flex;
                            gap: 10px;
                            justify-content: center;
                          "
                          class="action"
                        >
                          <button
                            v-if="u.id !== 'tes'"
                            @click="detailTodo(u.id, u.bg)"
                            type="button"
                            class="btn btn-secondary"
                            style="
                              box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                            "
                            data-bs-toggle="modal"
                            data-bs-target="#detail"
                          >
                            <i class="bi bi-search"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <!-- inner table -->
            </div>
          </div>
          <!-- Modal -->
          <div class="modal fade modal-lg" id="detail" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header"  :style="{backgroundColor:detail_todos[0]?.bg}">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Todo Detail</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style="display: flex; gap: 1.8rem; padding: 1rem; justify-content: center;">
                            <div style="width: 57%; height: auto; " >
                                <h3>{{ detail_todos[0]?.title }}</h3>
                                <h6>{{ moment(detail_todos[0]?.due_date).format('LLL') }}</h6>
                                <h6 style="margin-bottom: 2rem;">
                                    <button v-if="detail_todos[0]?.todo_done" type="button" class="btn btn-success">{{ detail_todos[0]?.todo_done ? 'selesai' : 'onprogress'}}</button>
                                    <button v-else type="button" class="btn btn-warning">{{ detail_todos[0]?.todo_done ? 'selesai' : 'onprogress'}}</button>
                                </h6>

                                <h5>Todo</h5>
                                <ol class="list-group list-group-numbered">
                                    <li v-for="item in detail_todos[0]?.data"
                                        class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div>{{ item.description }}</div>
                                            <!-- {{ item.company_role }} | {{ item.company }} -->
                                        </div>
                                        <div v-if="!item.done == null">
                                            <span class="me-2"></span>
                                            <span class="bi bi-x-circle-fill" style="color: red;"></span>
                                        </div>
                                        <div v-else-if="item.done">
                                            <span class="me-2"></span>
                                            <span class="bi bi-check-circle-fill" style="color: green;"></span>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            <div style="width: 37%; height: auto; border-left: 1px solid black; padding-left: 1rem;">
                                <!-- <div style="margin-bottom: 5rem;"></div> -->
                                <h5>User</h5>
                                <ol class="list-group list-group-numbered">
                                    <li v-for="item in detail_todos"
                                        class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div>{{ item.data[0].username }} ( {{ item.data[0].company_role }} | {{ item.data[0].fullname ? item.data[0].fullname : '-'  }} )</div>
                                            <!-- {{ item.company_role }} | {{ item.company }} -->
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <!-- <div v-if="data.datas?.length">
                                <h6>Jumlah Peserta : {{ data?.total }}</h6>
                                <h6>Jumlah Peserta Mengisi Logbook : {{ data?.attendance }}</h6>

                                <h3>Daftar Peserta</h3>
                                <ol class="list-group list-group-numbered">
                                    <li v-for="item in data?.datas"
                                        class="list-group-item d-flex justify-content-between align-items-start">
                                        <div class="ms-2 me-auto">
                                            <div class="fw-bold">{{ item.username }} - {{ item.fullname }}</div>
                                            {{ item.company_role }} | {{ item.company }}
                                        </div>
                                        <div v-if="item.keterangan == null">
                                            <span class="me-2"></span>
                                            <span class="bi bi-x-circle-fill" style="color: red;"></span>
                                        </div>
                                        <div v-else-if="item.keterangan == 0">
                                            <span class="me-2"></span>
                                            <span class="bi bi-check-circle-fill" style="color: green;"></span>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <div v-else>Schedule not Created</div> -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{Close}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- content end -->

        <!-- Modal -->
        <!-- Modal End -->

      </div>
    </div>
  </template>
  
  <script setup>
    import Navbar from"@/components/Navbar.vue";
    import { onMounted, ref, watch } from "vue";
    import axios from "axios";
    import { useCounterStore } from "@/stores/counter";
    import { storeToRefs } from "pinia";
    import { routerKey, useRouter } from "vue-router";
    import { toast } from "vue3-toastify";
    import "vue3-toastify/dist/index.css";
    import moment from "moment";
  
    const store = useCounterStore();
    const { tokenAdmin, id_client } = storeToRefs(store);
    const { simpanIdUsers } = store;
  
    const router = useRouter();
  
    let bg_detail = ref('')
    let todos = ref([]);
    let detail_todos = ref([])

    let valid = localStorage.getItem("token");
  
    const endpoint = import.meta.env.VITE_ENDPOINT;
  
    // console.log(endpoint)
    const viewTodo = async () => {
      try {
        let res = await axios.get(`${endpoint}/todo/getTodoByToken`, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data?.data;
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].status)
            if (data[i].status_pengumpulan) {
                data[i].info = 'tepat waktu'
                data[i].bg = 'table-success'
            } else if (data[i].status_pengumpulan == 0)  {
                data[i].info = 'terlambat'
                data[i].bg = 'table-danger'
            } else {
                data[i].bg = 'table-warning'
            }
          todos.value.push(data[i]);
        }
        console.log(todos);
      } catch (error) {
        console.log(error);
      }
    };

    const detailTodo = async (id, bg)=>{
        try {
            let res = await axios.get(`${endpoint}/todo/getTodoDetailById/${id}`, {
                headers: {
                    Authorization: `Bearer ${valid}`,
                    "Content-Type": "application/json",
                },
            });

            const data = res.data?.data

            for (const key in data) {
                if (data[key].status_pengumpulan) {
                data[key].info = 'tepat waktu'
                data[key].bg = 'green'
            } else if (data[key].status_pengumpulan == 0)  {
                data[key].info = 'terlambat'
                data[key].bg = 'red'
            } else {
                data[key].bg = 'yellow'
            }
            }
            // bg_detail.value = bg
            detail_todos.value = data
            // console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
  

    let delete_id 
    const simpanId = async (id) => {
      delete_id = id
    };
  
    const deleteTask = async ()=>{
    try {
        await axios.delete(`${endpoint}/todo/deleteTodo/${delete_id}`, {
            headers: {
                Authorization: `Bearer ${valid}`,
                "Content-Type": "application/json",
            },
        });toast.success("Berhasil Delete Tugas", {
          autoClose: 2000,
        });
        setTimeout(() => {
          location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    }
  
  
    onMounted(() => {
      viewTodo();
    });
  </script>
  
  <style scoped>
    .content td {
      font-size: 16px;
      font-weight: bold;
    }
  
    .content tr:hover {
      background-color: aquamarine !important;
    }
  </style>