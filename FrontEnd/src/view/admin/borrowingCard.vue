<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">QUẢN LÝ THẺ MƯỢN:</h1>
        <hr class="my-3">
       <div class="actions">
          <button class="btn btn-success action-btn">Thêm thẻ mượn</button>
          <!-- <button class="btn btn-warning action-btn"></button> -->
        </div>
      </div>
      <div class="content" v-if="cards.length">
        <table id="users">
          <thead>
            <tr>
              <th>ID</th>
              <th>Thông tin thẻ</th>
              <th>Ngày mượn</th>
              <th>Ngày trả</th>
              <th>Trạng thái</th>
              <th>Đơn giá</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(card, index) in cards" :key="card._id">
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
import { formatPrice } from '@/ulti/utils';
import sidebar from '@/component/sidebar.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
const cards = ref([]);
const fetchcards = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/borrowingCard/");
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