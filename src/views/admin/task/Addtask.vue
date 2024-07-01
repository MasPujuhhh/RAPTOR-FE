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
            min-height: 100vh;
            height: 100%;
            display: flex;
            margin-top: 10vh;
            flex-direction: column;
            align-items: center;
            padding-left: 300px;
            padding-bottom: 1%;
            gap: 20px;
          " class="container-content">
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
            <h2 style="font-weight: bold; font-size: 30px">Master Produk</h2>
          </div> -->
                <!-- header end -->
                <!-- table -->
                <div style="
              width: 90%;
              min-height: 79vh;
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
                    <!-- form -->
                    <div style="
                width: 98%;
                height: 96%;
                background-color: #f8f9fa;
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 10px;
              " class="outer-table">
                        <div style="
                  width: 100%;
                  height: 60px;
                  display: flex;
                  padding-left: 20px;
                  align-items: center;
                  border-top-right-radius: 10px;
                  border-top-left-radius: 10px;
                  background-color: #f8f9fa;
                  box-shadow: 0rem 0.2rem 0.3rem rgba(0, 0, 0, 0.4);
                " class="header-form">
                            <h2 style="font-weight: bold">Tambah Tugas</h2>
                        </div>
                        <!-- form content -->
                        <table class="table table-borderless table-hover table-light">
                            <tbody>
                                <tr>
                                    <!-- nama produk -->
                                    <td width="200px">Deadline</td>
                                    <td width="20px">:</td>
                                    <td>
                                        <input v-model="deadline" type="number" class="form-control" id="title"
                                            aria-describedby="textHelp" />
                                    </td>
                                    <!-- nama produk end -->
                                </tr>
                                <tr>
                                    <!-- nama produk -->
                                    <td width="200px">Title</td>
                                    <td width="20px">:</td>
                                    <td>
                                        <input v-model="title" type="text" class="form-control" id="title"
                                            aria-describedby="textHelp" />
                                    </td>
                                    <!-- nama produk end -->
                                </tr>
                                <tr>
                                    <!-- stok produk -->
                                    <td width="200px">Tugas</td>
                                    <td width="20px">:</td>
                                    <td>
                                        <div v-for="(input, index) in inputs" :key="index"
                                            style="margin-bottom: 0.5rem; display: flex;">
                                            <!-- <label :for="'input' + index">{{ index + 1 }}.</label> -->
                                            <input v-model="inputs[index]" type="text" class="form-control"
                                                :id="'input' + index" aria-describedby="textHelp" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <!-- button -->
                                    <td width="200px" colspan="3">
                                        <div style="display: flex; flex-direction: row-reverse" class="button">
                                            <button v-if="busy == false" @click="addInput" type="button"
                                                class="btn btn-secondary">
                                                <i class="bi bi-plus"></i>
                                                Tambah Tugas
                                            </button>
                                            <!-- <button v-if="busy == true" type="button" class="btn btn-success" disabled>
                                                <div class="spinner-border text-light" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </button> -->
                                        </div>
                                    </td>
                                    <!-- button end -->
                                </tr>
                                <tr style="border-top: 1px solid black; border-bottom: 1px solid black;">
                                    <!-- varian produk -->
                                    <td width="200px">User</td>
                                    <td width="20px">:</td>
                                    <td>
                                        <div v-for="u in users" class="form-check">
                                            <input v-model="list_user_id" class="form-check-input" type="checkbox"
                                                :value="u.id" id="defaultCheck1" />
                                            <label class="form-check-label" for="defaultCheck1">
                                                {{ u.username }} ( {{ u.company_role }} | {{ u.fullname }} )
                                            </label>
                                        </div>
                                    </td>
                                    <!-- varian produk end -->
                                </tr>
                                <tr>
                                    <!-- <hr> -->
                                    <!-- button -->
                                    <td width="200px" colspan="3">
                                        <div style="display: flex; flex-direction: row-reverse" class="button">
                                            <!-- <hr> -->
                                            <button v-if="busy == false" @click="addTask" type="button"
                                                class="btn btn-success">
                                                <!-- <i class="bi bi-plus"></i> -->
                                                Submit
                                            </button>
                                            <!-- <button v-if="busy == true" type="button" class="btn btn-success" disabled>
                                                <div class="spinner-border text-light" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </button> -->
                                        </div>
                                    </td>
                                    <!-- button end -->
                                </tr>
                            </tbody>
                        </table>
                        <!-- form content end -->
                    </div>
                    <!-- form end -->
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
import { routerKey, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const store = useCounterStore();
const { token, id_user } = storeToRefs(store);
const { simpanIdUsers } = store;

const router = useRouter();

let busy = ref(false);

// let produk = ref([]);
let kategori = ref([]);
let varian = ref([]);
let cate = ref("" || "Silahkan Pilih Kategori");
let valid = localStorage.getItem("token");

let namaProduk = ref("");
let kategoriProduk = ref("");
let hargaProduk = ref();
let stokProduk = ref();
let varianProduk = ref([]);
let varian_list = ref([]);
let gambarProduk = ref(null);
let deskripsiProduk = ref("");



let list_user_id = ref([])
let users = ref([])
let title = ref('')
let deadline = ref()

const endpoint = import.meta.env.VITE_ENDPOINT;



const inputs = ref([]);

// Function to add a new input field
const addInput = () => {
    inputs.value.push('');
};

const viewUsers = async () => {
    try {
        let res = await axios.get(`${endpoint}/user/getDataOnlyUser`, {
            headers: {
                Authorization: `Bearer ${valid}`,
                "Content-Type": "application/json",
            },
        });

        const data = res.data?.data;
        users.value = data;
    } catch (error) {
        console.log(error);
    }
};

const addTask = async () => {
    try {
        let data = {
            title: title.value,
            deadline: deadline.value,
            todos: inputs.value,
            users: list_user_id.value,
        }
        let res = await axios.post(`${endpoint}/todo/createTodo`, data, {
            headers: {
                Authorization: `Bearer ${valid}`,
                "Content-Type": "application/json",
            },
        });
        const pesan = res.data?.status;
        toast.success(pesan, { autoClose: 2000 });
        setTimeout(() => {
            // busy.value = !busy.value;
            router.push({ path: "/admin/task" });
        }, 1500);
    } catch (error) {
        console.log(error);
        // setTimeout(() => {
        //     busy.value = !busy.value;
        // }, 1500);
    }
};



// watch(token, (newValue, oldValue) => {
//   console.log(newValue);
//   valid.value = token.value;
// });
onMounted(() => {
    viewUsers();
});
</script>
  
<style scoped>
td {
    font-size: 20px;
    font-weight: bold;
}
</style>
  