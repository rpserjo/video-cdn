import { defineStore } from 'pinia'
import json from '../assets/translations.json';

export const useTranslationsStore = defineStore('translations', {
  state: () => ({
    translations: json || []
  }),
  getters: {
    smartTitle: (state) => {
      return (id) => {
        const translation = state.translations.filter(translation => translation.id === +id)[0] || {};
        return translation.shorter_title || 'unknown';
      }
    }
  },
  actions: {
    setTranslations(translations){
      //this.translations = translations;
    },
    pushTranslations(translations){
		  this.translations = [...this.translations, ...translations];
    }
  }
});
