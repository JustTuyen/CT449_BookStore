<template>
<Nav/>
    <div class="container-fluid">
        <div class="banner">
            <banner/>
        </div>
        <section>
            <div class="header justify-content-center d-flex my-1">
                <div class="circle">
                    <h3>TOP SELLER</h3>
                </div>
            </div>
            <div class="row d-flex">
                <div class="col">
                    <div class="card">
                        <div class="img justify-content-center d-flex">
                            <img src="../../assests/book0.jpg" alt="Book Cover" class="img-fluid"/>
                        </div>
                        <div class="card-body text-center">
                            <h5>Title</h5>
                            <p>Price</p>
                            <button class="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import banner from '@/components/banner.vue';
import Nav from '../../components/nav.vue';
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
    max-width: 200px;
    max-height: 270px;
}
/* CARD body */
.img-fluid{
    height: 250px;
    width: 180px;
}
</style>