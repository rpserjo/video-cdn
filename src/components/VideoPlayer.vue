<template>  
  <teleport to="body">
    <div
      v-if="playerStore.showPlayer"
      class="fullscreen fit column wrap justify-center items-center content-center"
      style="background-color: rgba(0, 0, 0, 0.55);"
      @click="playerStore.showPlayer = false"
    >
      <span style="background-color: white;">{{ playerStore.watchKey }}<p/>
      {{ playerStore.hasNext }}</span>
      <video
        style="max-width: 90%; max-height: 90%;"
        :poster="playerStore.poster"
        @click.stop
        controls
      >
        <source :src="playerStore.src" type="video/mp4" />
      </video>
    </div>
  </teleport>
</template>

<script setup>
import { usePlayerStore } from 'src/stores/player';

const playerStore = usePlayerStore();
</script>