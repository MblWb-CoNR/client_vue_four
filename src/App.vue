<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {Header },
};
</script>

<style>

#app {
  margin: 0 auto;
  font-family: Garamond, sans-serif;
  text-align: center;
}
</style>