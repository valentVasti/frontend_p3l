<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>TRANSAKSI DEPOSIT UANG</h4>
              <hr />
              <form @submit.prevent="store">
                <div class="form-group mb-3">
                  <label class="form-label">Pilih Member</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="transaksi_depou.id_member"
                  >
                    <option
                      v-for="(data, id_member) in member"
                      :key="id_member"
                      :value="data.id_member"
                    >
                      {{ data.id_member }} {{ " - " }}
                      {{ data.nama }}
                    </option>
                  </select>
                  <!-- validation -->
                  <div v-if="validation.id_member" class="mt-2 alert alert-danger">{{ validation.id_member[0] }}</div>
                </div>
                <div class="form-group mb-3">
                    <label class="form-label">Jumlah Deposit</label>
                                <input type="text" class="form-control" v-model="transaksi_depou.jumlah_depou" placeholder="Masukkan jumlah deposit uang">  
                  <!-- validation -->
                  <div v-if="validation.jumlah_depou" class="mt-2 alert alert-danger">{{ validation.jumlah_depou[0] }}</div>
                </div> 
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
          .get(`https://valent.ppcdeveloper.com/api/member`)
          .then((response) => {
            //assign state posts with response data
            member.value = response.data.data;
            console.log(member.value);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      //state departemen
      const transaksi_depou = reactive({
        id_transaksi_depou: "",
        id_pegawai: "",
        id_member: "",
        id_promo: "",
        sisa_deposit:"",
        jumlah_depou:"",
        tgl_transaksi:""
      });
  
      // function setJamKelas(){
      //     jadwal_umum.jam_mulai = selectedJam.substr(0, 8)
      //     jadwal_umum.jam_selesai = selectedJam.substr(11, 8)
      // }
  
      const member = ref([]);
  
      //state validation
      const validation = ref([]);
  
      //vue router
      const router = useRouter();
  
      //method store
      function store() {
        // setJamKelas();
        // let id_jadwal_umum = 0;
        // let hari_kelas_umum = jadwal_umum.hari_kelas_umum;
        // let jam_mulai = jadwal_umum.selectedJam.substr(0, 8);
        // let jam_selesai = jadwal_umum.selectedJam.substr(11, 8);  
        // let id_kelas = jadwal_umum.id_kelas;
        // let id_instruktur = jadwal_umum.id_instruktur;

        let id_transaksi_depou = 0;
        let id_pegawai = localStorage.getItem('Id_User');
        let id_member = transaksi_depou.id_member;
        let id_promo = 0
        let sisa_deposit = 0
        let jumlah_depou = transaksi_depou.jumlah_depou
        let tgl_transaksi = '2012-12-12'
  
        axios
          .post("https://valent.ppcdeveloper.com/api/transaksiDepoU", {
            id_transaksi_depou: id_transaksi_depou,
            id_pegawai: id_pegawai,
            id_member: id_member,
            id_promo: id_promo,
            sisa_deposit: sisa_deposit,
            jumlah_depou: jumlah_depou,
            tgl_transaksi: tgl_transaksi
          })
          .then(() => {
            //redirect ke post index
            router.push({
              name: "transaksi_depou.index",
            });
          })
          .catch((error) => {
            //assign state validation with error
            validation.value = error.response.data;
          });
      }
  
      //return
      return {
        transaksi_depou,
        validation,
        router,
        store,
        member      
      };
    },
  };
  </script>
  
  <style></style>
  