<template>
  <button
    class="btn btn-md btn-primary m-4 download-pdf"
    @click="cetakLaporan(periode, tanggal_cetak)"
  >
    Cetak Laporan
  </button>
  <div class="container">
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Laporan Pendapatan</h1>
      <h3 class="h2 m-3">Periode: {{ periode }}</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow mb-3">
          <div class="card-body">
            <table
              class="table table-striped table-bordered mt-4 styled-table th"
              id="table"
            >
              <thead class="thead-dark">
                <tr>
                  <th scope="col">BULAN</th>
                  <th scope="col">AKTIVASI</th>
                  <th scope="col">DEPOSIT</th>
                  <th scope="col">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, id) in laporan" :key="id">
                  <td align="left">{{ data.bulan }}</td>
                  <td align="right">Rp {{ data.aktivasi_format }} ,-</td>
                  <td align="right">Rp {{ data.total_deposit_format }} ,-</td>
                  <td align="right">Rp {{ data.total_format }} ,-</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td><b>Total</b></td>
                  <td align="right">Rp {{ total_all }} ,-</td>
                </tr>
              </tbody>
            </table>
            <div class="card-body" id="graphAll">
              <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
                  <h3><b>Graph Laporan Bulanan</b></h3>
                  <canvas id="graph"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.download-pdf {
  width: 40%;
  margin-left: 20px;
}
</style>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Chart from 'chart.js/auto';
import html2canvas from 'html2canvas';

export default {
  setup() {
    //reactive state
    let laporan = ref([]);
    let periode = ref([]);
    let total_all = ref([]);
    let tanggal_cetak = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://127.0.0.1:8000/api/laporanPendapatan")
        .then((response) => {
          //assign state posts with response data
          laporan.value = response.data.data;
          periode.value = response.data.periode;
          total_all.value = response.data.total_all;
          tanggal_cetak.value = response.data.tanggal_cetak;
          const chart = document.getElementById('graph');

          new Chart(chart, {
                  type: 'bar',
                  data: {
                    labels: laporan.value.map(data => data.bulan),
                    datasets: [{
                        label: '# Total Bulanan',
                        data: laporan.value.map(data => data.total),
                        borderWidth: 0
                    }]
                  },
                  options: {
                    scales: {
                        y: {
                            beginAtZero:true,
                            stacked: true
                        }
                    },
                    backgroundColor: '#eb5e28',
                  }
            })
        })
        .catch((error) => {
          console.log(error);
        });
    });

    function cetakLaporan($periode, $tanggal_cetak) {

      var elementHTML = document.getElementById("table");
      var graphElement = document.getElementById("graphAll");

      const doc = new jsPDF({
              orientation: "landscape",
              format: 'a4'
      });

      doc.setFont("helvetica", "bold");
      doc.text("Go-Fit!", 15, 20);
      doc.setFont("helvetica", "normal");
      doc.text("Jl. Centralpark No. 10 Yogyakarta", 15, 30);

      doc.setFont("helvetica", "bold");
      doc.text("Laporan Pendapatan Bulanan", 15, 50);
      doc.setFont("helvetica", "normal");
      doc.text("Periode", 15, 60);
      doc.text(": " + $periode, 60, 60);
      doc.text("Tanggal Cetak", 15, 70);
      doc.text(": " + $tanggal_cetak, 60, 70);

      doc.autoTable(
        {
          html: elementHTML,
          margin: { top: 80 }
        })

      doc.addPage();  
      html2canvas(graphElement).then(function(canvas) {
          const graphData = canvas.toDataURL('image/png');
          doc.addImage(graphData, 'PNG', 15, 30, 270, 160);
          doc.save('Laporan Pendapatan Bulanan - ' + $tanggal_cetak + '.pdf')

      });            
    }

    //return
    return {
      laporan,
      periode,
      total_all,
      cetakLaporan,
      tanggal_cetak
    };
  },
  // methods:{
  //     downloadPDF(){
  //             var html = this.$refs.content;
  //             let clonedTable = html.cloneNode(true);
  //             let printWindow = window.open("");
  //             printWindow.document.write(`
  //                 <html>
  //                 <head>
  //                     <style>
  //                     .styled-table {
  //                     width: 100%;
  //                     border-collapse: collapse;
  //                     margin-bottom: 20px;
  //                     font-size: 14px;
  //                     }

  //                     .styled-table th, .styled-table td {
  //                     border: 1px solid #ddd;
  //                     padding: 8px;
  //                     }

  //                     .styled-table th {
  //                     background-color: #f2f2f2;
  //                     text-align: left;
  //                     }

  //                     .styled-table tr:nth-child(even) {
  //                     background-color: #f9f9f9;
  //                     }

  //                     .styled-table tr:hover {
  //                     background-color: #f5f5f5;
  //                     }
  //                     </style>
  //                 </head>
  //                 <body>
  //                     ${clonedTable.outerHTML}
  //                 </body>
  //                 </html>
  //             `);
  //             // printWindow.document.close();
  //             setTimeout(() => {
  //                 printWindow.print();
  //                 printWindow.close();
  //             }, 500);
  //         }
  // }
};
</script>
