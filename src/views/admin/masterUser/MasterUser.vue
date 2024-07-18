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
            <h2>User</h2>
            <hr style="margin-bottom: 0.3rem;">
            <hr style="margin-top: 0.3rem;">
          </div>

          <!-- Filter Row -->
          <div class="row mb-3">
            <!-- Button trigger modal -->
            <div class="col-md-2">
              <label for="filterNamaLengkap" class="form-label">Nama Lengkap</label>
              <input type="text" class="form-control" id="filterNamaLengkap" v-model="filter.nama_lengkap" placeholder="Nama Lengkap">
            </div>
            <div class="col-md-2">
              <label for="filterRolePerusahaan" class="form-label">Tipe</label>
              <select class="form-select" id="filterRolePerusahaan" v-model="filter.tipe">
                <option value="" disabled>Select Tipe</option>
                <option value="Rapier Team">Rapier Team</option>
                <option value="Magang">Magang</option>
              </select>
            </div>
            <div class="col-md-2">
              <label for="filterRoleAlias" class="form-label">Role</label>
              <select class="form-select" id="filterRoleAlias" v-model="filter.alias">
                <option value="" selected disabled>Select Role</option>
                <option v-for="role in roles" :key="role" :value="role.alias">{{ role.alias }}</option>
              </select>
            </div>
            <div class="col-md-2">
              <label for="filterLokasi" class="form-label">Lokasi</label>
              <select class="form-select" id="filterLokasi" v-model="filter.lokasi">
                <option value="" selected>Select Lokasi</option>
                <option value="Semarang">Semarang</option>
                <option value="Tangerang">Tangerang</option>
                <option value="Bali">Bali</option>
              </select>
            </div>
            <div class="col-md-1">
              <label for="filerSubmit" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" id="filerSubmit" type="button" @click="getListFilteredUsers"><i class="bi bi-search"></i></button>
              </div>
            </div>
            <div class="col-md-1">
              <label for="filerHapus" class="form-label">&nbsp</label>
              <div class="d-grid gap-2">
                <button class="btn btn-danger" id="filerHapus" type="button" @click="resetFilters"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>

          <!-- Add User Button -->
          <div class="row mb-3 justify-content-end">
            <div class="col-md-2">
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">+ User</button>
              <!-- Modal -->
              <div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="addUserModalLabel">Add User</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form @submit.prevent="submitUser">
                        <div class="mb-3">
                          <label for="namaLengkap" class="form-label">Nama Lengkap</label>
                          <input type="text" class="form-control" id="namaLengkap" v-model="newUser.nama_lengkap" required>
                        </div>
                        <div class="mb-3">
                          <label for="email" class="form-label">Email</label>
                          <input type="email" class="form-control" id="email" v-model="newUser.email" required>
                        </div>
                        <div class="mb-3">
                          <label for="password" class="form-label">Password</label>
                          <input type="password" class="form-control" id="password" v-model="newUser.password" required>
                        </div>
                        <div class="mb-3">
                          <label for="tipe" class="form-label">Tipe</label>
                          <select class="form-select" id="tipe" v-model="newUser.tipe" required>
                            <option value="" disabled>Select Tipe</option>
                            <option value="Rapier Team">Rapier Team</option>
                            <option value="Magang">Magang</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="rolePerusahaan" class="form-label">Role</label>
                          <select class="form-select" id="rolePerusahaan" v-model="newUser.role_id" required>
                            <option value="" selected disabled>Select Role</option>
                            <option v-for="role in roles" :key="role" :value="role.id">{{ role.alias }}</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="lokasi" class="form-label">Lokasi</label>
                          <select class="form-select" id="lokasi" v-model="newUser.lokasi" required>
                            <option value="" disabled>Select Lokasi</option>
                            <option value="Semarang">Semarang</option>
                            <option value="Tangerang">Tangerang</option>
                            <option value="Bali">Bali</option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label for="isActive" class="form-label">Status</label>
                          <div class="form-check form-switch">
                            <label class="form-check-label" for="flexSwitchCheckChecked">
                              {{ newUser.is_active ? 'Aktif' : 'Non-Aktif' }}
                            </label>
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="newUser.is_active">
                          </div>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- User List Table -->
          <div class="table-responsive" style="width: 95%;">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama Lengkap</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Tipe</th>
                  <th>Lokasi</th>
                  <th>Aktif</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                  <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                  <td>{{ user.nama_lengkap }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.alias }} ( {{ user.nama }} )</td>
                  <td>{{ user.tipe }}</td>
                  <td>{{ user.lokasi ? user.lokasi.charAt(0).toUpperCase() + user.lokasi?.slice(1) : '-' }}</td>
                  <td>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" :checked="user.is_active">
                    </div>
                  </td>
                  <td>
                      <!-- DETAIL -->
                      <button class="btn btn-secondary btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#detailUserModal" @click="getDetailUser(user.id)">
                        <i class="bi bi-search"></i>
                      </button>
                      <!-- modal detail -->
                      <div class="modal fade" id="detailUserModal" tabindex="-1" aria-labelledby="detailUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="detailUserModalLabel">Detail User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form @submit.prevent="submitUser">
                              <img :src="endpoint+user_detail.foto_profile" class="profile-pic mx-auto d-block" alt="..." style="width: 10rem; height: 10rem; object-fit: cover; margin-top: 20px; border-radius: 50%;">
                              <div class="mb-3">
                                <label for="namaLengkap" class="form-label">Nama Lengkap</label>
                                <input type="text" class="form-control" id="namaLengkap" v-model="user_detail.nama_lengkap" disabled>
                              </div>
                              <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" v-model="user_detail.email" disabled>
                              </div>
                              <div class="mb-3">
                                <label for="tipe" class="form-label">Tipe</label>
                                <input type="tipe" class="form-control" id="tipe" v-model="user_detail.tipe" disabled>
                              </div>
                              <div class="mb-3">
                                <label for="role" class="form-label">Role</label>
                                <input type="role" class="form-control" id="role" :value="`${user_detail.alias} (${user_detail.nama})`" disabled>
                              </div>
                              <div class="mb-3">
                                <label for="lokasi" class="form-label">Lokasi</label>
                                <input type="lokasi" class="form-control" id="lokasi" v-model="user_detail.lokasi" disabled>
                              </div>
                              <div class="mb-3">
                                <label for="isActive" class="form-label">Status</label>
                                <div class="form-check form-switch">
                                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled" v-model="user_detail.is_active" :checked="user_detail.is_active" disabled>
                                  <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">{{ user_detail.is_active ? 'Aktif' : 'Non-Aktif' }}</label>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                      

                    <!-- EDIT -->
                    <button v-if="me?.nama == user?.head || me?.id == user.id || is_superadmin" class="btn btn-warning btn-sm me-2" type="button" data-bs-toggle="modal" data-bs-target="#editUserModal" @click="getDetailUser(user.id)">
                          <i class="bi bi-pencil"></i>
                    </button>
                    <!-- modal edit -->
                    <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="editUserModalLabel">Edit User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <!-- <form> -->
                              <div class="mb-3">
                                <!-- {{ new_pass }} -->
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="new_pass.password" required>
                              </div>
                              <!-- <button data-bs-dismiss="modal" class="btn btn-primary" @click="changePassword(user_detail.id)">Ganti Password</button>
                              <br>
                              <br> -->
                              <div class="mb-3">
                                <label for="namaLengkap" class="form-label">Nama Lengkap</label>
                                <input type="text" class="form-control" id="namaLengkap" v-model="user_detail.nama_lengkap" required>
                              </div>
                              <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" v-model="user_detail.email" required>
                              </div>
                              <div class="mb-3">
                                <label for="tipe" class="form-label">Tipe</label>
                                <select class="form-select" id="tipe" v-model="user_detail.tipe" required>
                                  <option value="" disabled>Select Tipe</option>
                                  <option value="Rapier Team">Rapier Team</option>
                                  <option value="Magang">Magang</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label for="roleAlias" class="form-label">Role</label>
                                <select class="form-select" id="roleAlias" v-model="user_detail.role_id" required>
                                  <option value="" selected disabled>Select Role</option>
                                  <option v-for="role in roles" :key="role" :value="role.id">{{ role.alias }}</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label for="lokasi" class="form-label">Lokasi</label>
                                <select class="form-select" id="lokasi" v-model="user_detail.lokasi" required>
                                  <option value="" disabled>Select Lokasi</option>
                                  <option value="Semarang">Semarang</option>
                                  <option value="Tangerang">Tangerang</option>
                                  <option value="Bali">Bali</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label for="isActive" class="form-label">Status</label>
                                <div class="form-check form-switch">
                                  <label class="form-check-label" for="flexSwitchCheckChecked">
                                    {{ user_detail.is_active ? 'Aktif' : 'Non-Aktif' }}
                                  </label>
                                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" v-model="user_detail.is_active">
                                </div>
                              </div>
                              <br>
                              <button data-bs-dismiss="modal" class="btn btn-primary" @click="editUser(user_detail.id)">Update</button>
                            <!-- </form> -->
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- DELETE -->
                    <button v-if="me?.nama == user?.head || me?.id == user.id || is_superadmin" class="btn btn-danger btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#deleteUserModal" @click="getDetailUser(user.id)"> 
                      <i class="bi bi-trash"></i>
                    </button>
                    <!-- modal delete -->
                    <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-labelledby="deleteUserModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="deleteUserModalLabel">Delete User</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <h6>Apkah ingin menghapus user {{ user_detail.nama_lengkap }} ??</h6> 
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                            <button type="button" class="btn btn-primary"  @click="hapusUser(user_detail.id)" data-bs-dismiss="modal">Hapus</button>
                          </div>
                        </div>
                      </div>
                    </div>


                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" aria-label="Previous" @click="currentPage > 1 && handlePageChange(currentPage - 1)">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li v-for="page in metadata?.total_page" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click="handlePageChange(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === metadata?.total_page }">
                <a class="page-link" href="#" aria-label="Next" @click="currentPage < metadata?.total_page && handlePageChange(currentPage + 1)">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
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
// import { onMounted } from 'vue';

const endpoint = import.meta.env.VITE_ENDPOINT;

const users = ref([]);
const user_detail = ref({})
const perPage = ref(10);
const currentPage = ref(1);
const filter = ref({
  nama_lengkap: '',
  tipe: '',
  alias: '',
  lokasi: '',
});
const metadata = ref();
const roles = ref([])
const me = ref()
const is_superadmin = ref(false)

const is_admin = localStorage.getItem("authAdmin");
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const showModal = ref(false);
const newUser = ref({
  nama_lengkap: '',
  email: '',
  tipe:'',
  lokasi: '',
  role_id:'',
  is_active: false
});

const new_pass = ref({})

const renderMe = async () => {
  try {
    const res = await axios.get(`${endpoint}/user/detail_by_token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    me.value = res.data.data
    if (me.value.nama == 'SPR') {
      is_superadmin.value = true
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

const getRole = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/role/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    roles.value = res.data?.data;
    console.log(roles)
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

const getListUsers = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/user/list`, {
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
    users.value = res.data?.data;
    metadata.value = res.data?.metadata;
    console.log(users.value);
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

const getDetailUser = async (id) => {
  try {
    const res = await axios.get(
      `${endpoint}/user/detail_by_id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    user_detail.value = res.data?.data;
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


const getListFilteredUsers = async () => {
  try {
    const res = await axios.get(
      `${endpoint}/user/list`, {
        params: filter.value,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    users.value = res.data?.data;
    metadata.value = res.data?.metadata;
    console.log(metadata.value);
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
    nama_lengkap: '',
    tipe: '',
    alias: '',
    lokasi: '',
  };
  currentPage.value = 1;
  await getListUsers();
};

const submitUser = async () => {
  try {
    const res = await axios.post(
      `${endpoint}/user/create_user`, newUser.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    showModal.value = false;
    await getListUsers();
    toast.success('Berhasil Menambahkan User', {
      autoClose: 2000,
    });
    
    newUser.value = {
      nama_lengkap: '',
      email: '',
      tipe:'',
      lokasi: '',
      role_id:'',
      is_active: false
    }
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

const editUser = async (id) => {
  try {
    user_detail.value.password = new_pass.value.password
    console.log('payload',user_detail.value)
    const res = await axios.put(
      `${endpoint}/user/edit_user/${id}`, user_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data.data)
    toast.success('Berhasil Mengupdate User', {
      autoClose: 2000,
    });
    await getListUsers();
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
  new_pass.value.password = ''
};


const hapusUser = async (id) => {
  try {
    const res = await axios.delete(
      `${endpoint}/user/delete_user/${id}`, user_detail.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success('Berhasil Menghapus User', {
      autoClose: 2000,
    });
    await getListUsers();
  } catch (error) {
    const data = error.response?.data.errors;
    if (data) {
      toast.error(`CODE ${data.code} : ${data.message}`, {
        autoClose: 2000,
      });
    }
  }
};


// Handle page change
const handlePageChange = async (page) => {
  currentPage.value = page;
  await getListUsers();
};

onMounted(() => {
  getListUsers();
  getRole()
  renderMe()
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