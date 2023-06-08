<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH JADWAL UMUM</h4>
            <hr />
            <form @submit.prevent="store">
              <div class="form-group mb-3">
                <label class="form-label">Hari Kelas</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwal_umum.hari_kelas_umum"
                >
                  <option selected>Pilih hari</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                  <option value="Minggu">Minggu</option>
                </select>
                <!-- validation -->
                <!-- <div v-if="validation.nama" class="mt-2 alert alert-danger">{{ validation.nama[0] }}</div> -->
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Kelas</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwal_umum.id_kelas"
                >
                  <option
                    v-for="(kelas, id_kelas) in kelass"
                    :key="id_kelas"
                    :value="kelas.id_kelas"
                  >
                    {{ kelas.id_kelas }} {{ " - " }} {{ kelas.nama_kelas }}
                  </option>
                </select>

                <!-- validation -->
                <!-- <div v-if="validation.no_telp" class="mt-2 alert alert-danger">{{ validation.no_telp[0] }}</div> -->
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Instruktur</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwal_umum.id_instruktur"
                >
                  <option
                    v-for="(instruktur, id_instruktur) in instrukturs"
                    :key="id_instruktur"
                    :value="instruktur.id_instruktur"
                  >
                    {{ instruktur.id_instruktur }} {{ " - " }}
                    {{ instruktur.nama }}
                  </option>
                </select>

                <!-- validation -->
                <!-- <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">{{ validation.tgl_lahir[0] }}</div> -->
              </div>
              <div class="form-group mb-3">

                <!-- <div>Picked: {{ selectedJam }}</div> -->
                <label for="content" class="form-label">Jam Mulai</label>

                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwal_umum.selectedJam"
                >
                  <option value="08:00:00 - 09:30:00">08.00 AM - 09.30 AM</option>
                  <option value="09:30:00 - 11:00:00">09.30 AM - 11.00 AM</option>
                  <option value="17:00:00 - 18:30:00">05.00 PM - 06.30 PM</option>
                  <option value="18:30:00 - 20:00:00">06.30 PM - 08.00 PM</option>
                </select>
                <!-- <input
                  class="form-control"
                  type="text"
                  v-model="jadwal_umum.jam_mulai"
                  placeholder="Masukkan jam mulai kelas"
                /> -->

                <!-- <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectedJam"
                    id="jam1"
                    value="08:00:00 - 09:30:00"
                    :v-model = "selectedJam = '08:00:00 - 09:30:00'"
                  />
                  <label class="form-check-label" for="jam1">
                    08.00 AM - 09:30 AM
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectedJam"
                    id="jam2"
                    value="09:30:00 - 11:00:00"
                    @input="selectedJam = $event.target.value"
                  />
                  <label class="form-check-label" for="jam2">
                    09.30 AM - 11.00 AM
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectedJam"
                    id="jam3"
                    value="17:00:00 - 18:30:00"
                    @input="selectedJam = $event.target.value"
                  />
                  <label class="form-check-label" for="jam3">
                    05:00 PM - 06.30 PM
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectedJam"
                    id="jam4"
                    value="18:30:00 - 20:00:00"
                    @input="selectedJam = $event.target.value"
                  />
                  <label class="form-check-label" for="jam4">
                    06:30 PM - 08.00 PM
                  </label>
                </div> -->

                <!-- validation -->
                <!-- <div v-if="validation.email" class="mt-2 alert alert-danger">{{ validation.email[0] }}</div> -->
              </div>

              <!-- <div class="form-group mb-3"> -->
                <!-- <label for="content" class="form-label">Jam Selesai</label> -->
                <!-- <input
                  class="form-control"
                  type="text"
                  v-model="jadwal_umum.jam_selesai"
                  placeholder="Masukkan jam selesai kelas"
                /> -->

                <!-- <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectedJamMulai"
                    id="jamSelesai1"
                    value="08:00:00"
                    
                  />
                  <label class="form-check-label" for="jamSelesai1">
                    09:30 AM
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectedJamMulai"
                    id="jamSelesai2"
                    value="09:30:00"
                  />
                  <label class="form-check-label" for="jamSelesai2">
                    11.00 AM
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectedJamMulai"
                    id="jamSelesai3"
                    value="18:30:00"
                  />
                  <label class="form-check-label" for="jamSelesai3">
                    06:30 PM
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="selectedJamMulai"
                    id="jamSelesai4"
                    value="20:00:00"
                  />
                  <label class="form-check-label" for="jamSelesai4">
                    08:00 PM
                  </label>
                </div> -->

                <!-- validation -->
                <!-- <div v-if="validation.password" class="mt-2 alert alert-danger">{{ validation.password[0] }}</div> -->
              <!-- </div> -->
              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(`http://127.0.0.1:8000/api/kelas`)
        .then((response) => {
          //assign state posts with response data
          kelass.value = response.data.data;
          console.log(kelass.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      axios
        .get(`http://127.0.0.1:8000/api/instruktur`)
        .then((response) => {
          //assign state posts with response data
          instrukturs.value = response.data.data;
          console.log(instrukturs.value);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //state departemen
    const jadwal_umum = reactive({
      id_jadwal_umum: "",
      hari_kelas_umum: "",
      selectedJam: "",
      id_kelas: "",
      id_instruktur: "",
    });

    // function setJamKelas(){
    //     jadwal_umum.jam_mulai = selectedJam.substr(0, 8)
    //     jadwal_umum.jam_selesai = selectedJam.substr(11, 8)
    // }

    const kelass = ref([]);

    const instrukturs = ref([]);

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store() {
      // setJamKelas();
      let id_jadwal_umum = 0;
      let hari_kelas_umum = jadwal_umum.hari_kelas_umum;
      let jam_mulai = jadwal_umum.selectedJam.substr(0, 8);
      let jam_selesai = jadwal_umum.selectedJam.substr(11, 8);  
      let id_kelas = jadwal_umum.id_kelas;
      let id_instruktur = jadwal_umum.id_instruktur;

      axios
        .post("http://127.0.0.1:8000/api/jadwalUmum", {
          id_jadwal_umum: id_jadwal_umum,
          hari_kelas_umum: hari_kelas_umum,
          jam_mulai: jam_mulai,
          jam_selesai: jam_selesai,
          id_kelas: id_kelas,
          id_instruktur: id_instruktur,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "jadwal_umum.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
          console.log(jadwal_umum.jam_mulai);
          console.log(jadwal_umum.id_instruktur);
          console.log(error);
        });
    }

    //return
    return {
      jadwal_umum,
      validation,
      router,
      store,
      kelass,
      instrukturs,
      
    };
  },
};
</script>

<style></style>
