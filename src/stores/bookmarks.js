import { defineStore } from 'pinia'

export const useBookmarksStore = defineStore('bookmarks', {
  state: () => ({
    bookmarks: {}
  }),
  getters: {
    isBookmarked: (state) => {
      return (mediaType, mediaId) => {
        return state.bookmarks.has(`${mediaType}:${mediaId}`);
      };
    }
  },
  actions: {
    toggleBookmark(mediaType, mediaId){
      console.log('toggle')
      const key = `${mediaType}:${mediaId}`;
      this.bookmarks.has(key) ? this.bookmarks.delete(key) : this.bookmarks.add(key);
    }
  }
});
