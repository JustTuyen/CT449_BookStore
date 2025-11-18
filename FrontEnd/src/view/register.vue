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
                            <div class="form">
                                <div class="mb-3">
                                    <input type="text" id="username" placeholder="Enter your username"/>
                                </div>
                                <div class="mb-3">
                                    <input type="email" id="email" placeholder="Enter your email"/>
                                </div>
                                <div class="mb-3">
                                    <input type="text" id="phonenumber" placeholder="Enter your phonenumber"/>
                                </div>
                                <div class="mb-3">
                                    <input type="password" id="password" placeholder="Enter your password"/>
                                </div>
                                <div class="mb-3">
                                    <input type="password" id="password" placeholder="Re-enter your password"/>
                                </div>
                                <div class="mb-3">
                                    <label for="">Do you already have an account? <a href="/login">Login!</a></label>
                                </div>
                                <div class="mb-3">
                                    <button class="btn btn-Register">Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Nav from '@/component/navbar.vue';
</script>
<style scoped>
.container-fluid{
    background-image: url(../assests/background.avif);
    background-size: cover;
    height: 100vh;
    width: 100%;
}
.wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
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
