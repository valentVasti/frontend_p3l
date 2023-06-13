<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Data Transaksi Aktivasi</h1>
    </div>
  
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <router-link
              :to="{ name: 'transaksi_aktivasi.activate' }"
              class="btn btn-md btn-success"
              >AKTIVASI MEMBER</router-link
            >
              <!-- :to="{ name: 'jadwal_umum.create' }" -->
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ID PEGAWAI - NAMA PEGAWAI</th>
                    <th scope="col">ID MEMBER - NAMA MEMBER</th>
                    <th scope="col">TANGGAL AKTIVASI</th>
                    <th scope="col">TANGGAL KADALUARSA</th>
                    <th scope="col">CETAK STRUK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id) in transaksi_aktivasi"
                    :key="id"
                  >
                    <td>{{ data.id_transaksi }}</td>
                    <td>{{ data.pegawai.id_pegawai }} {{ "-" }} {{ data.pegawai.nama_pegawai }}</td>
                    <td>{{ data.member.id_member }} {{ "-" }} {{ data.member.nama }}</td>
                    <td>{{ data.tgl_aktivasi }}</td>
                    <td>{{ data.tgl_kadaluarsa }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-primary m-1"
                        @click.prevent="cetakStrukAktivasi(data.id_transaksi, data.member.id_member, data.member.nama, data.tgl_kadaluarsa, data.tgl_aktivasi, data.pegawai.id_pegawai, data.pegawai.nama_pegawai)"
                      >
                        CETAK STRUK AKTIVASI
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
      let transaksi_aktivasi = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("https://valent.ppcdeveloper.com/api/transaksiAktivasi")
          .then((response) => {
            //assign state posts with response data
            transaksi_aktivasi.value = response.data.data;
            console.log(transaksi_aktivasi.value);

          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
      
      function cetakStrukAktivasi($id_transaksi_aktivasi, $id_member, $nama, $tgl_kadaluarsa, $tgl_aktivasi, $id_kasir, $nama_kasir) {

      const doc = new jsPDF({
        orientation: "potrait",
        unit: "cm",
        format: [12, 13],
      });

      doc.text("GoFit!", 0.5, 1);
      doc.text("Jl. Centralpark No. 10 Yogyakarta", 0.5, 2);
      doc.text("===============================", 0.5, 3);
      doc.text("Struk Aktivasi", 0.5, 4);
      doc.text("No. Struk                : " + $id_transaksi_aktivasi, 0.5, 5);
      doc.text("Tanggal Aktivasi     : " + $tgl_aktivasi, 0.5, 6);
      doc.text("Member                  : " + $id_member + " / " + $nama, 0.5, 7);
      doc.text("Masa aktif member : " + $tgl_kadaluarsa, 0.5,8);
      doc.text("Kasir             : " + $id_kasir + " / " + $nama_kasir, 0.5,10);
      doc.save("Struk Aktivasi - " + $id_transaksi_aktivasi + ".pdf");
    }
  
      //return
      return {
        transaksi_aktivasi,
        cetakStrukAktivasi
      };
    },
  };
  </script>
  