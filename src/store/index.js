import { createStore } from 'vuex';
import { getProducts } from '@/api/products';
import axios from 'axios';
const API = process.env.VUE_APP_API;

export default createStore({
  state: {
    products: [],
    isLoading: false,
    errorMessage: '',
    token: localStorage.getItem('myAppToken') || '',
    cart: [],
    orders: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isNotAuthenticated: (state) => !state.token,
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
      state.errorMessage = null;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.errorMessage = error;
    },
    AUTH_SUCCESS(state, token) {
      state.token = token;
      localStorage.setItem('myAppToken', token);
    },
    AUTH_ERROR(state) {
      state.token = '';
      localStorage.removeItem('myAppToken');
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    ADD_ORDER(state, order) {
      state.orders.push(order); // Добавляем новый заказ в список
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    UPDATE_CART_QUANTITY(state, { index, quantity }) {
      state.cart[index].quantity += quantity;
      if (state.cart[index].quantity <= 0) {
        state.cart.splice(index, 1);
      }
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('SET_LOADING', true);
      try {
        const products = await getProducts();
        commit('SET_PRODUCTS', products);
      } catch (error) {
        commit('SET_ERROR', 'Ошибка при загрузке продуктов. Пожалуйста, попробуйте позже.');
        console.error('Ошибка при загрузке продуктов:', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    AUTH_REQUEST({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post(`${API}/login`, user, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
            .then((response) => {
              const token = response.data.data.user_token;
              commit('AUTH_SUCCESS', token);
              resolve();
            })
            .catch(() => {
              commit('AUTH_ERROR');
              reject();
            });
      });
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    addOrder({ commit }, cartItems) {
      const order = {
        items: [...cartItems], // Копируем текущие товары из корзины
        total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0), // Подсчитываем общую сумму
      };
      commit('ADD_ORDER', order); // Добавляем заказ в store
    },
  },
});