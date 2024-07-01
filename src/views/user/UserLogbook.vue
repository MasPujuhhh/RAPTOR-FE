<template>


<Navbar></Navbar>
  <!-- hero section -->
  <!-- content -->
  <div style="
    margin-top: 5rem;
" class="container-content">
    <!-- content -->
    <div style="
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
          " class="container-content">
                <div style="
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
            " class="container-table">
                    <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 98%;
                height: 10%;
                /* padding-left: 20px; */
                padding-right: 20px;
              " class="table-header">
                    </div>
                    <h4 style="font-weight: bold"> Histori Logbook</h4>
                    <div style="
                width: 98%;
                height: 96%;
                display: flex;
                justify-content: center;
              " class="outer-table">

                        <div class="table-responsive">
                            <!-- inner table -->

                            <div v-for="item in logbook">
                                <h4 style="padding-top: 1rem; padding-left: 0.5rem;">{{ moment(item.date).format('dddd') }}, {{ moment(item.date).format('LL') }}</h4>

                                <!-- table -->
                                <table class="table table-bordered table-hover align-middle">
                                    <thead style="height: 60px; padding: 0; text-align: center"
                                        class="table table-light align-middle">
                                        <tr>
                                            <th scope="col" style="width: 60px; font-weight: bold; font-size: 18px">
                                                No
                                            </th>
                                            <th scope="col" style="width: 600px; font-weight: bold; font-size: 18px">
                                                Username
                                            </th>
                                            <th scope="col" style="width: 400px; font-weight: bold; font-size: 18px">
                                                Nama | Role
                                            </th>
                                            <th scope="col" style="width: 600px; font-weight: bold; font-size: 18px">
                                                Status
                                            </th>
                                            <th scope="col" style="width: 300px; font-weight: bold; font-size: 18px">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody style="height: 60px; padding: 0; text-align: center" class="table align-middle">
                                        <tr v-for="(u, i) in item.data" :class="u.bg" style="height: 60px;">
                                            <td scope="row">{{ i + 1 }}</td>
                                            <td>{{ u.username }}</td>
                                            <td>{{ u.fullname ? u.fullname : '-' }} | {{ u.company_role ? u.company_role :
                                                '-' }}</td>
                                            <td>{{ u.info }}</td>
                                            <td>
                                                <div style="
                                                        display: flex;
                                                        gap: 10px;
                                                        justify-content: center;
                                                    " class="action">
                                                    <!-- <button @click="simpanId(u.id)" type="button" class="btn btn-danger"
                                                        data-bs-toggle="modal" data-bs-target="#modalDelete" style="
                                                            box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                                                        ">
                                                        <i class="bi bi-trash3-fill"></i>
                                                    </button> -->
                                                    <!-- modal delete -->
                                                    <div class="modal fade" id="modalDelete" tabindex="-1"
                                                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 style="font-weight: bold" class="modal-title fs-5"
                                                                        id="exampleModalLabel">
                                                                        Confirm Required
                                                                    </h1>
                                                                    <button type="button" class="btn-close"
                                                                        data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div style="font-weight: bold" class="modal-body">
                                                                    Are you sure delete this item?
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button type="button" class="btn btn-secondary"
                                                                        data-bs-dismiss="modal">
                                                                        Cancel
                                                                    </button>
                                                                    <button type="button" class="btn btn-primary"
                                                                        data-bs-dismiss="modal" @click="deleteUser">
                                                                        Confirm
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- modal delete end -->

                                                    <button v-if="u.status == 0 || u.status == 2" @click="pindahEdit(u.id)" type="button"
                                                        class="btn btn-warning"
                                                        style="box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>                                        
                                                    <button v-if="u.status == 1 || u.status == 3" @click="pindahDetail(u.id)" type="button"
                                                        class="btn btn-secondary"
                                                        style="box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);">
                                                        <i class="bi bi-search"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- table end -->
                            </div>
                        </div>

                        <!-- inner table -->
                    </div>
                </div>
            </div>
            <!-- content end -->
    </div>
</template>
  
<script setup>
import Navbar from"@/components/Navbar.vue";
// import SidebarAdmin from "../../../components/SidebarAdmin.vue";
// import HeaderAdmin from "../../../components/HeaderAdmin.vue";
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

let logbook = ref([]);
let valid = localStorage.getItem("token");

const endpoint = import.meta.env.VITE_ENDPOINT;

// console.log(endpoint)
const viewLogbook = async () => {
    try {
        let res = await axios.get(`${endpoint}/logbook/getDataLogbookByToken`, {
            headers: {
                Authorization: `Bearer ${valid}`,
                "Content-Type": "application/json",
            },
        });
        const data = res.data?.data;
        for (const key in data) {
            let x = data[key].data
            for (const key2 in x) {
                if (x[key2].status == 0) {
                    x[key2].info = 'Belum Mengumpulkan'
                    x[key2].bg = 'table-danger'
                } else if (x[key2].status == 1) {
                    x[key2].info = 'Menunggu Persetujuan'
                    x[key2].bg = 'table-warning'
                } else if (x[key2].status == 2) {
                    x[key2].info = 'Kirim Ulang'
                    x[key2].bg = 'table-info'
                } else {
                    x[key2].info = 'Disetujui'
                    x[key2].bg = 'table-success'
                }
            }
        }
        logbook.value = data
    } catch (error) {
        console.log(error);
    }
};

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
        router.push({ path: `/logbook/${id}` });
    } catch (error) {
        console.log(error);
    }
};

const pindahEdit = async (id) => {
    try {
        router.push({ path: `/logbook/edit/${id}` });
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    viewLogbook();
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