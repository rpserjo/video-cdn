import { defineStore } from 'pinia'

export const useMediaStore = defineStore('media', {
  state: () => ({
    mediaApiData: {},
    mediaFiles: {},	
  }),
  getters: {
	translations: (state) => {
		return Object.keys(state.mediaFiles);	
	}
  },
  actions: {

  }
});