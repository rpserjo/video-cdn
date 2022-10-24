<template>
	{{ mediaStore.translations }}
	<q-list bordered padding>
   	<q-item-label header>Translations</q-item-label>
      <q-item tag="label" v-ripple v-for="(translation, key) in mediaStore.translations" :key="key" :to="{name: 'translation', params: {translationId: translation}}">
			<q-item-section>
				<q-item-label>{{ translationsStore.smartTitle(translation) }}</q-item-label>
			</q-item-section>
		</q-item>
	</q-list>
</template>

<script setup>
import { useMediaStore } from 'src/stores/media';
import { useTranslationsStore } from 'src/stores/translations';
const mediaStore = useMediaStore();
const translationsStore = useTranslationsStore();
</script>