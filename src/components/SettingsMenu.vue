<template>
	<q-drawer
      :model-value="props.drawerOpen"
      @update:model-value="updateDrawer"
      side="right"
      :width="320"
      bordered
      overlay
      elevated
      :class="darkMode ? 'bg-dark-3': 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list bordered padding>
        	<q-item-label header>Settings {{ darkMode }}</q-item-label>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Dark mode</q-item-label>
            </q-item-section>
            <q-item-section side >
              <q-toggle color="blue" v-model="darkMode" />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Watch online</q-item-label>
            </q-item-section>
            <q-item-section side >
              <q-toggle color="blue" v-model="playerStore.watchOnline" />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Autoplay</q-item-label>
            </q-item-section>
            <q-item-section side >
              <q-toggle color="blue" v-model="playerStore.autoPlay" />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Play next episode</q-item-label>
            </q-item-section>
            <q-item-section side >
              <q-toggle color="blue" v-model="playerStore.playNextEpisode" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
</template>

<script setup>
import { ref, watch } from 'vue';
import { usePlayerStore } from 'src/stores/player';

const playerStore = usePlayerStore();
const darkMode = ref(false);

const props = defineProps(['drawerOpen', 'darkMode']);
const emits = defineEmits(['updateDrawerOpen', 'updateDarkMode']);

const updatedDrawer = value => emits('updateDrawerOpen', value);




</script>