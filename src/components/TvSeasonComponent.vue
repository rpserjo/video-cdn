<template>
	<q-item v-ripple v-for="(episode, key) in props.episodes" :key="key">
		<media-element
			:media-title="mediaStore.episodeTitle(props.seasonNum, episode.episode_num)"
			:media-links="episode.links"
			:poster="episode.poster"
			:watch-key="watchKey(episode.episode_num)"
			:download-name="downloadName(episode.episode_num)"
			:playlist="props.episodes"
			:episode-num="episode.episode_num"
		/>
	</q-item>
</template>

<script setup>
import { useMediaStore } from 'src/stores/media';
import MediaElement from 'src/components/MediaElement.vue';

const mediaStore = useMediaStore();

const props = defineProps({
	episodes: Array,
	seasonNum: String
});

const watchKey = (episodeNum) => {
  return `${mediaStore.mediaApiData.media_type}_${mediaStore.mediaApiData.id}_${props.seasonNum}_${episodeNum}`;
}

const downloadName = (episodeNum) => {
  return `${mediaStore.mediaDownloadTitle} S${props.seasonNum.padStart(2, '0')}E${String(episodeNum).padStart(2, '0')}`;
}
</script>