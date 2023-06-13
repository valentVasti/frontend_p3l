<template>
  <title>Login</title>
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  />

  <link
    href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
    rel="stylesheet"
  />

  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />

  <link rel="stylesheet" href="../css/style.css" />

  <section class="ftco-section">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 text-center mb-5">
          <h2 class="heading-section">Go-Fit</h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
          <div class="login-wrap p-4 p-md-5">
            <div class="icon d-flex align-items-center justify-content-center">
              <span class="fa fa-user-o"></span>
            </div>
            <h3 class="text-center mb-4">Log In</h3>
            <form @submit.prevent="login" class="login-form">
              <div class="form-group">
                <input
                  v-model="loginData.email"
                  type="text"
                  class="form-control rounded-left"
                  placeholder="E-mail"
                />
              </div>
              <div class="form-group d-flex">
                <input
                  v-model="loginData.password"
                  type="password"
                  class="form-control rounded-left"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <button
                  type="submit"
                  class="form-control btn btn-primary rounded submit px-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
    <div
      id="liveToast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <strong class="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">Hello, world! This is a toast message.</div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  setup() {
    //state departemen
    const loginData = reactive({
      email: "",
      password: "",
    });

    //state validation
    const validation = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function login() {
      let email = loginData.email;
      let password = loginData.password;

      axios
        .post("https://valent.ppcdeveloper.com/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          //redirect ke post index
          let role = response.data.role.nama_role;
          localStorage.setItem('Role', role);
          localStorage.setItem('Id_User', response.data.data.id_pegawai)

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Berhasil Login',
            showConfirmButton: false,
            timer: 1500
          })  

          router.push({
            name: "beranda",
          });
        })
        .catch((error) => {
          validation.value = error.response.data.message;
          console.log(error)

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: validation.value  ,
          })
        });
    }

    //return
    return {
      loginData,
      validation,
      router,
      login,
    };
  },
};
</script>
