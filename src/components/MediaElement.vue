<template>
  <q-item-section avatar>
    <q-icon color="secondary" name="movie" />
  </q-item-section>
  <q-item-section>
    {{ props.mediaTitle }} {{ props.episodeNum }}
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
        <div v-for="(link, quality) in mediaLinks" :key="quality" class="col q-pa-sm">
          <q-btn
            v-if="playerStore.watchOnline"
            outline
            rounded
            no-caps
            icon="movie"
            :label="`${quality}p`"
            @click="playVideo(link, quality)"
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
import { usePlayerStore } from "stores/player";
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
  },
  playlist: {
	type: Array,
	default: []  
  },
  episodeNum: {
	type: Number,
	default: 0  
  }
});

const playVideo = (src, quality) => {
  showPlayerMenu.value = false;
  playerStore.showPlayer = true;
  playerStore.poster = props.poster;
  playerStore.src = src;
  playerStore.watchKey = props.watchKey;
  playerStore.playlist = props.playlist;
  playerStore.quality = quality;
  playerStore.episodeNum = props.episodeNum;
}
</script>
