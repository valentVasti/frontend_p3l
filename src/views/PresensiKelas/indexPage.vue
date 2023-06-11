<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Presensi Kelas</h1>
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
                    <th scope="col">ID PRESENSI KELAS</th>
                    <th scope="col">ID MEMBER - NAMA</th>
                    <th scope="col">KELAS</th>
                    <th scope="col">NAMA INSTRUKTUR</th>
                    <th scope="col">TANGGAL PRESENSI</th>
                    <th scope="col">CETAK STRUK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id) in presensi_kelas"
                    :key="id"
                  >
                    <td>{{ data.id_presensi_kelas }}</td>
                    <td>{{ data.member.id_member }} {{ '-' }} {{ data.member.nama }}</td>
                    <td>{{ data.jadwal_harian.kelas.nama_kelas }}</td>
                    <td>{{ data.jadwal_harian.instruktur.nama }}</td>
                    <td>{{ data.tgl_presensi_kelas }}</td>
                    <td>
                      <button
                        @click="cetakStruk(data.id_presensi_kelas)"
                        class="btn btn-sm btn-primary m-1"
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
  import { onMounted, reactive, ref } from "vue";
  import { jsPDF } from "jspdf";

  export default {
    setup() {
      //reactive state
      let presensi_kelas = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("https://valent.ppcdeveloper.com/api/presensiKelas")
          .then((response) => {
            //assign state posts with response data
            presensi_kelas.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function cetakStruk($id_presensi_kelas) {
        
        let presensi_kelas_struk = reactive([]);
        let jenis_pembayaran = '';
        let sisa_deposit = '';
        let data_pendukung = '';

        axios
          .get("https://valent.ppcdeveloper.com/api/presensiKelas/" + $id_presensi_kelas)
          .then((response) => {
            //assign state posts with response data
            presensi_kelas_struk = response.data.data
            jenis_pembayaran = response.data.jenis_pembayaran
            sisa_deposit = response.data.sisa_deposit
            data_pendukung = response.data.data_pendukung

            if(jenis_pembayaran == "Deposit Uang"){
            const doc = new jsPDF({
                orientation: "potrait",
                unit: "cm",
                format: [12, 13],
            });

            doc.text("GoFit!", 0.5, 1);
            doc.text("Jl. Centralpark No. 10 Yogyakarta", 0.5, 2);
            doc.text("===============================", 0.5, 3);
            doc.text("Struk Presensi Gym", 0.5, 4);
            doc.text("No. Struk", 0.5, 5);
            doc.text(": " + presensi_kelas_struk.id_presensi_kelas, 4, 5);
            
            doc.text("Tanggal", 0.5, 6);
            doc.text(": " + presensi_kelas_struk.tgl_presensi_kelas, 4, 6);
            
            doc.text("Member", 0.5, 8);
            doc.text(": " + presensi_kelas_struk.id_member + " / " + presensi_kelas_struk.member.nama, 4, 8);
            
            doc.text("Kelas", 0.5,9);
            doc.text(": " + presensi_kelas_struk.jadwal_harian.kelas.nama_kelas, 4, 9);
            
            doc.text("Instruktur", 0.5,10);
            doc.text(": " + presensi_kelas_struk.jadwal_harian.instruktur.nama, 4, 10);
            
            doc.text("Tarif", 0.5,11);
            doc.text(": " + data_pendukung, 4, 11);
            
            doc.text("Sisa Deposit" , 0.5,12);
            doc.text(": " + sisa_deposit, 4, 12);
            
            doc.save("Struk Presensi Kelas - " + $id_presensi_kelas + ".pdf");
        }else{
            const doc = new jsPDF({
                orientation: "potrait",
                unit: "cm",
                format: [12, 13],
            });

            doc.text("GoFit!", 0.5, 1);
            doc.text("Jl. Centralpark No. 10 Yogyakarta", 0.5, 2);
            doc.text("===============================", 0.5, 3);
            doc.text("Struk Presensi Gym", 0.5, 4);
            doc.text("No. Struk       : " + presensi_kelas_struk.id_presensi_kelas, 0.5, 5);
            doc.text("Tanggal         : " + presensi_kelas_struk.tgl_presensi_kelas, 0.5, 6);
            doc.text("Member        : " + presensi_kelas_struk.id_member + " / " + presensi_kelas_struk.member.nama, 0.5, 8);
            doc.text("Kelas    : " + presensi_kelas_struk.jadwal_harian.kelas.nama_kelas, 0.5,9);
            doc.text("Instruktur    : " + presensi_kelas_struk.jadwal_harian.instruktur.nama, 0.5,10);
            doc.text("Sisa Deposit    : " + sisa_deposit  + 'x', 0.5,11);
            doc.text("Berlaku Sampai    : " + data_pendukung, 0.5,12);
            doc.save("Struk Presensi Kelas - " + $id_presensi_kelas + ".pdf");
        }
          })
          .catch((error) => {
            console.log(error.response.data);
          });




      }
  
      //return
      return {
        presensi_kelas,
        cetakStruk 
      };
    },
  };
  </script>
  