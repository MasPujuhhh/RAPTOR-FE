import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import moment from "moment";
import "moment/dist/locale/id";
import App from "./App.vue";
import router from "./router";
import dotenv from "dotenv";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueDatePicker from '@vuepic/vue-datepicker';
import  VueSelect  from "vue-select";
import '@vuepic/vue-datepicker/dist/main.css'

// const app = createApp(App);




dotenv.config;
// console.log(process.env.VUE_APP_ENDPOINT, "ini main");
moment.locale("id");

const app = createApp(App);

app.component('VueDatePicker', VueDatePicker);
app.component("v-select", VueSelect)

app.config.globalProperties.$moment = moment;

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);




app.mount("#app");
