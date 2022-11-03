<template>
  <q-page>
    <h5>Bookmarks</h5>
    <q-intersection
      v-for="(bookmark, key) in bookmarks"
      :key="key"
      transition="scale"
      class="item"
    >
      <media-list-element
        :media_type="bookmark.media_type"
        :id="bookmark.id"
        :kinopoisk_id="bookmark.kinopoisk_id"
        :ru_title="bookmark.ru_title"
        :orig_title="bookmark.orig_title"
        :media_year="bookmark.media_year"
      />
    </q-intersection>
  </q-page>
</template>

<script setup>

import { useBookmarksStore } from "stores/bookmarks";
import { onActivated, ref} from "vue";
import {fetchMediaById} from "src/http";
import MediaListElement from "components/MediaListElement.vue";
import {useQuasar} from "quasar";

const bookmarksStore = useBookmarksStore();
const bookmarks = ref([]);
const $q = useQuasar();

onActivated(async () => {
  $q.loading.show();
  bookmarks.value = [];
  try{
    for(let bookmark of Array.from(bookmarksStore.bookmarks).reverse()){
      console.log(bookmark)
      const [ mediaType, mediaId ] = bookmark.split(':');
      const { data } = await fetchMediaById(mediaType, mediaId);
      const media = data[0];
      console.log(media)
      media.media_type = mediaType;
      media.media_year = '1900';
      bookmarks.value.push(media)
    }
  }catch(e){
    console.log(e);
  }finally {
    $q.loading.hide();
  }

})
</script>

<style scoped>
.item{
  min-height: 150px;
}
</style>
