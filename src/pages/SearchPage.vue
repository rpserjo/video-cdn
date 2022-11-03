<template>
  <q-page>
    <div>
      <q-intersection
        v-for="(searchResult, key) in searchStore.orderedResults"
        :key="key"
        transition="scale"
        class="item"
      >
        <q-item
          :to="{name: 'media-index', params: { mediaType: searchResult.media_type, mediaId: searchResult.id}}"
        >
          <q-img
            :src="`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${searchResult.kinopoisk_id}.jpg`"
            fit="cover"
            loading="lazy"
            spinner-color="white"
            style="width: 100px; height: 150px;"
          >
            <div class="absolute-bottom-right text-subtitle2">
              {{ searchResult.media_type }}
            </div>
          </q-img>
          <q-item-section style="align-items: initial; justify-content: initial;">
            <q-item-label>{{ searchResult.ru_title }}</q-item-label>
            <q-item-label caption>{{ searchResult.orig_title }} ({{ searchResult.media_year }})</q-item-label>
          </q-item-section>
        </q-item>
      </q-intersection>
    </div>
    <div v-if="searchStore.searchResults.length === 0">
      Nothing found
    </div>
  </q-page>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router';
import {useSearchStore} from "stores/search";
import {onBeforeMount, onMounted, watch} from "vue";
import {useQuasar} from "quasar";

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
