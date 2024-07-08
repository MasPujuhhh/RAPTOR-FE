<template>
  <div class="container-fluid d-flex justify-content-center">
    <div
      class="d-flex flex-column bg-primary p-4 gap-3 bg-white shadow rounded-3"
      v-if="!captured"
    >
      <video ref="video" class="video rounded-3" autoplay></video>
      <button
        class="btn btn-secondary fw-medium text-lowercase py-2"
        @click="captureImage"
      >
        Capture
      </button>
    </div>
    <div
      class="d-flex flex-column bg-primary justify-content-center p-4 gap-3 bg-white shadow rounded-3"
      v-else
    >
      <img :src="capturedImage" class="captured-image rounded-3" />
      <div
        class="d-flex flex-column align-items-center justify-content-center bg-white shadow rounded-3 p-4"
      >
        <p
          class="fs-5 fw-semibold text-uppercase border-bottom border-bottom-secondary pb-3 w-100"
          style="letter-spacing: 0.3px"
        >
          Keterangan
        </p>
        <div class="w-75">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="description"
              value="masuk"
              id="masuk"
              v-model="description"
            />
            <label
              class="form-check-label fs-5 fw-medium text-lowercase"
              for="masuk"
            >
              Masuk
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="description"
              value="wfh"
              id="wfh"
              v-model="description"
            />
            <label
              class="form-check-label fs-5 fw-medium text-lowercase"
              for="wfh"
            >
              WFH
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="description"
              value="izin/sakit"
              id="izin/sakit"
              v-model="description"
            />
            <label
              class="form-check-label fs-5 fw-medium text-lowercase"
              for="izin/sakit"
            >
              Izin / Sakit
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <button class="btn btn-danger w-25" @click="deleteImage">Delete</button>
        <button class="btn btn-success w-25" @click="saveImage">Save</button>
      </div>
    </div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import VueDatePicker from "@vuepic/vue-datepicker";
import moment from "moment";
import "moment/locale/id";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const video = ref(null);
const canvas = ref(null);
const captured = ref(false);
const capturedImage = ref("");
const description = ref("masuk");

const absensi = ({})

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

  // Create a data URL from the canvas
  capturedImage.value = canvas.value.toDataURL("image/png");
  captured.value = true;

  // Stop the video stream
  stream.getTracks().forEach((track) => track.stop());
};

const deleteImage = () => {
  captured.value = false;
  capturedImage.value = "";
  initCamera();
};

const renderAbsen = async (jadwal = null) => {
  try {
    if (!jadwal) {
      jadwal = new Date();
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    jadwal = jadwal.toLocaleDateString('id-ID', options).split('/').reverse().join('-');
    const res = await axios.get(`${endpoint}/absensi/detail_by_date`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params:{jadwal}
    });
    const data = res.data?.data;
    console.log(data)

    absensi.value = data
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

const saveImage = async () => {
  const blob = await fetch(capturedImage.value).then((res) => res.blob());
  const formData = new FormData();
  formData.append("foto_absensi", blob, "captured-image.png");
  formData.append("keterangan", description.value);
  formData.append("absensi_id", absensi.value.id);

  try {
    const res = await axios.post(
      `${endpoint}/absensi/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const result = res.data;
    if (res.status == 200) {
      toast.success(`${result.message}`, {
        autoClose: 2000,
      });
      setTimeout(() => {
        router.push('/')
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

onMounted(() => {
  initCamera();
  renderAbsen()
});

onBeforeUnmount(() => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
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
}

.canvas {
  display: none;
}

.captured-image {
  width: 100%;
  max-width: 600px;
}

.form-check-input {
  accent-color: red !important;
}
</style>
