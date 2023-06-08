<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
  >
    <h1 class="h2 m-3">Data Instruktur</h1>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <router-link
              :to="{ name: 'instruktur.create' }"
              class="btn btn-md btn-success"
              >TAMBAH INSTRUKTUR</router-link
            >
            <button
              @click="resetKeterlambatan"
              class="btn btn-md btn-primary m-2"
              >RESET KETERLAMBATAN</button
            >
            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAMA</th>
                  <th scope="col">NOMOR TELEPON</th>
                  <th scope="col">TANGGAL LAHIR</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">KETERLAMBATAN (DETIK)</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(instruktur, id_instruktur) in instrukturs"
                  :key="id_instruktur"
                >
                  <td>{{ instruktur.id_instruktur }}</td>
                  <td>{{ instruktur.nama }}</td>
                  <td>{{ instruktur.no_telp }}</td>
                  <td>{{ instruktur.tgl_lahir }}</td>
                  <td>{{ instruktur.email }}</td>
                  <td>{{ instruktur.keterlambatan }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'instruktur.edit',
                        params: { id: instruktur.id_instruktur },
                      }"
                      class="btn btn-sm btn-primary m-1"
                    >
                      UBAH
                    </router-link>
                    <button class="btn btn-sm btn-danger m-1" @click.prevent="deleted(instruktur.id_instruktur)">HAPUS</button>
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
export default {
  setup() {
    //reactive state
    let instrukturs = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://127.0.0.1:8000/api/instruktur")
        .then((response) => {
          //assign state posts with response data
          instrukturs.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function deleted($id_instruktur) {
      axios
        .delete('http://127.0.0.1:8000/api/instruktur/' + $id_instruktur)
        .then(() => {
          //splice instruktur
          instrukturs.value.splice(instrukturs.value.indexOf($id_instruktur), 1);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function resetKeterlambatan(){
      axios
        .post("http://127.0.0.1:8000/api/resetKeterlambatan")
        .then(() => {
          //assign state posts with response data
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      instrukturs,
      deleted,
      resetKeterlambatan
    };
  },
};
</script>
