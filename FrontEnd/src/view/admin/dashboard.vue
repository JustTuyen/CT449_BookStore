<template>
  <div class="d-flex bng">
    <sidebar/>
    <div class="container-fluid">
      <div class="title">
        <h1 class="my-3">DASHBOARD</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import sidebar from '@/component/sidebar.vue';
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
  border-radius: 16px;
}
</style>