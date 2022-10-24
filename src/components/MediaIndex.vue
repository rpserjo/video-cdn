<template>
	<div v-if="mediaType === 'movies'">
		<h6>Movie</h6>
	</div>
	<div v-else>
		<h6>TV</h6>
		<tv-component />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TvComponent from 'src/components/TvComponent.vue';


const route = useRoute();
const mediaType = ref('');
const mediaId = ref(0);


onMounted(() => {
	mediaType.value = route.params.mediaType;
	mediaId.value = route.params.mediaId;
});

</script>
