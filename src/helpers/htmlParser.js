import { useTranslationsStore } from '../stores/translations';

const translationsStore = useTranslationsStore();

const parseFolder = (folder) => {
    const season = {
        season_num: folder.id,
        episodes: []
    }

    folder.folder.forEach(episode => {
        season.episodes.push(parseEpisode(episode));
    })

    return season;
}

const parseSeason = (seasonNum, episodes) => {
	const season = {
		season_num: seasonNum,
		episodes: []
	}
	
	Object.keys(episodes).forEach(episode => {
		//console.log('E', episode);
		season.episodes.push(episode, parseEpisode(episode, episodes[episode]));
	});
	//console.log(season)
	return season;
}

const parseSeason2 = (seasonNum, folder) => {
	//console.log('parse season 2', seasonNum)
	//console.log(folder)
	
	const season = {
		season_num: seasonNum,
		episodes: []
	}
	//console.log(season);
	
	Object.keys(folder).forEach(key => {
		season.episodes.push(parseEpisode2(folder[key]));
	});
	//console.log(season);
	
	return season;
}

const parseEpisode2 = (episode) => {
	//console.log('Episode', episode)
	return {
		episode_num: parseInt(episode.id.split('_')[1]),
		links: parseFiles(episode.download),
		poster: episode.poster
	}
}

const parseEpisode = (episode, files) => {
	//console.log(episode, files);
    return {
        episode_num: episode,// parseInt(episode.id.split('_')[1]),
        links: parseFiles(files),//parseFiles(episode.file),
        poster: ''
    }
}

const parseFiles = (string) => {
	//console.log(string);
	const links = {};
	Object.keys(string).map(key => {
		const link = string[key].split('?')[0];
		const quality = link.split('/').at(-1).replace('.mp4', '');
		
		//console.log(link, quality)
		links[quality] = link;
		
	});
	
	//console.log(links)
	return links;
    //console.log(string.split(',').at(-1).split('p]')[1].split(' or '));
    /*const files = string.split(',').at(-1).split('p]')[1].split(' or ').map(file => {
        const link = file.split('?')[0];
        const quality = link.split('/').at(-1).replace('.mp4', '');
        return {
            link: 'https:' + file.split('?')[0],
            quality: quality
        }
    });
    const links = {};
    files.forEach(file => links[file.quality] = file.link);
    return links;*/
}

export const htmlParser = (mediaType, html) => {	
    const translations = {};
    try{
        //const files = html.match('id="downloads" value=\'(.*)\'');
        const files = html.match('id="files" value=\'(.*)\'');
        //console.log(JSON.parse(files[1]))
        const tr = html.replace(/(\r\n|\n|\r|\t)/gm, '').match('<div class="translations"><select>(.*)</select></div>');
        //const tr = html.match('<div class="translations"><select>((\r|\n|\t|.)*)</select></div>');
        //const tr = html.match('<div class="translations">((\s|.)*)</div>');
        
        //console.log(tr)
        //console.log(tr[1].split('><'));
        const tt = tr[1].replace(' selected="selected"', '').split('><').map(el => {
        		const id = +el.match('value="(.*)"')[1];
        		const translation = el.match('>(.*)</option')[1].trim();//.replace(/(\s)/gm, '');

        		return {id, smart_title: translation};
        });
        
        translationsStore.pushTranslations(tt);
        const trList = {};
        tt.forEach(el => trList[el.id] = el.smart_title);
        //console.log(tt);
        //console.log(trList);
        //const tr1 = translations_[1].match('<option(.*)</option>/g');
        //console.log(tr1);
        const poster = html.match('id="poster" value="(.*?)"')[1];
        //console.log(poster)
        //console.log(translations_)
 			//console.log(html.replace(/(\r\n|\n|\r)/gm, ''));       
        //console.log(files)
        const mediaData = JSON.parse(files[1]);//JSON.parse(files[1].split('&quot;').join('"'));
        console.log(mediaData);
        Object.keys(mediaData).filter(translation_id => translation_id > 0).forEach(translation_id => {
            translations[translation_id] = {};            
            if(mediaType == 'movies'){
                translations[translation_id] = parseFiles(mediaData[translation_id]);
            }else{
            	console.log(translation_id);
            	translations[translation_id] = {
                    seasons: [],
                    episodes: []
                };
                Object.keys(mediaData[translation_id]).forEach(key => {
                	console.log('translation', key);
                	translations[translation_id].seasons.push(parseSeason2(mediaData[translation_id][key].id, mediaData[translation_id][key].folder));
                	//translations[translation_id].seasons.push(parseSeason(season, mediaData[translation_id][season]));
                })
            	/*
            	console.log(mediaData);
                translations[translation_id] = {
                    seasons: [],
                    episodes: []
                }
                const translation = JSON.parse(mediaData[translation_id]);
                translation.forEach(element => {
                    if(element.hasOwnProperty('folder')){
                        translations[translation_id].seasons.push(parseFolder(element));
                    }else{
                        translations[translation_id].episodes.push(parseEpisode(element));
                    }
                })*/
            }
        })
    }catch(e){
        console.log(e);
    }
	
	
    return translations;
}

