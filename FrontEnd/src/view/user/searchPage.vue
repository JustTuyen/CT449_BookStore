<template>
    <Navbar/>
    <div class="container-fluid">
        <section style="padding: 15px;">
            <div class="header justify-content-center d-flex my-3">
                <div class="circle">
                    <h3>Kết quả tìm kiếm từ khóa: "{{ keyword }}"</h3>
                </div>
               
            </div>
             <hr class="my-1"/>
            <div class="row d-flex row-cols-md-5 g-5 my-1" v-if="books.length">
                <div class="col" v-for="book in books" :key="book._id">
                    <div class="card">
                        <router-link  class="router-link-active router-link-exact-active" 
                        :to="{ name: 'BookPage', params: { id: String(book._id) } }">
                            <div class="img justify-content-center d-flex">
                                <img src="../../assests/book0.jpg" alt="Book Cover" class="img-fluid"/>
                            </div>
                        <div class="card-body text-center">
                                <h5>{{ book.TenSach}}</h5>
                                <p>{{ formatPrice(book.DonGia) }}</p>
                                <button
                                    class="btn"
                                    :disabled="book.TrangThai_ID !== '6914bddf56ee2f9ce86fab85'"
                                    :class="{
                                        'btn-success': book.TrangThai_ID === '6914bddf56ee2f9ce86fab85',
                                        'btn-secondary': book.TrangThai_ID !== '6914bde456ee2f9ce86fab86'
                                    }"
                                >
                                    Khám phá ngay!
                                </button>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else class="d-flex justify-content-center my-5">
                <h1>Không tìm thấy sách nào với từ khóa "{{ keyword }}"</h1>
            </div>
        </section>
    </div>
</template>

<script setup>
    import { formatPrice } from '@/ulti/utils';
import Navbar from '@/component/navbar.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const books = ref([]);
const keyword = ref(route.query.keyword || '');

async function fetchSearchBooks() {
    if(!keyword.value) return; 
    try{
        const response = await axios.get(`http://localhost:3000/api/book/name`,{
            params: {name: keyword.value}
        });

        books.value = response.data;
    } catch(error){
        console.log(error);
        books.value = [];
    }
}

onMounted(fetchSearchBooks)

watch(()=> route.query.keyword, (newKeyword) =>{
    keyword.value = newKeyword
    fetchSearchBooks()
});

</script>

<style scoped>
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
</style>