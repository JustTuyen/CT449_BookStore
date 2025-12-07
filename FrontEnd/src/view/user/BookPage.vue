<template>
  <navbar/>
  <div class="container-fluid" v-if="book">
    <section class="py-2">
      <div class="header">
        <h1>Thông tin sản phẩm:</h1>
      </div>
      <div class="d-flex justify-content-center align-items-center my-5">
        <div class="container">
          <div class="row px-4 item-card">
            <aside class="col-lg-5">
              <div class="rounded-4 mb-3 d-flex justify-content-center">
                <div class="rounded-4">
                  <img class="card-img" src="../../assests/images.png" />
                </div>
              </div>
            </aside>
            <aside class="col-lg-6">
              <div class="ps-lg-3">
                <div class="mb-3 d-flex">
                  <h1 class="title">{{ book.TenSach }}</h1>
                </div>
                <div class="mb-3 d-flex">
                  <p class="text"><strong>Mô tả: </strong>{{ book.MoTa }}</p>
                </div>
                <div class="mb-3 d-flex">
                  <p class="text"><strong>Tác giả: </strong>{{ book.TacGia }}</p>
                </div>
                <div class="mb-3 d-flex">
                  <p class="text"><strong>Nhà xuất bản: </strong>{{ book.TenNhaXuatBan }} - <strong>Năm xuất bản: </strong>{{ book.NamXuatBan }}</p>
                </div>
                <div class="mb-3 d-flex">
                  <p class="text"><strong>Số lượng: </strong>
                    {{ book.SoQuyen}} 
                    <span class="text-muted">/cuốn</span>
                  </p>
                </div>
                <div class="mb-3 d-flex">
                  <p class="price"><strong>Giá: </strong>{{ formatPrice(book.DonGia) }}</p>
                </div>
                <hr/>
                 <div class="mb-3 d-flex">
                   <button @click="ToBorrowBook(book._id)"
                    class="btn-borrow"
                    :disabled="book.TrangThai_ID !== '6914bddf56ee2f9ce86fab85'"
                    :class="{
                        'btn btn-success': book.TrangThai_ID === '6914bddf56ee2f9ce86fab85',
                        'btn btn-secondary': book.TrangThai_ID !== '6914bde456ee2f9ce86fab86'
                    }"
                    >
                      {{ book.TrangThai_ID === '6914bddf56ee2f9ce86fab85' ? 'Mượn ngay!' : 'Đã hết sách' }}

                    </button>
                 </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  </div>
 <Footer/>
</template>

<script setup>
import axios from 'axios';
import navbar from '@/component/navbar.vue';
import Footer from '@/component/footer.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { formatPrice } from '@/ulti/utils';
import { useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();

const book = ref(null);
const props = defineProps({
  id: String
});
async function fetchBookDetails() {
    try {
        const response = await axios.get(`http://localhost:3000/api/book/${route.params.id}`);
        book.value = response.data;
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
}

function ToBorrowBook(id){
  router.push({name: "Checkout", params: {id}})
}
onMounted(() => {
    fetchBookDetails();
});

watch(() => route.params.id, fetchBookDetails);

</script>

<style scoped>
.container-fluid{
  padding: 10px 50px 50px 100px;
}
.item-card{
  border: 1px solid black;
  padding: 20px;
  border-radius: 20px;
}
.btn-borrow{
  width: 100%;
  font-size: 20px;
}

.card-img{
  border: 1px solid black;
  border-radius: 16px;
  height: 450px;
  width: 500px;
}
</style>