<template>
    <Navbar/>
    <div class="container-fluid">
        <div class="wrapper">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-lg-6">
                    <div class="card-body">
                        <div class="p-5" v-if="book">
                            <div class="header">
                                <h3 class="fw-bold">Phiếu mượn</h3>
                                <p class="text-muted">Thông tin thẻ mượn:</p>
                            </div>  
                            <hr/>
                            <form>
                                <div class="mb-3 row">
                                    <label for="exampleInputEmail1" class="form-label">Sách: </label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" v-model="book.TenSach" disabled>
                                </div>
                                 <div class="mb-3 row">
                                    <label for="exampleInputEmail1" class="form-label">Người Mượn: </label>
                                     <select class="form-select" aria-label="Default select example" required>
                                        <option disabled value="">Người Mượn</option>
                                        <option :value="user._id"  v-for="(user, index) in users" :key="user._id">
                                            #{{ index + 1 }}:  {{ user.HoVaDem }} {{ user.Ten  }}
                                        </option>
                                    </select>
                                </div>
                                 <div class="mb-3 row">
                                    <div class="col">
                                        <label for="exampleInputEmail1" class="form-label">Ngày mượn: </label>
                                        <input class="form-control" type="datetime-local" name="datetime">
                                    </div>
                                     <div class="col">
                                        <label for="exampleInputEmail1" class="form-label">Ngày trả: </label>
                                        <input class="form-control"  type="datetime-local" name="datetime">
                                    </div>
                                </div>
                                <div class="mb-3 row" v-if="employees.length">
                                    <label for="exampleInputEmail1" class="form-label">Nhân viên: </label>
                                   <select class="form-select" aria-label="Default select example" required>
                                        <option disabled value="">Nhân viên</option>
                                        <option :value="employee._id"  v-for="(employee, index) in employees" :key="employee._id">
                                            #{{ index + 1 }}:  {{ employee.HoVaDem }} {{ employee.Ten  }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-3 row">
                                    <label for="exampleInputEmail1" class="form-label">Đơn giá </label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" v-model="book.DonGia" disabled>
                                </div>
                                <div class="mb-3 d-flex">
                                    <button class="btn btn-success" style="width: 100%; margin-right: 10px;">Mượn Sách</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 bg-body-tertiary">
                    <div class="p-5 ">
                        <div class="mb-1 d-flex justify-content-center align-items-center ">
                            <h5>Thông tin sách</h5>
                        </div>
                        <hr/>
                        <div class="mb-3 justify-content-center align-items-center d-flex">
                            <img src="../../assests/book0.jpg" alt="img-book" class="img-card img-fluid rounded-3">
                        </div>
                        <div class="mb-3">
                            <p><strong>Tên sách: </strong>{{ book.TenSach }}</p>
                        </div>
                        <div class="mb-3">
                            <p><strong>Mô tả: </strong>{{ book.MoTa }}</p>
                        </div>
                        <div class="mb-3">
                            <p><strong>Đơn giá: </strong>{{ formatPrice(book.DonGia) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/component/navbar.vue';
import { formatPrice } from '@/ulti/utils';
//import Footer from '@/component/footer.vue'
import axios from 'axios';
import { useRoute } from 'vue-router';
const route = useRoute();
import { ref, onMounted } from 'vue';
const employees = ref([]);
const users = ref([]);
const book = ref(null);

const fetchEmployee = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/employee/");
    employees.value = response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/user/");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

async function fetchBookDetails() {
    try {
        const response = await axios.get(`http://localhost:3000/api/book/${route.params.id}`);
        book.value = response.data;
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}

// const selectedNhanVien = ref("")   

// const creatBorrowingCard = async() =>{
//     try{
//         const payload = {
//             Sach_ID: book.value._id,
//             DocGia_ID: userId,
//             NhanVien_ID: "EMP001",          
//             NgayMuon: new Date().toISOString().split("T")[0],
//             NgayTra: "",
//             TrangThai_ID: "pending",         
//             DonGia: book.value.DonGia,
//         }
//     }
// }

onMounted(() => {
    fetchEmployee()
    fetchBookDetails()
    fetchUser()
});

</script>

<style scoped>
.form-label{
    font-size: 20px;
}

.img-card{
    max-height: 350px;
}

.wrapper{
    padding: 20px;
}
</style>