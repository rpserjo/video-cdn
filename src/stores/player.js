import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    watchOnline: false,
    autoPlay: false,
    playNextEpisode: false    
  }),
  getters: {

  },
  actions: {

  }
});