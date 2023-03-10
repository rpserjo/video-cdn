<template>
  <q-page>
    <div class="text-h4 q-pa-sm">Bookmarks</div>
    <media-list :list="bookmarks" />
  </q-page>
</template>

<script setup>
import { useBookmarksStore } from "stores/bookmarks";
import { onActivated, ref} from "vue";
import { fetchMediaById } from "src/http";
import MediaList from "components/MediaList.vue";
import { useQuasar, useMeta } from "quasar";
import { useParseMedia } from 'src/use/useParseMedia.js';

const bookmarksStore = useBookmarksStore();
const bookmarks = ref([]);
const $q = useQuasar();
const pageTitle = ref(`${process.env.APP_TITLE} - Bookmarks`);

useMeta(() => {
	return {
		title: pageTitle.value,
	}
});

onActivated(async () => {
  $q.loading.show();
  bookmarks.value = [];
  try{
    for(let bookmark of Array.from(bookmarksStore.bookmarks).reverse()){
      const [ mediaType, mediaId ] = bookmark.split(':');
      const { data } = await fetchMediaById(mediaType, mediaId);
      const media = useParseMedia(mediaType, {...data[0], kinopoisk_id: mediaId, id: mediaId});
      bookmarks.value.push(media)
    }
  }catch(e){
    console.log(e);
  }finally {
    $q.loading.hide();
  }

});
</script>
