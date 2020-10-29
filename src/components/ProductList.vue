<template>
<div class="container">
  <div class="row">
    <div class="card" style="width: 15rem;" v-for="product in products" :key="product.id">
      <img class="card-img-top" :src="product.imgUrl" :alt="product.title">
      <div class="card-body">
        <h5 class="card-title">{{product.title}}</h5>
        <p class="card-text">$ {{product.price}}</p>
        <a href="#" @click="addToCart(product)" class="btn btn-primary">Add to cart</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name:"ProductList",
  // data jika belum menggunakan vuex/store
  // data(){
  //   return {
  //     products
  //   }
  // },
  computed:{
    // setelah data product ready akan diambil di computed
    ...mapGetters(["products"])
  },
  methods:{
    // metode untuk mengambil data products
    ...mapActions((["getProducts","addToCart"]))
  },
  mounted(){
    this.getProducts()
  }
}
</script>

<style scoped>
  .card{
    border: none;
    padding: 20px;
  }
</style>