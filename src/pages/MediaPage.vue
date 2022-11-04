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
import { useQuasar } from 'quasar';
import { fetchMediaById, fetchMediaData } from 'src/http';
import { useMediaStore } from 'src/stores/media';
import { htmlParser } from 'src/helpers/htmlParser';

const route = useRoute();
const $q = useQuasar();
const mediaId = ref(0);
const mediaType = ref('');
const mediaStore = useMediaStore();

onActivated(() => {
	mediaId.value = route.params.mediaId;
	mediaType.value = route.params.mediaType;
})

watch([mediaType, mediaId], async ([mediaType, mediaId]) => {
	if(['tv-series', 'movies', 'show-tv-series'].indexOf(mediaType) > -1){
    mediaStore.mediaApiData = {};
    mediaStore.mediaFiles = {};
		try{
      $q.loading.show();
			const mediaApiData = await fetchMediaById(mediaType, mediaId);
			if(mediaApiData.data.length > 0){
				mediaStore.mediaApiData = mediaApiData.data[0];
				mediaStore.mediaApiData.media_type = mediaType;
				mediaStore.mediaApiData.media_year = (mediaType === 'movies') ? mediaStore.mediaApiData.released.substring(0, 4) : mediaStore.mediaApiData.start_date.substring(0, 4);
				const src_url = mediaStore.mediaApiData.iframe_src;
				const html = await fetchMediaData(src_url);
				mediaStore.mediaFiles = htmlParser(mediaType, html);
			}
		}catch(e){
			console.log(e);
		}finally{
			$q.loading.hide();
		}
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
