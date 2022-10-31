<template>
  <q-list bordered separator>
    <q-item clickable v-ripple :to="{name: 'translation'}">
      <q-item-section avatar>
        <q-icon color="dark" name="drive_folder_upload" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{mediaStore.mediaTitleInline}}</q-item-label>
        <q-item-label caption>{{ translationsStore.smartTitle(translationId) }} / Season {{ seasonNum }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <tv-season-component
    	:episodes="season.episodes"
    	:season-num="seasonNum"
    />
  </q-list>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaStore } from 'src/stores/media';
import { useTranslationsStore } from "stores/translations";
import TvSeasonComponent from 'src/components/TvSeasonComponent.vue';

const route = useRoute();
const mediaStore = useMediaStore();
const translationsStore = useTranslationsStore();
const translationId = route.params.translationId;
const seasonNum = (route.params.seasonNum) ? route.params.seasonNum : 1;
const season = computed(() => mediaStore.season(translationId, seasonNum));
</script>
