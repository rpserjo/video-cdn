export const useParseMedia = (type, media) => {
	media.media_type = type;
	media.media_year = (type === 'movies') ? media.released : media.start_date;
	media.media_year = media.media_year.substring(0, 4);
	return media;
}
