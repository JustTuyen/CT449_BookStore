<template>
  <navbar/>
  <div class="container" style="padding-bottom: 50px;">
    <div class="header d-flex">
      <div class="title">
        <h1>THẺ PHẠT</h1>
      </div>
   </div>
    <div class="d-flex" style="border: red 1px dashed; justify-content: center; text-align: center;
    background-color: #FDACAC; padding: 10px; font-size: 20px; border-radius: 16px; margin: 5px;">
        <p>Lưu ý: Trễ nhận sách từ 1 ngày trở lên hoặc sách cón tổn hại sẽ nhận phạt!
            <span style="font-weight: bolder;">Trả phạt</span> tại thư viện. Nhân viên sẽ cập nhật trạng thái sau khi bạn đã trả phạt.
        </p>
    </div>
   <hr class="p-2">
    <div class="content">
      <div class="heads">
        <h5>Chưa trả</h5>
      </div>
    </div>
    <table id="users">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID_phiếu đánh dấu</th>
              <th>Lý do</th>
              <th>Đơn giá</th>
              <th>Ngày Lập</th>
              <th>Trạng thái</th>
              <!-- <th>Actions</th> -->
            </tr>
          </thead>
          <tbody v-if="reports.length">
            <tr v-for="(report, index) in reports.filter(report => report.TrangThai_ID === '691c99b5914a60d368de548e')" :key="report._id">
              <td>
                {{ index + 1}}
              </td>
              <td>
                <strong>ID phiếu:</strong>{{ report.PhieuTheoDoi_ID }}<br/>
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
                          ? 'blue' 
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
              <!-- <td>
                <button class="btn btn-warning btns" type="button" @click="openUpdateModal(report)">Trả tiền</button>
              </td> -->
            </tr>
          </tbody>
        </table>

    <br/>
     <div class="heads">
        <h5>Đã hoàn thàn</h5>
      </div>
        <table id="users">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID_phiếu đánh dấu</th>
              <th>Lý do</th>
              <th>Đơn giá</th>
              <th>Ngày Lập</th>
              <th>Trạng thái</th>
              <!-- <th>Actions</th> -->
            </tr>
          </thead>
          <tbody v-if="reports.length">
            <tr v-for="(report, index) in reports.filter(report => report.TrangThai_ID === '6914bdec56ee2f9ce86fab87')" :key="report._id">
              <td>
                {{ index + 1}}
              </td>
              <td>
                <strong>ID phiếu:</strong>{{ report.PhieuTheoDoi_ID }}<br/>
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
              <!-- <td>
                <button class="btn btn-warning btns" type="button" @click="openUpdateModal(report)">Trả tiền</button>
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
const reports = ref([]);
const fetchcards = async () => {
  try {
    const response =
    await axios.get(`http://localhost:3000/api/report/user/${authStrore.user?.id}`);
    reports.value = response.data;
  } catch (error) {
    console.error("Error report:", error);
  }
};



onMounted(() => {
    fetchcards()
    //fetchuser()
});

</script>

<style scoped>
.container{
  padding: 10px;
  min-height: 80vh;
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