<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
  >
    <h1 class="h2 m-3">Jadwal Harian</h1>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <button
          data-bs-toggle="modal"
          data-bs-target="#confirmGenerateJadwalHarian"
          class="btn btn-md btn-primary mb-4"
        >
          GENERATE JADWAL HARIAN
        </button>

        <!-- <button
        @click="tesModalFunction"
          class="btn btn-md btn-primary mb-4"
        >
          TES MODAL
        </button> -->
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Cari jadwal harian"
                aria-label="Search"
              />
              <button class="btn btn-secondary" type="submit">Cari</button>
            </form>
            <div v-if="dataEmpty.message" class="mt-2 alert alert-danger">
              Belum generate data
            </div>
            <div v-else>
              <table class="table table-striped table-bordered mt-4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAMA KELAS</th>
                    <th scope="col">NAMA INSTRUKTUR</th>
                    <th scope="col">HARI</th>
                    <th scope="col">JAM MULAI</th>
                    <th scope="col">KUOTA</th>
                    <th scope="col">TANGGAL</th>
                    <th scope="col">KETERANGAN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id_jadwal_harian) in jadwal_harian"
                    :key="id_jadwal_harian"
                  >
                    <td>{{ data.id_jadwal_harian }}</td>
                    <td>{{ data.kelas.nama_kelas }}</td>
                    <td>{{ data.instruktur.nama }}</td>
                    <td>{{ data.hari_kelas_harian }}</td>
                    <td>{{ data.jam_mulai }}</td>
                    <td>{{ data.kuota }}</td>
                    <td>{{ data.tgl_kelas }}</td>
                    <td>{{ data.keterangan }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-danger m-1"
                        @click="liburkanKelas(data.id_jadwal_harian)"
                      >
                        LIBURKAN KELAS
                      </button>
                      <!-- <button class="btn btn-sm btn-primary m-1"
                    data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    @click="setInstrukturPengganti(data.id_jadwal_harian, data.instruktur.id_instruktur, data.instruktur.nama)"  disabled>
                      GANTI INSTRUKTUR
                    </button> -->
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

  <!-- <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Pilih Instruktur Pengganti</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label for="content" class="form-label">Instruktur Pengganti</label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="id_instruktur_pengganti"
        >
          <option
            v-for="(instruktur, id_instruktur) in instrukturs"
            :key="id_instruktur"
            :value="instruktur.id_instruktur"
          >                 
            {{ instruktur.nama }}
          </option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">BATAL</button>
        <button type="button" class="btn btn-primary">KONFIRMASI</button>
      </div>
    </div>
  </div>
</div> -->

  <div
    class="modal fade"
    id="confirmLiburkanKelas"
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
            KONFIRMASI LIBURKAN KELAS
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Liburkan kelas yang dipilih?</div>
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

  <div
    class="modal fade"
    id="confirmGenerateJadwalHarian"
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
            KONFIRMASI GENERATE JADWAL HARIAN
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Yakin ingin generate jadwal harian?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            BATAL
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="generateJadwalHarian()"
            data-bs-dismiss="modal"
            data-bs-toggle="modal"
            data-bs-target="#loadingModal"
          >
            KONFIRMASI
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="loadingModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loadingModalLabel">
            GENERATING JADWAL HARIAN ...
          </h5>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status"></div>
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
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://valent.ppcdeveloper.com/api/jadwalHarian")
        .then((response) => {
          //assign state posts with response data
          jadwal_harian.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
          dataEmpty.value = error.response.data;
        });

      axios
        .get(`https://valent.ppcdeveloper.com/api/instruktur`)
        .then((response) => {
          //assign state posts with response data
          instrukturs.value = response.data.data;
          console.log(instrukturs.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    let id_instruktur_pengganti = "";
    let jadwal_harian = ref([]);

    let instrukturs = ref([]);

    //reactive state
    let jadwal_umum = ref([]);

    const current = new Date();
    let date = new Date();

    let dataEmpty = ref([]);

    // const jadwal_harian = reactive({
    //   id_jadwal_harian: "",
    //   id_instruktur: "",
    //   id_kelas: "",
    //   hari_kelas_harian: "",
    //   jam_mulai: "",
    //   jam_selesai: "",
    //   keterangan: "",
    //   tgl_kelas: "",
    // });
    // var show = false;
    // function tesModalFunction(){
    //   // var myModal = document.getElementById('#tesModal')
    //   $('#tesModal').modal(options)
    // }

    function generateJadwalHarian() {

        axios
          .get("https://valent.ppcdeveloper.com/api/jadwalUmum")
          .then((response) => {
            //splice instruktur
            jadwal_umum.value = response.data.data;
            console.log(jadwal_umum.value.length);

            for (let i = 0; i < jadwal_umum.value.length; i++) {
              console.log(i);
              console.log(jadwal_umum.value[i].hari_kelas_umum);

              console.log(current);
              date.setDate(current.getDate());
              date.setMonth(current.getMonth());
              date.setFullYear(current.getFullYear());

              date.setDate(date.getDate() + 7);
              date.setDate(date.getDate() - date.getDay() + 1);
              console.log(date, "ngeset tanggal jadi senin mingdep");
              var increment = -1;

              switch (jadwal_umum.value[i].hari_kelas_umum) {
                case "Senin":
                  increment = 0;
                  break;

                case "Selasa":
                  increment = 1;
                  break;

                case "Rabu":
                  increment = 2;
                  break;

                case "Kamis":
                  increment = 3;
                  break;

                case "Jumat":
                  increment = 4;
                  break;

                case "Sabtu":
                  increment = 5;
                  break;

                case "Minggu":
                  increment = 6;
                  break;

                default:
                  increment = -1;
                  break;
              }

              date.setDate(date.getDate() + increment);

              var tgl_kelas = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
              // kuotaKelas = getKuotaKelas(jadwal_umum.value[i].id_kelas);
              // console.log(
              //   "Kuota Kelas yg dmasukin: " +
              //     getKuotaKelas(jadwal_umum.value[i].id_kelas)
              // );
              postToJadwalHarian(
                0,
                jadwal_umum.value[i].id_instruktur,
                jadwal_umum.value[i].id_kelas,
                jadwal_umum.value[i].hari_kelas_umum,
                jadwal_umum.value[i].jam_mulai,
                jadwal_umum.value[i].jam_selesai,
                jadwal_umum.value[i].kelas.kuota,
                "NORMAL",
                tgl_kelas,
                i
              );
            }
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    }

    function postToJadwalHarian(
      id_jadwal_harian,
      id_instruktur,
      id_kelas,
      hari_kelas_harian,
      jam_mulai,
      jam_selesai,
      kuota,
      keterangan,
      tgl_kelas,
      i
    ) {        
        axios
          .post("https://valent.ppcdeveloper.com/api/jadwalHarian", {
            id_jadwal_harian: id_jadwal_harian,
            id_instruktur: id_instruktur,
            id_kelas: id_kelas,
            hari_kelas_harian: hari_kelas_harian,
            jam_mulai: jam_mulai,
            jam_selesai: jam_selesai,
            kuota: kuota,
            keterangan: keterangan,
            tgl_kelas: tgl_kelas,
          })
          .then(() => {
            console.log(
              "Tanggal kelas yg dipost: " + tgl_kelas + " // ke - " + i
            );
            if (i == 29) {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }

    // function getKuotaKelas($id_kelas) {
    //   axios
    //     .get("http://127.0.0.1:8000/api/kelas/" + $id_kelas, {})
    //     .then((response) => {
    //       jadwal_harian.value = response.data.data;
    //       kuotaKelas = response.data.data["kuota"];
    //       console.log("Kuota Kelas: " + kuotaKelas);
    //       return kuotaKelas;
    //     })
    //     .catch(() => {
    //       //assign state validation with error
    //       return 0;
    //     });
    //   return kuotaKelas;
    // }

    function liburkanKelas($id_jadwal_harian) {
      axios
        .put("https://valent.ppcdeveloper.com/api/jadwalHarian/" + $id_jadwal_harian, {
          keterangan: "LIBUR",
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          //assign state validation with error
          console.log(error);
        });
    }

    function gantiInstruktur(
      $id_jadwal_harian,
      $id_instruktur_diganti,
      $nama_instruktur_diganti
    ) {
      axios
        .put("https://valent.ppcdeveloper.com/api/jadwalHarian/" + $id_jadwal_harian, {
          keterangan:
            "MENGGANTIKAN " +
            $id_instruktur_diganti +
            " - " +
            $nama_instruktur_diganti,
          id_instruktur: id_instruktur_pengganti,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          //assign state validation with error
          console.log(error);
        });
    }

    function setInstrukturPengganti(
      $id_jadwal_harian,
      $id_instruktur_diganti,
      $nama_instruktur_diganti
    ) {
      localStorage.setItem("Id_jadwal_harian", $id_jadwal_harian);
      localStorage.setItem("Id_instruktur_diganti", $id_instruktur_diganti);
      localStorage.setItem("Nama_instruktur_diganti", $nama_instruktur_diganti);
    }
    return {
      jadwal_harian,
      generateJadwalHarian,
      liburkanKelas,
      id_instruktur_pengganti,
      instrukturs,
      gantiInstruktur,
      setInstrukturPengganti,
      dataEmpty,
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      let date = `${current} - ${current.getDay()}`;
      return date;
    },
  },
};
</script>
