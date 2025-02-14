<template>
  <div class="product-card">
    <img
        :src="getFullImageUrl(product.image)"
        alt="Product Image"
        class="product-image"
        @error="handleImageError"
    />
    <h4>{{ product.name || 'No Title' }}</h4>
    <p>{{ product.description || 'No Description' }}</p>
    <p>Цена: {{ product.price }} ₽</p>
    <button @click="addToCart">В корзину</button>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {Header},
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addToCart() {
      this.$store.dispatch('addToCart', this.product);
    },
    handleImageError(event) {
      event.target.src = require('@/assets/default-product.jpg');
    },
    getFullImageUrl(imagePath) {
      const baseUrl = 'http://lifestealer86.ru/';
      return `${baseUrl}${imagePath}`;
    },
  },
};
</script>

<style scoped>
.product-card {
  padding: 16px;
  margin: 8px;
  width: 300px;
  text-align: center;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.product-card p {
  font-size: 14px;

}

.product-card button{
  background: lightpink;
  border-radius: 5px;
  font-size: 14px;
  font-family: Helvetica, sans-serif;
  height: 40px;
  width: 104px;
}
.product-card button:hover{
  background: lightgray;
}
.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 8px;
  border-radius: 10px;
}
</style>