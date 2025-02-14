<template>
  <div class="cart">
    <h2>Корзина</h2>
    <div v-if="cartItems.length === 0" class="empty-cart">
      Корзина пуста
    </div>
    <div v-else>
      <div v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
        <img :src="getFullImageUrl(item.image)" alt="Product Image" />
        <div>
          <p>{{ item.name }}</p>
          <p>Цена: {{ item.price }} ₽</p>
        </div>
        <div class="quantity-controls">
          <button @click="decreaseQuantity(index)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(index)">+</button>
        </div>
        <button @click="removeFromCart(index)" class="claersButton">Удалить</button>
      </div>
      <div class="total">
        <p>Итого: {{ totalAmount }} ₽</p>
        <button @click="clearCart" class="claersButton">Очистить корзину</button>
        <button @click="placeOrder" class="place-order-button">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems() {
      return this.$store.state.cart;
    },
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
    getFullImageUrl(imagePath) {
      const baseUrl = 'http://lifestealer86.ru/';
      return `${baseUrl}${imagePath}`;
    },
    removeFromCart(index) {
      this.$store.commit('REMOVE_FROM_CART', index);
    },
    clearCart() {
      this.$store.commit('CLEAR_CART');
    },
    increaseQuantity(index) {
      this.$store.commit('UPDATE_CART_QUANTITY', { index, quantity: 1 });
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.$store.commit('UPDATE_CART_QUANTITY', { index, quantity: -1 });
      } else {
        this.removeFromCart(index);
      }
    },
    placeOrder() {
      if (this.cartItems.length === 0) {
        alert("Корзина пуста. Добавьте товары для оформления заказа.");
        return;
      }

      const confirmation = confirm(`Вы уверены, что хотите оформить заказ на сумму ${this.totalAmount} ₽?`);
      if (confirmation) {
        this.$store.dispatch('addOrder', this.cartItems);
        alert("Заказ успешно оформлен!");
        this.clearCart();
        this.$router.push('/orders');
      }
    }
  }
};
</script>

<style scoped>

h2 {
  font-family: Helvetica, sans-serif;
}


button{
  font-family: Helvetica, sans-serif;
}

.cart {
  max-width: 800px;
  margin: 0 auto;
  font-family: Helvetica, sans-serif;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.cart-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}

.quantity-controls button {
  color: black;
  background: lightpink;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  margin: 0 5px;
}

.quantity-controls button:hover{
  background: lightgray;
}

.total {
  text-align: right;
  margin-top: 20px;
}

.total button {
  margin-top: 10px;
}

.claersButton{
  color: white;
  display: flex;
  background: #c2000d;
  border-radius: 5px;
  padding: 11px;
  border: none;
}

.claersButton:hover{
  background-color: lightcoral;
}

.empty-cart {
  font-size: 18px;
  color: gray;
}

.place-order-button {
  background-color: forestgreen;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
}

.place-order-button:hover {
  background-color: darkseagreen;
}

</style>