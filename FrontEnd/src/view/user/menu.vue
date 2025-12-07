<template>
<Navbar/>
    <div class="container-fluid">
        <div class="banner">
            <Banner/>
        </div>
        <section style="padding: 15px;">
            <div class="header justify-content-center d-flex my-3">
                <div class="circle">
                    <h3>MENU</h3>
                </div>
            </div>
             <hr class="my-1"/>
            <div class="row d-flex row-cols-md-5 g-5 my-1" v-if="books.length">
                <div class="col" v-for="book in books" :key="book._id">
                    <div class="card">
                        <router-link  class="router-link-active router-link-exact-active" 
                        :to="{ name: 'BookPage', params: { id: String(book._id) } }">
                            <div class="img justify-content-center d-flex">
                                <img src="../../assests/images.png" alt="Book Cover" class="img-fluid"/>
                            </div>
                        <div class="card-body text-center">
                                <h5>{{ book.TenSach}}</h5>
                                <!-- <p>{{book.MoTa}}</p> -->
                                <button
                                    class="btn"
                                    :disabled="book.TrangThai_ID !== '6914bddf56ee2f9ce86fab85'"
                                    :class="{
                                        'btn-success': book.TrangThai_ID === '6914bddf56ee2f9ce86fab85',
                                        'btn-secondary': book.TrangThai_ID !== '6914bde456ee2f9ce86fab86'
                                    }"
                                >
                                 {{ book.TrangThai_ID === '6914bddf56ee2f9ce86fab85' ? 'Khám phá ngay!' : 'Đã hết sách' }}

                                </button>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
        <hr/>
        <section style="padding: 15px;">
            <!-- <banner2/> -->
            <div class="header d-flex my-1">
                <div class="">
                    <h3>NHÀ XUẤT BẢN TÀI TRỢ:</h3>
                </div>
            </div>
           <div class="container-fluid bg-body-tertiary py-3">
                <div id="testimonialCarousel" class="carousel" v-if="publishers.length">
                    <div class="carousel-inner">
                        <div class="carousel-item active" v-for="publisher in publishers" :key="publisher._id">
                            <div class="card shadow-sm rounded-3 p-3">
                                <div class="card-body">
                                    <div class="quotes display-5 text-body-tertiary">
                                        <h3>
                                            <i class="bi bi-house-add"></i>
                                            Nhà xuất bản:
                                        </h3>
                                    </div>
                                    <div class="d-flex align-items-center pt-4">
                                        <div>
                                            <h5 class="card-title fw-bold">{{publisher.TenNXB}}</h5>
                                            <span class=""><strong>Địa chỉ: </strong>
                                                {{ publisher.DiaChi }}
                                            </span>
                                            <br/>
                                            <span class=""><strong>Số Điện Thoại: </strong>
                                                {{ publisher.SDT }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </section>
        <hr/>
    </div>
    <Footer/>
</template>
<script setup>
import Navbar from '@/component/navbar.vue';
import Footer from '@/component/footer.vue'
import Banner from '@/component/banner.vue'
// import banner2 from '@/component/banner2.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
const books = ref([]);
const publishers =  ref([]);
const fetchbooks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/book/");
    books.value = response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

const fetchpublishers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/publisher/");
    publishers.value = response.data;
  } catch (error) {
    console.error("Error fetching publishers:", error);
  }
};

onMounted(() => {
    fetchbooks()
    fetchpublishers()
});

</script>
<style scoped>
.banner-img{
    height: 400px;
    width: 100%;
}
.circle{
    border: 2px solid black;
    width: 200px;
    text-align: center;
    border-radius: 16px;
    padding: 5px;
}

.card{
    padding: 10px;
    max-width: auto;
    max-height: auto;
    border: 1px solid black;
}
/* CARD body */
.img-fluid{
    max-height: 300px;
    max-width: 300px;
    border: 1px solid black;
}

.router-link-active,
.router-link-exact-active{
  color: inherit !important; /* or any specific color you want */
  text-decoration: none;
}

/* card */
.carousel-inner {
  padding: 1em;
}
@media screen and (min-width: 576px) {
  .carousel-inner {
    display: flex;
    width: 90%;
    margin-inline: auto;
    padding: 1em 0;
    overflow: hidden;
  }
  .carousel-item {
    display: block;
    margin-right: 0;
    flex: 0 0 calc(100% / 2);
  }
}
@media screen and (min-width: 1024px) {
  .carousel-item {
    display: block;
    margin-right: 0;
    flex: 0 0 calc(100% / 3);
  }
}
.carousel .card {
  margin: 0 0.5em;
  border: 0;
}

.carousel-control-prev,
.carousel-control-next {
  width: 3rem;
  height: 3rem;
  background-color: green;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}
</style>