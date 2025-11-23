<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">QUẢN LÝ SÁCH:</h1>
        <hr class="my-3">
        <div class="actions">
          <button class="btn btn-success action-btn" @click="addnewModal">Thêm sách</button>
          <!-- <button class="btn btn-warning action-btn"></button> -->
        </div>
      </div>
      <div class="content" v-if="books.length">
        <table id="users">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Năm XB</th>
              <th>Mô tả</th>
              <th>Đơn giá</th>
              <th>Số quyển</th>
              <th>Trạng thái</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in books" :key="book._id">
              <td>
                {{ index + 1}}
              </td>
              <td>
                {{ book.TenSach }}
              </td>
              <td>
                {{ book.TacGia }}
              </td>
              <td>
                {{ book.NamXuatBan }}
              </td>
               <td>
                {{ book.MoTa }}
              </td>
               <td>
                {{ formatPrice(book.DonGia) }}
              </td>
               <td>
                {{ book.SoQuyen }}
              </td>
              <td>
                <div :style="{
                  backgroundColor: book.TrangThai_ID === '6914bddf56ee2f9ce86fab85' 
                      ? 'green'
                      : book.TrangThai_ID === '6914bde456ee2f9ce86fab86' 
                          ? '#63A361' 
                          : 'red',
                  color: 'white',
                  borderRadius: '16px',
                 }">
                {{ 
                    book.TrangThai_ID === '6914bddf56ee2f9ce86fab85' 
                    ? "Phát Hàng"
                    : book.TrangThai_ID === '6914bde456ee2f9ce86fab86' 
                        ? "Ngưng"
                        : "Unknown Status" 
                }}
              </div>
              </td>
              <td>
                <button class="btn btn-warning btns" type="button" @click="openUpdateModal(book)">Edit</button>
                <button class="btn btn-danger btns" type="button" @click="deleteItem(book._id)">Xóa</button>
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
        <h5 class="modal-title">THÊM SÁCH:</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập tên sách:</label>
            <input type="text" class="form-control" id="name" 
              placeholder="Nhập tên..." required v-model="AddForm.TenSach">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập tên tác giả:</label>
            <input type="text" class="form-control" id="name" 
              placeholder="Nhập tên..." required v-model="AddForm.TacGia">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập số quyển:</label>
            <input type="number" class="form-control" id="name" 
              placeholder="Nhập số lượng..." required v-model="AddForm.SoQuyen">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập mô tả:</label>
              <textarea rows="3" type="text" class="form-control" required placeholder="Nhập miêu tả..." 
              v-model="AddForm.MoTa"></textarea> 
          </div>
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Trạng Thái:</label>
              <select class="form-select" aria-label="select example" 
              required v-model="AddForm.TrangThai_ID">
                <option v-for="status in statuss" :key="status._id" 
                :value="status._id">
                 {{status.TenTrangThai}}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="name" class="form-label">Đơn giá:</label>
               <input type="text" class="form-control" placeholder="Nhập giá..." v-model="AddForm.DonGia"
                required >
            </div>
          </div>
           <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Nhập nhà xuất bản:</label>
              <select class="form-select" aria-label="select example" 
              required v-model="AddForm.NhaXuatBan_ID">
                <option v-for="publisher in publishers" :key="publisher._id" 
                :value="publisher._id">
                 {{publisher.TenNXB}}
                </option>
            </select>
            </div>
            <div class="col">
              <label for="name" class="form-label">Năm xuất bản:</label>
              <input type="text" class="form-control" placeholder="Nhập năm..." v-model="AddForm.NamXuatBan"
                required>
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
        <h5 class="modal-title">CẬP NHẬT SÁCH:</h5>
        <button type="button" class="btn-close" @click="closeModelUpdate"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập tên sách:</label>
            <input type="text" class="form-control" id="name" 
              placeholder="Nhập tên..." required v-model="UpdateCardForm.TenSach">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập tên tác giả:</label>
            <input type="text" class="form-control" id="name" 
              placeholder="Nhập tên..." required v-model="UpdateCardForm.TacGia">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập số quyển:</label>
            <input type="number" class="form-control" id="name" 
              placeholder="Nhập số lượng..." required v-model="UpdateCardForm.SoQuyen">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập mô tả:</label>
              <textarea rows="3" type="text" class="form-control" required placeholder="Nhập miêu tả..." 
              v-model="UpdateCardForm.MoTa"></textarea> 
          </div>
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Trạng Thái:</label>
              <select class="form-select" aria-label="select example" 
              required v-model="UpdateCardForm.TrangThai_ID">
                <option v-for="status in statuss" :key="status._id" 
                :value="status._id">
                 {{status.TenTrangThai}}
                </option>
              </select>
            </div>
            <div class="col">
              <label for="name" class="form-label">Đơn giá:</label>
               <input type="text" class="form-control" placeholder="Nhập giá..." v-model="UpdateCardForm.DonGia"
                required >
            </div>
          </div>
           <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Nhập nhà xuất bản:</label>
              <select class="form-select" aria-label="select example" 
              required v-model="UpdateCardForm.NhaXuatBan_ID">
                <option v-for="publisher in publishers" :key="publisher._id" 
                :value="publisher._id">
                 {{publisher.TenNXB}}
                </option>
            </select>
            </div>
            <div class="col">
              <label for="name" class="form-label">Năm xuất bản:</label>
              <input type="text" class="form-control" placeholder="Nhập năm..." v-model="UpdateCardForm.NamXuatBan"
                required>
            </div>
          </div>

          <button type="submit" class="btn btn-success" @click="updateForm(UpdateCardForm._id)"
          >Update</button>
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
const books = ref([]);
const fetchbooks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/book/");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

const publishers = ref([]);
const fetchpublisher = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/publisher/");
    publishers.value = response.data;
  } catch (error) {
    console.error("Error fetching publisher:", error);
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
//
const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
};

const AddForm = reactive({
  TenSach: '',
  TacGia: '',
  NhaXuatBan_ID: '',
  NamXuatBan: '',
  MoTa: '',
  DonGia: '',
  SoQuyen: '',
  TrangThai_ID: '',
});

function addnewModal() {
  showModal.value = true;
}

async function submitAddForm() {
  const payload = {
  TenSach: AddForm.TenSach,
  TacGia: AddForm.TacGia,
  NhaXuatBan_ID: AddForm.NhaXuatBan_ID,
  NamXuatBan: AddForm.NamXuatBan,
  MoTa: AddForm.MoTa,
  DonGia: AddForm.DonGia,
  SoQuyen: AddForm.SoQuyen,
  TrangThai_ID: AddForm.TrangThai_ID,
};

  try {
    const response = await axios.post(
    `http://localhost:3000/api/book/`,
        payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  alert('Thêm thành công!');
  Window.location.reload();
  Object.assign(AddForm, {
    TenSach: '',
    TacGia: '',
    NhaXuatBan_ID: '',
    NamXuatBan: '',
    MoTa: '',
    DonGia: '',
    SoQuyen: '',
    TrangThai_ID: '',
  });
  } catch (error) {
    console.error('Failed to add:', error.response?.data || error.message);
    //alert('Thêm thất bại!',  error.response?.data || error.message);
  } 
}
//
const showModalUpdate = ref(false);
const closeModelUpdate = () => {
  showModalUpdate.value = false;
};

const UpdateCardForm = reactive({
  _id: '',
  TenSach: '',
  TacGia: '',
  NhaXuatBan_ID: '',
  NamXuatBan: '',
  MoTa: '',
  DonGia: '',
  SoQuyen: '',
  TrangThai_ID: '',
});

function openUpdateModal(book) {
  showModalUpdate.value = true;
  UpdateCardForm._id = book._id
  UpdateCardForm.TenSach = book.TenSach;
  UpdateCardForm.TacGia = book.TacGia;
  UpdateCardForm.NhaXuatBan_ID = book.NhaXuatBan_ID;
  UpdateCardForm.NamXuatBan = book.NamXuatBan;
  UpdateCardForm.MoTa = book.MoTa;
  UpdateCardForm.DonGia= book.DonGia;
  UpdateCardForm.SoQuyen = book.SoQuyen;
  UpdateCardForm.TrangThai_ID = book.TrangThai_ID;
}

const updateForm = async (id) => {
  const newCard = {
    _id: id,
    TenSach: UpdateCardForm.TenSach,
    TacGia: UpdateCardForm.TacGia,
    NhaXuatBan_ID: UpdateCardForm.NhaXuatBan_ID,
    NamXuatBan: UpdateCardForm.NamXuatBan,
    MoTa: UpdateCardForm.MoTa,
    DonGia: UpdateCardForm.DonGia,
    SoQuyen: UpdateCardForm.DonGia,
    TrangThai_ID: UpdateCardForm.TrangThai_ID,
  };

  try {

    //console.log("thoin tin them:", newCategory);
    const response = await axios.put(
      `http://localhost:3000/api/book/${id}`,
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
    alert('cập nhật thất bại!', error.response?.data || error.message);
    console.error('Failed to update:', error.response?.data || error.message);
  }
};

//
const deleteItem = async (id) => {
  if (confirm(`Bạn có chắc bạn muốn xóa ID ${id}?`)) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/book/${id}`);
      if (response.status === 204 || response.status === 200) {
        cards.value = cards.value.filter(
          (item) => item._id !== id
        );
        //alert(`${id} đã được xóa thành công!`);
        window.location.reload();
      } else {
        console.error(`Xóa thất bại với ID ${id}`);
        //alert(`Xóa thất bại với ID ${id}`, error.response?.data || error.message);
        window.location.reload();
      }
    } catch (error) {
      console.error('Lỗi khuyến mãi:', error.response?.data || error.message);
      //alert(`Xóa thất bại với ID ${id}`, error.response?.data || error.message);
    }
  }
};
//
onMounted(() => {
  fetchbooks()
  fetchpublisher()
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