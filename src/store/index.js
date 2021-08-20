import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedCards: [],
    lists: [],
  },
  getters: {
    getCards(state) {
      return state.savedCards;
    },
    getLists(state) {
      return state.lists;
    }
  },
  mutations: {
    setCards(state, payload) {
      state.savedCards = payload;

      localStorage.setItem("savedCards", JSON.stringify(payload));
    },
    setLists(state, payload) {
      state.lists = payload;

      localStorage.setItem("savedLists", JSON.stringify(payload));
    },
    createList(state, payload) {
      let list = {
        name: payload,
        quests: [],
      };

      state.lists.push(list);

      localStorage.setItem("savedLists", JSON.stringify(state.lists));
    }
  },
  actions: {
  },
  modules: {
  }
})
