import { defineStore } from 'pinia'

export const useTranslationsStore = defineStore('translations', {
  state: () => ({
    translations: []
  }),
  getters: {
    smartTitle: (state) => {
      return (id) => {
        const translation = state.translations.filter(translation => translation.id === +id)[0] || {};
        return translation.smart_title || 'unknown';
      }
    }
  },
  actions: {
    setTranslations(translations){
      this.translations = translations;
    }
  }
})
