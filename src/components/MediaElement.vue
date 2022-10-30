<template>
  <q-item-section avatar>
    <q-icon color="secondary" name="movie" />
  </q-item-section>
  <q-item-section>
    {{ props.mediaTitle }}
    <q-item-label caption>{{ Object.keys(props.mediaLinks).map(q => `${q}p`).join(', ') }}</q-item-label>
  </q-item-section>
  <q-menu
    touch-position
    anchor="center middle"
    self="center middle"
    transition-show="scale"
    transition-hide="scale"
    v-model="showPlayerMenu"
  >
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="col">
          {{ props.mediaTitle }} | {{ props.watchKey }}
        </div>
        <div v-for="(link, quality) in mediaLinks" :key="quality" class="col q-pa-sm">
          <q-btn
            v-if="playerStore.watchOnline"
            outline
            rounded
            no-caps
            icon="movie"
            :label="`${quality}p`"
            @click="playVideo(link)"
          />
          <q-btn
            v-else
            outline
            rounded
            no-caps
            :href="`${link}?dn=${props.downloadName} [${quality}p].mp4`"
            icon="download"
            :label="`${quality}p`"
          />
        </div>
      </div>
    </div>
  </q-menu>
</template>

<script setup>
import {usePlayerStore} from "stores/player";
import { ref } from 'vue';

const showPlayerMenu = ref(false);
const playerStore = usePlayerStore();
const props = defineProps({
  mediaTitle: String,
  mediaLinks: Object,
  poster: String,
  watchKey: String,
  downloadName: {
    type: String,
    default: 'File'
  }
});

const playVideo = (src) => {
  showPlayerMenu.value = false;
  playerStore.showPlayer = true;
  playerStore.poster = props.poster;
  playerStore.src = src;
  playerStore.watchKey = props.watchKey;
}
</script>
