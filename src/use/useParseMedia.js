export const useParseMedia = (type, media) => {
	media.media_type = type;
	media.media_year = media.year.substring(0, 4);
  media.title = media.ru_title || media.title;
	return media;
}
