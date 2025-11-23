<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">QUẢN LÝ THẺ MƯỢN:</h1>
        <hr class="my-3">
       <div class="actions">
          <button class="btn btn-success action-btn" @click="addnewModal">Thêm thẻ mượn</button>
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
                <button class="btn btn-warning btns" @click="openUpdateModal(card)" type="button">Update</button>
                <button class="btn btn-danger btns" @click="deleteItem(card._id)" type="button">Xóa</button>
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
        <h5 class="modal-title">THÊM PHIẾU MƯỢN:</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập sách:</label>
            <select class="form-select" aria-label="select example" 
              required v-model="AddCardForm.Sach_ID">
                <option v-for="book in books" :key="book._id" 
                :value="book._id">
                  {{book.TenSach}}
                </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Đọc giả:</label>
            <select class="form-select" aria-label="select example" 
              required v-model="AddCardForm.DocGia_ID">
                <option v-for="user in users" :key="user._id" 
                :value="user._id">
                 {{user.HoVaDem}} {{user.Ten}}
                </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Nhân viên:</label>
            <select class="form-select" aria-label="select example" 
              required v-model="AddCardForm.NhanVien_ID">
                <option v-for="employee in employees" :key="employee._id" 
                :value="employee._id">
                 {{employee.HoVaDem}} {{employee.Ten}}
                </option>
            </select>
          </div>
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Trạng Thái:</label>
              <select class="form-select" aria-label="select example" 
              required v-model="AddCardForm.TrangThai_ID">
                <option v-for="status in statuss" :key="status._id" 
                :value="status._id">
                 {{status.TenTrangThai}}
                </option>
            </select>
            </div>
            <div class="col">
              <label for="name" class="form-label">Đơn giá:</label>
              <input type="text" class="form-control" id="name" 
                placeholder="Nhập giá..." required v-model="AddCardForm.DonGia">
            </div>
          </div>
           <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Ngày Lập:</label>
              <input type="date" class="form-control" id="name" 
                required v-model="AddCardForm.NgayMuon">
            </div>
            <div class="col">
              <label for="name" class="form-label">Ngày trả:</label>
              <input type="date" class="form-control" id="name" 
              required v-model="AddCardForm.NgayTra">
            </div>
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
        <h5 class="modal-title">CẬP NHẬT PHIẾU MƯỢN:</h5>
        <button type="button" class="btn-close" @click="closeModelUpdate"></button>
      </div>

      <div class="modal-body">
        <form>

          <div class="mb-3">
            <label class="form-label">Nhập sách:</label>
            <select class="form-select" required v-model="UpdateCardForm.Sach_ID">
              <option v-for="book in books" :key="book._id" :value="book._id">
                {{ book.TenSach }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Nhập Đọc giả:</label>
            <select class="form-select" required v-model="UpdateCardForm.DocGia_ID">
              <option v-for="user in users" :key="user._id" :value="user._id">
                {{ user.HoVaDem }} {{ user.Ten }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Nhập Nhân viên:</label>
            <select class="form-select" required v-model="UpdateCardForm.NhanVien_ID">
              <option v-for="employee in employees" :key="employee._id" :value="employee._id">
                {{ employee.HoVaDem }} {{ employee.Ten }}
              </option>
            </select>
          </div>

          <div class="mb-3 row">
            <div class="col">
              <label class="form-label">Trạng Thái:</label>
              <select class="form-select" required v-model="UpdateCardForm.TrangThai_ID">
                <option v-for="status in statuss" :key="status._id" :value="status._id">
                  {{ status.TenTrangThai }}
                </option>
              </select>
            </div>

            <div class="col">
              <label class="form-label">Đơn giá:</label>
              <input type="text" class="form-control" placeholder="Nhập giá..."
                required v-model="UpdateCardForm.DonGia">
            </div>
          </div>

          <div class="mb-3 row">
            <div class="col">
              <label class="form-label">Ngày Lập:</label>
              <input type="date" class="form-control" required v-model="UpdateCardForm.NgayMuon">
            </div>

            <div class="col">
              <label class="form-label">Ngày trả:</label>
              <input type="date" class="form-control" required v-model="UpdateCardForm.NgayTra">
            </div>
          </div>

          <button type="button" class="btn btn-success" @click="updateForm(UpdateCardForm._id)">Update</button>

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
//handle update and add
const showModalUpdate = ref(false);
const closeModelUpdate = () => {
  showModalUpdate.value = false;
};

const UpdateCardForm = reactive({
  _id: '',
  Sach_ID: '',
  DocGia_ID: '',
  NhanVien_ID: '',
  NgayMuon: '',
  NgayTra: '',
  TrangThai_ID: '',
  DonGia: '',
});

function openUpdateModal(card) {
  showModalUpdate.value = true;
  UpdateCardForm._id = card._id
  UpdateCardForm.Sach_ID = card.Sach_ID;
  UpdateCardForm.DocGia_ID = card.DocGia_ID;
  UpdateCardForm.NhanVien_ID = card.NhanVien_ID;
  UpdateCardForm.NgayMuon = card.NgayMuon?.slice(0, 10);
  UpdateCardForm.NgayTra= card.NgayTra?.slice(0, 10);
  UpdateCardForm.TrangThai_ID = card.TrangThai_ID;
  UpdateCardForm.DonGia = card.DonGia;
}

const updateForm = async (id) => {
  const newCard = {
    _id: id,
    Sach_ID: UpdateCardForm.Sach_ID,
    DocGia_ID: UpdateCardForm.DocGia_ID,
    NhanVien_ID: UpdateCardForm.NhanVien_ID,
    NgayMuon: UpdateCardForm.NgayMuon,
    NgayTra: UpdateCardForm.NgayTra,
    TrangThai_ID: UpdateCardForm.TrangThai_ID,
    DonGia: UpdateCardForm.DonGia,
  };
  try {

    //console.log("thoin tin them:", newCategory);
    const response = await axios.put(
      `http://localhost:3000/api/borrowingcard/${id}`,
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

//handle update and add
const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
};

const AddCardForm = reactive({
  Sach_ID: '',
  DocGia_ID: '',
  NhanVien_ID: '',
  NgayMuon: '',
  NgayTra: '',
  TrangThai_ID: '',
  DonGia: '',
});

function addnewModal() {
  showModal.value = true;
}

async function submitAddForm() {
  const payload = {
    Sach_ID: AddCardForm.Sach_ID,
    DocGia_ID:AddCardForm.DocGia_ID,
    NhanVien_ID: AddCardForm.NhanVien_ID,
    NgayMuon: AddCardForm.NgayMuon,
    NgayTra: AddCardForm.NgayTra,
    TrangThai_ID: AddCardForm.TrangThai_ID,
    DonGia: AddCardForm.DonGia,
  };

  try {
    const response = await axios.post(
    `http://localhost:3000/api/borrowingcard/`,
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
    Sach_ID: '',
    DocGia_ID: '',
    NhanVien_ID: '',
    NgayMuon: '',
    NgayTra: '',
    TrangThai_ID: '',
    DonGia: '',
  });
  } catch (error) {
    console.error('Failed to add:', error.response?.data || error.message);
    //alert('Thêm thất bại!',  error.response?.data || error.message);
  } 
}


//

const users = ref([]);
const fetchuser = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/user/");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const employees = ref([]);
const fetchemployee = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/employee/");
    employees.value = response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

const books = ref([]);
const fetchbooks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/book/");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

const statuss = ref([]);
const fetchstatus = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/status/");
    statuss.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

const deleteItem = async (id) => {
  if (confirm(`Bạn có chắc bạn muốn xóa ID ${id}?`)) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/borrowingcard/${id}`);
      if (response.status === 204 || response.status === 200) {
        cards.value = cards.value.filter(
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
  fetchcards()
  fetchbooks()
  fetchemployee()
  fetchuser()
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