<template>
  <q-page>
	<media-list :list="searchStore.orderedResults" />
  </q-page>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useSearchStore } from 'stores/search';
import MediaList from 'src/components/MediaList.vue';
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