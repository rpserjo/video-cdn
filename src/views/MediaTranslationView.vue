<template>
  <div>
    <template v-if="translation.seasons.length > 0">
      <q-list bordered separator>
        <q-item clickable v-ripple :to="{name: 'media-index'}">
          <q-item-section avatar>
            <q-icon color="secondary" name="drive_folder_upload" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{mediaStore.mediaTitleInline}}</q-item-label>
            <q-item-label caption>{{ translationsStore.smartTitle(translationId) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
          <q-item v-ripple v-for="(season, key) in translation.seasons" :key="key" :to="{name: 'season', params: {seasonNum: season.season_num}}">
          <q-item-section avatar>
            <q-icon color="secondary" name="folder" />
          </q-item-section>
          <q-item-section>
            Season {{ season.season_num }}
          </q-item-section>
        </q-item>
      </q-list>
    </template>

    <template v-if="translation.episodes.length > 0">
      <q-list bordered separator>
        <q-item clickable v-ripple :to="{name: 'media-index'}">
          <q-item-section avatar>
            <q-icon color="dark" name="drive_folder_upload" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{mediaStore.mediaTitleInline}}</q-item-label>
            <q-item-label caption>{{ translationsStore.smartTitle(translationId) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <tv-season-component
          :episodes="translation.episodes"
          season-num="1"
        />
      </q-list>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTranslationsStore } from 'src/stores/translations';
import { useMediaStore } from 'src/stores/media';
import { useRoute } from 'vue-router';
import TvSeasonComponent from "components/TvSeasonComponent.vue";

const mediaStore = useMediaStore();
const translationsStore = useTranslationsStore();
const route = useRoute();
const translationId = route.params.translationId;
const translation = computed(() => mediaStore.translation(translationId));
</script>
