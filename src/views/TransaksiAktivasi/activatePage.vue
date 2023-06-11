<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Data Member Belum Aktivasi</h1>
    </div>
  
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAMA</th>
                    <th scope="col">NOMOR TELEPON</th>
                    <th scope="col">TANGGAL LAHIR</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">TANGGAL DAFTAR</th>
                    <th scope="col">DEPOSIT UANG</th>
                    <th scope="col">TANGGAL KADALUARSA</th>
                    <th scope="col">AKTIVASI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(member, id_member) in members" :key="id_member">
                    <td>{{ member.id_member }}</td>
                    <td>{{ member.nama }}</td>
                    <td>{{ member.no_telp }}</td>
                    <td>{{ member.tgl_lahir }}</td>
                    <td>{{ member.status }}</td>
                    <td>{{ member.email }}</td>
                    <td>{{ member.tgl_daftar }}</td>
                    <td>{{ member.deposit_uang }}</td>
                    <td>{{ member.tgl_kadaluarsa }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-success m-1"
                        @click="activateMember(member.id_member)"
                      >
                        AKTIVASI
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
  <div>
    <div
      class="modal fade"
      id="resetModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Reset Password Berhasil</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Reset password berhasil!</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="refreshPage"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import axios from "axios";
  import { onMounted, ref } from "vue";
  import { useRouter } from 'vue-router'
  // import { Modal } from "bootstrap";
  
  export default {
    setup() {
      //reactive state
      let members = ref([]);
  
      let toggle= false

      const router = useRouter()  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("https://valent.ppcdeveloper.com/api/nonActiveMember")
          .then((response) => {
            //assign state posts with response data
            members.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function refreshPage(){
        window.location.reload();
      }

      function activateMember($id_member){
        let id_member = $id_member
        let id_pegawai = localStorage.getItem('Id_User')
        let tgl_kadaluarsa = '0000-00-00' // auto generate triggers
        let tgl_aktivasi = '0000-00-00' //di set di backend

        axios.post('https://valent.ppcdeveloper.com/api/transaksiAktivasi', {
                id_member: id_member,
                id_pegawai: id_pegawai,
                tgl_kadaluarsa: tgl_kadaluarsa,
                tgl_aktivasi: tgl_aktivasi,
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'member.index'
                })
            }).catch(error => {
                //assign state validation with error
                console.log(error)
            })        
      }
  
      //return
      return {
        members,
        refreshPage,    
        toggle,
        activateMember
      };
    },
  };
  </script>
  