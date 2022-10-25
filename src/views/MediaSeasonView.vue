<template>
  <q-list bordered separator>
    <q-item clickable v-ripple :to="{name: 'translation'}">
      <q-item-section avatar>
        <!--<q-icon color="dark" name="drive_folder_move_rtl" />-->
        <!--<q-icon color="dark" name="folder_copy" />-->
        <q-icon color="dark" name="drive_folder_upload" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{mediaStore.mediaTitleInline}}</q-item-label>
        <q-item-label caption>{{ translationsStore.smartTitle(translationId) }} / Season {{ seasonNum }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item v-ripple v-for="(episode, key) in season.episodes" :key="key">
      <q-item-section avatar>
        <q-icon color="secondary" name="movie" />
      </q-item-section>
      <q-item-section>
        {{ mediaStore.episodeTitle(seasonNum, episode.episode_num)}}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaStore } from 'src/stores/media';
import {useTranslationsStore} from "stores/translations";

const route = useRoute();
const translationId = route.params.translationId;
const seasonNum = (route.params.seasonNum) ? route.params.seasonNum : 1;
const mediaStore = useMediaStore();
const translationsStore = useTranslationsStore();

const season = computed(() => mediaStore.season(translationId, seasonNum));

</script>
