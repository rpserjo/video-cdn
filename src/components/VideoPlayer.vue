<template>
  <teleport to="body">
    <div
      v-if="playerStore.showPlayer"
      class="fullscreen fit column wrap justify-center items-center content-center"
      style="background-color: rgba(0, 0, 0, 0.55);"
      @click="playerStore.showPlayer = false"
    >
      <q-btn color="secondary" label="Fullscreen" @click.stop="videoPlayerRef.requestFullscreen()" />
      <video
        style="max-width: 90%; max-height: 90%;"
        :poster="playerStore.poster"
        :autoplay="playerStore.autoPlay"
        @click.stop
        controls
        @ended="handleVideoEnded"
        ref="videoPlayerRef"
        @timeupdate="handleTimeUpdate"
      >
        <source :src="playerStore.src" type="video/mp4" />
      </video>
    </div>
  </teleport>
</template>

<script setup>
import { usePlayerStore } from 'src/stores/player';
import { useRoute } from "vue-router";
import { ref } from "vue";

const playerStore = usePlayerStore();
const route = useRoute();
const videoPlayerRef = ref('videoPlayerRef');

const handleVideoEnded = () => {
  if(playerStore.hasNext === true && playerStore.playNextEpisode){
    if(playerStore.nextVideo !== false){
      const nextVideo = playerStore.nextVideo;
      const nextWatchKey = `${route.params.mediaType}_${route.params.mediaId}_${route.params.seasonNum}_${nextVideo.episodeNum}`;
      playerStore.poster = nextVideo.poster;
      playerStore.episodeNum = nextVideo.episodeNum;
      playerStore.src = nextVideo.src;
      playerStore.watchKey = nextWatchKey;
      videoPlayerRef.value.load();
      videoPlayerRef.value.currentTime = 0;
      if(playerStore.autoPlay) videoPlayerRef.value.play();
    }
  }
}

const handleTimeUpdate = (event) => {
  const current = event.target.currentTime;
  const duration = event.target.duration;
  const progress = Math.floor((current/duration)*100);
  if(progress > 90){
    playerStore.watchHistory.add(playerStore.watchKey);
  }
}
</script>
