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
	}
  },
  actions: {

  }
});