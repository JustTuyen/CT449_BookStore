<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">QUẢN LÝ NGƯỜI DÙNG:</h1>
        <hr class="my-3">
        <div class="actions">
          <button class="btn btn-success action-btn">Thêm người dùng</button>
          <!-- <button class="btn btn-warning action-btn"></button> -->
        </div>
      </div>
      <div class="content" v-if="users.length">
        <table id="users">
          <thead>
            <tr>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Password</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>SĐT</th>
              <th>Vai trò</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user._id">
              <td>
                {{ index + 1}}
              </td>
              <td>
                {{ user.HoVaDem }} {{user.Ten}}
              </td>
              <td>
                {{ user.Email }}
              </td>
              <td>
                {{ user.Password }}
              </td>
               <td>
                {{ user.GioiTinh }}
              </td>
               <td>
                {{ user.NgaySinh
                    ? new Date( user.NgaySinh).toLocaleDateString() 
                    : "Chưa có cập nhật" }}
              </td>
               <td>
                {{ user.SoDienThoai }}
              </td>
              <td>
                {{ user.VaiTro }}
              </td>
              <td>
                <button class="btn btn-warning btns">Update</button>
                <button class="btn btn-danger btns">Xoa</button>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import sidebar from '@/component/sidebar.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
const users = ref([]);
const fetchuser = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/user/");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

onMounted(() => {
    fetchuser()
});

</script>

<style scoped>
.bng{
  background-color: #E4EFE7;
}

.title{
  background-color: #ffff;
  width: 100%;
  padding: 5px;
  border: 2px solid #41A67E;
  border-radius: 20px;
}

.action-btn{
  border-radius: 16px;
  
}

.content{
  /* padding: 10px; */
  margin: 20px 0;
  /* border: 2px solid #41A67E;
  border-radius: 20px; */
}
/* tbale contaner */
#users{
font-family: Arial, Helvetica, sans-serif;
border-collapse: collapse;
width: 100%;
border-radius: 15px;
background-color: white;
text-align: center;
}

#users td, #users th {
border: 1px solid #ddd;
padding: 8px;
}
#users td .col10{
display: flex;
}

#users tr:nth-child(even){background-color: #f2f2f2;}

#users tr:hover {background-color: #ddd;}

#users th {
padding-top: 12px;
padding-bottom: 12px;
text-align: center;
background-color: #41A67E;
color: white;
}
.action-button{
  text-align: center;
  margin: 2px;
  height: 35px;
  width: 50px;
  border-radius: 5px;
  color: white;
}
.btns{
  margin: 5px;
  width: 60%;
}
</style>