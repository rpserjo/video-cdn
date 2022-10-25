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
        const translation = state.mediaFiles[translationId] || {seasons: [], episodes: []};
        return translation.seasons.filter(season => season.season_num == seasonNum)[0] || [];
      }
    },
    episodeTitle: (state) => {
      return (seasonNum, episodeNum) => {
        //const episodesData = state.mediaApiData.episodes || [];
        //console.log(episodesData)
        const episode = state.mediaApiData.episodes.filter(episode => episode.season_num == seasonNum && episode.num == episodeNum)[0];
        console.log(seasonNum, episodeNum, episode)
        let title = `S${seasonNum.padStart(2, '0')}E${episodeNum}`;
        if(episode != undefined){
          title = `${title} - ${episode.orig_title}`;
          if(episode.orig_title != episode.ru_title){
            title = `${title} / ${episode.ru_title}`;
          }
        }
        return title;
      }
    }
  },
  actions: {

  }
});
