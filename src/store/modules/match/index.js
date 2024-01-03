import { defineStore } from 'pinia';

export const useMatchStore = defineStore('match', {
  state: () => {
    return {
      isCollapse: true,
      matchIds: [], //收藏的id
      currentRoute: '',
    };
  },
  getters: {},
  actions: {
    updateCurrentRoute(p) {
      this.currentRoute = p;
    },
    updateCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    updateMatchIds(p) {
      const index = this.matchIds.findIndex((item) => item.matchId == p.matchId);
      if (index == -1) {
        this.matchIds.push(p);
      } else {
        this.matchIds.splice(index, 1, p);
      }
    },
  },
});
