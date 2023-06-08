<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Deposit Kelas Kadaluarsa</h1>
    </div>
  
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <!-- <router-link
                :to="{ name: 'instruktur.create' }"
                class="btn btn-md btn-success"
                >TAMBAH INSTRUKTUR</router-link
              > -->
  
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID MEMBER</th>
                    <th scope="col">ID KELAS</th>
                    <th scope="col">SISA DEPOSIT KELAS</th>
                    <th scope="col">TANGGAL KADALUARSA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id) in deposit_kelas"
                    :key="id"
                  >
                    <td>{{ data.id_member }}</td>
                    <td>{{ data.id_kelas }}</td>
                    <td>{{ data.deposit_kelas }}</td>
                    <td>{{ data.tgl_kadaluarsa }}</td>
                    <td>
                      <button
                        @click="resetDepoK(data.id_member, data.id_kelas)"
                        class="btn btn-sm btn-danger m-1"
                      >
                        RESET DEPOSIT KELAS
                    </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { onMounted, ref } from "vue";
  export default {
    setup() {
      //reactive state
      let deposit_kelas = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("http://127.0.0.1:8000/api/getExpiredDepoK")
          .then((response) => {
            //assign state posts with response data
            deposit_kelas.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function resetDepoK($id_member, $id_kelas) {
        axios
          .get('http://127.0.0.1:8000/api/resetDepositKelas/' + $id_member + '/' + $id_kelas)
          .then(() => {
            //splice instruktur
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
  
      //return
      return {
        deposit_kelas,
        resetDepoK
      };
    },
  };
  </script>
  