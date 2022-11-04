<template>
  <q-page>
    <div>
      <q-intersection
        v-for="(searchResult, key) in searchStore.orderedResults"
        :key="key"
        transition="scale"
        class="item"
      >
        <media-list-element
          :media_type="searchResult.media_type"
          :id="searchResult.id"
          :kinopoisk_id="searchResult.kinopoisk_id"
          :ru_title="searchResult.ru_title"
          :orig_title="searchResult.orig_title"
          :media_year="searchResult.media_year"
        />
      </q-intersection>
    </div>
    <div v-if="searchStore.searchResults.length === 0">
      Nothing found
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useSearchStore } from 'stores/search';
import MediaListElement from 'src/components/MediaListElement.vue';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();
const props = defineProps({
  outside: {
    type: Boolean,
    default: false
  }
});

onBeforeRouteUpdate((to, from) => {
  if(to.name === 'search'){
    searchStore.searchQuery = searchStore._searchQuery = to.params.searchQuery;
    searchStore.searchYear = searchStore._searchYear = to.params.searchYear;
  }
})

onMounted(() => {
  searchStore.searchQuery = searchStore._searchQuery = route.params.searchQuery;
  searchStore.searchYear = searchStore._searchYear = route.params.searchYear;
  if(props.outside === true) searchStore.executeSearch();
});
</script>

<style scoped>
.item{
  min-height: 150px;
}
</style>
