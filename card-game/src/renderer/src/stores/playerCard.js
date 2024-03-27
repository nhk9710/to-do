import { defineStore } from 'pinia';

export const usePlayerCardStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    name: 'Boss',
    health: 100
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
