import { defineStore } from 'pinia'

export const useTranslationsStore = defineStore('translations', {
  state: () => ({
    translations: []
  }),
  getters: {
    smartTitle: (state) => {
      return (id) => {
        const translation = state.translations.filter(translation => translation.id === id)[0] || {};
        //console.log('tr', translation);
        return translation.smart_title || 'unknown';
        //return state.translations.filter(translation => translation.id === id)[0].smartTitle || null;
      }
    }
  },
  actions: {
    setTranslations(translations){
      this.translations = translations;
    }
  }
})
