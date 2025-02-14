<template>
  <nav class="navbar">
    <ul class="nav-list">
      <li><router-link to="/main">Главная</router-link></li>
      <li><router-link to="/products">Каталог товаров</router-link></li>
      <li>
        <router-link to="/cart">
          Корзина
          <span v-if="cartItemCount" class="cart-count">{{ cartItemCount }}</span>
        </router-link>
      </li>
      <li><router-link to="/orders">Оформленные заказы</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    cartItemCount() {
      return this.$store.state.cart.reduce((total, item) => total + item.quantity, 0);
    }
  }
};
</script>

<style scoped>
.navbar {
  max-width: 900px;
  margin: 0 auto;
  padding: 10px;
}

.nav-list {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
}

.nav-list li {
  color: black;
  text-decoration: none;
  padding: 10px;
  position: relative;
}

.nav-list li a {
  color: black;
  text-decoration: none;
  font-family: Helvetica, sans-serif;
}

.nav-list li a:hover {
  color: gray;
}

.cart-count {
  background-color: lightpink;
  color: black;
  border-radius: 10%;
  padding: 4px 8px;
  font-size: 12px;
  min-width: 10px;
  text-align: center;
  position: absolute;
  right: -20px;
  font-family: Helvetica, sans-serif;
}
</style>