import { defineStore } from 'pinia';

export const useRegardStore = defineStore('regard', {
  state: () => {
    return {
      regardScrollTop: 0,
    };
  },

  actions: {
    updateRegardScrollTop(scrTop) {
      this.regardScrollTop = scrTop;
    },
  },
});
