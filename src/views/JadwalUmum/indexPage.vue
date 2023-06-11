<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
  >
    <h1 class="h2 m-3">Data Jadwal Umum</h1>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <router-link
              :to="{ name: 'jadwal_umum.create' }"
              class="btn btn-md btn-success"
              >TAMBAH JADWAL UMUM</router-link
            >

            <table class="table table-plain mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">SENIN</th>
                  <th scope="col">SELASA</th>
                  <th scope="col">RABU</th>
                  <th scope="col">KAMIS</th>
                  <th scope="col">JUMAT</th>
                  <th scope="col">SABTU</th>
                  <th scope="col">MINGGU</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  <tr
                    v-for="(jadwal_umum, id) in jadwal_umums"
                    :key="id"
                  >
                    <td align="center" v-if="jadwal_umum.hari_kelas_umum == 'Senin'">
                      {{ jadwal_umum.id_jadwal_umum }}
                      <br> {{ jadwal_umum.kelas.id_kelas }} {{ "-" }} {{ jadwal_umum.kelas.nama_kelas }}
                      <br> {{ jadwal_umum.instruktur.id_instruktur }} {{ "-" }} {{ jadwal_umum.instruktur.nama }}
                      <br> {{ jadwal_umum.jam_mulai }} {{ " - " }} {{ jadwal_umum.jam_selesai }}
                      <br>
                      <router-link
                        :to="{
                          name: 'jadwal_umum.edit',
                          params: { id: jadwal_umum.id_jadwal_umum },
                        }"
                        class="btn btn-sm btn-primary m-1 mb-2"
                      >
                        UBAH
                      </router-link>
                      <button
                        class="btn btn-sm btn-danger m-1 mb-2"
                        @click.prevent="deleted(jadwal_umum.id_jadwal_umum)"
                      >
                        HAPUS
                      </button>
                    </td>
                  </tr>
                </td>
                <td>
                  <tr
                    v-for="(jadwal_umum, id) in jadwal_umums"
                    :key="id"
                  >
                    <td align="center" v-if="jadwal_umum.hari_kelas_umum == 'Selasa'">
                      {{ jadwal_umum.id_jadwal_umum }}
                      <br> {{ jadwal_umum.kelas.id_kelas }} {{ "-" }} {{ jadwal_umum.kelas.nama_kelas }}
                      <br> {{ jadwal_umum.instruktur.id_instruktur }} {{ "-" }} {{ jadwal_umum.instruktur.nama }}
                      <br> {{ jadwal_umum.jam_mulai }} {{ " - " }} {{ jadwal_umum.jam_selesai }}
                      <br>
                      <router-link
                        :to="{
                          name: 'jadwal_umum.edit',
                          params: { id: jadwal_umum.id_jadwal_umum },
                        }"
                        class="btn btn-sm btn-primary m-1 mb-2"
                      >
                        UBAH
                      </router-link>
                      <button
                        class="btn btn-sm btn-danger m-1 mb-2"
                        @click.prevent="deleted(jadwal_umum.id_jadwal_umum)"
                      >
                        HAPUS
                      </button>
                    </td>
                  </tr>
                </td>
                <td>
                  <tr
                    v-for="(jadwal_umum, id) in jadwal_umums"
                    :key="id"
                  >
                    <td align="center" v-if="jadwal_umum.hari_kelas_umum == 'Rabu'">
                      {{ jadwal_umum.id_jadwal_umum }}
                      <br> {{ jadwal_umum.kelas.id_kelas }} {{ "-" }} {{ jadwal_umum.kelas.nama_kelas }}
                      <br> {{ jadwal_umum.instruktur.id_instruktur }} {{ "-" }} {{ jadwal_umum.instruktur.nama }}
                      <br> {{ jadwal_umum.jam_mulai }} {{ " - " }} {{ jadwal_umum.jam_selesai }}
                      <br>
                      <router-link
                        :to="{
                          name: 'jadwal_umum.edit',
                          params: { id: jadwal_umum.id_jadwal_umum },
                        }"
                        class="btn btn-sm btn-primary m-1 mb-2"
                      >
                        UBAH
                      </router-link>
                      <button
                        class="btn btn-sm btn-danger m-1 mb-2"
                        @click.prevent="deleted(jadwal_umum.id_jadwal_umum)"
                      >
                        HAPUS
                      </button>
                    </td>
                  </tr>
                </td>
                <td>
                  <tr
                    v-for="(jadwal_umum, id) in jadwal_umums"
                    :key="id"
                  >
                    <td align="center" v-if="jadwal_umum.hari_kelas_umum == 'Kamis'">
                      {{ jadwal_umum.id_jadwal_umum }}
                      <br> {{ jadwal_umum.kelas.id_kelas }} {{ "-" }} {{ jadwal_umum.kelas.nama_kelas }}
                      <br> {{ jadwal_umum.instruktur.id_instruktur }} {{ "-" }} {{ jadwal_umum.instruktur.nama }}
                      <br> {{ jadwal_umum.jam_mulai }} {{ " - " }} {{ jadwal_umum.jam_selesai }}
                      <br>
                      <router-link
                        :to="{
                          name: 'jadwal_umum.edit',
                          params: { id: jadwal_umum.id_jadwal_umum },
                        }"
                        class="btn btn-sm btn-primary m-1 mb-2"
                      >
                        UBAH
                      </router-link>
                      <button
                        class="btn btn-sm btn-danger m-1 mb-2"
                        @click.prevent="deleted(jadwal_umum.id_jadwal_umum)"
                      >
                        HAPUS
                      </button>
                    </td>
                  </tr>
                </td>
                <td>
                  <tr
                    v-for="(jadwal_umum, id) in jadwal_umums"
                    :key="id"
                  >
                    <td align="center" v-if="jadwal_umum.hari_kelas_umum == 'Jumat'">
                      {{ jadwal_umum.id_jadwal_umum }}
                      <br> {{ jadwal_umum.kelas.id_kelas }} {{ "-" }} {{ jadwal_umum.kelas.nama_kelas }}
                      <br> {{ jadwal_umum.instruktur.id_instruktur }} {{ "-" }} {{ jadwal_umum.instruktur.nama }}
                      <br> {{ jadwal_umum.jam_mulai }} {{ " - " }} {{ jadwal_umum.jam_selesai }}
                      <br>
                      <router-link
                        :to="{
                          name: 'jadwal_umum.edit',
                          params: { id: jadwal_umum.id_jadwal_umum },
                        }"
                        class="btn btn-sm btn-primary m-1 mb-2"
                      >
                        UBAH
                      </router-link>
                      <button
                        class="btn btn-sm btn-danger m-1 mb-2"
                        @click.prevent="deleted(jadwal_umum.id_jadwal_umum)"
                      >
                        HAPUS
                      </button>
                    </td>
                  </tr>
                </td>
                <td>
                  <tr
                    v-for="(jadwal_umum, id) in jadwal_umums"
                    :key="id"
                  >
                    <td align="center" v-if="jadwal_umum.hari_kelas_umum == 'Sabtu'">
                      {{ jadwal_umum.id_jadwal_umum }}
                      <br> {{ jadwal_umum.kelas.id_kelas }} {{ "-" }} {{ jadwal_umum.kelas.nama_kelas }}
                      <br> {{ jadwal_umum.instruktur.id_instruktur }} {{ "-" }} {{ jadwal_umum.instruktur.nama }}
                      <br> {{ jadwal_umum.jam_mulai }} {{ " - " }} {{ jadwal_umum.jam_selesai }}
                      <br>
                      <router-link
                        :to="{
                          name: 'jadwal_umum.edit',
                          params: { id: jadwal_umum.id_jadwal_umum },
                        }"
                        class="btn btn-sm btn-primary m-1 mb-2"
                      >
                        UBAH
                      </router-link>
                      <button
                        class="btn btn-sm btn-danger m-1 mb-2"
                        @click.prevent="deleted(jadwal_umum.id_jadwal_umum)"
                      >
                        HAPUS
                      </button>
                    </td>
                  </tr>
                </td>
                <td>
                  <tr
                    v-for="(jadwal_umum, id) in jadwal_umums"
                    :key="id"
                  >
                    <td align="center" v-if="jadwal_umum.hari_kelas_umum == 'Minggu'">
                      {{ jadwal_umum.id_jadwal_umum }}
                      <br> {{ jadwal_umum.kelas.id_kelas }} {{ "-" }} {{ jadwal_umum.kelas.nama_kelas }}
                      <br> {{ jadwal_umum.instruktur.id_instruktur }} {{ "-" }} {{ jadwal_umum.instruktur.nama }}
                      <br> {{ jadwal_umum.jam_mulai }} {{ " - " }} {{ jadwal_umum.jam_selesai }}
                      <br>
                      <router-link
                        :to="{
                          name: 'jadwal_umum.edit',
                          params: { id: jadwal_umum.id_jadwal_umum },
                        }"
                        class="btn btn-sm btn-primary m-1 mb-2"
                      >
                        UBAH
                      </router-link>
                      <button
                        class="btn btn-sm btn-danger m-1 mb-2"
                        @click.prevent="deleted(jadwal_umum.id_jadwal_umum)"
                      >
                        HAPUS
                      </button>
                    </td>
                  </tr>
                </td>
              

                  <!-- <td>
                    <router-link
                      :to="{
                        name: 'jadwal_umum.edit',
                        params: { id: jadwal_umum.id_jadwal_umum },
                      }"
                      class="btn btn-sm btn-primary m-1"
                    >
                      UBAH
                    </router-link>
                    <button
                      class="btn btn-sm btn-danger m-1"
                      @click.prevent="deleted(jadwal_umum.id_jadwal_umum)"
                    >
                      HAPUS
                    </button>
                  </td> -->
                <!-- </tr> -->
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
export default {
  setup() {
    //reactive state
    let jadwal_umums = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://valent.ppcdeveloper.com/api/jadwalUmum")
        .then((response) => {
          //assign state posts with response data
          jadwal_umums.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function deleted($id_jadwal_umum) {
      axios
        .delete("https://valent.ppcdeveloper.com/api/jadwalUmum/" + $id_jadwal_umum)
        .then(() => {
          //splice instruktur
          jadwal_umums.value.splice(
            jadwal_umums.value.indexOf($id_jadwal_umum),
            1
          );
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      jadwal_umums,
      deleted
    };
  },
};
</script>
