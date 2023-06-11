<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH MEMBER</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <input type="text" class="form-control" v-model="member.nama" placeholder="Masukkan nama member">
                                
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-1 alert alert-danger">{{ validation.nama[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                    <input class="form-control" v-model="member.no_telp" placeholder="Masukkan nomor telepon member">
                            
                                <!-- validation -->
                                <div v-if="validation.no_telp" class="mt-1 alert alert-danger">{{ validation.no_telp[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                    <input class="form-control" type="date" v-model="member.tgl_lahir" placeholder="Masukkan tanggal lahir member">
                            
                                <!-- validation -->
                                <div v-if="validation.tgl_lahir" class="mt-1 alert alert-danger">{{ validation.tgl_lahir[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">E-mail Member</label>
                                    <input class="form-control" type="text" v-model="member.email" placeholder="Masukkan e-mail member">
                            
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-1 alert alert-danger">{{ validation.email[0] }}</div>
                            </div>                    

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password Member</label>
                                    <input class="form-control" type="text" v-model="member.password" placeholder="Masukkan password" required>
                            
                                <!-- validation -->
                                <div v-if="validation.password" class="invalid-feedback">{{ validation.password[0] }}</div>
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
        const member = reactive({
            id_member: '',
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
            let id_member = 0
            let nama = member.nama
            let no_telp = member.no_telp
            let tgl_lahir = member.tgl_lahir
            let email = member.email
            let password = member.password

            axios.post('https://valent.ppcdeveloper.com/api/member', {
                id_member: id_member,
                nama: nama,
                no_telp: no_telp,
                tgl_lahir: tgl_lahir,
                email: email,
                password: password
            }).then(() => {
                //redirect ke post index
                router.push({
                    name: 'member.index'
                })
            }).catch(error => {
                //assign state validation with error
                validation.value = error.response.data
            })
        }

        //return
        return {
            member,
            validation,
            router,
            store
        }
    }
}
</script>

<style>
</style>