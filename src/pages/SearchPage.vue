<template>
  <q-page>
	<media-list :list="searchStore.orderedResults" />
  </q-page>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useSearchStore } from 'stores/search';
import MediaList from 'src/components/MediaList.vue';
import { onMounted, ref } from 'vue';
import { useMeta } from 'quasar';

const route = useRoute();
const router = useRouter();
const searchStore = useSearchStore();
const props = defineProps({
  outside: {
    type: Boolean,
    default: false
  }
});

const pageTitle = ref(`${process.env.APP_TITLE} - Search`);

useMeta(() => {
	return {
		title: pageTitle.value,
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