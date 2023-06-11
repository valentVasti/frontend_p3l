<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
  />

  <nav class="navbar bg-body-tertiary p-1 shadow">
    <div class="container-fluid">
      <a class="navbar-brand">
        <button
          class="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        Hai, {{ role }} {{ nama_user }}
      </a>
      <button class="btn btn-danger" type="button" @click="logout">
        LOGOUT
      </button>
      <!-- <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        <span class="navbar-toggler-icon"></span>
      </button> -->
      <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button> -->
      <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div> -->
    </div>
  </nav>

  <div class="container-fluid">
    <div class="row">
      <router-view></router-view>
    </div>
  </div>

  <div
    class="offcanvas offcanvas-start p-0"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
    data-bs-dismiss="offcanvas"
          aria-label="Close"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
      <!-- <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> -->
    </div>
    <div class="offcanvas-body">
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-show="role === 'Admin'"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <router-link :to="{ name: 'instruktur.index' }" class="nav-link"
            >Instruktur</router-link
          >
        </li>
        <li
          class="list-group-item"
          v-show="role === 'Admin' || role === 'Kasir'"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <router-link :to="{ name: 'member.index' }" class="nav-link"
            >Member</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Admin' || role === 'MO'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'jadwal_umum.index' }" class="nav-link"
            >Jadwal Umum</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Admin' || role === 'MO'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'jadwal_harian.index' }" class="nav-link"
            >Jadwal Harian</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'transaksi_aktivasi.index' }" class="nav-link"
            >Transaksi Aktivasi</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'transaksi_depou.index' }" class="nav-link"
            >Transaksi Deposit Uang</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'transaksi_depok.index' }" class="nav-link"
            >Transaksi Deposit Kelas</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'deposit_kelas.index' }" class="nav-link"
            >Deposit Kelas Kadaluarsa</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'izin_instruktur.index' }" class="nav-link"
            >Izin Instruktur</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'booking_gym.index' }" class="nav-link"
            >Booking Gym</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'presensi_gym.index' }" class="nav-link"
            >Presensi Gym</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'presensi_kelas.index' }" class="nav-link"
            >Presensi Kelas</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'izin_instruktur.index' }" class="nav-link"
            >Presensi Instruktur</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'laporan_pendapatan.index' }" class="nav-link"
            >Laporan Pendapatan</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'laporan_gym.index' }" class="nav-link"
            >Laporan Gym</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'laporan_kelas.index' }" class="nav-link"
            >Laporan Kelas</router-link
          >
        </li>
        <li class="list-group-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas"
          aria-label="Close">
          <router-link :to="{ name: 'laporan_kinerja_instruktur.index' }" class="nav-link"
            >Laporan Kinerja Instruktur</router-link
          >
        </li>
        <div></div>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    let nama_user;
    let role = localStorage.getItem("Role");

    const pegawai = ref([]);

    const router = useRouter();

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(
          "https://valent.ppcdeveloper.com/api/pegawai/" + localStorage.getItem("Id_User")
        )
        .then((response) => {
          //assign state posts with response data
          pegawai.value = response.data.data;
          nama_user = pegawai.value["nama_pegawai"];
          localStorage.setItem('Nama_user', nama_user);
          console.log(nama_user);
        })
        .catch((error) => {
          console.log(error.response);
        });
    });

    function logout() {
      localStorage.removeItem("Role");
      localStorage.removeItem("Id_User");
      router.push({
        name: "login",
      });

    }

    return {
      pegawai,
      role,
      nama_user,
      logout,
    };
  },
};
</script>
