<template>
  <q-page>
    <router-view v-slot="{ Component }">
      <transition name="slide-left" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </q-page>
</template>

<script setup>
import { onActivated, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar, useMeta } from 'quasar';
import { fetchMediaById, fetchMediaData } from 'src/http';
import { useMediaStore } from 'src/stores/media';
import { htmlParser } from 'src/helpers/htmlParser';
import { useParseMedia } from 'src/use/useParseMedia';

const route = useRoute();
const $q = useQuasar();
const mediaId = ref(0);
const mediaType = ref('');
const mediaStore = useMediaStore();
const pageTitle = ref('Media');

useMeta(() => {
	return {
		title: pageTitle.value,
	}
});

onActivated(() => {
	mediaId.value = route.params.mediaId;
	mediaType.value = route.params.mediaType;
});

const loadMedia = async (mediaType, mediaId) => {
	$q.loading.show();
	try{
		const mediaApiData = await fetchMediaById(mediaType, mediaId);
		if(mediaApiData.data.length > 0){
			mediaStore.mediaApiData = useParseMedia(mediaType, mediaApiData.data[0]);
			pageTitle.value = `${process.env.APP_TITLE} - ${mediaStore.mediaApiData.orig_title}`;
			await loadMediaData();
		}
	}catch(e){
		console.log(e);
		$q.notify({
			type: 'negative',
			message: 'Media data loading failed',
			caption: `${e.code}: ${e.message}`,
			timeout: 0,
			actions: [
				{
					label: 'Retry',
					color: 'white',
					handler: () => loadMedia(mediaType, mediaId)
				}
			]
		});
	}finally{
		$q.loading.hide();
	}
};

const loadMediaData = async () => {
	$q.loading.show();
	try{
		const html = await fetchMediaData(`https://cors.nb557.workers.dev/https:${mediaStore.mediaApiData.iframe_src}`);
		mediaStore.mediaFiles = htmlParser(mediaStore.mediaApiData.media_type, html);
	}catch(e){
		console.log(e);
		$q.notify({
			type: 'negative',
			message: 'Media files loading failed',
			caption: `${e.code}: ${e.message}`,
			timeout: 0,
			actions: [
				{
					label: 'Retry',
					color: 'white',
					handler: () => loadMediaData()
				}
			]
		});
	}finally{
		$q.loading.hide();
	}
}

watch([mediaType, mediaId], async ([mediaType, mediaId]) => {
	console.log('watch');
	if(['tv-series', 'movies', 'show-tv-series'].indexOf(mediaType) > -1){
    mediaStore.mediaApiData = {};
    mediaStore.mediaFiles = {};
    await loadMedia(mediaType, mediaId);
	}else{
		console.log('no match', mediaType, mediaType == ('movies' || 'tv-series' || 'show-tv-series'), mediaId > 0)
	}
});
</script>

<style>
.slide-left-enter-from,
.slide-left-leave-to{
  transform: translateX(100%);
}
.slide-left-enter-active,
.slide-left-leave-active{
  transition: all 0.3s;
}
</style>
