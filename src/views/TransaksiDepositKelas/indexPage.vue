<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Data Transaksi Deposit Kelas</h1>
    </div>
  
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <router-link
              :to="{ name: 'transaksi_depok.create' }"
              class="btn btn-md btn-success"
              >TAMBAH DEPOSIT KELAS</router-link
            >
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID TRANSAKSI</th>
                    <th scope="col">ID PEGAWAI - NAMA PEGAWAI</th>
                    <th scope="col">ID MEMBER - NAMA MEMBER</th>
                    <th scope="col">ID KELAS - NAMA KELAS</th>
                    <th scope="col">ID PROMO - BONUS</th>
                    <th scope="col">TOTAL BAYAR</th>
                    <th scope="col">JUMLAH DEPOSIT KELAS</th>
                    <th scope="col">TANGGAL TRANSAKSI</th>
                    <th scope="col">TANGGAL KADALUARSA</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id_transaksi_depok) in transaksi_depok"
                    :key="id_transaksi_depok"
                  >
                    <td>{{ data.id_transaksi_depok }}</td>
                    <td>{{ data.pegawai.id_pegawai }} {{ "-" }} {{ data.pegawai.nama_pegawai }}</td>
                    <td>{{ data.member.id_member }} {{ "-" }} {{ data.member.nama }}</td>
                    <td>{{ data.kelas.id_kelas }} {{ "-" }} {{ data.kelas.nama_kelas }}</td>
                    <td>{{ data.promo_kelas.id_promo_kelas }} {{ "-" }} {{ data.promo_kelas.bonus_kelas }}</td>
                    <td>{{ data.jumlah_bayar }}</td>
                    <td>{{ data.jumlah_deposit }}</td>
                    <td>{{ data.tgl_transaksi }}</td>
                    <td>{{ data.tgl_kadaluarsa }}</td>
                    <td>
                    <button
                        class="btn btn-sm btn-primary m-1"
                        @click="cetakStrukDepoK(data.id_transaksi_depok, data.tgl_transaksi, data.member.id_member, data.member.nama, data.jumlah_bayar, data.kelas.nama_kelas, data.jumlah_deposit, data.tgl_kadaluarsa, data.pegawai.id_pegawai, data.pegawai.nama_pegawai, data.promo_kelas.bonus_kelas)"
                      >
                        CETAK STRUK DEPOSIT KELAS
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
      let transaksi_depok = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("https://valent.ppcdeveloper.com/api/transaksiDepoK")
          .then((response) => {
            //assign state posts with response data
            transaksi_depok.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
      
    //   function cetakStrukDepoU($id_transaksi_aktivasi, $id_member, $nama, $tgl_kadaluarsa, $tgl_aktivasi) {
    //     var nama_user = localStorage.getItem('Nama_user');
    //     var id_user = localStorage.getItem('Id_User')

    //   const doc = new jsPDF({
    //     orientation: "potrait",
    //     unit: "cm",
    //     format: [12, 13],
    //   });

    //   doc.text("GoFit!", 0.5, 1);
    //   doc.text("Jl. Centralpark No. 10 Yogyakarta", 0.5, 2);
    //   doc.text(" ", 0.5, 3);
    //   doc.text("Struk Aktivasi", 0.5, 4);
    //   doc.text("No. Struk                : " + $id_transaksi_aktivasi, 0.5, 5);
    //   doc.text("Tanggal Aktivasi     : " + $tgl_aktivasi, 0.5, 6);
    //   doc.text("Member                  : " + $id_member + " / " + $nama, 0.5, 7);
    //   doc.text("Masa aktif member : " + $tgl_kadaluarsa, 0.5,8);
    //   doc.text("Kasir             : " + id_user + " / " + nama_user, 0.5,10);
    //   doc.save("Struk Aktivasi - " + $id_transaksi_aktivasi + ".pdf");
    // }
  
    function cetakStrukDepoK($id_transaksi_depok, $tanggal_transaksi, $id_member, $nama, $jumlahBayar, $namaKelas, $jumlah_deposit, $tgl_kadaluarsa, $id_pegawai, $nama_pegawai, $bonus_kelas) {
      
      var $jumlah_deposit_no_bonus = $jumlah_deposit - $bonus_kelas
      const doc = new jsPDF({
        orientation: "potrait",
        unit: "cm",
        format: [14, 17],
      });

      doc.text("GoFit!", 0.5, 1);
      doc.text("Jl. Centralpark No. 10 Yogyakarta", 0.5, 2);
      doc.text("=======================================", 0.5, 3);
      doc.text("Struk Deposit Kelas", 0.5, 4);
      doc.text("No. Struk              : " + $id_transaksi_depok, 0.5, 5);
      doc.text("Tanggal                : " + $tanggal_transaksi, 0.5, 6);
      doc.text("Member                           : " + $id_member + " / " + $nama, 0.5, 8);
      doc.text("Deposit                            : Rp " + $jumlahBayar, 0.5, 9);
      doc.text("Jenis Kelas                      : " + $namaKelas, 0.5,10);
      doc.text("Jumlah Deposit Kelas      : " + $jumlah_deposit_no_bonus, 0.5,11);
      doc.text("Bonus Kelas                     : " + $bonus_kelas, 0.5,12);
      doc.text("Total Deposit Kelas          : " + $jumlah_deposit, 0.5,13);
      doc.text("Berlaku sampai dengan   : " + $tgl_kadaluarsa, 0.5,14);
      doc.text("Kasir             : " + $id_pegawai + " / " + $nama_pegawai, 0.5,16);
      doc.save("Struk Deposit Kelas - " + $id_transaksi_depok + ".pdf");
    }
      //return
      return {
        transaksi_depok,
        cetakStrukDepoK 
      };
    },
  };
  </script>
  