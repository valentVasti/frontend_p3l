<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h4>TRANSAKSI DEPOSIT KELAS</h4>
              <hr />
              <form @submit.prevent="store">
                <div class="form-group mb-3">
                  <label class="form-label">Pilih Member</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="transaksi_depok.id_member"
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
                  <label class="form-label">Pilih Kelas</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="transaksi_depok.id_kelas"
                  >
                    <option
                      v-for="(data, id_kelas) in kelas"
                      :key="id_kelas"
                      :value="data.id_kelas"
                    >
                      {{ data.id_kelas }} {{ " - " }}
                      {{ data.nama_kelas }}
                    </option>
                  </select>
                  <!-- validation -->
                  <div v-if="validation.id_kelas" class="mt-2 alert alert-danger">{{ validation.id_kelas[0] }}</div>
                </div>
                <div class="form-group mb-3">
                    <label class="form-label">Jumlah Deposit Kelas</label>
                                <input type="text" class="form-control" v-model="transaksi_depok.jumlah_deposit" placeholder="Masukkan jumlah deposit kelas">  
                  <!-- validation -->
                  <div v-if="validation.jumlah_deposit" class="mt-2 alert alert-danger">{{ validation.jumlah_deposit[0] }}</div>
                  <div v-else-if="validation.depositNotZero" class="mt-2 alert alert-danger">{{ validation.depositNotZero }}</div>
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
          .get(`http://127.0.0.1:8000/api/member`)
          .then((response) => {
            //assign state posts with response data
            member.value = response.data.data;
            console.log(member.value);
          })
          .catch((error) => {
            console.log(error.response.data);
          });

          axios
          .get(`http://127.0.0.1:8000/api/kelas`)
          .then((response) => {
            //assign state posts with response data
            kelas.value = response.data.data;
            console.log(kelas.value);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });
  
      //state departemen
      const transaksi_depok = reactive({
        id_transaksi_depok: "",
        id_pegawai: "",
        id_member: "",
        id_kelas: "",
        id_promo_kelas: "",
        jumlah_bayar:"",
        jumlah_deposit:"",
        tgl_kadaluarsa:"",
        tgl_transaksi:""
      });
  
      // function setJamKelas(){
      //     jadwal_umum.jam_mulai = selectedJam.substr(0, 8)
      //     jadwal_umum.jam_selesai = selectedJam.substr(11, 8)
      // }
  
      const member = ref([]);
      const kelas = ref([]);
  
      //state validation
      const validation = ref([]);
  
      //vue router
      const router = useRouter();
  
      //method store
      function store() {
        let id_transaksi_depok = 0
        let id_pegawai = localStorage.getItem('Id_User')
        let id_member = transaksi_depok.id_member
        let id_kelas = transaksi_depok.id_kelas
        let id_promo_kelas = 0
        let jumlah_bayar = 0
        let jumlah_deposit = transaksi_depok.jumlah_deposit 
        let tgl_kadaluarsa = '2012-12-12'
        let tgl_transaksi = '2012-12-12'
  
        axios
          .post("http://127.0.0.1:8000/api/transaksiDepoK", {
            id_transaksi_depok: id_transaksi_depok,
            id_pegawai: id_pegawai,
            id_member: id_member,
            id_kelas: id_kelas,
            id_promo_kelas: id_promo_kelas,
            jumlah_bayar: jumlah_bayar,
            jumlah_deposit: jumlah_deposit,
            tgl_kadaluarsa: tgl_kadaluarsa,
            tgl_transaksi: tgl_transaksi
          })
          .then(() => {
            //redirect ke post index
            router.push({
              name: "transaksi_depok.index",
            });
          })
          .catch((error) => {
            //assign state validation with error
            validation.value = error.response.data;
            console.log(error.response.data)
          });
      }
  
      //return
      return {
        transaksi_depok,
        validation,
        router,
        store,
        member,
        kelas      
      };
    },
  };
  </script>
  
  <style></style>
  