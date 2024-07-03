<script setup>
import Navbar from "../../components/Navbar.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import axios from "axios";
import moment from "moment";
import { ref, onMounted, watch } from "vue";

const date = ref();
const show = ref(false);
const showtask = ref(false);
const todos = ref([]);
const todoid = ref("");
const tasks = ref([
  {
    name: "dashboard",
    is_check: false,
    label: "on going",
    created_at: "2024-06-12",
  },
  {
    name: "baj",
    is_check: false,
    label: "done",
    created_at: "2024-06-12",
  },
  {
    name: "wms",
    is_check: false,
    label: "doing today",
    created_at: "2024-06-12",
  },
  {
    name: "bahtera",
    is_check: false,
    label: "in progress",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
  {
    name: "jaya",
    is_check: false,
    label: "gabisa",
    created_at: "2024-06-12",
  },
]);

const taskPlus = [
  {
    name: "plus",
    is_check: false,
    label: "plus",
    created_at: "2024-06-12",
  },
];

const endpoint = import.meta.env.VITE_ENDPOINT;
let token = localStorage.getItem("token");

const fetchTodo = async () => {
  try {
    const res = await axios.get(`${endpoint}/tugas/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    todos.value = res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const fetchTask = async (todoid) => {
  try {
    const res = await axios.get(`${endpoint}/tugas/detail/${todoid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data.data);
  } catch (e) {
    console.log(e);
  }
};

// watch(todoid, (todoid) => {
//   fetchTask(todoid)
// })

const addTask = () => {
  tasks.value = [...tasks.value, ...taskPlus];
  showtask.value = false;
};

onMounted(() => {
  fetchTodo();
  fetchTask();
});
</script>

<template>
  <div
    class="container-fluid d-flex flex-column align-items-center min-vh-100"
    style="margin-top: 5rem"
  >
    <Navbar></Navbar>
    <div
      class="row bg-success text-white rounded-4 p-2 w-100 d-flex justify-content-center align-items-center text-center mb-4"
      v-if="!show"
    >
      <div class="col">
        <h1>ini notif</h1>
      </div>
    </div>
    <div class="row w-100 mb-5">
      <div
        class="col p-3 d-flex justify-content-between align-items-center rounded-4 bg-white shadow"
      >
        <VueDatePicker v-model="date" class="w-25"></VueDatePicker>
        <h3>
          {{
            moment(date).format("LL") !== "no date"
              ? `${moment(date).format("dddd")},
                    ${moment(date).format("LL")}`
              : ""
          }}
        </h3>
      </div>
    </div>
    <div class="row w-100 mb-4">
      <div class="col d-flex justify-content-end">
        <RouterLink to="/absen">
          <button class="btn btn-lg btn-secondary">klik akuh</button>
        </RouterLink>
      </div>
    </div>
    <div class="row d-flex w-100 min-vh-100">
      <div class="col col-4 d-flex justify-content-center p-3 h-25">
        <div
          class="d-flex flex-column align-items-center bg-white w-100 p-4 rounded-3 shadow"
        >
          <select name="select" class="form-select mb-3" v-model="todoid">
            <option v-for="task in tasks">{{ task.name }}</option>
          </select>
          <div
            class="fw-bold fs-5 border-bottom border-2 border-black w-100 mb-4 d-flex justify-content-between"
          >
            <p>Doing Today</p>
            <p>Tenggat Tanggal</p>
          </div>
          <div class="progress w-100 mb-4" style="height: 26px">
            <div
              class="progress-bar bg-success"
              role="progressbar"
              style="width: 25%"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              25%
            </div>
          </div>
          <div class="w-100">
            <p class="d-flex justify-content-between fw-semibold">
              BAJ WMS FRONTEND
              <span class="badge rounded-pill bg-secondary">{{
                tasks.length
              }}</span>
            </p>
            <ul class="list-group">
              <li
                class="list-group-item d-flex justify-content-between"
                v-for="task in tasks"
              >
                <span
                  :class="task.is_check ? `text-decoration-line-through` : ``"
                  ><input
                    type="checkbox"
                    class="form-check-input me-2"
                    @change="task.is_check = !task.is_check"
                    style="cursor: pointer"
                  />
                  {{ task.name }}</span
                ><span v-if="task.is_check"
                  ><i class="bi bi-check-circle-fill"></i
                ></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col col-8 d-flex justify-content-center p-3">
        <div
          class="d-flex flex-wrap justify-content-center bg-secondary w-100 p-4 rounded-3 shadow gap-3"
          style="overflow-y: scroll"
        >
          <div
            class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3"
            style="width: 45%; min-height: 25%"
            v-for="task in tasks"
          >
            <div
              class="d-flex gap-2 justify-content-between border-bottom border-black py-1 h-25"
            >
              <h6>{{ task.name }}</h6>
              <h6>{{ task.label }}</h6>
              <h6>{{ moment(task.created_at).format("ll") }}</h6>
            </div>
            <div class="h-50"></div>
            <div
              class="d-flex justify-content-between align-items-center border-top border-black pt-3"
            >
              <button class="btn btn-warning text-white">edit</button>
              <button class="btn btn-danger">delete</button>
            </div>
          </div>
          <div
            class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3"
            style="width: 45%; min-height: 25%"
            v-if="showtask"
          >
            <div
              class="d-flex gap-2 justify-content-center border-bottom border-black py-1 h-25"
            >
              <div class="d-flex h-75 gap-4" style="width: 100%">
                <input type="text" class="form-control form-control-sm" />
                <select type="text" class="form-select form-select-sm"></select>
              </div>
            </div>
            <div class="h-50">
              <textarea type="text" class="form-control h-100" />
            </div>
            <div
              class="d-flex justify-content-between align-items-center border-top border-black pt-3"
            >
              <button class="btn btn-danger" @click="showtask = false">
                cancel
              </button>
              <button class="btn btn-success" @click="addTask()">add</button>
            </div>
          </div>
          <button
            class="bg-white shadow rounded-3 border-0 btn fs-1"
            style="width: 45%; min-height: 25%"
            @click="showtask = true"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
