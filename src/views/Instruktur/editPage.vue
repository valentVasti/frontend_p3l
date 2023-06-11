<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>UBAH DATA INSTTRUKTUR</h4>
                        <hr>
                        <form @submit.prevent="update(this.id)">
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
                                <!-- <div v-if="validation.no_telp" class="mt-2 alert alert-danger">{{ validation.no_telp[0] }}</div> -->
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                    <input class="form-control" type="date" v-model="instruktur.tgl_lahir" placeholder="Masukkan tanggal lahir instruktur">
                            
                                <!-- validation -->
                                <!-- <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">{{ validation.tgl_lahir[0] }}</div> -->
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">E-mail Instruktur</label>
                                    <input class="form-control" type="text" v-model="instruktur.email" placeholder="Masukkan e-mail instruktur">
                                                        
                                <!-- validation -->
                                <!-- <div v-if="validation.email" class="mt-2 alert alert-danger">{{ validation.email[0] }}</div> -->
                            </div>                    

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Password Instruktur</label>
                                    <input class="form-control" type="text" v-model="instruktur.password" placeholder="Masukkan password">
                            
                                <!-- validation -->
                                <!-- <div v-if="validation.password" class="mt-2 alert alert-danger">{{ validation.password[0] }}</div> -->
                            </div>
                            <button type="submit" class="btn btn-primary">UBAH</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    created(){
        this.id = this.$route.params.id
    },
    setup() {
        const route = useRoute()

        //state departemen
        // const instruktur = reactive({
        //     id_instruktur: '',
        //     nama: '',
        //     no_telp: '',
        //     tgl_lahir: '',
        //     email: '',
        //     password:'',
        // })

        const instruktur = ref([])

        onMounted(() => {
            //get API from Laravel Backend
            axios.get(`http://127.0.0.1:8000/instruktur/${route.params.id}`).then(response => {
                //assign state posts with response data
                instruktur.value = response.data.data
                console.log(instruktur.value)              
            }).catch(error => {
                console.log(error.response.data)
            })
        })
    
        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()  

        //method update
        function update($id_instruktur) {
            let nama = instruktur.value['nama']
            let no_telp = instruktur.value['no_telp']
            let tgl_lahir = instruktur.value['tgl_lahir']
            let email = instruktur.value['email']
            let password = instruktur.value['password']

            axios.put('https://valent.ppcdeveloper.com/api/instruktur/' + $id_instruktur, {
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
            update,
        }
    }
}
</script>

<style>
</style>