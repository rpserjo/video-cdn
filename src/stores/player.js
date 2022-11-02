import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    watchOnline: false,
    autoPlay: false,
    playNextEpisode: false,
    showPlayer: false,
    poster: '',
    src: '',
    quality: 240,
    episodeNum: null,
    watchKey: null,
    playlist: [],
    watchHistory: {}

  }),
  getters: {
		hasNext: (state) => {
			if(state.episodeNum > 0 && state.playlist.length > 0){
				return state.playlist.filter(el => el.episode_num > state.episodeNum).length > 0;
			}		
		},
		isWatched: (state) => {
			return (watchKey) => state.watchHistory.has(watchKey);		
		},
		nextVideo: (state) => {
			if(this.hasNext){
				const next = state.playlist.filter(el => el.episode_num > state.episodeNum)[0];
				let nextQuality = state.quality;				
				if(!next.links.hasOwnProperty(state.quality)) 
			}
			return false;
		}
  },
  actions: {

  }
});
