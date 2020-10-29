<template>
  <div>
    <div v-if="!cart.length" class="alert alert-secondary" role="alert">
      No Product in Cart
    </div>
    <div v-if="orderPlaced" class="alert alert-success" role="alert">
      Order successfully placed
      <button @click="() => orderPlaced = false" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
    </div>
    
    <ul class="list-group">
      <li class="list-group-item" v-for="product in cart" :key="product.id">
        <button @click="removeProduct(product.id)" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="media">
          <img width="80px" class="mr-3" :src="product.imgUrl" :alt="product.title">
          <div class="media-body">
            <p class="mt-0">{{product.title}}</p>
            <button @click="reduceQty(product.id)" class="btn-qty btn btn-sm btn-secondary">-</button>
            {{product.qty}}
            <button @click="addQty(product.id)" class="btn-qty btn btn-sm btn-secondary">+</button>
          </div>
        </div>
      </li>
    </ul>
    <button @click="placeOrder" class="btn-checkout btn btn-lg btn-block btn-success" v-if="cart.length" :disabled="isProcessing">
      <span v-if="!isProcessing"> ($ {{totalPrice}})</span>
      <div v-else class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      </button>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  data(){
    return{
      isProcessing: false,
      orderPlaced: false,
    }
  },
  computed:{
    ...mapGetters(["cart"]),
    totalPrice(){
      return this.cart.reduce((a,b) => a+b.qty * b.price, 0)
    }
  },
  methods:{
    // metode untuk mengambil data products
    ...mapActions((["addQty","reduceQty","removeProduct","emptyCart"])),
    placeOrder(){
      this.isProcessing = true;
      setTimeout(() => {
        this.orderPlaced = true;
        this.isProcessing = false;
        this.emptyCart()
      }, 1000)
    }
  },
}
</script>

<style scoped>
  .btn-qty{
    border-radius: 50%;
    width: 30px;
  }

  .media{
    width: 90%;
  }

  .media-body{
    text-align: left;
  }

  .btn-checkout{
    margin-top: 20px;
  }
</style>