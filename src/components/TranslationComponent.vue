<template>
	<h6>Translation</h6>
	{{ route.params.translationId }}
	{{ translationsStore.smartTitle(route.params.translationId) }}
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useTranslationsStore } from 'src/stores/translations';

const route = useRoute();
const translationsStore = useTranslationsStore();
</script>