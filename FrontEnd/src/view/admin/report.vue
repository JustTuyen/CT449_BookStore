<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">QUẢN LÝ BÁO CÁO:</h1>
        <hr class="my-3">
        <div class="actions">
          <button class="btn btn-success action-btn" @click="addnewModal">Thêm sách</button>
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
                <button class="btn btn-warning btns" type="button" @click="openUpdateModal(report)">Update</button>
                <button class="btn btn-danger btns" @click="deleteItem(report._id)">Xóa</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

<div class="modal fade show d-block" v-if="showModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">THÊM BÁO CÁO:</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập ID phiếu bị báo:</label>
           <select class="form-select" required v-model="AddCardForm.PhieuTheoDoi_ID">
              <option v-for="card in cards" :key="card._id" :value="card._id">
                {{ card._id }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập lý do:</label>
           <textarea rows="3" type="text" class="form-control" required placeholder="Nhập lý do..." 
            v-model="AddCardForm.LyDo"></textarea> 
          </div>

          <div class="mb-3 row">
            <div class="col">
                <label for="name" class="form-label">Nhập đơn giá:</label>
                <input type="text" class="form-control" placeholder="Nhập giá..."
                required v-model="AddCardForm.DonGia">
            </div>
            <div class="col">
                <label for="name" class="form-label">Nhập ngày lập:</label>
                <input type="date" class="form-control"
                required v-model="AddCardForm.NgayLap">
            </div>
          </div> 
          <div class="mb-3">
            <label for="name" class="form-label">Nhập trạng thái:</label>
           <select class="form-select" required v-model="AddCardForm.TrangThai_ID">
              <option v-for="status in statuss" :key="status._id" :value="status._id">
                {{ status.TenTrangThai }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-success" @click="submitAddForm"
          >Thêm</button>
      </form>
    </div>
  </div>
</div>
</div>

<div class="modal fade show d-block" v-if="showModalUpdate" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">CẬP NHẬT BÁO CÁO:</h5>
        <button type="button" class="btn-close" @click="closeModelUpdate"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập ID phiếu bị báo:</label>
           <select class="form-select" required v-model="UpdateCardForm.PhieuTheoDoi_ID">
              <option v-for="card in cards" :key="card._id" :value="card._id">
                {{ card._id }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập lý do:</label>
           <textarea rows="3" type="text" class="form-control" required placeholder="Nhập lý do..." 
            v-model="UpdateCardForm.LyDo"></textarea> 
          </div>

          <div class="mb-3 row">
            <div class="col">
                <label for="name" class="form-label">Nhập đơn giá:</label>
                <input type="text" class="form-control" placeholder="Nhập giá..."
                required v-model="UpdateCardForm.DonGia">
            </div>
            <div class="col">
                <label for="name" class="form-label">Nhập ngày lập:</label>
                <input type="date" class="form-control"
                required v-model="UpdateCardForm.NgayLap">
            </div>
          </div> 
          <div class="mb-3">
            <label for="name" class="form-label">Nhập trạng thái:</label>
           <select class="form-select" required v-model="UpdateCardForm.TrangThai_ID">
              <option v-for="status in statuss" :key="status._id" :value="status._id">
                {{ status.TenTrangThai }}
              </option>
            </select>
          </div>
          <button type="submit" class="btn btn-success" @click="updateForm(UpdateCardForm._id)"
          >Thêm</button>
      </form>
    </div>
  </div>
</div>
</div>
<div class="modal-backdrop fade show" v-if="showModalUpdate"></div>
<div class="modal-backdrop fade show" v-if="showModal"></div>
</template>

<script setup>
import { formatPrice } from '@/ulti/utils';
import sidebar from '@/component/sidebar.vue';
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
const reports = ref([]);
const fetchreport = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/report/");
    reports.value = response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
  }
};

//
const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
};

const AddCardForm = reactive({
  PhieuTheoDoi_ID: '',
  LyDo: '',
  DonGia: '',
  NgayLap: '',
  TrangThai_ID: '',
});

function addnewModal() {
  showModal.value = true;
}

async function submitAddForm() {
  const payload = {
    PhieuTheoDoi_ID: AddCardForm.PhieuTheoDoi_ID,
    LyDo:AddCardForm.LyDo,
    DonGia: AddCardForm.DonGia,
    NgayLap:AddCardForm.NgayLap,
    TrangThai_ID: AddCardForm.TrangThai_ID,
  };

  try {
    const response = await axios.post(
    `http://localhost:3000/api/report/`,
        payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  alert('Thêm thành công!');
  Window.location.reload();
  Object.assign(AddCardForm, {
    PhieuTheoDoi_ID: '',
    LyDo: '',
    DonGia: '',
    NgayLap: '',
    TrangThai_ID: '',
  });
  } catch (error) {
    console.error('Failed to add:', error.response?.data || error.message);
    //alert('Thêm thất bại!',  error.response?.data || error.message);
  } 
}

const showModalUpdate = ref(false);
const closeModelUpdate = () => {
  showModalUpdate.value = false;
};

const UpdateCardForm = reactive({
  _id: '',
  PhieuTheoDoi_ID: '',
  LyDo: '',
  DonGia: '',
  NgayLap: '',
  TrangThai_ID: '',
});

function openUpdateModal(report) {
  showModalUpdate.value = true;
  UpdateCardForm._id = report._id
  UpdateCardForm.PhieuTheoDoi_ID= report.PhieuTheoDoi_ID;
  UpdateCardForm.LyDo = report.LyDo;
  UpdateCardForm.DonGia = report.DonGia;
  UpdateCardForm.TrangThai_ID = report.TrangThai_ID;
  UpdateCardForm.NgayLap = report.NgayLap?.slice(0, 10);
}

const updateForm = async (id) => {
  const newCard = {
    _id: id,
    PhieuTheoDoi_ID: UpdateCardForm.PhieuTheoDoi_ID,
    LyDo: UpdateCardForm.LyDo,
    DonGia: UpdateCardForm.DonGia,
    TrangThai_ID: UpdateCardForm.TrangThai_ID,
    NgayLap: UpdateCardForm.NgayLap,
  };
  try {

    //console.log("thoin tin them:", newCategory);
    const response = await axios.put(
      `http://localhost:3000/api/report/${id}`,
        newCard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    alert('cập nhật thành công');
    window.location.reload();
  } catch (error) {
    //alert('cập nhật thất bại!', error.response?.data || error.message);
    console.error('Failed to update:', error.response?.data || error.message);
  }
};
//
const statuss = ref([]);
const fetchstatus = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/status/");
    statuss.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

const cards = ref([]);
const fetchcards = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/borrowingCard/");
    cards.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

//
const deleteItem = async (id) => {
  if (confirm(`Bạn có chắc bạn muốn xóa ID ${id}?`)) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/report/${id}`);
      if (response.status === 204 || response.status === 200) {
        reports.value = reports.value.filter(
          (item) => item._id !== id
        );
        //alert(`${id} đã được xóa thành công!`);
        window.location.reload();
      } else {
        console.error(`Xóa thất bại với ID ${id}`);
        //alert(`Xóa thất bại với ID ${id}`, error.response?.data || error.message);
      }
    } catch (error) {
      console.error('Lỗi khuyến mãi:', error.response?.data || error.message);
      //alert(`Xóa thất bại với ID ${id}`, error.response?.data || error.message);
    }
  }
};

onMounted(() => {
    fetchreport()
    fetchcards()
    fetchstatus()
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