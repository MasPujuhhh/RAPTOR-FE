<template>
    <div class="wrapper" style="display: flex; width: 100%; height: 100%">
        <!-- left -->
        <SidebarAdmin></SidebarAdmin>

        <!-- right -->
        <div style="
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        " class="right">
            <div class="header">
                <HeaderAdmin></HeaderAdmin>
            </div>

            <!-- content -->
            <div style="
            width: 100%;
            /* min-height: 100vh; */
            height: 100%;
            display: flex;
            margin-top: 5rem;
            flex-direction: column;
            align-items: center;
            padding-left: 300px;
            padding-bottom: 1%;
            gap: 20px;
          " class="container-content">

                <div class="flex-container">
                    <div style="width: 30%;">
                        <div class="left-content">
                            <div class="todo">
                                <div class="title">
                                    <div class="todo-head"
                                        style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding: 0.5rem; border-bottom: 2px solid black;">
                                        <h4>TODO</h4>
                                        <h6> {{ logbook[0]?.due_date ? `Tenggat, ${moment(logbook[0]?.due_date).format('LL')}` : `` }}  </h6>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between; height: 1.8rem; ">
                                    <p v-if="logbook?.progress == 100">done</p>
                                    <p v-else>on-progress</p>
                                    <p>{{ logbook?.progress }}%</p>
                                </div>
                                <div class="progress mb-4">
                                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar"
                                        :style="logbook?.persen_progress" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div class="todo-body">
                                    <h5 class="pt-3">{{ logbook?.title }}</h5>
                                    <ol v-if="logbook.todo ? logbook?.todo[0]?.todo_id : ''" class="list-group list-group-numbered">
                                        <li v-for="list in logbook?.todo" class="list-group-item d-flex justify-content-between align-items-start">
                                            <div v-if="list.done" class="ms-2 me-auto"><del>{{ list.description }}</del></div>
                                            <i v-if="list.done" class="bi bi-check-circle-fill"></i>

                                            <div v-if="!list.done" class="ms-2 me-auto">{{ list.description }}</div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="left-content mt-4">
                            <div class="title">
                                <div class="todo-head"
                                    style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding: 0.5rem; border-bottom: 2px solid black;">
                                    <h4>USER</h4>
                                </div>
                                <div class="todo-body" style="font-size: medium;">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">{{ logbook?.username }} ( {{ logbook?.fullname }} | {{ logbook?.school }} )</li>
                                        <li class="list-group-item">{{ logbook?.company_role }} | {{ logbook?.company }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="right-content">
                        <!-- {{ logbook[0] }} -->
                        <div class="title">
                            <div class="todo-head"
                                style="margin-bottom: 1rem; padding: 0.5rem; border-bottom: 2px solid black;">
                                <h4>LOGBOOK</h4>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 14px; padding: 0rem 1rem 0 1rem;">
                                <p>Tanggal :  {{ moment(logbook?.date).format('ll') }}</p>
                                <p>Keterangan :  {{ logbook?.absen }}</p>
                                <p>Status :  {{ logbook?.info }}</p>
                                <!-- <p>list</p>
                                <p>a</p> -->
                            </div>
                        </div>
                        <div class="textarea" style="width: 100%;">
                            <textarea v-model="textAreaValue" placeholder="Masukkan teks di sini" style="padding: 0.5rem; height: 250px;" ></textarea>
                            <!-- <div style="border-top: 1px  black; border-style:groove; margin-bottom: 0.1rem;"></div> -->
                            <div style="border-top: 1px black; border-style:groove; margin-bottom: 0.8rem;"></div>
                            <h6>Komentar</h6>
                            <textarea v-model="commentAreaValue" placeholder="Masukkan komentar di sini" style="padding: 0.5rem;"></textarea>
                        </div>
                        <div style="display: flex; justify-content: end;">
        
                            <button v-if="logbook?.status !== 3" @click="revisi()" type="button" class="" style="margin-right: 1rem; background-color: #ffc107;">
                                Revisi
                            </button>
                            <button v-if="logbook?.status !== 3" @click="acc()" type="button" class="btn btn-success" >
                                Setujui
                            </button> 
                        </div>
                        <!-- <button @click="submitForm">Kirim</button> -->
                    </div>
                </div>
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
import { routerKey, useRouter, useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import moment from "moment";
  
  
const router = useRouter();
const route = useRoute()


const textAreaValue = ref('');

const user_id = ref('')
const commentAreaValue = ref('');


const store = useCounterStore();
const { tokenAdmin, id_client } = storeToRefs(store);
const { simpanIdUsers } = store;


let logbook = ref([]);
let valid = localStorage.getItem("token");
// console.log(valid)

const endpoint = import.meta.env.VITE_ENDPOINT;

const renderLogbookById = async () => {
    try {
        // console.log(route.params.id)
        let res = await axios.get(`${endpoint}/logbook/getDataLogbookById/${route.params.id}`,  {
            headers: {
                Authorization: `Bearer ${valid}`,
                "Content-Type": "application/json",
            },
        });
        // console.log(res.data?.data[0].todo[0].id)\

        const data = res.data?.data;
        if (data.todo.id == 'tes') {
            data.progress = '100'
        }

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
        
        // console.log(data[0])
        data.persen_progress = `width:${data.progress}%`
        user_id.value = data.user_id
        textAreaValue.value = data.description
        logbook.value = data
        console.log(logbook.value)
    } catch (error) {
        console.log(error);
    }
};


const acc = async () => {
    try {
        let update = await axios.put(`${endpoint}/logbook/accLogbook/${route.params.id}`, {}, {
            headers: {
                Authorization: `Bearer ${valid}`,
                "Content-Type": "application/json",
            },
        });
        // console.log(update)
        const data2 = update.data?.data;
        // console.log(data2)
        toast.success("Berhasil Setujui Logbook", {
            autoClose: 2000,
        });
        setTimeout(() => {
            router.push({ path: "/admin/logbook" });
          }, 1000);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.pesan, {
            autoClose: 2000,
        });
    }
};

const revisi = async () => {
    try {
        let x = {
            comment:commentAreaValue.value,
            user_id:user_id.value,
            logbook_id:route.params.id
        };

        let res = await axios.post(`${endpoint}/comment/createComment`, x, {
            headers: {
                Authorization: `Bearer ${valid}`,
                "Content-Type": "application/json",
            },
        });
        const data = res.data?.data;
        let update = await axios.put(`${endpoint}/logbook/revisiLogbook/${route.params.id}`, {}, {
            headers: {
                Authorization: `Bearer ${valid}`,
                "Content-Type": "application/json",
            },
        });
        const data2 = res.data?.data;
        console.log(data2)
        toast.success("Berhasil Revisi Logbook", {
            autoClose: 2000,
        });
        setTimeout(() => {
            router.push({ path: "/admin/logbook" });
          }, 1000);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.pesan, {
            autoClose: 2000,
        });
    }
};

const pindahDetail = async (id) => {
    try {
        // console.log(id);
        // await simpanIdUsers(id);

        router.push({ path: `/admin/logbook/${id}` });
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    renderLogbookById();
});

</script>
  
<style scoped>
.flex-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 4rem;
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
  