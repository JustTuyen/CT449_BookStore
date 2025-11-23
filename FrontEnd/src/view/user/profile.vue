<template>
  <navbar/>
  <div class="container-fluid">
    <div class="header d-flex">
      <div class="title">
        <h1>Thông tin tài khoản</h1>
      </div>
    </div>
    <hr class="p-2">
    <div class="content">
      <div class="wrapper">
         <form @submit.prevent="updatedProfile">
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Nhập Tên:</label>
              <input type="text" class="form-control" placeholder="Nhập tên..."
              required v-model="updatedUser.Ten">
            </div>
            <div class="col">
              <label for="name" class="form-label">Nhập Họ Và Đệm:</label>
              <input type="text" class="form-control" placeholder="Nhập họ và đệm..."
              required v-model="updatedUser.HoVaDem">
            </div>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Email:</label>
            <input type="text" class="form-control" placeholder="Nhập email..."
            required v-model="updatedUser.Email">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Mật Khẩu:</label>
            <input type="text" class="form-control" placeholder="Nhập pass..."
            required v-model="updatedUser.Password">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Số Điện Thoại:</label>
            <input type="text" class="form-control" placeholder="Nhập SĐT..."
            required v-model="updatedUser.SoDienThoai">
          </div>
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Nhập Giới Tính:</label>
                <select class="form-select" aria-label="select example" 
                required v-model="updatedUser.GioiTinh">
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nữ</option>
                  <option value="Khac">Khác</option>
                </select>
            </div>
            <div class="col"> 
              <label for="name" class="form-label">Nhập Ngày Sinh:</label>
              <input type="date" class="form-control" 
              required v-model="updatedUser.NgaySinh">
            </div>
          </div>
          <button type="submit" class="btn btn-success" @click="submitAddForm"
          >Cập nhật tài khoản ngay!</button>
      </form>
      </div>
    </div>
  </div>
  <!-- <Footer/> -->
</template>

<script setup>
import navbar from '@/component/navbar.vue';
import Navbar from '@/component/navbar.vue';
// import Footer from '@/component/footer.vue'
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from '@/store/auth';
// import { useRoute } from 'vue-router';
//const route = useRoute();
const authStore = useAuthStore();
const user = ref(null);
const props = defineProps({
  id: String
});
async function fetchUserDetails() {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/${authStore?.user.id}`
    );
    user.value = response.data;

    // Assign data to updatedUser AFTER API returns
    Object.assign(updatedUser, {
      _id: user.value._id,
      HoVaDem: user.value.HoVaDem,
      Ten: user.value.Ten,
      Email: user.value.Email,
      // Password: "",
      GioiTinh: user.value.GioiTinh,
      NgaySinh: user.value.NgaySinh?.slice(0, 10),
      SoDienThoai: user.value.SoDienThoai,
    });

  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

const updatedUser = reactive({
  _id: '',
  HoVaDem: '',
  Ten: '',
  Email: '',
  Password: '',
  GioiTinh: '',
  NgaySinh: '',
  SoDienThoai: '',
});

onMounted(() => {
  fetchUserDetails()
});
const updatedProfile = async () => {
  try {
    await authStore.UpdateProfile(updatedUser);
  } catch (error) {
    console.log("Cập nhật thông tin không thành công. Vui lòng thử lại sau.");
  }
}
onMounted(() => {
  fetchUserDetails();
});

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

</style>