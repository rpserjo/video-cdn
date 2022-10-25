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

const parseEpisode = (episode) => {
    return {
        episode_num: episode.id.split('_')[1].padStart(2, '0'),
        links: parseFiles(episode.file),
        poster: episode.poster
    }
}

const parseFiles = (string) => {
    //console.log(string.split(',').at(-1).split('p]')[1].split(' or '));
    const files = string.split(',').at(-1).split('p]')[1].split(' or ').map(file => {
        const link = file.split('?')[0];
        const quality = link.split('/').at(-1).replace('.mp4', '');
        return {
            link: file.split('?')[0],
            quality: quality
        }
    });
    const links = {};
    files.forEach(file => links[file.quality] = file.link);
    return links;
}

export const htmlParser = (mediaType, html) => {

    const translations = {};
    try{
        const files = html.match('id="files" value="(.*)"');
        const mediaData = JSON.parse(files[1].split('&quot;').join('"'));
        Object.keys(mediaData).filter(translation_id => translation_id > 0).forEach(translation_id => {
            translations[translation_id] = {};
            //console.log(mediaData);
            if(mediaType == 'movies'){
                translations[translation_id] = parseFiles(mediaData[translation_id]);
            }else{
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
                })
            }
        })
    }catch(e){
        console.log(e);
    }

    return translations;
}

