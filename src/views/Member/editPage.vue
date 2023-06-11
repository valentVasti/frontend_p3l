<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>UBAH DATA MEMBER</h4>
                        <hr>
                        <form @submit.prevent="update(this.id)">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <input type="text" class="form-control" v-model="member.nama" placeholder="Masukkan nama member">
                                
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">{{ validation.nama[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                    <input class="form-control" v-model="member.no_telp" placeholder="Masukkan nomor telepon member">
                            
                                <!-- validation -->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">{{ validation.no_telp[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Lahir</label>
                                    <input class="form-control" type="date" v-model="member.tgl_lahir" placeholder="Masukkan tanggal lahir member">
                            
                                <!-- validation -->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">{{ validation.tgl_lahir[0] }}</div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">E-mail Member</label>
                                    <input class="form-control" type="text" v-model="member.email" placeholder="Masukkan e-mail member">
                                                        
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">{{ validation.email[0] }}</div>
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

        const member = ref([])

        onMounted(() => {
            //get API from Laravel Backend
            axios.get(`https://valent.ppcdeveloper.com/api/member/${route.params.id}`).then(response => {
                //assign state posts with response data
                member.value = response.data.data
                console.log(member.value)              
            }).catch(error => {
                console.log(error.response.data)
            })
        })
    
        //state validation
        const validation = ref([])

        //vue router
        const router = useRouter()  

        //method update
        function update($id_member) {
            let nama = member.value['nama']
            let no_telp = member.value['no_telp']
            let tgl_lahir = member.value['tgl_lahir']
            let email = member.value['email']
            let password = member.value['password']

            axios.put('https://valent.ppcdeveloper.com/api/member/' + $id_member, {
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
            update,
        }
    }
}
</script>

<style>
</style>