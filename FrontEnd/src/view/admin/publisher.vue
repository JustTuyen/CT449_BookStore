<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">QUẢN LÝ NHÀ XUẤT BẢN:</h1>
        <hr class="my-3">
        <div class="actions">
          <button class="btn btn-success action-btn" @click="addnewModal">Thêm NXB</button>
          <!-- <button class="btn btn-warning action-btn"></button> -->
        </div>
      </div>
      <div class="content" v-if="publishers.length">
        <table id="users">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên NXB</th>
              <th>Địa chỉ</th>
               <th>SĐT</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(publisher, index) in publishers" :key="publisher._id">
              <td>
                {{ index + 1}}
              </td>
              <td>
                {{ publisher.TenNXB }}
              </td>
              <td>
                {{ publisher.DiaChi }}
              </td>
              <td>
                {{publisher.SDT }}
              </td>
              <td>
                <button class="btn btn-warning btns" @click="openUpdateModal(publisher)">Update</button>
                <button class="btn btn-danger btns" @click="deleteItem(publisher._id)">Xoa</button>
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
        <h5 class="modal-title">THÊM NHÀ XUẤT BẢN:</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Tên:</label>
            <input type="text" class="form-control" placeholder="Nhập tên..."
                required v-model="AddCardForm.TenNXB">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Địa chỉ:</label>
            <input type="text" class="form-control" placeholder="Nhập tên..."
            required v-model="AddCardForm.DiaChi">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Số Điện Thoại:</label>
            <input type="text" class="form-control" placeholder="Nhập tên..."
            required v-model="AddCardForm.SDT">
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
        <h5 class="modal-title">CẬP NHẬT NHÀ XUẤT BẢN:</h5>
        <button type="button" class="btn-close" @click="closeModelUpdate"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Tên:</label>
            <input type="text" class="form-control" placeholder="Nhập tên..."
                required v-model="UpdateCardForm.TenNXB">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Địa chỉ:</label>
            <input type="text" class="form-control" placeholder="Nhập tên..."
            required v-model="UpdateCardForm.DiaChi">
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Nhập Số Điện Thoại:</label>
            <input type="text" class="form-control" placeholder="Nhập tên..."
            required v-model="UpdateCardForm.SDT">
          </div>     
          <button type="submit" class="btn btn-success" @click="updateForm(UpdateCardForm._id)"
          >Cập nhật</button>
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
const publishers = ref([]);
const fetchpublishers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/publisher/");
    publishers.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", publishers);
  }
};

const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
};

const AddCardForm = reactive({
  TenNXB: '',
  DiaChi: '',
  SDT: '',
});

function addnewModal() {
  showModal.value = true;
}

async function submitAddForm() {
  const payload = {
    TenNXB: AddCardForm.TenNXB,
    DiaChi:AddCardForm.DiaChi,
    SDT: AddCardForm.SDT,
  };

  try {
    const response = await axios.post(
    `http://localhost:3000/api/publisher/`,
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
    TenNXB: '',
    DiaChi: '',
    SDT: '',
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
  TenNXB: '',
  DiaChi: '',
  SDT: '',
});

function openUpdateModal(card) {
  showModalUpdate.value = true;
  UpdateCardForm._id = card._id
  UpdateCardForm.TenNXB= card.TenNXB;
  UpdateCardForm.DiaChi = card.DiaChi;
  UpdateCardForm.SDT = card.SDT;
}

const updateForm = async (id) => {
  const newCard = {
    _id: id,
    TenNXB: UpdateCardForm.TenNXB,
    DiaChi: UpdateCardForm.DiaChi,
    SDT: UpdateCardForm.SDT,
  };
  try {

    //console.log("thoin tin them:", newCategory);
    const response = await axios.put(
      `http://localhost:3000/api/publisher/${id}`,
        newCard,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    alert('cập nhật thành công');
    //window.location.reload();
  } catch (error) {
    alert('cập nhật thất bại!', error.response?.data || error.message);
    console.error('Failed to update:', error.response?.data || error.message);
  }
};
//


const deleteItem = async (id) => {
  if (confirm(`Bạn có chắc bạn muốn xóa ID ${id}?`)) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/publisher/${id}`);
      if (response.status === 204 || response.status === 200) {
        publishers.value = publishers.value.filter(
          (item) => item._id !== id
        );
        //alert(`${id} đã được xóa thành công!`);
      } else {
        console.error(`Xóa thất bại với ID ${id}`);
        window.location.reload();
        //alert(`Xóa thất bại với ID ${id}`, error.response?.data || error.message);
      }
    } catch (error) {
      console.error('Lỗi khuyến mãi:', error.response?.data || error.message);
      //alert(`Xóa thất bại với ID ${id}`, error.response?.data || error.message);
    }
  }
};

onMounted(() => {
    fetchpublishers()
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