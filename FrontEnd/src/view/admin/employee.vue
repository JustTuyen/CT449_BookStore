<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">QUẢN LÝ NHÂN VIÊN:</h1>
        <hr class="my-3">
        <div class="actions">
          <button class="btn btn-success action-btn"  @click="addnewModal">Thêm Nhân viên</button>
          <!-- <button class="btn btn-warning action-btn"></button> -->
        </div>
      </div>
      <div class="content" v-if="employees.length">
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
              <th>Địa chỉ</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(employee, index) in employees" :key="employee._id">
              <td>
                {{ index + 1}}
              </td>
              <td>
                {{ employee.HoVaDem }} {{employee.Ten}}
              </td>
              <td>
                {{ employee.Email }}
              </td>
              <td>
                {{ employee.Password }}
              </td>
               <td>
                {{ employee.GioiTinh }}
              </td>
               <td>
                {{ employee.NgaySinh
                    ? new Date( employee.NgaySinh).toLocaleDateString() 
                    : "Chưa có cập nhật" }}
              </td>
               <td>
                {{ employee.SoDienThoai }}
              </td>
              <td>
                {{ employee.VaiTro }}
              </td>
              <td>
                {{ employee.DiaChi }}
              </td>
              <td>
                <button class="btn btn-warning btns"  type="button" @click="openUpdateModal(employee)">Edit</button>
                <button class="btn btn-danger btns"  type="button" @click="deleteItem(employee._id)">Xóa</button>
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
        <h5 class="modal-title">THÊM TÀI KHOẢN NHÂN VIÊN:</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Nhập Tên:</label>
              <input type="text" class="form-control" placeholder="Nhập tên..."
              required v-model="AddCardForm.Ten">
            </div>
            <div class="col">
              <label for="name" class="form-label">Nhập Họ Và Đệm:</label>
              <input type="text" class="form-control" placeholder="Nhập họ và đệm..."
              required v-model="AddCardForm.HoVaDem">
            </div>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Email:</label>
            <input type="text" class="form-control" placeholder="Nhập email..."
            required v-model="AddCardForm.Email">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Mật Khẩu:</label>
            <input type="text" class="form-control" placeholder="Nhập pass..."
            required v-model="AddCardForm.Password">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Số Điện Thoại:</label>
            <input type="text" class="form-control" placeholder="Nhập SĐT..."
            required v-model="AddCardForm.SoDienThoai">
          </div>
           <div class="mb-3">
            <label for="name" class="form-label">Nhập Địa chỉ:</label>
            <input type="text" class="form-control" placeholder="Nhập địa chỉ..."
            required v-model="AddCardForm.DiaChi">
          </div>
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Nhập Giới Tính:</label>
                <select class="form-select" aria-label="select example" required v-model="AddCardForm.GioiTinh">
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nữ</option>
                  <option value="Khac">Khác</option>
                </select>
            </div>
            <div class="col"> 
              <label for="name" class="form-label">Nhập Ngày Sinh:</label>
              <input type="date" class="form-control" 
              required v-model="AddCardForm.NgaySinh">
            </div>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Vai Trò:</label>
            <input type="text" class="form-control" placeholder="Nhập role..."
            required v-model="AddCardForm.VaiTro">
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
        <h5 class="modal-title">CẬP NHẬT TÀI KHOẢN NHÂN VIÊN:</h5>
        <button type="button" class="btn-close" @click="closeModelUpdate"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Nhập Tên:</label>
              <input type="text" class="form-control" placeholder="Nhập tên..."
              required v-model="UpdateCardForm.Ten">
            </div>
            <div class="col">
              <label for="name" class="form-label">Nhập Họ Và Đệm:</label>
              <input type="text" class="form-control" placeholder="Nhập họ và đệm..."
              required v-model="UpdateCardForm.HoVaDem">
            </div>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Email:</label>
            <input type="text" class="form-control" placeholder="Nhập email..."
            required v-model="UpdateCardForm.Email">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Mật Khẩu:</label>
            <input type="text" class="form-control" placeholder="Nhập pass..."
            required v-model="UpdateCardForm.Password">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Số Điện Thoại:</label>
            <input type="text" class="form-control" placeholder="Nhập SĐT..."
            required v-model="UpdateCardForm.SoDienThoai">
          </div>
           <div class="mb-3">
            <label for="name" class="form-label">Nhập Địa chỉ:</label>
            <input type="text" class="form-control" placeholder="Nhập địa chỉ..."
            required v-model="UpdateCardForm.DiaChi">
          </div>
          <div class="mb-3 row">
            <div class="col">
              <label for="name" class="form-label">Nhập Giới Tính:</label>
                <select class="form-select" aria-label="select example" required v-model="UpdateCardForm.GioiTinh">
                  <option value="Nam">Nam</option>
                  <option value="Nu">Nữ</option>
                  <option value="Khac">Khác</option>
                </select>
            </div>
            <div class="col"> 
              <label for="name" class="form-label">Nhập Ngày Sinh:</label>
              <input type="date" class="form-control" 
              required v-model="UpdateCardForm.NgaySinh">
            </div>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Vai Trò:</label>
            <input type="text" class="form-control" placeholder="Nhập role..."
            required v-model="UpdateCardForm.VaiTro">
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
import sidebar from '@/component/sidebar.vue';
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
const employees = ref([]);
const fetchemployees = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/employee/");
    employees.value = response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};
//

//
const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
};

const AddCardForm = reactive({
  HoVaDem: '',
  Ten: '',
  Email: '',
  Password: '',
  GioiTinh: '',
  NgaySinh: '',
  SoDienThoai: '',
  VaiTro: '',
  DiaChi: ''
});

function addnewModal() {
  showModal.value = true;
}

async function submitAddForm() {
  const payload = {
    HoVaDem: AddCardForm.HoVaDem,
    Ten:AddCardForm.Ten,
    Email: AddCardForm.Email,
    Password: AddCardForm.Password,
    GioiTinh: AddCardForm.GioiTinh,
    SoDienThoai: AddCardForm.SoDienThoai,
    VaiTro: AddCardForm.VaiTro,
    NgaySinh: AddCardForm.NgaySinh,
    DiaChi: AddCardForm.DiaChi
  };

  try {
    const response = await axios.post(
    `http://localhost:3000/api/employee/`,
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
    HoVaDem: '',
    Ten: '',
    Email: '',
    Password: '',
    GioiTinh: '',
    NgaySinh: '',
    SoDienThoai: '',
    VaiTro: '',
    DiaChi: '',
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
  HoVaDem: '',
  Ten: '',
  Email: '',
  Password: '',
  GioiTinh: '',
  NgaySinh: '',
  SoDienThoai: '',
  VaiTro: '',
  DiaChi: ''
});

function openUpdateModal(user) {
  showModalUpdate.value = true;
  UpdateCardForm._id = user._id
  UpdateCardForm.HoVaDem = user.HoVaDem;
  UpdateCardForm.Ten = user.Ten;
  UpdateCardForm.Email = user.Email;
  UpdateCardForm.Password = user.Password;
  UpdateCardForm.GioiTinh = user.GioiTinh;
  UpdateCardForm.NgaySinh= user.NgaySinh?.slice(0, 10);
  UpdateCardForm.SoDienThoai = user.SoDienThoai;
  UpdateCardForm.VaiTro = user.VaiTro;
  UpdateCardForm.DiaChi = user.DiaChi
}

const updateForm = async (id) => {
  const newCard = {
    _id: id,
    HoVaDem: UpdateCardForm.HoVaDem,
    Ten: UpdateCardForm.Ten,
    Email: UpdateCardForm.Email,
    Password: UpdateCardForm.Password,
    GioiTinh: UpdateCardForm.GioiTinh,
    NgaySinh: UpdateCardForm.NgaySinh,
    SoDienThoai: UpdateCardForm.SoDienThoai,
    VaiTro: UpdateCardForm.VaiTro,
    DiaChi: UpdateCardForm.DiaChi
  };

  try {

    //console.log("thoin tin them:", newCategory);
    const response = await axios.put(
      `http://localhost:3000/api/employee/${id}`,
        newCard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    alert('cập nhật thành công');
  } catch (error) {
    //window.location.reload();
    //alert('cập nhật thất bại!', error.response?.data || error.message);
    console.error('Failed to update:', error.response?.data || error.message);
  }
};

//
const deleteItem = async (id) => {
  if (confirm(`Bạn có chắc bạn muốn xóa ID ${id}?`)) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/employee/${id}`);
      if (response.status === 204 || response.status === 200) {
        employees.value = employees.value.filter(
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
//
onMounted(() => {
    fetchemployees()
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