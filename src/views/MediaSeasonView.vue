<template>
	Season {{ seasonNum }} / {{ translationId }}
	<hr>
	{{ season }}
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaStore } from 'src/stores/media';

const route = useRoute();
const translationId = route.params.translationId;
const seasonNum = (route.params.seasonNum) ? route.params.seasonNum : 1;
const mediaStore = useMediaStore();

const season = computed(() => mediaStore.season(translationId, seasonNum));

</script>