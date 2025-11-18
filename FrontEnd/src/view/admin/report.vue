<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">QUẢN LÝ BÁO CÁO:</h1>
        <hr class="my-3">
        <div class="actions">
          <button class="btn btn-success action-btn">Thêm sách</button>
          <!-- <button class="btn btn-warning action-btn"></button> -->
        </div>
      </div>
      <div class="content" v-if="reports.length">
        <table id="users">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID_phiếu đánh dấu</th>
              <th>Lý do</th>
              <th>Đơn giá</th>
              <th>Ngày Lập</th>
              <th>Trạng thái</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="report._id">
              <td>
                {{ index + 1}}
              </td>
              <td>
                {{ report.PhieuTheoDoi_ID }}
              </td>
              <td>
                {{ report.LyDo }}
              </td>
              <td>
                {{ formatPrice(report.DonGia) }}
              </td>
               <td>
                  {{ report.NgayLap 
                    ? new Date( report.NgayLap).toLocaleDateString() 
                    : "Chưa có cập nhật" }}
              </td>
              <td>
                 <div :style="{
                  backgroundColor: report.TrangThai_ID === '6914bdec56ee2f9ce86fab87' 
                      ? 'green'
                      : report.TrangThai_ID === '691c99b5914a60d368de548e' 
                          ? '#63A361' 
                          : 'red',
                  color: 'white',
                  borderRadius: '16px',
                 }">
                  {{ 
                      report.TrangThai_ID === '6914bdec56ee2f9ce86fab87' 
                      ? "Đã trả"
                      : report.TrangThai_ID === '691c99b5914a60d368de548e' 
                          ? "Chưa trả"
                          : "Unknown Status" 
                  }}
              </div>
              </td>
              <td>
                <button class="btn btn-warning btns">Update</button>
                <button class="btn btn-danger btns">Xóa</button>
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
const reports = ref([]);
const fetchreport = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/report/");
    reports.value = response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
  }
};

onMounted(() => {
    fetchreport()
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