//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/beranda",
    name: "beranda",
    component: () => import("@/components/DashboardLayout.vue"),
    children: [
      {
        path: "/instruktur",
        name: "instruktur.index",
        component: () => import("@/views/Instruktur/indexPage.vue"),
      },
      {
        path: "/instruktur/create",
        name: "instruktur.create",
        component: () => import("@/views/Instruktur/createPage.vue"),
      },
      {
        path: "/instruktur/edit/:id",
        name: "instruktur.edit",
        component: () => import("@/views/Instruktur/editPage.vue"),
      },
      {
        path: "/member",
        name: "member.index",
        component: () => import("@/views/Member/indexPage.vue"),
      },
      {
        path: "/member/create",
        name: "member.create",
        component: () => import("@/views/Member/createPage.vue"),
      },
      {
        path: "/member/edit/:id",
        name: "member.edit",
        component: () => import("@/views/Member/editPage.vue"),
      },
      {
        path: "/member/deactivateMember",
        name: "member.deactivate",
        component: () => import("@/views/Member/deactivateMember.vue"),
      },
      {
        path: "/jadwal_umum",
        name: "jadwal_umum.index",
        component: () => import("@/views/JadwalUmum/indexPage.vue"),
      },
      {
        path: "/jadwal_umum/create",
        name: "jadwal_umum.create",
        component: () => import("@/views/JadwalUmum/createPage.vue"),
      },
      {
        path: "/jadwal_umum/edit/:id",
        name: "jadwal_umum.edit",
        component: () => import("@/views/JadwalUmum/editPage.vue"),
      },
      {
        path: "/jadwal_harian",
        name: "jadwal_harian.index",
        component: () => import("@/views/JadwalHarian/indexPage.vue"),
      },
      {
        path: "/transaksi_aktivasi",
        name: "transaksi_aktivasi.index",
        component: () => import("@/views/TransaksiAktivasi/indexPage.vue"),
      },
      {
        path: "/transaksi_aktivasi/activate",
        name: "transaksi_aktivasi.activate",
        component: () => import("@/views/TransaksiAktivasi/activatePage.vue"),
      },
      {
        path: "/transaksi_depou",
        name: "transaksi_depou.index",
        component: () => import("@/views/TransaksiDepositUang/indexPage.vue"),
      },
      {
        path: "/transaksi_depou/create",
        name: "transaksi_depou.create",
        component: () => import("@/views/TransaksiDepositUang/createPage.vue"),
      },
      {
        path: "/transaksi_depok",
        name: "transaksi_depok.index",
        component: () => import("@/views/TransaksiDepositKelas/indexPage.vue"),
      },
      {
        path: "/transaksi_depok/create",
        name: "transaksi_depok.create",
        component: () => import("@/views/TransaksiDepositKelas/createPage.vue"),
      },
      {
        path: "/izin_instruktur",
        name: "izin_instruktur.index",
        component: () => import("@/views/IzinInstruktur/indexPage.vue"),
      },
      {
        path: "/deposit_kelas",
        name: "deposit_kelas.index",
        component: () => import("@/views/DepositKelas/indexPage.vue"),
      },
      {
        path: "/booking_gym",
        name: "booking_gym.index",
        component: () => import("@/views/BookingGym/indexPage.vue"),
      },
      {
        path: "/presensi_gym",
        name: "presensi_gym.index",
        component: () => import("@/views/PresensiGym/indexPage.vue"),
      },
      {
        path: "/presensi_kelas",
        name: "presensi_kelas.index",
        component: () => import("@/views/PresensiKelas/indexPage.vue"),
      },
      {
        path: "/laporan_pendapatan",
        name: "laporan_pendapatan.index",
        component: () => import("@/views/Laporan/laporanPendapatan.vue"),
      },
      {
        path: "/laporan_gym",
        name: "laporan_gym.index",
        component: () => import("@/views/Laporan/laporanGym.vue"),
      },
      {
        path: "/laporan_kelas",
        name: "laporan_kelas.index",
        component: () => import("@/views/Laporan/laporanKelas.vue"),
      },
      {
        path: "/laporan_kinerja_instruktur",
        name: "laporan_kinerja_instruktur.index",
        component: () => import("@/views/Laporan/laporanKinerjaInstruktur.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "login",
    component: () => import("@/components/loginPage.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});

export default router;
