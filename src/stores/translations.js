import { defineStore } from 'pinia'

export const useTranslationsStore = defineStore('translations', {
  state: () => ({
    translations: []
  }),
  getters: {
    smartTitle: (state) => {
      return (id) => {
        //console.log(id, state.translations);
        const translation = state.translations.filter(translation => translation.id === +id)[0] || {};
        //console.log(translation);
        return translation.smart_title || 'unknown';
      }
    }
  },
  actions: {
    setTranslations(translations){
      this.translations = translations;
    },
    pushTranslations(translations){
		this.translations = [...this.translations, ...translations];    
    }
  }
})
