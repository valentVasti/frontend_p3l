<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>UBAH DATA JADWAL UMUM</h4>
            <hr />
            <form @submit.prevent="update(this.id)">
              <div class="form-group mb-3">
                <label class="form-label">Hari Kelas</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwal_umum.hari_kelas_umum"
                >
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
                    
                    {{ instruktur.nama }}
                  </option>
                </select>

                <!-- validation -->
                <!-- <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">{{ validation.tgl_lahir[0] }}</div> -->
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Jam Mulai</label>

                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="jadwal_umum.selectedJam"
                >
                  <option value="08:00:00 - 09:30:00">
                    08.00 AM - 09.30 AM
                  </option>
                  <option value="09:30:00 - 11:00:00">
                    09.30 AM - 11.00 AM
                  </option>
                  <option value="17:00:00 - 18:30:00">
                    05.00 PM - 06.30 PM
                  </option>
                  <option value="18:30:00 - 20:00:00">
                    06.30 PM - 08.00 PM
                  </option>
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

              <button type="submit" class="btn btn-primary">UBAH</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  created() {
    this.id = this.$route.params.id;
  },
  setup() {
    const route = useRoute();

    const instrukturs = ref([]);

    const jadwal_umums = ref([]);

    const kelass = ref([]);

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(`https://valent.ppcdeveloper.com/api/kelas`)
        .then((response) => {
          //assign state posts with response data
          kelass.value = response.data.data;
          console.log(kelass.value);
        })
        .catch((error) => {
          console.log(error.response.data);
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

      axios
        .get(`https://valent.ppcdeveloper.com/api/jadwalUmum/${route.params.id}`)
        .then((response) => {
          //assign state posts with response data
          jadwal_umum.value = response.data.data;
          jadwal_umum.value.selectedJam = (jadwal_umum.value.jam_mulai + " - " + jadwal_umum.value.jam_selesai)
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    const jadwal_umum = ref([]);

    //method update
    function update($id_jadwalUmum) {
      let hari_kelas_umum = jadwal_umum.value.hari_kelas_umum;
      let jam_mulai = jadwal_umum.value.selectedJam.substr(0, 8);
      let jam_selesai = jadwal_umum.value.selectedJam.substr(11, 8);
      let id_kelas = jadwal_umum.value.id_kelas;
      let id_instruktur = jadwal_umum.value.id_instruktur;

      axios
        .put("https://valent.ppcdeveloper.com/api/jadwalUmum/" + $id_jadwalUmum, {
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
          console.log(error.response.data);
          router.push({
            name: "jadwal_umum.index",
          });
        });
    }

    //return
    return {
      instrukturs,
      jadwal_umums,
      jadwal_umum,
      validation,
      route,
      router,
      update,
      kelass,
    };
  },
};
</script>

<style></style>
