import { useTranslationsStore } from '../stores/translations';
import { useMediaStore } from 'stores/media';

const translationsStore = useTranslationsStore();
const mediaStore = useMediaStore();

const parseSeason = (seasonNum, folder) => {
	const season = {
		season_num: seasonNum,
		episodes: []
	}

	Object.keys(folder).forEach(key => {
		season.episodes.push(parseEpisode(folder[key]));
	});

	return season;
}

const parseEpisode = (episode) => {
	return {
		episode_num: parseInt(episode.id.split('_')[1]),
		links: parseFiles(episode.download),
		poster: episode.poster
	}
}

const parseFiles = (string) => {
	const links = {};
	Object.keys(string).map(key => {
		const link = string[key].split('?')[0];
		const quality = link.split('/').at(-1).replace('.mp4', '');
		links[quality] = link;
	});

	return links;
}

export const htmlParser = (mediaType, html) => {
    const translations = {};
    let poster = '';
    try{
        const files = html.match('id="files" value=\'(.*)\'');
        const download = html.match('id="downloads" value=\'(.*)\'');
        const tr = html.replace(/(\r\n|\n|\r|\t)/gm, '').match('<div class="translations"><select>(.*)</select></div>') || '';
        const tt = tr[1]?.replace(' selected="selected"', '').split('><').map(el => {
        		const id = +el.match('value="(.*)"')[1];
        		const translation = el.match('>(.*)</option')[1].trim();

        		return {id, shorter_title: translation};
        }) || [{id: +html.match('id="translation_id" value="(.*)"')[1], smart_title: `id:${html.match('id="translation_id" value="(.*)"')[1]}`}];
        translationsStore.pushTranslations(tt);
        const trList = {};
        tt.forEach(el => trList[el.id] = el.smart_title);
        poster = html.match('id="poster" value="(.*?)"')[1];
        mediaStore.setPoster(poster);
        const mediaData = (mediaType == 'movies') ? JSON.parse(download[1]): JSON.parse(files[1]);
        Object.keys(mediaData).filter(translation_id => translation_id > 0).forEach(translation_id => {
          translations[translation_id] = {};
            if(mediaType == 'movies'){
                translations[translation_id] = parseFiles(mediaData[translation_id]);
            }else{
              translations[translation_id] = {
                    seasons: [],
                    episodes: []
                };
                Object.keys(mediaData[translation_id]).forEach(key => {
                  translations[translation_id].seasons.push(parseSeason(mediaData[translation_id][key].id, mediaData[translation_id][key].folder));
                });
            }
        })
    }catch(e){
        console.log(e);
    }

    return translations ;
}

