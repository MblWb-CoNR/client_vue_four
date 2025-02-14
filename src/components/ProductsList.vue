<template>
  <h1>Список товаров</h1>
  <div class="products-list">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="errorMessage">{{ errorMessage }}</div>
    <div v-else>
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {ProductCard},
  computed: {
    ...mapState(['products', 'isLoading', 'errorMessage']),
  },
  methods: {
    ...mapActions(['fetchProducts']),
    getFullImageUrl(imagePath) {
      const baseUrl = 'http://lifestealer86.ru/';
      return `${baseUrl}${imagePath}`;
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-family: Helvetica, sans-serif;
}

.products-list {
  font-family: Helvetica, sans-serif;

}
.products-list div {
  gap: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>