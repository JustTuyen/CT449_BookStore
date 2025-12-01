<template>
  <navbar/>
  <div class="container" style="padding-bottom: 50px; min-height: 100vh;">
    <div class="header d-flex">
      <div class="title">
        <h1>Danh Sách Mượn</h1>
      </div>
    </div>
    <hr class="p-2">
    <div class="content">
      <div class="heads">
        <h5>Đang diễn tra</h5>
      </div>
    </div>
    <table id="users">
      <thead>
        <tr>
          <th>ID</th>
          <th>Thông tin thẻ</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Đơn giá</th>
          <!-- <th>Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(card, index) in cards.filter(card => card.TrangThai_ID !== '6914bdf056ee2f9ce86fab88')" :key="card._id">
          <td>
            {{ index + 1}}
          </td>
          <td>
            <div>
              <p><strong>ID sách: </strong>{{ card.Sach_ID }}</p>
              <p><strong>ID Đọc giả: </strong>{{ card.DocGia_ID }}</p>
              <p><strong>ID Nhân viên: </strong>{{ card.NhanVien_ID }}</p>
            </div> 
          </td>
            <td>
              {{ card.NgayMuon
                ? new Date(  card.NgayMuon).toLocaleDateString() 
                : "Chưa có cập nhật" }}
          </td>
            <td>
              {{ card.NgayTra
                ? new Date( card.NgayTra).toLocaleDateString() 
                : "Chưa có cập nhật" }}
          </td>
            <td>
            <div :style="{
              backgroundColor: card.TrangThai_ID === '6914bdec56ee2f9ce86fab87' 
                  ? 'green'
                  : card.TrangThai_ID === '6914bdf056ee2f9ce86fab88' 
                      ? '#63A361' 
                      : 'red',
              color: 'white',
              borderRadius: '16px',
              }">
              {{ 
                  card.TrangThai_ID === '6914bdec56ee2f9ce86fab87' 
                  ? "Đang hoạt động"
                  : card.TrangThai_ID === '6914bdf056ee2f9ce86fab88' 
                      ? "Ngừng hoạt động"
                      : "Unknown Status" 
              }}
          </div>
          </td>
          <td>
            {{ formatPrice(card.DonGia)}}
          </td>
          <!-- <td>
            <button class="btn btn-warning btns" @click="openUpdateModal(card)" type="button">Update</button>
            <button class="btn btn-danger btns" @click="deleteItem(card._id)" type="button">Xóa</button>
          </td> -->
        </tr>
      </tbody>
    </table>

    <br/>
     <div class="heads">
        <h5>Lịch sử</h5>
      </div>
       <table id="users">
      <thead>
        <tr>
          <th>ID</th>
          <th>Thông tin thẻ</th>
          <th>Ngày mượn</th>
          <th>Ngày trả</th>
          <th>Trạng thái</th>
          <th>Đơn giá</th>
          <!-- <th>Actions</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(card, index) in cards.filter(card => card.TrangThai_ID === '6914bdf056ee2f9ce86fab88')" :key="card._id">
          <td>
            {{ index + 1}}
          </td>
          <td>
            <div>
              <p><strong>ID sách: </strong>{{ card.Sach_ID }}</p>
              <p><strong>ID Đọc giả: </strong>{{ card.DocGia_ID }}</p>
              <p><strong>ID Nhân viên: </strong>{{ card.NhanVien_ID }}</p>
            </div> 
          </td>
            <td>
              {{ card.NgayMuon
                ? new Date(  card.NgayMuon).toLocaleDateString() 
                : "Chưa có cập nhật" }}
          </td>
            <td>
              {{ card.NgayTra
                ? new Date( card.NgayTra).toLocaleDateString() 
                : "Chưa có cập nhật" }}
          </td>
            <td>
            <div :style="{
              backgroundColor: card.TrangThai_ID === '6914bdec56ee2f9ce86fab87' 
                  ? 'green'
                  : card.TrangThai_ID === '6914bdf056ee2f9ce86fab88' 
                      ? '#63A361' 
                      : 'red',
              color: 'white',
              borderRadius: '16px',
              }">
              {{ 
                  card.TrangThai_ID === '6914bdec56ee2f9ce86fab87' 
                  ? "Đang hoạt động"
                  : card.TrangThai_ID === '6914bdf056ee2f9ce86fab88' 
                      ? "Ngừng hoạt động"
                      : "Unknown Status" 
              }}
          </div>
          </td>
          <td>
            {{ formatPrice(card.DonGia)}}
          </td>
          <!-- <td>
            <button class="btn btn-warning btns" @click="openUpdateModal(card)" type="button">Update</button>
            <button class="btn btn-danger btns" @click="deleteItem(card._id)" type="button">Xóa</button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
  <Footer/>
</template>

<script setup>
import navbar from '@/component/navbar.vue';
import { ref, onMounted} from 'vue';
import { formatPrice } from '@/ulti/utils';
import { useAuthStore } from '@/store/auth';
import Footer from '@/component/footer.vue';
const authStrore = useAuthStore();
// DocGia_ID: authStrore.user?.id,
import axios from 'axios';
const cards = ref([]);
const fetchcards = async () => {
  try {
    const response =
    await axios.get(`http://localhost:3000/api/borrowingCard/user/${authStrore.user?.id}`);
    cards.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};


onMounted(() => {
  fetchcards()
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