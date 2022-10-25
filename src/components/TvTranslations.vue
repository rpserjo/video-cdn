<template>
	<h6>Translation</h6>
	{{ route.params.translationId }}
	{{ translationsStore.smartTitle(route.params.translationId) }}
	<hr>
	<div v-if="translation.seasons.length > 0">
		Seasons	
	</div>
	<div v-else-if="translation.episodes.length > 0">
		Episodes	
		<tv-season-component />
	</div>
	<div v-else>
		No media	
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaStore } from 'src/stores/media';
import { useTranslationsStore } from 'src/stores/translations';
import TvSeasonComponent from 'src/components/TvSeasonComponent.vue';

const route = useRoute();
const translationsStore = useTranslationsStore();
const mediaStore = useMediaStore();

const translation = computed(() => mediaStore.translation(route.params.translationId));
</script>