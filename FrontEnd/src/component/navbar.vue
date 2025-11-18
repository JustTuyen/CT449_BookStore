<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">QUẢN LÝ MƯỢN SÁCH</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Sách</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Người Dùng
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link class="dropdown-item" aria-current="page" to="/Profile">Tài khoản</router-link>
            </li>
            <li>
              <router-link class="dropdown-item" aria-current="page" to="/BorrowingPage">Mượn sách</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> -->
      </ul>
      <form class="d-flex" role="search" @submit.prevent="searchWord()">
        <input class="form-control me-2" v-model="keyword"
         type="search" placeholder="Nhập từ khóa tìm kiếm..." aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Tìm!</button>
      </form>
    </div>
  </div>
</nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const keyword = ref("");
const router = useRouter();

function searchWord(){
  if(keyword.value.trim()){
    router.push({
      name: 'SearchPage', query:{ keyword: keyword.value.trim()}
    });
  }
}
</script>
<style scoped>
</style>