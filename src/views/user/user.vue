<script setup>
import Navbar from "../../components/Navbar.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import axios from "axios";
import moment from "moment";
import { ref, onMounted } from "vue";

const date = ref();
const show = ref(false)
const todos = ref([])
const todoid = ref()
const tasks = ref()

const endpoint = import.meta.env.VITE_ENDPOINT;
let token = localStorage.getItem("token");


const fetchTodo = async () => {
    try {
        const res = await axios.get(`${endpoint}/tugas/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        todos.value = res.data.data
    } catch (e) {
        console.log(e);
    }
}

const fetchTask = async (todoid) => {
    try {
        const res = await axios.get(`${endpoint}/tugas/detail/${todoid}`)
        console.log(res.data.data);
    } catch (e) {
        console.log(e);
    }
}

// watch(todoid, (todoid) => {
//   fetchTask(todoid)
// })

onMounted(() => {
    fetchTodo()
    fetchTask()
})
</script>

<template>
    <div class="container-fluid d-flex flex-column align-items-center min-vh-100" style="margin-top: 5rem;">
        <Navbar></Navbar>
        <div class="row bg-primary rounded-4 p-2 w-100 d-flex justify-content-center align-items-center text-center mb-4"
            v-if="!show">
            <div class="col">
                <h1>ini notif</h1>
            </div>
        </div>
        <div class="row w-100 mb-4">
            <div class="col p-1 d-flex justify-content-between align-items-center">
                <VueDatePicker v-model="date" class="w-25"></VueDatePicker>
                <h2>{{ moment(date).format('LL') !== 'no date' ? `${moment(date).format('dddd')},
                    ${moment(date).format('LL')}` : '' }}</h2>
            </div>
        </div>
        <div class="row d-flex w-100">
            <div class="col col-4 d-flex justify-content-center p-3 bg-secondary">
                <div class="d-flex flex-column align-items-center justify-content-center bg-white w-100 p-4 rounded-3">
                    <select name="select" class="form-select mb-3" v-model="todoid">
                        <option :value="todo.id" :key="todo.id" v-for="todo in todos">{{ todo.judul }}</option>
                    </select>
                    <p class="fw-bold fs-3 border-bottom border-2 border-black w-100 pb-1 mb-4">Doing Today</p>
                    <div class="progress w-100 mb-4" style="height: 26px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 25%;" aria-valuenow="25"
                            aria-valuemin="0" aria-valuemax="100">25%</div>
                    </div>
                    <div>
                        <div>{{ todoid }}</div>
                    </div>
                </div>
            </div>
            <div class="col col-8 d-flex justify-content-center p-3 bg-success">
                <h1>kanan</h1>
            </div>
        </div>
    </div>
</template>