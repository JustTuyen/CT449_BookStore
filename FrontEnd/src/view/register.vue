<template>
    <Nav/>
    <div class="container-fluid">        
        <div class="container">
            <div class="wrapper">
                <div class="card">
                    <div class="row">
                        <div class="col d-flex flex-column justify-content-center">
                            <img src="../assests/wrapper.avif" alt="" class="login-img">
                        </div>
                        <div class="col text-center d-flex flex-column justify-content-center">
                           <div class="card-title">
                                <h1>Register</h1>
                            </div>
                            <h2 class="txt-line">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                    </svg>
                                </span>
                            </h2>
                            <form class="form" @submit.prevent="handleRegister">
                                <div class="mb-3 row">
                                    <div class="col">
                                        <input type="text" id="username" placeholder="Nhập tên" v-model="Ten"/>
                                    </div>
                                    <div class="col">
                                        <input type="text" id="username" placeholder="Nhập họ và đệm"  v-model="HoVaDem"/>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <input type="email" id="email" placeholder="Nhập email"  v-model="Email"/>
                                </div>
                                <div class="mb-3">
                                    <input type="text" id="phonenumber" placeholder="Nhập số điện thoại"  v-model="SoDienThoai"/>
                                </div>
                                <div class="mb-3">
                                    <input type="password" id="password" placeholder="Nhập password"  v-model="Password"/>
                                </div>
                                <div class="mb-3">
                                    <p v-if="errorMessage" style="color: red; font-weight: bold;">{{ errorMessage }}</p>
                                    <input type="password" id="password" placeholder="Nhập password lần nữa"  v-model="confirmPassword"/>
                                </div>
                                 <div class="mb-3 row">
                                    <div class="col">
                                        <input type="date" id="username"  v-model="NgaySinh"/>
                                    </div>
                                    <div class="col">
                                        <select class="form-select" aria-label="select example" v-model="GioiTinh"
                                            required>
                                            <option>Giới tính</option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                            <option value="Khác">Khác</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="">Đã có tài khoản?<a href="/login">Login!</a></label>
                                </div>
                                <div class="mb-3">
                                    <button class="btn btn-Register">Đăng ký</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Nav from '@/component/navbar.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth'
import {ref} from 'vue';
const router = useRouter();
const authStore = useAuthStore();
//
const HoVaDem = ref("");
const Ten = ref("");
const Email = ref("");
const Password = ref("");
const SoDienThoai = ref("");
const GioiTinh = ref("");
const VaiTro =  ref("");
const NgaySinh = ref("");
const confirmPassword = ref("");
//
const errorMessage = ref("");

if (authStore.isAuthenticated) {
  router.push('/')
}

const handleRegister = async() =>{
    errorMessage.value = "";

    if(Password.value !== confirmPassword.value){
        errorMessage.value = "Mật khẩu không khớp!";
        return;
    }

    try{
        await authStore.register({
            HoVaDem: HoVaDem.value,
            Ten: Ten.value,
            Email: Email.value,
            SoDienThoai: SoDienThoai.value,
            GioiTinh: GioiTinh.value,
            Password: Password.value,
            VaiTro: 'User',
            NgaySinh: NgaySinh.value ? NgaySinh.value.slice(0, 10) : ''
            });
            router.push('/login');
        }catch(err){
            errorMessage.value = "Email nhập đã được sử dụng, vui lòng nhập email khác!";
        }
    }

</script>
<style scoped>
.container-fluid{
    background-image: url(../assests/background.avif);
    background-size: cover;
    height: 100vh;
    width: 100%;
}
.wrapper{
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card{
    width: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.7);
    align-items: center;
}

.card label{
    font-weight: bold;
    margin: 5px;
}
.login-img{
    width: 350px;
    height: 500px;
    border-radius: 10px;
    object-fit: cover;
}
/* text through line */
.txt-line {
  display: flex;
  flex-direction: row;
}
.txt-line:before, .txt-line:after{
  content: "";
  flex: 1 1;
  border-bottom: 1px solid;
  margin: auto;
}
.txt-line:before {
  margin-right: 10px
}
.txt-line:after {
  margin-left: 10px
}
.btn-Register{
    width: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
.mb-3 input{
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
