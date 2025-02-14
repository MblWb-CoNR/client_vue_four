<template>
  <div class="home">
    <div class="hero-section">
      <div class="welcome-text">
        <h1>Продукты у Гали</h1>
        <p>
          Лучший магазин у дома!
        </p>
        <img src="@/assets/default-product.jpg" alt="Галюсик" class="hero-image" />
        <router-link to="/products" class="shop-now-button">Каталог</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home {
  text-align: center;
}

.hero-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.hero-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
}

.welcome-text {
  margin-top: 20px;
  max-width: 600px;
  text-align: center;
}

.welcome-text h1 {
  margin-bottom: 20px;
  font-family: Helvetica, sans-serif;
}

.welcome-text p {
  font-size: 18px;
  line-height: 1.6;
  font-family: Helvetica, sans-serif;
}

.shop-now-button {
  display: inline-block;
  background-color: lightpink;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-family: Helvetica, sans-serif;
}

.shop-now-button:hover {
  background-color: lightgray;
}
</style>