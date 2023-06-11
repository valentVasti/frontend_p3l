<template>
    <button
    v-show="laporan != null && errors == null"
    class="btn btn-md btn-primary m-4 download-pdf"
    @click="cetakLaporan(tahun, tanggal_cetak, bulan)"
  >
    Cetak Laporan
  </button>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
  >
    <h1 class="h2 m-3">Laporan Kelas Bulanan</h1>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-title">
            <div class="d-flex mt-3 ms-3">
              <select
                class="form-select select-style"
                aria-label="Default select example"
                v-model="month"
              >
                <option value="1" selected>Januari</option>
                <option value="2">Februari</option>
                <option value="3">Maret</option>
                <option value="4">April</option>
                <option value="5">Mei</option>
                <option value="6">Juni</option>
                <option value="7">Juli</option>
                <option value="8">Agustus</option>
                <option value="9">September</option>
                <option value="10">Oktober</option>
                <option value="11">November</option>
                <option value="12">Desember</option>
              </select>
              <button
                class="btn btn-primary ms-3"
                type="submit"
                @click="getLaporanKelas(month)"
              >
                Cari
              </button>
            </div>
          </div>
          <div
            v-if="laporan == null && errors == null"
            class="m-3 alert alert-danger"
          >
            Pilih Bulan
          </div>
          <div
            v-else-if="laporan == null && errors != null"
            class="m-3 alert alert-danger"
          >
            {{ errors.message }}
          </div>
          <div v-else-if="laporan != null && errors == null" class="card-body">
            <h5 class="h4 ml-3">Bulan - Tahun: {{ bulan }} - {{ tahun }}</h5>
            <table class="table table-striped table-bordered" id="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">KELAS</th>
                  <th scope="col">INSTRUKTUR</th>
                  <th scope="col">JUMLAH PESERTA</th>
                  <th scope="col">JUMLAH LIBUR</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, id) in laporan" :key="id">
                  <td>{{ data.nama_kelas }}</td>
                  <td>{{ data.instruktur.nama }}</td>
                  <td>{{ data.jumlah_peserta }}</td>
                  <td>{{ data.jumlah_libur }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  position: relative;
  /* Additional styles for the card */
}
.select-style {
  width: 40%;
}
.download-pdf {
  width: 40%;
  margin-left: 20px;
}
</style>

<script>
import axios from "axios";
import { ref } from "vue";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default {
  setup() {
    //reactive state
    let laporan = ref([]);
    let bulan = ref([]);
    let tahun = ref([]);
    let tanggal_cetak = ref([]);
    let errors = ref([]);

    laporan.value = null;
    errors.value = null;

    function getLaporanKelas($month) {
      axios
        .get("https://valent.ppcdeveloper.com/api/laporanKelasBulanan/" + $month)
        .then((response) => {
          //assign state posts with response data
          laporan.value = response.data.data;
          bulan.value = response.data.bulan;
          tahun.value = response.data.tahun;
          tanggal_cetak.value = response.data.tanggal_cetak;
          errors.value = null;
          console.log(tanggal_cetak.value);
          console.log(bulan.value);
          console.log(tahun.value);
        })
        .catch((error) => {
          laporan.value = null;
          errors.value = error.response.data;
          console.log(errors.value.message);
        });
    }

    function cetakLaporan($periode, $tanggal_cetak, $bulan) {
      var elementHTML = document.getElementById("table");

      const doc = new jsPDF({
        orientation: "potrait",
        format: "a4",
      });
      doc.setFont("helvetica", "bold");
      doc.text("Go-Fit!", 15, 20);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Centralpark No. 10 Yogyakarta", 15, 30);

      doc.setFont("helvetica", "bold");
      doc.text("Laporan Kelas Bulanan", 15, 40);
      doc.setFont("helvetica", "normal");
      doc.text("Periode - Bulan", 15, 50);
      doc.text(": " + $periode + " - " + $bulan, 60, 50);
      doc.text("Tanggal Cetak", 15, 60);
      doc.text(": " + $tanggal_cetak, 60, 60);

      doc.addPage();
      doc.autoTable({
        html: elementHTML,
        margin: { top: 30 },
      });

      doc.save("Laporan Kelas Bulanan - " + $tanggal_cetak + ".pdf");
    }
    //return
    return {
      laporan,
      bulan,
      tahun,
      errors,
      tanggal_cetak,
      getLaporanKelas,
      cetakLaporan
    };
  },
};
</script>
