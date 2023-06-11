<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3"
  >
    <h1 class="h2 m-3">Data Member</h1>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <router-link
              :to="{ name: 'member.create' }"
              class="btn btn-md btn-success"
              >TAMBAH MEMBER</router-link
            >
            <router-link
              :to="{ name: 'member.deactivate' }"
              class="btn btn-md btn-primary m-2"
              >DEAKTIVASI MEMBER</router-link
            >

            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAMA</th>
                  <th scope="col">NOMOR TELEPON</th>
                  <th scope="col">TANGGAL LAHIR</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">TANGGAL DAFTAR</th>
                  <th scope="col">DEPOSIT UANG</th>
                  <th scope="col">TANGGAL KADALUARSA</th>
                  <th scope="col">ACTION</th>
                  <th scope="col">RESET PASSWORD</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, id_member) in members" :key="id_member">
                  <td>{{ member.id_member }}</td>
                  <td>{{ member.nama }}</td>
                  <td>{{ member.no_telp }}</td>
                  <td>{{ member.tgl_lahir }}</td>
                  <td>{{ member.status }}</td>
                  <td>{{ member.email }}</td>
                  <td>{{ member.tgl_daftar }}</td>
                  <td>{{ member.deposit_uang }}</td>
                  <td>{{ member.tgl_kadaluarsa }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'member.edit',
                        params: { id: member.id_member },
                      }"
                      class="btn btn-sm btn-primary m-1"
                    >
                      UBAH
                    </router-link>
                    <button
                      class="btn btn-sm btn-danger m-1"
                      @click.prevent="deleted(member.id_member)"
                    >
                      HAPUS
                    </button>
                    <button
                      class="btn btn-sm btn-success m-1"
                      @click="
                        cetakMemberCard(
                          member.id_member,
                          member.nama,
                          member.no_telp
                        )
                      "
                    >
                      CETAK MEMBER CARD
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm btn-danger m-1"
                      @click="resetPassword(member.id_member)"
                    >
                      RESET PASSWORD
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
<div>
  <div
    class="modal fade"
    id="resetModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Reset Password Berhasil</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Reset password berhasil!</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="refreshPage"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { jsPDF } from "jspdf";
// import { Modal } from "bootstrap";

export default {
  setup() {
    //reactive state
    let members = ref([]);

    let toggle= false
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("https://valent.ppcdeveloper.com/api/member")
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function deleted($id_member) {
      axios
        .delete("https://valent.ppcdeveloper.com/api/member/" + $id_member)
        .then(() => {
          //splice instruktur
          members.value.splice(members.value.indexOf($id_member), 1);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function cetakMemberCard($id_member, $nama, $no_telp) {
      const doc = new jsPDF({
        orientation: "potrait",
        unit: "cm",
        format: [10, 10],
      });

      doc.text("GoFit!", 0.5, 1);
      doc.text("Jl. Centralpark No. 10 Yogyakarta", 0.5, 2);
      doc.text(" ", 0.5, 3);
      doc.text("MEMBER CARD", 0.5, 4);
      doc.text("ID Member     : " + $id_member, 0.5, 5);
      doc.text("Nama          : " + $nama, 0.5, 6);
      doc.text("Nomor Telepon : " + $no_telp, 0.5, 7);
      doc.save("MemberCard - " + $id_member + ".pdf");
    }

    function resetPassword($id_member) {
      axios
        .get("https://valent.ppcdeveloper.com/api/member/resetPass/" + $id_member)
        .then(() => {
          //splice instruktur
          // let myModal = Modal(document.getElementById('resetModal'), {});
          // myModal.show();
        })
        .catch((error) => {
          console.log(error.response.data);
          toggle = true;
          console.log(toggle);
        });
    }

    function refreshPage(){
      window.location.reload();
    }

    //return
    return {
      members,
      deleted,
      cetakMemberCard,
      resetPassword,
      refreshPage,    
      toggle
    };
  },
};
</script>
