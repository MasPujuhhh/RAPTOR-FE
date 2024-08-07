<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <SidebarAdmin></SidebarAdmin>

      <!-- Main Content -->
      <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <HeaderAdmin></HeaderAdmin>
        <div
          style="
            width: 100%;
            height: 100%;
            display: flex;
            margin-top: 10vh;
            flex-direction: column;
            padding-left: 20px;
            padding-bottom: 1%;
          "
          class="container-content"
        >
        <div>
            <h2>Presensi</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>

          <!-- Filter Row -->
          <div class="row mb-3">
            <!-- Button trigger modal -->                
            <div class="col-md-2">
              <label for="filterNamaTugas" class="form-label">Pilih User</label>
              <select id="filterNamaTugas" class="form-select" v-model="filter.user">
                <option value="" selected disabled>Pilih User</option>
                <option v-for="user in users" :key="user.id" :value="{user_id:user.id, nama_lengkap:user.nama_lengkap}">
                  {{ user.nama_lengkap }}
                </option>
              </select>
            </div>
            <div class="col-md-2">
              <label for="TnggalMulai" class="form-label">Tanggal Mulai</label>
              <input type="date" id="TnggalMulai" class="form-control" v-model="filter.tanggal_mulai" placeholder="Tanggal Mulai">
            </div>
            <div class="col-md-2">
              <label for="TanggalSelelasi" class="form-label">Tanggal Selesai</label>
              <input type="date" id="TanggalSelelasi" class="form-control" v-model="filter.tanggal_selesai" placeholder="Tanggal Selesai">
            </div>

            <div class="col-md-1">
              <label for="filerSubmit" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" id="filerSubmit" type="button" @click="getListFilteredtugases"><i class="bi bi-search"></i></button>
              </div>
            </div>
            <div class="col-md-1">
              <label for="filerHapus" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-danger" id="filerHapus" type="button" @click="resetFilters"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>

          <!-- User List Table -->
          <div v-if="absens?.length != 0" class="d-flex justify-content-between w-75 mt-4">
            <div class="d-flex justify-content-between w-75">
              <h6>Nama Lengkap : {{ filter.user.nama_lengkap ? filter.user.nama_lengkap : 'Semua' }}</h6>
              <h6>Tanggal : {{ filter.tanggal_mulai && filter.tanggal_selesai ? `${moment(filter.tanggal_mulai).format('LL')} - ${moment(filter.tanggal_selesai).format('LL')}` : filter.tanggal_mulai ? `lebih dari `+ moment(filter.tanggal_mulai).format('LL') : filter.tanggal_selesai ? `kurang dari `+ moment(filter.tanggal_selesai).format('LL') : 'Semua' }} </h6>
              <h6>Jumlah : {{ absens?.length }}</h6>
            </div>
            <button class="btn btn-success" id="filerHapus" type="button" @click="x"><i class="bi bi-file-earmark-spreadsheet"></i> Cetak</button>
          </div>

          <div class="table-responsive" style="width: 95%;">
            <p v-if="!absens?.length" class="text-danger">Silahkan Pilih Filter Terlebih dahulu!!</p>
            <table v-if="absens?.length" class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tanggal (In - Out)</th>
                  <th>Nama User</th>
                  <th>Status</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Keterangan</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(absen, index) in absens" :key="absen.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ moment(absen.jadwal ).format('LL') }}  (08.00 - 17.00)</td>
                  <td>{{ absen.nama_lengkap }}</td>
                  <td>{{ absen.status ? absen.status : '-' }}</td>
                  <td>{{ absen.check_in ? moment(absen.check_in).format('HH:mm') : '-' }}</td>
                  <td>{{ absen.check_out ? moment(absen.check_out).format('HH:mm') : '-' }}</td>
                  <td>{{ absen.check_in ? cekTerlambat(absen?.jadwal, absen?.check_in) : '-' }}</td>
                  <td>

                    <!-- DELETE -->
                    <!-- <button v-if="!absen.status" class="btn btn-warning btn-sm" type="button" @click="$router.push(`/absen/${absen?.jadwal.split('T')[0]}`)"> 
                      <i class="bi bi-pencil"></i>
                    </button> -->
                    <button v-if="absen.status" class="btn btn-info btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="getFotoAbsen(absen.id)"> 
                      <i class="bi bi-image-fill"></i>
                    </button>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deleteUserModalLabel">Foto Absen</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="d-flex flex-row mx-auto justify-content-evenly w-100">
                    <div  v-if="absen_detail?.foto_absen_pagi">
                      <h6>Foto Check In ( {{ moment(absen_detail?.check_in).format('HH:mm') }} WIB)</h6>
                      <img class="d-block mx-auto border" :src="endpoint+absen_detail?.foto_absen_pagi" alt="">
                    </div>
                    <div  v-if="absen_detail?.foto_absen_sore">
                      <h6>Foto Check Out ( {{ moment(absen_detail?.check_out).format('HH:mm') }} WIB)</h6>
                      <img class="d-block mx-auto border" :src="endpoint+absen_detail?.foto_absen_sore" alt="">
                    </div>
                    <div v-if="absen_detail?.foto_dokumen">
                      <h6>Foto Tambahan</h6>
                      <img class="d-block mx-auto border" :src="endpoint+absen_detail?.foto_dokumen" alt="">
                    </div>
                  </div>
                  <div>
                    <div v-if="absen_detail?.koordinat" class="mt-5">
                      <h6 class="d-block mx-auto text-center">Titik Koordinat</h6>
                      <iframe class="d-block mx-auto" :src="`https://www.google.com/maps?q=${JSON.parse(absen_detail?.koordinat).latitude},${JSON.parse(absen_detail?.koordinat).longitude}&hl=es;z=14&output=embed`" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import SidebarAdmin from '../../../components/SidebarAdmin.vue';
import HeaderAdmin from '../../../components/HeaderAdmin.vue';
// import { ref, computed } from
import { ref,computed, onMounted, watch  } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import moment from "moment";
import "moment/locale/id";
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';

const endpoint = import.meta.env.VITE_ENDPOINT;

const absens = ref([]);
const absen_detail = ref()
const users = ref([])
const judul_excel = ref("RAPTOR-ABSENSI")

const user_detail = ref({})
const perPage = ref(25);
const currentPage = ref(1);
const filter = ref({
  user:'',
  user_id:'',
  tanggal_mulai:'',
  tanggal_selesai:''
});
const metadata = ref();

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");

const showModal = ref(false);
const newUser = ref({
  nama_lengkap: '',
  email: '',
  role_perusahaan: '',
  role_alias: '',
  lokasi: '',
  is_active: false
});

const cekTerlambat = (tenggat, tanggal) => {
  const jamTenggat = 8.5;
  const tenggatBaru = new Date(tenggat);
  tenggatBaru.setHours(jamTenggat, 30, 0, 0);
  const tanggalBaru = new Date(tanggal);
  const jamTertinggal = new Date(tenggatBaru).getHours() - tanggalBaru.getHours();
  const menitTertinggal = new Date(tenggatBaru).getMinutes() - tanggalBaru.getMinutes();

  if (jamTertinggal < 0 || (jamTertinggal === 0 && menitTertinggal < 0)) {
    return 'terlambat'
  } else {
    return 'tepat waktu'
  }
};

const me = ref()

const renderMe = async () => {
  try {
    const res = await axios.get(`${endpoint}/user/detail_by_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    me.value = res.data.data
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


const renderUser = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/user/all_by_division`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    users.value = res.data?.data;
    metadata.value = res.data?.metadata;
  } catch (error) {
    const data = error.response?.data;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};
const getAllAbsen = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/absensi/list`, {
        params: {
          per_page: perPage.value,
          page: currentPage.value,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    absens.value = res.data?.data;
    metadata.value = res.data?.metadata;
  } catch (error) {
    const data = error.response?.data;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};

const getFotoAbsen = async (id) => {
  try {
    const res = await axios.get(
      `${endpoint}/absensi/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    absen_detail.value = res.data?.data;
  } catch (error) {
    const data = error.response?.data;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};


const getListFilteredtugases = async () => {
  try {
    judul_excel.value = "RAPTOR-PRESENSI"
    if (['HDI','PDL','AAF'].includes(me.value.nama)) {
      judul_excel.value += `-DIVISI ${me.value.nama}`
    }
    filter.value.user_id = filter.value?.user.user_id

    if (filter.value.user != '') {
      judul_excel.value += `-${filter.value.user.nama_lengkap}`
    }

    if (filter.value.tanggal_mulai != '' && filter.value.tanggal_selesai == '') {
      judul_excel.value += `-(lebih dari ${moment(filter.value.tanggal_mulai).format('LL')})`
    }

    if (filter.value.tanggal_selesai != '' && filter.value.tanggal_mulai == '') {
      judul_excel.value += `-(kurang dari ${moment(filter.value.tanggal_selesai).format('LL')})`
    }

    if (filter.value.tanggal_selesai != '' && filter.value.tanggal_mulai != '') {
      judul_excel.value += `-(${moment(filter.value.tanggal_mulai).format('LL')}-${moment(filter.value.tanggal_selesai).format('LL')})`
    }


    const res = await axios.get(
      `${endpoint}/absensi/all_by_division`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    absens.value = res.data?.data;
    metadata.value = res.data?.metadata;
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

const resetFilters = async () => {
  filter.value = {
    user:'',
    user_id:'',
    tanggal_mulai:'',
    tanggal_selesai:''
  };
  currentPage.value = 1;
  absens.value = []
};



// Handle page change
const handlePageChange = async (page) => {
  currentPage.value = page;
  await getAllAbsen();
};

const x = async () => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("LAPORAN PRESENSI HARIAN");

  let judul = 1;
  sheet.mergeCells("A" + judul + ":" + "G" + judul)
  sheet.getCell("A" + judul).value = ("LAPORAN PRESENSI HARIAN")
  sheet.getCell("A" + judul).font = { bold: true, underline: true, name: 'Times New Roman', size: 14 };

  judul += 2
  sheet.mergeCells("A" + judul + ":" + "G" + judul)
  sheet.getCell("A" + judul).value = ("FILTER :")
  sheet.getCell("A" + judul).font = { bold: true, size: 11 };
  
  judul += 1
  sheet.mergeCells("A" + judul + ":" + "C" + judul)
  sheet.getCell("A" + judul).value = (`Nama Lengkap = ${filter.value.user?.nama_lengkap ? filter.value.user?.nama_lengkap : 'semua'}`)
  sheet.getCell("A" + judul).font = { bold: true, size: 11 };
  
  sheet.mergeCells("D" + judul + ":" + "E" + judul)
  sheet.getCell("D" + judul).value = (`Tanggal = ${filter.value.tanggal_mulai && filter.value.tanggal_selesai ? `${moment(filter.value.tanggal_mulai).format('LL')} - ${moment(filter.value.tanggal_selesai).format('LL')}` : filter.value.tanggal_mulai ? `lebih dari `+ moment(filter.value.tanggal_mulai).format('LL') : filter.value.tanggal_selesai ? `kurang dari `+moment(filter.value.tanggal_selesai).format('LL') : 'semua'}`)
  sheet.getCell("D" + judul).font = { bold: true, size: 11 };
  
  judul += 2


  
  let no = sheet.getColumn('A')
  no.width = 5
  let jadwal = sheet.getColumn('B')
  jadwal.width = 20
  let nama_lengkap = sheet.getColumn('C')
  nama_lengkap.width = 40
  let status = sheet.getColumn('D')
  status.width = 15
  let check_in = sheet.getColumn('E')
  check_in.width = 20
  let check_out = sheet.getColumn('F')
  check_out.width = 20
  let keterangan = sheet.getColumn('G')
  keterangan.width = 15

  let baris_next = judul + 1

  sheet.mergeCells("A" + judul + ":" + "A" + baris_next)
  sheet.mergeCells("B" + judul + ":" + "B" + baris_next)
  sheet.mergeCells("C" + judul + ":" + "C" + baris_next)
  sheet.mergeCells("D" + judul + ":" + "D" + baris_next)
  sheet.mergeCells("E" + judul + ":" + "E" + baris_next)
  sheet.mergeCells("F" + judul + ":" + "F" + baris_next)
  sheet.mergeCells("G" + judul + ":" + "G" + baris_next)

  sheet.getCell("A" + judul).value = "No"
  sheet.getCell("B" + judul).value = "Tanggal (In - Out)"
  sheet.getCell("C" + judul).value = "Nama Lengkap"
  sheet.getCell("D" + judul).value = "Status"
  sheet.getCell("E" + judul).value = "Check In"
  sheet.getCell("F" + judul).value = "Check Out"
  sheet.getCell("G" + judul).value = "Keterangan"

  sheet.getCell("A" + judul).font = { bold: true }
  sheet.getCell("B" + judul).font = { bold: true }
  sheet.getCell("C" + judul).font = { bold: true }
  sheet.getCell("D" + judul).font = { bold: true }
  sheet.getCell("E" + judul).font = { bold: true }
  sheet.getCell("F" + judul).font = { bold: true }
  sheet.getCell("G" + judul).font = { bold: true }

  sheet.getCell("A" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("B" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("C" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("D" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("E" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("F" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("G" + judul).alignment = { horizontal: 'center', vertical: 'middle' }

  sheet.getCell("A" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("B" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("C" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("D" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("E" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("F" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("G" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }

  judul += 1
  for (let k = 0; k < absens.value.length; k++) {
      absens.value.judul = judul
      judul += 1
      sheet.getCell("A" + judul).value = k + 1
      sheet.getCell("B" + judul).value = absens.value[k].jadwal ? moment(absens.value[k].jadwal).format('LL') : ''
      sheet.getCell("C" + judul).value = absens.value[k].nama_lengkap
      sheet.getCell("D" + judul).value = absens.value[k].status
      sheet.getCell("E" + judul).value = absens.value[k].check_in ? moment(absens.value[k].check_in).format('HH:mm') : ''
      sheet.getCell("F" + judul).value = absens.value[k].check_out ? moment(absens.value[k].check_out).format('HH:mm') : ''
      sheet.getCell("G" + judul).value = absens.value[k].check_in ? cekTerlambat(absens?.value[k].jadwal, absens?.value[k].check_in) : ''
      // sheet.getCell("F" + judul).value = absens.value[k].status

      sheet.getCell("A" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
      sheet.getCell("B" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
      sheet.getCell("D" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
      sheet.getCell("E" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
      sheet.getCell("F" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
      sheet.getCell("G" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
      // sheet.getCell("F" + judul).alignment = { horizontal: 'center', vertical: 'middle' }

      sheet.getCell("A" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("B" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("C" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("D" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("E" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("F" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("G" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }
      // sheet.getCell("F" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }
  }
  sheet.getCell("A" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("B" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("C" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("D" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("E" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("F" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("G" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${judul_excel.value}.xlsx`;
  link.click();
}


onMounted(() => {
  renderMe()
  renderUser()
});
</script>

<!-- <style>
.profile-pic {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-top: 20px;
  }
</style> -->