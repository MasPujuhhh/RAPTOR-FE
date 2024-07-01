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
            margin-top: 10vh;
            flex-direction: column;
            align-items: center;
            padding-left: 300px;
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
            <h2 style="font-weight: bold; font-size: 30px">Master Kehadiran</h2>
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
              <h4 style="font-weight: bold">Kehadiran</h4>
              <!-- <button
                type="button"
                class="btn btn-success"
                style="font-weight: bold"
                @click="$router.push('/admin/user/add')"
              >
                <i class="bi bi-plus"></i>
                Add User
              </button> -->
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
                        style="width: 750px; font-weight: bold; font-size: 18px"
                      >
                        Data
                      </th>
                      <th
                        scope="col"
                        style="width: 500px; font-weight: bold; font-size: 18px"
                      >
                        Rekap
                      </th>
                      <!-- <th
                        scope="col"
                        style="width: 600px; font-weight: bold; font-size: 18px"
                      >
                        Role
                      </th> -->
                      <th
                        scope="col"
                        style="width: 200px; font-weight: bold; font-size: 18px"
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
                      v-for="(u, i) in kehadiran"
                      style="height: 60px"
                    >
                      <td scope="row">{{ i + 1 }}</td>
                      <td>
                        {{ u.fullname }} <br>
                        {{ u.email }} <br>
                        {{ u.username }} <br>
                        {{ u.company_role }} | {{ u.company }}
                      </td>
                      <td>
                        Jumlah Absen      : {{ u.jumlah_absen }} <br>
                        Jumlah Masuk      : {{ u.jumlah_masuk }} <br>
                        Jumlah Alfa       : {{ u.jumlah_alfa }} <br>
                        Jumlah Sakit/Izin : {{ u.jumlah_izin }}
                      </td>

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
                            @click="KehadiranDetail(u.id)"
                            data-bs-toggle="modal" data-bs-target="#datatanggal"
                            type="button"
                            class="btn btn-secondary"
                            style="
                              box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                            "
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
          <!-- Modal Detail -->
          <div class="modal fade modal-l" id="datatanggal" data-bs-backdrop="static" data-bs-keyboard="false"
                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div v-for="u in kehadiran_detail">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                                    Data Kehadiran {{ u.username }} ({{ u.company_role }} | {{ u.company }})
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <!-- <div v-if="data.datas?.length"> -->
                                    <h6>{{ u.fullname }} <br></h6>
                                    <h6>{{ u.email }} <br></h6>
                                    <h6>{{ u.username }} <br></h6>
                                    <h6>{{ u.company_role }} | {{ u.company }}</h6>
                                    <!-- <h6>Jumlah Peserta Mengisi Logbook : {{ u?.attendance }}</h6> -->
                                    <h3>Absensi</h3>
                                    <ol class="list-group list-group-numbered">
                                        <li v-for="item in u.data"
                                            class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">{{ moment(item.date).format('LL') }}</div>
                                            </div>
                                            <div v-if="item.keterangan == null">
                                                <span class="me-2">alfa</span>
                                                <span class="bi bi-x-circle-fill" style="color: red;"></span>
                                            </div>
                                            <div v-else-if="item.keterangan == 0">
                                                <span class="me-2">izin</span>
                                                <span class="bi bi-dash-circle-fill" style="color: orange;"></span>
                                            </div>
                                            <div v-else>
                                                <span class="me-2">masuk</span>
                                                <span class="bi bi-check-circle-fill" style="color: green;"></span>
                                            </div>


                                        </li>
                                    </ol>
                                <!-- </div> -->
                                <!-- <div v-else>Schedule not Created</div> -->
                            </div>
                            <div class="modal-footer">
                                <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{Close}</button>
                                <button v-if="!data.datas?.length" type="button" class="btn btn-primary"
                                    @click="() => openSchedule(data?.date)">Open
                                    Schedule</button> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal Detail End -->
        </div>
        <!-- content end -->
      </div>
    </div>
  </template>
  
  <script setup>
    import SidebarAdmin from "../../../components/SidebarAdmin.vue";
    import HeaderAdmin from "../../../components/HeaderAdmin.vue";
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
  
    let kehadiran = ref([]);
    let kehadiran_detail = ref([]);
    let token = localStorage.getItem("token");
  
    const endpoint = import.meta.env.VITE_ENDPOINT;
  
    // console.log(endpoint)
    const viewUser = async () => {
      try {
        let res = await axios.get(`${endpoint}/attendance/getDataAttendance`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data?.data;
        kehadiran.value = data
        console.log(kehadiran.value)
      } catch (error) {
        console.log(error);
      }
    };


    const KehadiranDetail = async(id)=>{
        try {
            let res = await axios.get(`${endpoint}/attendance/getDataAttendanceById/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            });
            const data = res.data?.data;
            kehadiran_detail.value = data
            console.log(kehadiran_detail)
        } catch (error) {
            console.log(error)
        }
    }
  
    const simpanId = async (id) => {
      try {
        await simpanIdUsers(id);
      } catch (error) {
        console.log(error);
      }
    };
  
    const deleteUser = async () => {
      try {
        let x = {
          user_id: id_client.value,
        };
  
        // console.log(`${endpoint}/user/${id_client.value}`)
        let res = await axios.delete(`${endpoint}/user/deleteUser/${id_client.value}`, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data;
  
        toast.success("Berhasil Delete User", {
          autoClose: 2000,
        });
        setTimeout(() => {
          location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };
  
    const pindahDetail = async (id) => {
      try {
        console.log(id);
        await simpanIdUsers(id);
  
        router.push({ path: `/admin/user/${id}` });
      } catch (error) {
        console.log(error);
      }
    };
  
    onMounted(() => {
      viewUser();
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