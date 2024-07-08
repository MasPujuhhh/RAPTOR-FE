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
            style="width: 45%; min-height: 25%; max-height: 30%"
            v-for="task in tasks"
          >
            <div
              class="d-flex gap-2 justify-content-between border-bottom border-black py-1 h-25"
            >
              <h6>{{ task.name }}</h6>
              <h6>{{ task.label }}</h6>
              <h6>{{ moment(task.created_at).format("ll") }}</h6>
            </div>
            <div class="h-50 overflow-y-scroll" style="max-height: 1000px">
              <p>
                Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Soluta itaque unde sunt minima porro tempora molestias odit
                repellat sit debitis aliquam eaque veniam eligendi illo iste
                quas cumque excepturi fugiat, inventore ab. Earum quos
                laboriosam quaerat, exercitationem repellat commodi esse
                repudiandae officia similique ea vel blanditiis ut iure
                inventore! Ab possimus modi deleniti vero. Vitae ullam nostrum
                obcaecati eaque veniam amet aliquam enim. Repudiandae commodi
                porro quod, quaerat unde labore ipsum ab non quidem ullam
                numquam, eius recusandae amet, asperiores explicabo provident
                quo ad sint nobis placeat exercitationem? Tempore animi ipsa,
                voluptatum accusamus illo corrupti, aliquam cum nostrum dolore
                eligendi magni atque beatae, error ullam. Distinctio dolor qui,
                tempora ab voluptates enim dolores officiis dolore est nisi,
                veniam dolorem maiores, quos consequuntur quo? Atque,
                voluptates! Et labore fuga amet, eveniet, ullam officiis
                suscipit provident ratione eligendi error vero. Nisi optio
                expedita dicta consectetur eaque exercitationem, doloremque vero
                porro! Iste voluptatum voluptates enim earum nostrum temporibus!
                Dicta, minus. Magni aspernatur unde nemo iure accusamus?
                Pariatur consectetur dolor aspernatur, consequatur qui alias
                velit saepe hic odio ullam eligendi incidunt iusto aut soluta
                enim reiciendis consequuntur tempora fugiat officia modi
                possimus! Suscipit earum eius aliquid voluptatem consequuntur
                sunt ullam illum eum culpa perferendis animi deleniti nisi
                molestias repellendus, quo debitis veritatis exercitationem
                iusto qui assumenda temporibus. Voluptas reprehenderit aperiam
                illo sint culpa perferendis inventore temporibus obcaecati quam
                asperiores aut sapiente impedit quis eum maiores officia
                consequatur voluptatum accusantium, vero, soluta adipisci.
                Corporis odit praesentium tempora error! Nobis distinctio, illum
                saepe assumenda, quibusdam pariatur doloribus voluptate sed
                accusamus amet eveniet quod. Cum odio vitae praesentium? Nisi,
                amet soluta. Accusamus sapiente blanditiis nostrum a
                consequuntur, alias officiis voluptas possimus vel perferendis
                aliquam quas, impedit vero ipsam suscipit dolor distinctio
                laboriosam itaque doloremque recusandae facere rem. Minima
                maiores, aspernatur consequatur exercitationem ipsa saepe,
                voluptatem alias totam, ad sed reiciendis est nisi ex
                repudiandae eos delectus quae. Blanditiis sint mollitia
                laudantium nostrum quos soluta temporibus iste beatae. Corrupti
                aut reprehenderit sed cum magni sapiente perferendis eius.
                Fugiat consequatur, libero harum illum minima voluptatum
                molestias vitae, aut, repudiandae facere placeat ab. Sed, saepe
                esse. Maiores sapiente qui sit voluptate hic saepe architecto
                perferendis accusantium eius reprehenderit earum repellat illum
                aspernatur quae reiciendis molestiae sequi recusandae fugit
                consectetur iure natus, necessitatibus laboriosam deserunt ipsa!
                Temporibus tenetur sequi reiciendis excepturi, consequatur
                aliquam, vero commodi aliquid dicta deserunt fuga voluptates
                illo. Quasi magnam vero, possimus, iusto doloribus, sint
                architecto fugiat alias fugit neque ipsa assumenda. Iste
                doloribus vel error, ducimus pariatur dolores reiciendis, odio
                voluptatum quibusdam facilis non! Vitae, beatae enim libero sed
                sint fugiat modi aperiam nulla, cupiditate debitis nostrum
                incidunt explicabo impedit, quae eos fuga maiores ullam dicta.
                Iusto, laudantium. Tempore nesciunt nostrum corporis
                perferendis. Reiciendis facere iusto ratione hic debitis libero
                fugit obcaecati fuga? Ad illum nostrum nobis maiores obcaecati
                voluptate asperiores, labore ratione doloribus accusantium alias
                minus delectus velit cumque laudantium debitis totam illo! Quae
                reprehenderit aliquid alias expedita quidem. Dolores quia,
                voluptatem debitis deleniti temporibus minima sequi fugit
                repellat cum. Esse illo perspiciatis illum dolorem tempora dicta
                cum repellat, vel nostrum hic maiores quisquam cupiditate
                ducimus sed quibusdam, deserunt obcaecati itaque. Repellat
                repudiandae dicta similique! Tenetur libero nobis laboriosam ab
                consequatur alias fugiat asperiores? Nisi nostrum autem
                assumenda accusantium odit provident ea culpa deleniti
                perspiciatis magni quas, rem totam facilis! Quibusdam dolorum
                harum inventore ipsam! Debitis laborum, expedita atque pariatur
                nam dolore aliquam, earum ipsa nesciunt magni quo sed mollitia
                excepturi magnam blanditiis quae est possimus. Quisquam,
                dolorem? Assumenda neque in laudantium voluptatibus, nemo
                incidunt facere beatae delectus, vitae labore ipsa qui.
                Temporibus repellat officia quidem quo quibusdam! Doloremque
                repellendus illum dolores, rem aliquam vel nihil eligendi
                ducimus, nesciunt animi deleniti molestias consequuntur soluta
                eveniet in ab minima necessitatibus repudiandae autem quo
                debitis commodi voluptatem. Quis dignissimos, repudiandae ipsum
                similique corporis explicabo? Similique, eos illo laborum non
                iste fugiat, dolore dicta et blanditiis id nostrum quibusdam
                voluptatum optio tempore expedita nulla aperiam velit
                repellendus. Voluptate explicabo autem accusantium rem totam,
                voluptates adipisci iste vel facilis quia impedit, eaque est
                molestias beatae. Quod atque minima, itaque commodi odio
                recusandae earum voluptatibus, beatae dolore assumenda
                laboriosam. Ipsum assumenda veritatis voluptatum reprehenderit
                doloribus blanditiis laudantium quas necessitatibus deleniti,
                fuga obcaecati fugiat itaque aspernatur vel sapiente eius unde
                eveniet, distinctio adipisci ex cumque quae facere. Iusto nemo
                quidem id blanditiis, pariatur veniam delectus sit enim?
                Accusantium aperiam nemo, magnam provident recusandae quia modi
                exercitationem vitae aliquid quis architecto mollitia reiciendis
                animi sunt impedit ad consequatur rerum laborum amet saepe
                consequuntur? Molestiae natus dolores, repellat vel ullam
                laudantium eum asperiores minima fugiat quidem. Omnis architecto
                quibusdam at quis! Modi, ipsum. Id perspiciatis tenetur
                excepturi provident aperiam soluta temporibus itaque molestias
                impedit facere. Porro voluptas adipisci obcaecati nesciunt
                numquam nostrum explicabo accusantium amet incidunt alias libero
                dolorem quibusdam exercitationem, debitis doloremque nemo earum
                cumque commodi deleniti non! Fugit iusto doloremque odio quod
                quisquam adipisci facilis, possimus nostrum atque dolore ipsum
                quas vitae eligendi voluptatibus fugiat architecto mollitia
                velit! Harum possimus nostrum assumenda totam nobis in quae
                eveniet, tenetur neque suscipit debitis dignissimos molestias
                accusamus aspernatur iure eius dolorum ipsum earum consectetur
                similique! Illum, magnam sint. Deserunt cumque debitis,
                consectetur ab, beatae nulla pariatur ipsa provident ipsum quia
                labore excepturi dicta omnis possimus quaerat quidem dolorem
                dolores nam. Quas similique praesentium quod quaerat voluptas
                provident consequatur, qui animi, inventore modi dolorem sequi
                excepturi. Modi, sapiente velit fugiat aspernatur quidem
                necessitatibus quod? Distinctio totam sit molestias corporis
                repudiandae voluptas harum dolorum eius architecto quisquam
                cumque, ex iusto tempora dignissimos beatae quasi sunt. Officia
                rem nobis, perspiciatis fugit qui sapiente porro. Iure nostrum
                minima minus voluptatum explicabo. Asperiores fugiat,
                consequatur perspiciatis excepturi quisquam, praesentium facilis
                reprehenderit ullam magnam sunt voluptate earum. Aut doloribus
                fugiat error sapiente. Nam voluptatum voluptates, eos molestias,
                deleniti minus sapiente unde asperiores, mollitia rem sit
                consectetur voluptas numquam inventore! Voluptatem, maiores
                numquam dolorem ipsam libero ipsum ipsa omnis quasi, corrupti
                culpa cum porro sed saepe nihil ea voluptates blanditiis? Dolore
                ipsam eaque quas modi dicta laboriosam possimus, aut temporibus,
                voluptatibus sed placeat, inventore delectus cupiditate quisquam
                quis at nihil! Totam, quia?
              </p>
            </div>
            <div
              class="d-flex justify-content-between align-items-center border-top border-black pt-3"
            >
              <button class="btn btn-warning text-white">edit</button>
              <button class="btn btn-danger">delete</button>
            </div>
          </div>
          <div
            class="bg-white d-flex flex-column justify-content-between shadow rounded-3 p-3"
            style="width: 45%; min-height: 25%; max-height: 30%"
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
            style="width: 45%; min-height: 25%; max-height: 30%"
            @click="showtask = true"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
