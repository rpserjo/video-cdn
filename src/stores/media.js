import { defineStore } from 'pinia'

export const useMediaStore = defineStore('media', {
  state: () => ({
    mediaApiData: {},
    mediaFiles: {},	
  }),
  getters: {
  	mediaTitleInline: (state) => {
  		return `${state.mediaApiData.ru_title} / ${state.mediaApiData.orig_title}`;
  	},
	translations: (state) => {
		return Object.keys(state.mediaFiles);	
	},
	translation: (state) => {
		return (translationId) => {
			return state.mediaFiles[translationId] || {seasons: [], episodes: []};		
		}	
	},
	season: (state) => {
		return (translationId, seasonNum) => {
			console.log('mediaFiles', state.mediaFiles)
			const translation = state.mediaFiles[translationId] || {seasons: [], episodes: []};
			console.log('translation', translationId, translation);
			const season = translation.seasons.filter(season => season_num == seasonNum) || [];
			console.log('season', seasonNum, season)
			return season;
		}	
	}
  },
  actions: {

  }
});