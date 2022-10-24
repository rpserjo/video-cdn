<template>
  <q-page>
  	{{ mediaType }} / {{ mediaId }}
  	<hr>
   {{ mediaStore.mediaApiData.orig_title }} / {{ mediaStore.mediaApiData.ru_title }} ({{ mediaStore.mediaApiData.media_year }})
   <img :src="`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${mediaStore.mediaApiData.kinopoisk_id}.jpg`" style="height: 300px;">
	<router-view />
  </q-page>
</template>

<script setup>
import { onActivated, onMounted, ref, watch } from 'vue';
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
	console.log('activated');
	mediaId.value = route.params.mediaId;
	mediaType.value = route.params.mediaType;
})

watch([mediaType, mediaId], async ([mediaType, mediaId]) => {
	console.log('watch', mediaType, mediaId)
	//alert(`${mediaType} : ${mediaId}`);
	//(mediaType == ('tv-series' || 'movies' || 'show-tv-series')){
	if(['tv-series', 'movies', 'show-tv-series'].indexOf(mediaType) > -1){
		try{
			$q.loading.show();
			mediaStore.mediaApiData = {};
			const mediaApiData = await fetchMediaById(mediaType, mediaId);
			if(mediaApiData.data.length > 0){
				mediaStore.mediaApiData = mediaApiData.data[0];
				mediaStore.mediaApiData.media_type = mediaType;
				mediaStore.mediaApiData.media_year = (mediaType === 'movies') ? mediaStore.mediaApiData.released.substring(0, 4) : mediaStore.mediaApiData.start_date.substring(0, 4);
				const src_url = mediaStore.mediaApiData.iframe_src;
				console.log(src_url);
				const html = await fetchMediaData(src_url);
				//console.log(html);
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
