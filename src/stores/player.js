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
				const next = state.playlist.filter(el => el.episode_num > state.episodeNum)[0];
				if(next != undefined){
          let nextQuality = Object.keys(next.links).includes(state.quality) ? state.quality : Object.keys(next.links).pop();
          return {
            episodeNum: next.episode_num,
            poster: next.poster,
            src: next.links[nextQuality]
          }
        }
        return false;
		}
  }
});
