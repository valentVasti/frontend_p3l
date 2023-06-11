<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
  >
    <h1 class="h2 m-3">Izin Instruktur</h1>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <div>
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">INSTRUKTUR</th>
                    <!-- <th scope="col">HARI</th>
                      <th scope="col">KELAS</th>
                      <th scope="col">JAM MULAI</th> -->
                    <th scope="col">ID JADWAL HARIAN</th>
                    <th scope="col">INSTRUKTUR PENGGANTI</th>
                    <th scope="col">TANGGAL IZIN</th>
                    <th scope="col">STATUS KONFIRMASI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, id_izin) in izin_instruktur" :key="id_izin">
                    <td>{{ data.id_izin }}</td>
                    <td>
                      {{ data.instruktur.id_instruktur }} {{ "-" }}
                      {{ data.instruktur.nama }}
                    </td>
                    <td>{{ data.id_jadwal_harian }}</td>
                    <td>{{ data.id_instruktur_pengganti }}</td>
                    <td>{{ data.tgl_izin }}</td>
                    <td v-if="!data.status_konfirmasi">BELUM DIKONFIRMASI</td>
                    <td v-else>SUDAH DIKONFIRMASI</td>
                    <td v-if="!data.status_konfirmasi">
                      <button
                        class="btn btn-sm btn-success m-1"
                        @click="confirmIzin(data.id_izin)"
                      >
                        KONFIRMASI
                      </button>
                    </td>
                    <td v-else>
                      <button
                        class="btn btn-sm btn-success m-1"
                        disabled
                      >
                        KONFIRMASI
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
  </div>
  <div
    class="modal fade"
    id="confirmIzin"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">
            KONFIRMASI IZIN INSTRUKTUR
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Konfirmasi izin yang dipilih?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            BATAL
          </button>
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">
            KONFIRMASI
          </button>
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
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://valent.ppcdeveloper.com/api/izinInstruktur")
        .then((response) => {
          //assign state posts with response data
          izin_instruktur.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    let izin_instruktur = ref([]);

    function confirmIzin($id_izin) {
      axios
        .put("https://valent.ppcdeveloper.com/api/izinInstruktur/confirm/" + $id_izin, {
          status_konfirmasi: 1,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          //assign state validation with error
          console.log(error);
        });
    }
    return {
      izin_instruktur,
      confirmIzin
    };
  },
};
</script>
