import { defineStore } from 'pinia'
import {useQuasar} from "quasar";
import {searchQuery} from "src/http";

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: '',
    searchYear: null,
    searchTypes: [
      {
        key: 'movies',
        label: 'Movies',
        checked: true
      },
      {
        key: 'tv-series',
        label: 'TV Series',
        checked: true
      },
      {
        key: 'show-tv-series',
        label: 'TV Shows',
        checked: false
      }
    ],
    searchResults: [],
    _searchQuery: '',
    _searchYear: null,
    _executeSearch: false,
    q: useQuasar()
  }),
  getters: {
    orderedResults: (state) => {
      return state.searchResults.sort((a, b) => a.orig_title.localeCompare(b.orig_title));
    }
  },
  actions: {
    async executeSearch() {
      this.searchResults = [];
      console.log('search fired');
      const types = this.searchTypes.filter(type => type.checked === true).map(type => type.key);
      this.q.loading.show();
      localStorage.setItem('lastSearchQuery', this._searchQuery)
      try{
        for(const type of types){
          const response = await searchQuery(type, this._searchQuery, this._searchYear);
          if(response && response.data.length > 0){
          	response.data.map(media => {
          		media.media_type = type;
          		return media;
          	})
            this.searchResults = [...this.searchResults, ...response.data];
          }
        }
      }catch(e){
        console.log(e);
      }finally{
        this.q.loading.hide();
      }
    }
  }
})
