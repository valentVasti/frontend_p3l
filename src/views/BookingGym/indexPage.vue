<template>
    <div
      class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
    >
      <h1 class="h2 m-3">Booking Gym</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow mb-4">
            <h3 class="card-title m-3">Booking Gym Hari Ini</h3>
            <div class="card-body">
              <!-- <router-link
                :to="{ name: 'instruktur.create' }"
                class="btn btn-md btn-success"
                >TAMBAH INSTRUKTUR</router-link
              > -->
               <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID MEMBER - NAMA</th>
                    <th scope="col">SESI</th>
                    <th scope="col">JAM SESI</th>
                    <th scope="col">TANGGAL BOOKING SESI</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">PRESENSI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id) in booking_gym_today"
                    :key="id"
                  >
                    <td>{{ data.id_member }} {{ '-' }} {{ data.member.nama }}</td>
                    <td>{{ data.sesi }}</td>
                    <td>{{ data.sesi_gym.jam_mulai }} {{ '-' }} {{ data.sesi_gym.jam_selesai }}</td>
                    <td>{{ data.tgl_booking }}</td>
                    <td>{{ data.status }}</td>
                    <td>
                      <div v-if="data.status == 'BELUM PRESENSI'">
                        <button
                          @click="presensiGym(data.id_member, data.sesi, 'HADIR')"
                          class="btn btn-sm btn-success m-1"                         
                        >
                          HADIR
                        </button>
                        <button
                          @click="presensiGym(data.id_member, data.sesi, 'TIDAK HADIR')"
                          class="btn btn-sm btn-danger m-1"   
                        >
                          TIDAK HADIR
                        </button>
                      </div>
                      <div v-else>
                        <button
                          class="btn btn-sm btn-success m-1"
                          disabled                         
                        >
                          HADIR
                        </button>
                        <button
                          class="btn btn-sm btn-danger m-1" 
                          disabled  
                        >
                          TIDAK HADIR
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card border-0 rounded shadow mb-4">
            <h3 class="card-title m-3">Semua Booking Gym</h3>
            <div class="card-body">
              <!-- <router-link
                :to="{ name: 'instruktur.create' }"
                class="btn btn-md btn-success"
                >TAMBAH INSTRUKTUR</router-link
              > -->
               <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ID MEMBER - NAMA</th>
                    <th scope="col">SESI</th>
                    <th scope="col">JAM SESI</th>
                    <th scope="col">TANGGAL BOOKING SESI</th>
                    <th scope="col">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, id) in booking_gym"
                    :key="id"
                  >
                    <td>{{ data.id_member }} {{ '-' }} {{ data.member.nama }}</td>
                    <td>{{ data.sesi }}</td>
                    <td>{{ data.sesi_gym.jam_mulai }} {{ '-' }} {{ data.sesi_gym.jam_selesai }}</td>
                    <td>{{ data.tgl_booking }}</td>
                    <td>{{ data.status }}</td>
                    <!-- <td>
                      <button
                        @click="presensiGym(data.id_member, data.sesi)"
                        class="btn btn-sm btn-danger m-1"
                      >
                        PRESENSI
                    </button>
                    </td> -->
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
      let booking_gym = ref([]);
      let booking_gym_today = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("http://127.0.0.1:8000/api/bookingGym")
          .then((response) => {
            //assign state posts with response data
            booking_gym.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });

          axios
          .get("http://127.0.0.1:8000/api/bookingGymToday")
          .then((response) => {
            //assign state posts with response data
            booking_gym_today.value = response.data.data;
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      function presensiGym($id_member, $sesi, $presensi) {

        axios.post('http://127.0.0.1:8000/api/presensiGym/' + $presensi,{
            id_member: $id_member,
            sesi: $sesi,
        }).then(() => {
            //splice instruktur
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
  
      //return
      return {
        booking_gym,
        booking_gym_today,
        presensiGym
      };
    },
  };
  </script>
  