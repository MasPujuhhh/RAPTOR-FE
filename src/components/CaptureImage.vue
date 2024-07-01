<template>
  <div class="capture-container">
    <div v-if="!captured">
      <video ref="video" class="video" autoplay></video>
      <button @click="captureImage">Capture</button>
    </div>
    <div v-else>
      <p>keterangan</p>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="description" value="masuk" id="masuk" v-model="description">
        <label class="form-check-label" for="masuk">
          Masuk
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="description" value="wfh" id="wfh" v-model="description">
        <label class="form-check-label" for="wfh">
          WFH
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="description" value="izin/sakit" id="izin/sakit" v-model="description">
        <label class="form-check-label" for="izin/sakit">
          Izin/ Sakit
        </label>
      </div>
      <img :src="capturedImage" class="captured-image" />
      <button @click="deleteImage">Delete</button>
      <button @click="saveImage">Save</button>
    </div>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';

const video = ref(null);
const canvas = ref(null);
const captured = ref(false);
const capturedImage = ref('');
const description = ref('masuk');
let stream = null;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlltQmMwdXdyaWxYSmZueFZpTGlqRiIsImVtYWlsIjoibHVzaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRXdGlhSlNlL2EwRHZDUUhML1dTLnN1U1pvYldaWkt6LzZUOHFZWjJVNDJ1Qm1FcmdoRGd4QyIsImlzX2FjdGl2ZSI6dHJ1ZSwibmFtYV9sZW5na2FwIjoiTHVhc2lhbmEiLCJ0ZWxlcG9uIjoiMDg4NzczNDc2MzQ1IiwiZm90b19wcm9maWxlIjoiL2Fzc2V0cy9pbWcvcHAtTHVhc2lhbmEtMTcxODY4ODU3NDE5Ni5qcGciLCJqZW5pc19iYW5rIjpudWxsLCJub19yZWsiOm51bGwsInJvbGVfcGVydXNhaGFhbiI6ImFkbWluIiwibmFtYV9yb2xlIjoiQWRtaW4iLCJyb2xlX2FsaWFzIjoiQURNSU4iLCJsb2thc2kiOiJ0YW5nZXJhbmciLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTA4VDE0OjU3OjMyLjI2NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTA2LTE5VDA2OjQ2OjEwLjY0MloiLCJkZWxldGVkQXQiOm51bGwsImlhdCI6MTcxODc3OTU4MH0.gV_Z6LWFVYQD2uqNGc2czzvY-4vPveT1AtXJgrMxJMY'

const initCamera = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    video.value.srcObject = stream;
  } catch (err) {
    console.error('Error accessing camera: ', err);
  }
};

const captureImage = () => {
  const context = canvas.value.getContext('2d');
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

  // Create a data URL from the canvas
  capturedImage.value = canvas.value.toDataURL('image/png');
  captured.value = true;

  // Stop the video stream
  stream.getTracks().forEach(track => track.stop());
};

const deleteImage = () => {
  captured.value = false;
  capturedImage.value = '';
  initCamera();
};

const saveImage = async () => {
  const blob = await fetch(capturedImage.value).then(res => res.blob());
  const formData = new FormData();
  formData.append('foto_absensi', blob, 'captured-image.png');
  formData.append('keterangan', description.value);
  formData.append('absensi_id', 'cTzaIqH8e_cO_hGvCupqK')

  try {
    const res = await axios.post(
      `http://localhost:9001/absensi/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res)
    const result = res.data
    if (res.status == 200) {
      toast.success(`${result.message}`, {
        autoClose: 2000,
      });
    }

    
  } catch (error) {
    console.log(error.response?.data);
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};

onMounted(() => {
  initCamera();
});

onBeforeUnmount(() => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
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
</style>
