<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Presensi Gym</h1>
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
                    <th scope="col">ID PRESENSI GYM</th>
                    <th scope="col">ID MEMBER - NAMA</th>
                    <th scope="col">SESI</th>
                    <th scope="col">JAM MULAI SESI - JAM SELESAI SESI</th>
                    <th scope="col">TANGGAL PRESENSI - JAM PRESENSI</th>
                    <th scope="col">CETAK STRUK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id) in presensi_gym"
                    :key="id"
                  >
                    <td>{{ data.id_presensi_gym }}</td>
                    <td>{{ data.member.id_member }} {{ '-' }} {{ data.member.nama }}</td>
                    <td>{{ data.sesi }}</td>
                    <td>{{ data.sesi_gym.jam_mulai }} {{ '-' }} {{ data.sesi_gym.jam_selesai }}</td>
                    <td>{{ data.tgl_presensi_gym }} {{ '-' }} {{ data.jam_presensi }}</td>
                    <td>
                      <button
                        @click="cetakStruk(data.id_presensi_gym, data.tgl_presensi_gym, data.jam_presensi, data.member.id_member, data.member.nama, data.sesi_gym.jam_mulai, data.sesi_gym.jam_selesai)"
                        class="btn btn-sm btn-danger m-1"
                      >
                        CETAK STRUK
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
  import { jsPDF } from "jspdf";

  export default {
    setup() {
      //reactive state
      let presensi_gym = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("https://valent.ppcdeveloper.com/api/presensiGym")
          .then((response) => {
            //assign state posts with response data
            presensi_gym.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function cetakStruk($id_presensi_gym, $tgl_presensi_gym, $jam_presensi, $id_member, $nama, $jam_mulai, $jam_selesai) {
        const doc = new jsPDF({
            orientation: "potrait",
            unit: "cm",
            format: [12, 13],
        });

        doc.text("GoFit!", 0.5, 1);
        doc.text("Jl. Centralpark No. 10 Yogyakarta", 0.5, 2);
        doc.text("===============================", 0.5, 3);
        doc.text("Struk Presensi Gym", 0.5, 4);
        doc.text("No. Struk       : " + $id_presensi_gym, 0.5, 5);
        doc.text("Tanggal         : " + $tgl_presensi_gym + ' '+ $jam_presensi, 0.5, 6);
        doc.text("Member        : " + $id_member + " / " + $nama, 0.5, 8);
        doc.text("Slot Waktu    : " + $jam_mulai + ' - ' + $jam_selesai, 0.5,9);
        doc.save("Struk Presensi Gym - " + $id_presensi_gym + ".pdf");
      }
  
      //return
      return {
        presensi_gym,
        cetakStruk
      };
    },
  };
  </script>
  