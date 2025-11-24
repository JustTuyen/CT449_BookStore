<template>
  <navbar/>
  <div class="container-fluid">
    <div class="header d-flex">
      <div class="title">
        <h1>Cập nhật mật khẩu</h1>
        <!-- <p class="text-muted">Lưu ý: sau khi cập nhật sẽ logout</p> -->

      </div>
    </div>
    <hr class="p-2">
    <div class="content">
      <div class="wrapper" style="min-height: 65vh;">
         <form @submit.prevent="updatedProfile">
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Mật Khẩu mới:</label>
            <input type="password" class="form-control" placeholder="Nhập pass..."
            required v-model="newpassword">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập lại Mật Khẩu:</label>
            <input type="password" class="form-control" placeholder="Nhập pass..."
            required v-model="confirmPassword">
          </div> 
          <button type="submit" class="btn btn-success" @click="submitAddForm"
          >Cập nhật ngay!</button>
      </form>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script setup>
import navbar from '@/component/navbar.vue';
import Navbar from '@/component/navbar.vue';
import Footer from '@/component/footer.vue'
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
const confirmPassword = ref("");
const newpassword = ref("");
const errorMessage = ref("");
const updatedUser = reactive({
   _id: '',
  Password: '',
});

const updatedProfile = async () => {
  errorMessage.value = "";

  if(newpassword.value !== confirmPassword.value){
      errorMessage.value = "Mật khẩu không khớp!";
      return;
  }

  updatedUser._id = authStore.user?._id;
  updatedUser.Password = newpassword.value;
  
  try {
    await authStore.UpdateProfile(updatedUser);
    alert("Cập nhật thành công!")
    authStore.logout();
  } catch (error) {
    console.log("Cập nhật thông tin không thành công. Vui lòng thử lại sau.");
  }
}


</script>

<style scoped>
.container-fluid{
  padding: 10px;
}
.header{
  justify-content: center;
}
.title{
  text-align: center;
  padding: 10px;
  border: 2px solid #41A67E;
  border-radius: 16px;
}
.heads{
  width: 20%;
  margin: 10px;
  background-color: #41A67E;;
  border-radius: 16px;
  padding: 5px;
  text-align: center;
}
.wrapper{
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
form{
  font-size: 18px;
  font-weight: bold;
  width: 40%;
}

</style>