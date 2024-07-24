<template>
  <div class="container-fluid d-flex justify-content-center">
    <!-- STATUS -->
    <div class="d-flex flex-column bg-primary justify-content-center p-4 gap-3 bg-white shadow rounded-3">
      <div class="d-flex flex-column align-items-center justify-content-center bg-white shadow rounded-3 p-4">
        <p class="fs-5 fw-semibold text-uppercase border-bottom border-bottom-secondary pb-3 w-100" style="letter-spacing: 0.3px">
          Status
        </p>
        <div class="w-75 d-flex flex-row justify-content-between">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="status" value="masuk" id="masuk" v-model="status" />
            <label class="form-check-label fs-5 fw-medium text-lowercase" for="masuk"> Masuk </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="status" value="wfh" id="wfh" v-model="status" />
            <label class="form-check-label fs-5 fw-medium text-lowercase" for="wfh"> WFH </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="status" value="izin" id="izin" v-model="status" />
            <label class="form-check-label fs-5 fw-medium text-lowercase" for="izin"> Izin </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="status" value="sakit" id="sakit" v-model="status" />
            <label class="form-check-label fs-5 fw-medium text-lowercase" for="sakit"> Sakit </label>
          </div>
        </div>
      </div>

      <img :src="capturedImage" v-if="capturedImage" class="captured-image rounded-3" />

      <!-- FOTO (Kamera atau Form Input) -->
      <div v-if="(status === 'masuk' || status === 'wfh') && !capturedImage" class="d-flex flex-column bg-primary p-4 gap-3 bg-white shadow rounded-3">
        <video ref="video" class="video rounded-3" autoplay></video>
        <button class="btn btn-secondary fw-medium text-lowercase py-2" @click="captureImage">Capture</button>
      </div>
      <div v-else-if="status === 'sakit' || status === 'izin'" class="d-flex flex-column bg-primary p-4 gap-3 bg-white shadow rounded-3">
        <input type="file" @change="handleFileUpload" class="form-control" />
      </div>

      <!-- Tombol Delete dan Save -->
      <div class="d-flex justify-content-between">
        <button class="btn btn-danger w-25" @click="deleteImage">Delete</button>
        <button class="btn btn-success w-25" @click="saveImage">Save</button>
      </div>
    </div>

    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { onBeforeRouteLeave } from 'vue-router';
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";
import moment from "moment";
import "moment/locale/id";

const router = useRouter();
const route = useRoute();

const video = ref(null);
const canvas = ref(null);
const captured = ref(false);
const capturedImage = ref("");
const status = ref();
const absensi = ref({});
const demo = ref('');
const koordinat = ref({
  latitude:null,
  longitude:null
})
let stream = null;
const endpoint = import.meta.env.VITE_ENDPOINT;
let token = localStorage.getItem("token");

const initCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    video.value.srcObject = stream;
  } catch (err) {
    console.error("Error accessing camera: ", err);
  }
};

const captureImage = () => {
  const context = canvas.value.getContext("2d");
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  capturedImage.value = canvas.value.toDataURL("image/png");
  captured.value = true;
  stream.getTracks().forEach((track) => track.stop());
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      capturedImage.value = e.target.result;
      captured.value = true;
    };
    reader.readAsDataURL(file);
  }
};

const deleteImage = () => {
  captured.value = false;
  capturedImage.value = "";
  if (status.value === 'masuk' || status.value === 'wfh') {
    initCamera();
  }
};

const renderAbsen = async (jadwal = null) => {
  try {
    jadwal = route.params.id;
    const res = await axios.get(`${endpoint}/absensi/detail_by_date`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: { jadwal }
    });
    const data = res.data?.data;
    absensi.value = data;
    status.value = data.status
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(error);
  }
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    demo.value = "Geolocation is not supported by this browser.";
    console.log('geo error')
  }
}

function showPosition(position) {
  koordinat.value = {
    latitude:position.coords.latitude,
    longitude:position.coords.longitude
  }
  console.log('koordinat', koordinat)
}

const saveImage = async () => {
  getLocation()
  const blob = await fetch(capturedImage.value).then((res) => res.blob());
  let jadwal = {}
  if (route.query.tipe == 'check_in') {
    jadwal.check_in = new Date()
  }
  if (route.query.tipe == 'check_out') {
    jadwal.check_out = new Date()
  }

  const formData = new FormData();
  formData.append("foto", blob, "captured-image.png");
  formData.append("status", status.value);
  formData.append("absensi_id", absensi.value.id);
  formData.append("koordinat", JSON.stringify({latitude: koordinat.value.latitude, longitude: koordinat.value.longitude}));
  if (jadwal.check_in) {
    formData.append("check_in", jadwal.check_in);
  }
  if (jadwal.check_out) {
    formData.append("check_out", jadwal.check_out);
  }


  console.group(koordinat.value)
  console.log(...formData)

  try {
    const res = await axios.post(`${endpoint}/absensi/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const result = res.data;
    if (res.status == 200) {
      toast.success(`${result.message}`, {
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push('/');
      }, 2500);
    }
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(error);
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
};

watch(status,(new_status) => {
  console.log(new_status)
  if (new_status === 'masuk' || new_status === 'wfh') {
    deleteImage();
  }
  if (new_status === 'izin' || new_status === 'sakit') {
    stopCamera();
  }
});

onMounted(() => {
  renderAbsen();
  if (status.value === 'masuk' || status.value === 'wfh') {
    initCamera();
  }
});

onBeforeUnmount(() => {
  stopCamera();
});

onBeforeRouteLeave((to, from, next) => {
  stopCamera();
  next();
});
</script>

<style scoped>
.capture-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.video {
  width: 100%;
  max-width: 600px;
  transform: scaleX(-1);
  /* Mirror the video */
}

.canvas {
  display: none;
}

.captured-image {
  width: 100%;
  max-width: 600px;
  transform: scaleX(-1);
}

.form-check-input {
  accent-color: red !important;
}
</style>
