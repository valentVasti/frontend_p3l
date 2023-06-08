<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Data Transaksi Deposit Uang</h1>
    </div>
  
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <router-link
              :to="{ name: 'transaksi_depou.create' }"
              class="btn btn-md btn-success"
              >TAMBAH DEPOSIT UANG</router-link
            >
              <!-- :to="{ name: 'jadwal_umum.create' }" -->
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID TRANSAKSI</th>
                    <th scope="col">ID PEGAWAI - NAMA PEGAWAI</th>
                    <th scope="col">ID MEMBER - NAMA MEMBER</th>
                    <th scope="col">ID PROMO - BONUS</th>
                    <th scope="col">SISA DEPOSIT</th>
                    <th scope="col">JUMLAH DEPOSIT</th>
                    <th scope="col">TANGGAL TRANSAKSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id_transaksi_depou) in transaksi_depou"
                    :key="id_transaksi_depou"
                  >
                    <td>{{ data.id_transaksi_depou }}</td>
                    <td>{{ data.pegawai.id_pegawai }} {{ "-" }} {{ data.pegawai.nama_pegawai }}</td>
                    <td>{{ data.member.id_member }} {{ "-" }} {{ data.member.nama }}</td>
                    <td>{{ data.promo_uang.id_promo }} {{ "-" }} {{ data.promo_uang.bonus_uang }}</td>
                    <td>{{ data.sisa_deposit }}</td>
                    <td>{{ data.jumlah_depou }}</td>
                    <td>{{ data.tgl_transaksi }}</td>
                    <td>
                    <button
                        class="btn btn-sm btn-primary m-1"
                        @click="cetakStrukDepoU(data.id_transaksi_depou, data.tgl_transaksi, data.member.id_member, data.member.nama, data.jumlah_depou, data.promo_uang.bonus_uang, data.sisa_deposit, data.pegawai.id_pegawai, data.pegawai.nama_pegawai)"
                      >
                        CETAK STRUK DEPOSIT UANG
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
      let transaksi_depou = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("http://127.0.0.1:8000/api/transaksiDepoU")
          .then((response) => {
            //assign state posts with response data
            transaksi_depou.value = response.data.data;
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
  
    function cetakStrukDepoU($id_transaksi_depou, $tanggal_transaksi, $id_member, $nama, $jumlahDepoU, $bonusDeposit, $sisa_deposit, $id_pegawai, $nama_pegawai) {
   
      let total_deposit = $sisa_deposit + $jumlahDepoU;
   const doc = new jsPDF({
     orientation: "potrait",
     unit: "cm",
     format: [14, 17],
   });

   doc.text("GoFit!", 0.5, 1);
   doc.text("Jl. Centralpark No. 10 Yogyakarta", 0.5, 2);
   doc.text("=======================================", 0.5, 3);
   doc.text("Struk Deposit Uang", 0.5, 4);
   doc.text("No. Struk              : " + $id_transaksi_depou, 0.5, 5);
   doc.text("Tanggal                : " + $tanggal_transaksi, 0.5, 6);
   doc.text("Member                   : " + $id_member + " / " + $nama, 0.5, 8);
   doc.text("Deposit                    : Rp " + $jumlahDepoU, 0.5, 9);
   doc.text("Bonus deposit          : Rp " + $bonusDeposit, 0.5,10);
   doc.text("Sisa deposit             : Rp " + $sisa_deposit, 0.5,11);
   doc.text("Total deposit            : Rp " + total_deposit, 0.5,12);
   doc.text("Kasir                    : " + $id_pegawai + " / " + $nama_pegawai, 0.5,14);
   doc.save("Struk Deposit Uang - " + $id_transaksi_depou + ".pdf");
 }
      return {
        transaksi_depou,
        cetakStrukDepoU
      };
    },
  };
  </script>
  