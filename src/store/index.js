import Vue from 'vue'
import Vuex from 'vuex'
import products from '../mock/products.json'


Vue.use(Vuex);

export default new Vuex.Store({
  state:{
    products:[],
    cart:[]
  },
  getters:{
    products: state => state.products,
    cart: state => state.cart
  },
  actions:{
    addQty({commit}, id){
      commit("addQtyInCart",id)
    },
    reduceQty({commit},id){
      commit("reduceQtyInCart",id)
    },
    removeProduct({commit}, id){
      commit("removeProductInCart",id)
    },
    getProducts({commit}){
      commit("getProductData")
    },
    addToCart({commit}, product){
      commit("addProductToCart",product)
    },
    emptyCart({commit}){
      commit("emptyCart")
    }
  },
  mutations:{
    addQtyInCart(state, id){
      const currentProduct = state.cart.find(item => item.id === id);
      currentProduct.qty++;
    },
    reduceQtyInCart(state, id){
      const currentProduct = state.cart.find(item => item.id === id);
      if(currentProduct.qty > 1){
        currentProduct.qty--;
      }else{
        state.cart = state.cart.filter((item) => item.id !== id)
      }
    },
    removeProductInCart(state, id){
      state.cart = state.cart.filter((item) => item.id !== id)
    },
    emptyCart(state){
      state.cart = []
    },
    getProductData(state){
      state.products = products;
    },
    addProductToCart(state, product){
      // apakah product yg ada di cart sama dengan id yang ada di listproduct
      const addedProduct = state.cart.find(item => item.id === product.id)

      // jika id di cart sama dgn id product yg akan ditambahkan maka hanya tambahkan qty
      if(addedProduct){
        addedProduct.qty++
      }else{
        // jika id product yang akan ditambahkan tidak sama dengan id product yg di cart makan tambahkan produk beserta qty
        state.cart.push({...product, qty: 1})
      }
    }
  }
})