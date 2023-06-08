<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH INSTTRUKTUR</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input type="text" class="form-control" v-model="instruktur.nama" placeholder="Masukkan nama instruktur">
                                
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">{{ validation.nama[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                    <input class="form-control" v-model="instruktur.no_telp" placeholder="Masukkan nomor telepon instruktur">
                            
                                <!-- validation -->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">{{ validation.no_telp[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                    <input class="form-control" type="date" v-model="instruktur.tgl_lahir" placeholder="Masukkan tanggal lahir instruktur">
                            
                                <!-- validation -->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">{{ validation.tgl_lahir[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">E-mail Instruktur</label>
                                    <input class="form-control" type="text" v-model="instruktur.email" placeholder="Masukkan e-mail instruktur">
                            
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">{{ validation.email[0] }}</div>
                            </div>                    

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password Instruktur</label>
                                    <input class="form-control" type="text" v-model="instruktur.password" placeholder="Masukkan password">
                            
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">{{ validation.password[0] }}</div>
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state departemen
        const instruktur = reactive({
            id_instruktur: '',
            nama: '',
            no_telp: '',
            tgl_lahir: '',
            email: '',
            password:''
        })
    
        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()  

        //method store
        function store() {
            let id_instruktur = 0
            let nama = instruktur.nama
            let no_telp = instruktur.no_telp
            let tgl_lahir = instruktur.tgl_lahir
            let email = instruktur.email
            let password = instruktur.password

            axios.post('http://127.0.0.1:8000/api/instruktur', {
                id_instruktur: id_instruktur,
                nama: nama,
                no_telp: no_telp,
                tgl_lahir: tgl_lahir,
                email: email,
                password: password
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'instruktur.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }

        //return
        return {
            instruktur,
            validation,
            router,
            store
        }
    }
}
</script>

<style>
</style>