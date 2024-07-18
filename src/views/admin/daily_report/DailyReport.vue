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
            <h2>Daily Report</h2>
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
              <label for="filterNamaTugas" class="form-label">Pilih Tugas</label>
              <select id="filterNamaTugas" class="form-select" v-model="filter.tugas">
                <option value="" selected disabled>Pilih Tugas</option>
                <option v-for="tugas in tugases" :key="tugas.id" :value="{tugas_id:tugas.id, judul:tugas.judul}">
                  {{ tugas.judul }}
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
          <div v-if="d_reports?.length != 0" class="d-flex justify-content-between w-75 mt-4">
            <div class="d-flex justify-content-between w-75">
              <h6>Nama Lengkap : {{ filter.user.nama_lengkap }}</h6>
              <h6>Tugas : {{ filter.tugas.judul }}</h6>
              <h6>Tanggal : {{ filter.tanggal_mulai && filter.tanggal_selesai ? `${moment(filter.tanggal_mulai).format('LL')} - ${moment(filter.tanggal_selesai).format('LL')}` : filter.tanggal_mulai ? `lebih dari `+filter.tanggal_mulai : filter.tanggal_selesai ? `kurang dari `+filter.tanggal_selesai : '' }} </h6>
              <h6>Jumlah : {{ d_reports?.length }}</h6>
            </div>
            <button class="btn btn-success" id="filerHapus" type="button" @click="x"><i class="bi bi-file-earmark-spreadsheet"></i> Cetak</button>
          </div>
          <div class="table-responsive" style="width: 95%;">
            <p v-if="!d_reports?.length" class="text-danger">Silahkan Pilih Filter Terlebih dahulu!!</p>
            <table v-if="d_reports?.length" class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Jadwal</th>
                  <th>Nama Lengkap (Role)</th>
                  <th>Tugas</th>
                  <th>Daily Report</th>
                  <th>Label</th>
                  <!-- <th>Actions</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(report, index) in d_reports" :key="report.id">
                  <td style="width: 3%">{{ (currentPage - 1) * perPage + index + 1 }}</td>
                  <td style="width: 7%">{{ moment(report.jadwal).format('LL') }}</td>
                  <td style="width: 15%">{{ report.nama_lengkap  }} ({{ report.nama_role }})</td>
                  <td style="width: 10%">{{ report.judul }}</td>
                  <td style="width: 25%">{{ report.deskripsi?.length > 200 ? `${report.deskripsi?.substring(0, 200)}...` : report.deskripsi }}</td>
                  <td style="width: 10%"><span class="badge" :style="`background-color:${report?.color}; color:black;`"><i class="bi bi-bookmark-fill"></i>{{ report?.nama_label }}</span></td>
                  <!-- <td style="width: 10%"> -->
                    <!-- DELETE -->
                    
                  <!-- </td> -->
                </tr>
              </tbody>
            </table>
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

const d_reports = ref([]);
const tugases = ref([])
const foto_absen = ref()
const users = ref([])
const judul_excel = ref()

const user_detail = ref({})
const perPage = ref(25);
const currentPage = ref(1);
const filter = ref({
  user:'',
  tugas:'',
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
    console.log(users)
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
    console.log(data);
  }
};

const renderTugas = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/tugas/all_by_division`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    tugases.value = res.data?.data;
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
      `${endpoint}/d_reports/list`, {
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
    d_reports.value = res.data?.data;
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



const getListFilteredtugases = async () => {
  try {
    judul_excel.value = `RAPTOR-LAPORAN-HARIAN`
    if (['HDI','PDL','AAF'].includes(me.value.nama)) {
      judul_excel.value += `-DIVISI ${me.value.nama}`
    }
    filter.value.user_id = filter.value?.user.user_id
    filter.value.judul_tugas = filter.value?.tugas.judul

    if (filter.value.user != '') {
      judul_excel.value += `-${filter.value.user.nama_lengkap}`
    }

    if (filter.value.tugas != '') {
      judul_excel.value += `-${filter.value.tugas.judul}`
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
      `${endpoint}/daily/all_by_division`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    d_reports.value = res.data?.data;
    console.log(res.data.data)
    if(!d_reports.value.length){
      toast.success(`CODE 200 : Data Kosong`, {
        autoClose: 2000,
      });
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

const resetFilters = async () => {
  filter.value = {
    user:'',
    tugas:'',
    user_id:'',
    tanggal_mulai:'',
    tanggal_selesai:''
  };
  currentPage.value = 1;
  d_reports.value = []
};




// Handle page change
const handlePageChange = async (page) => {
  currentPage.value = page;
  await getAllAbsen();
};

const x = async () => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("LAPORAN HARIAN RAPIER");
  
  console.log(judul_excel.value)
  console.log(filter)

  let judul = 1;
  sheet.mergeCells("A" + judul + ":" + "F" + judul)
  sheet.getCell("A" + judul).value = ("LAPORAN HARIAN RAPIER")
  sheet.getCell("A" + judul).font = { bold: true, underline: true, name: 'Times New Roman', size: 14 };

  judul += 2
  sheet.mergeCells("A" + judul + ":" + "F" + judul)
  sheet.getCell("A" + judul).value = ("FILTER :")
  sheet.getCell("A" + judul).font = { bold: true, size: 11 };
  
  judul += 1
  sheet.mergeCells("A" + judul + ":" + "F" + judul)
  sheet.getCell("A" + judul).value = (`Nama Lengkap = ${filter.value.user?.nama_lengkap ? filter.value.user?.nama_lengkap : ''}`)
  sheet.getCell("A" + judul).font = { bold: true, size: 11 };

  judul += 1
  sheet.mergeCells("A" + judul + ":" + "F" + judul)
  sheet.getCell("A" + judul).value = (`Tugas  = ${filter.value.tugas?.judul ? filter.value.tugas?.judul : ''}`)
  sheet.getCell("A" + judul).font = { bold: true, size: 11 };
  
  judul += 1
  sheet.mergeCells("A" + judul + ":" + "F" + judul)
  sheet.getCell("A" + judul).value = (`Tanggal = ${filter.value.tanggal_mulai && filter.value.tanggal_selesai ? `${moment(filter.value.tanggal_mulai).format('LL')} - ${moment(filter.value.tanggal_selesai).format('LL')}` : filter.value.tanggal_mulai ? `lebih dari `+ moment(filter.value.tanggal_mulai).format('LL') : filter.value.tanggal_selesai ? `kurang dari `+moment(filter.value.tanggal_selesai).format('LL') : ''}`)
  sheet.getCell("A" + judul).font = { bold: true, size: 11 };
    
  judul += 2

  let no = sheet.getColumn('A')
  no.width = 5
  let jadwal = sheet.getColumn('B')
  jadwal.width = 25
  let nama_lengkap = sheet.getColumn('C')
  nama_lengkap.width = 40
  let tugas = sheet.getColumn('D')
  tugas.width = 30
  let deskripsi = sheet.getColumn('E')
  deskripsi.width = 60 // Adjusted width to 50 to better demonstrate wrapping
  let status = sheet.getColumn('F')
  status.width = 15

  let baris_next = judul + 1

  sheet.mergeCells("A" + judul + ":" + "A" + baris_next)
  sheet.mergeCells("B" + judul + ":" + "B" + baris_next)
  sheet.mergeCells("C" + judul + ":" + "C" + baris_next)
  sheet.mergeCells("D" + judul + ":" + "D" + baris_next)
  sheet.mergeCells("E" + judul + ":" + "E" + baris_next)
  sheet.mergeCells("F" + judul + ":" + "F" + baris_next)

  sheet.getCell("A" + judul).value = "No"
  sheet.getCell("B" + judul).value = "Tanggal"
  sheet.getCell("C" + judul).value = "Nama Lengkap (Role)"
  sheet.getCell("D" + judul).value = "Tugas"
  sheet.getCell("E" + judul).value = "Daily Report"
  sheet.getCell("F" + judul).value = "Label"

  sheet.getCell("A" + judul).font = { bold: true }
  sheet.getCell("B" + judul).font = { bold: true }
  sheet.getCell("C" + judul).font = { bold: true }
  sheet.getCell("D" + judul).font = { bold: true }
  sheet.getCell("E" + judul).font = { bold: true }
  sheet.getCell("F" + judul).font = { bold: true }

  sheet.getCell("A" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("B" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("C" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("D" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
  sheet.getCell("E" + judul).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
  sheet.getCell("F" + judul).alignment = { horizontal: 'center', vertical: 'middle' }

  sheet.getCell("A" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("B" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("C" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("D" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("E" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
  sheet.getCell("F" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }

  judul += 1
  for (let k = 0; k < d_reports.value.length; k++) {
      d_reports.value.judul = judul
      judul += 1
      sheet.getCell("A" + judul).value = k + 1
      sheet.getCell("B" + judul).value = moment(d_reports.value[k].jadwal).format('LL')
      sheet.getCell("C" + judul).value = `${d_reports.value[k].nama_lengkap} (${d_reports.value[k].nama_role})`
      sheet.getCell("D" + judul).value = d_reports.value[k].judul
      sheet.getCell("E" + judul).value = d_reports.value[k].deskripsi
      sheet.getCell("F" + judul).value = d_reports.value[k].nama_label;

      sheet.getCell("A" + judul).alignment = { horizontal: 'center', vertical: 'middle' }
      sheet.getCell("B" + judul).alignment = { vertical: 'middle' }
      sheet.getCell("C" + judul).alignment = { vertical: 'middle' }
      sheet.getCell("D" + judul).alignment = { vertical: 'middle' }
      sheet.getCell("E" + judul).alignment = { vertical: 'middle', wrapText: true } // Add this line for wrapping text in "Deskripsi" column
      sheet.getCell("F" + judul).alignment = { horizontal: 'center', vertical: 'middle' }

      sheet.getCell("A" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("B" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("C" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("D" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("E" + judul).border = { top: { style: "thin" }, left: { style: "thin" } }
      sheet.getCell("F" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } }
  }
  sheet.getCell("A" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("B" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("C" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("D" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("E" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" } }
  sheet.getCell("F" + judul).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } }

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
  renderTugas()
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