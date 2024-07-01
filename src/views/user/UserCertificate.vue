<template>
    <Navbar></Navbar>
  <!-- hero section -->
  <!-- content -->
  <div style="
    margin-top: 5rem;
" class="container-content">
  
        <!-- content -->
        <div
          style="
            width: 100%;
            min-height: 100vh;
            height: 100%;
            display: flex;
            margin-top: 10vh;
            flex-direction: column;
            align-items: center;
            padding-left: 50px;
            padding-bottom: 1%;
            gap: 20px;
          "
          class="container-content"
        >
          <!-- header -->
          <!-- <div
            style="
              width: 100%;
              min-height: 9vh;
              height: 20%;
              display: flex;
              align-items: center;
              padding-left: 20px;
            "
            class="content-header"
          >
            <h2 style="font-weight: bold; font-size: 30px">Master Certificate</h2>
          </div> -->
          <!-- header end -->
          <!-- table -->
          <div
            style="
              width: 90%;
              min-height: 85vh;
              height: 100%;
              background-color: #d0d4ca;
              display: flex;
              flex-direction: column;
              padding-top: 1%;
              align-items: center;
              gap: 10px;
              border-radius: 10px;
              box-shadow: 0rem 0.2rem 0.7rem rgba(0, 0, 0, 0.4);
            "
            class="container-table"
          >
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 98%;
                height: 10%;
                padding-left: 20px;
                padding-right: 20px;
              "
              class="table-header"
            >
              <h4 style="font-weight: bold">Sertifikat</h4>
              <!-- <button
                type="button"
                class="btn btn-success"
                style="font-weight: bold"
                @click="$router.push('/admin/certificate/add')"
              >
                <i class="bi bi-plus"></i>
                Add Certificate
              </button> -->
            </div>
            <div
              style="
                width: 98%;
                height: 96%;
                display: flex;
                justify-content: center;
              "
              class="outer-table"
            >
            
              <div class="table-responsive">
                <!-- inner table -->
                <p v-if="!certificate.length" style="text-align: center; font-size: 30px;">sertifikat kosong</p>
                <table v-if="certificate.length" class="table table-bordered table-hover align-middle">
                  <thead
                    style="height: 60px; padding: 0; text-align: center"
                    class="table table-light align-middle"
                  >
                    <tr>
                      <th
                        scope="col"
                        style="width: 60px; font-weight: bold; font-size: 18px"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        style="width: 400px; font-weight: bold; font-size: 18px"
                      >
                        Data
                      </th>
                      <th
                        scope="col"
                        style="width: 500px; font-weight: bold; font-size: 18px"
                      >
                        Judul
                      </th>
                      <!-- <th
                        scope="col"
                        style="width: 600px; font-weight: bold; font-size: 18px"
                      >
                        Role
                      </th> -->
                      <th
                        scope="col"
                        style="width: 300px; font-weight: bold; font-size: 18px"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    style="height: 60px; padding: 0; text-align: center"
                    class="table align-middle"
                  >
                    <tr
                      v-for="(u, i) in certificate"
                      style="height: 60px"
                    >
                      <td scope="row">{{ i + 1 }}</td>
                      <td>
                        <h6>{{ u.email }} | {{ u.username }}</h6>
                        <h6>{{ u.fullname }} | {{ u.school }}</h6>
                        <h6>{{ u.company_role }} | {{ u.company }} </h6>
                      </td>
                      <!-- <td>{{ u.username }}</td>
                      <td>{{ u.role == 0 ? 'User' : 'Admin' }}</td> -->
                      <td>{{ u.title }}</td>
                      <td>
                        <!-- action -->
                        <div
                          style="
                            display: flex;
                            gap: 10px;
                            justify-content: center;
                          "
                          class="action"
                        >
                          <!-- <button
                            @click="simpanId(u.id)"
                            type="button"
                            class="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDelete"
                            style="
                              box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                            "
                          >
                            <i class="bi bi-trash3-fill"></i>
                          </button> -->
                          <!-- modal delete -->
                          <div
                            class="modal fade"
                            id="modalDelete"
                            tabindex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog modal-dialog-centered">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h1
                                    style="font-weight: bold"
                                    class="modal-title fs-5"
                                    id="exampleModalLabel"
                                  >
                                    Confirm Required
                                  </h1>
                                  <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div style="font-weight: bold" class="modal-body">
                                  Are you sure delete this item?
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    @click="deleteCertificate"
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- modal delete end -->
  
                          <!-- <button
                            @click="pindahEdit(u.id)"
                            type="button"
                            class="btn btn-warning"
                            style="
                              box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                            "
                          >
                            <i class="bi bi-pencil-fill"></i>
                          </button> -->
                          <a :href="`http://localhost:9001/assets/pdf/${u.url}`" target="_blank">
                            <button
                            type="button"
                            class="btn btn-info"
                            style="
                              box-shadow: 0rem 0.2rem 0.5rem rgba(0, 0, 0, 0.8);
                            "
                          >
                            <i class="bi bi-file-pdf-fill"></i>
                          </button>
                          </a>
                          
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
              <!-- inner table -->
            </div>
          </div>
        </div>
        <!-- content end -->
      </div>
  </template>
  
  <script setup>
 import Navbar from"@/components/Navbar.vue";
// import SidebarAdmin from "../../../components/SidebarAdmin.vue";
// import HeaderAdmin from "../../../components/HeaderAdmin.vue";
    import { onMounted, ref, watch } from "vue";
    import axios from "axios";
    import { useCounterStore } from "@/stores/counter";
    import { storeToRefs } from "pinia";
    import { routerKey, useRouter } from "vue-router";
    import { toast } from "vue3-toastify";
    import "vue3-toastify/dist/index.css";
  
    const store = useCounterStore();
    const { tokenAdmin, id_client } = storeToRefs(store);
    const { simpanIdUsers } = store;
  
    const router = useRouter();
  
    let certificate = ref([]);
    let valid = localStorage.getItem("token");
  
    const endpoint = import.meta.env.VITE_ENDPOINT;
  
    // console.log(endpoint)
    const viewUser = async () => {
      try {
        let res = await axios.get(`${endpoint}/certificate/getCertificateByToken`, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });
        const data = res.data?.data;
        // console.log(produk);
          console.log(data);
        for (let i = 0; i < data.length; i++) {
          certificate.value.push(data[i]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    let nilai_id
    const simpanId = async (id) => {
      try {
        nilai_id = id
      } catch (error) {
        console.log(error);
      }
    };

    const pindahEdit = (id) => {
      router.push(`certificate/edit/${id}`)
    }

  
    const deleteCertificate = async () => {
      try {
        // console.log(nilai_id)
        await axios.delete(`${endpoint}/certificate/deleteCertificate/${nilai_id}`, {
          headers: {
            Authorization: `Bearer ${valid}`,
            "Content-Type": "application/json",
          },
        });
        // const data = res.data;
        toast.success("Berhasil Delete Certificate", {
          autoClose: 2000,
        });
        setTimeout(() => {
          location.reload();
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    };


    
  
    onMounted(() => {
      viewUser();
    });
  </script>
  
  <style scoped>
    .content td {
      font-size: 16px;
      font-weight: bold;
    }
  
    .content tr:hover {
      background-color: aquamarine !important;
    }
  </style>