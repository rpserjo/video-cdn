<template>
  <q-layout view="lHh LpR lff">
    <q-header elevated class="bg-teal-5">
      <q-toolbar class="flex">
        <transition name="flip" mode="out-in">
          <q-btn
            v-if="route.name === 'index'"
            icon="live_tv"
            flat
            dense
            round
          />
          <q-btn
            v-else
            icon="arrow_back"
            flat
            dense
            round
            @click="goUp"
          />
        </transition>
        <q-toolbar-title class="text-dark">
          <q-input dark dense standout v-model="searchStore.searchQuery" input-class="text-left" class="q-ml-md" @click.stop @keydown.enter="doSearch">
            <template v-slot:prepend>
              <q-btn
                icon="tune"
                color="light"
                flat
                dense
                round
                class="cursor-pointer"
              >
                <q-menu style="max-width: 320px;" v-model="searchSettingsMenu">
                  <div class="row no-wrap q-pa-md">
                    <div>
                      <div class="text-h6 q-mb-md">Search categories</div>
                      <div v-for="(searchType, key) in searchStore.searchTypes">
                        <q-checkbox
                          :label="searchType.label"
                          :key="key"
                          v-model="searchType.checked"
                        />
                      </div>
                      <q-input v-model.number="searchStore.searchYear" type="number" maxlength="4" label="Year">
                        <template v-slot:after>
                          <q-icon
                            name="search"
                            @click="doSearch"
                          />
                        </template>
                        <template v-slot:hint>
                          Filter by release year
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-menu>
              </q-btn>
            </template>
            <template v-slot:append>
              <q-icon v-if="searchStore.searchQuery === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="searchStore.searchQuery = ''" />
            </template>
          </q-input>
        </q-toolbar-title>
        <transition name="bounce" mode="out-in">
          <q-btn
            v-if="!leftDrawerOpen"
            flat
            dense
            round
            icon="settings"
            aria-label="Menu"
            @click="leftDrawerOpen = true"
          />
          <q-btn
            v-else-if="leftDrawerOpen"
            flat
            dense
            round
            icon="close"
            aria-label="Menu"
            @click="leftDrawerOpen = false"
          />
        </transition>
      </q-toolbar>
    </q-header>
    <settings-menu
    	:drawer-open="leftDrawerOpen"
    	@update:drawer-open="leftDrawerOpen = $event"
    	:dark-mode="darkMode"
    	@update:dark-mode="darkMode = $event"
    />
    <q-page-container>
    	<template v-if="translationsStore.translations.length > 0">
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</router-view>
    	</template>
    </q-page-container>
  </q-layout>
  <video-player />
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useTranslationsStore } from "stores/translations";
import { fetchTranslations } from "src/http";
import { useSearchStore } from "stores/search";
import { useRoute, useRouter } from "vue-router";
import { usePlayerStore } from 'src/stores/player';
import SettingsMenu from 'src/components/SettingsMenu.vue';
import VideoPlayer from 'src/components/VideoPlayer.vue';
import { useBookmarksStore } from "stores/bookmarks";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const leftDrawerOpen = ref(false);
const darkMode = ref(false);
const searchSettingsMenu = ref(false);

const searchStore = useSearchStore();
const playerStore = usePlayerStore();
const translationsStore = useTranslationsStore();
const bookmarksStore = useBookmarksStore();

const doSearch = () => {
  if(searchStore.searchQuery.length > 0){
    searchSettingsMenu.value = false;
    router.push({
      name: 'search',
      params: {
        searchQuery: searchStore.searchQuery,
        searchYear: searchStore.searchYear
      }
    });
    searchStore._searchQuery = searchStore.searchQuery;
    searchStore._searchYear = searchStore.searchYear;
    searchStore.executeSearch();
  }
}

watch(darkMode, (newValue) => {
  $q.dark.set(newValue);
});

watch(() => playerStore.watchOnline, (newValue) => {
  localStorage.setItem('watchOnline', newValue);
});

watch(() => playerStore.autoPlay, (newValue) => {
  localStorage.setItem('autoPlay', newValue);
});

watch(() => playerStore.playNextEpisode, (newValue) => {
  localStorage.setItem('playNextEpisode', newValue);
});

watch(() => playerStore.watchHistory, () => {
  localStorage.setItem('watchHistory', JSON.stringify(Array.from(playerStore.watchHistory)))
}, {deep: true});

watch(() => bookmarksStore.bookmarks, () => {
  localStorage.setItem('bookmarks', JSON.stringify(Array.from(bookmarksStore.bookmarks)))
}, {deep: true});

const loadTranslations = async() => {
	$q.loading.show();
	try{
		const translations = await fetchTranslations();
		if(translations && translations.data.length > 0) translationsStore.setTranslations(translations.data);
	}catch(e){
		console.log(e);
		$q.notify({
			type: 'negative',
			message: 'Translations loading failed',
			caption: `${e.code}: ${e.message}`,
			timeout: 0,
			actions: [
				{
					label: 'Retry',
					color: 'white',
					handler: () => loadTranslations()
				}
			]
		});

	}finally{
		$q.loading.hide();
	}
};

onBeforeMount(async () => {
  $q.dark.set('auto');
  darkMode.value = $q.dark.isActive;
  searchStore.searchQuery = localStorage.getItem('lastSearchQuery') || '';
  playerStore.watchOnline = localStorage.getItem('watchOnline') == 'true' ? true : false;
  playerStore.autoPlay = localStorage.getItem('autoPlay') == 'true' ? true : false;
  playerStore.playNextEpisode = localStorage.getItem('playNextEpisode') == 'true' ? true : false;
  const watchHistoryLocal = localStorage.getItem('watchHistory');
  playerStore.watchHistory = new Set(JSON.parse(watchHistoryLocal)) || new Set();
  const bookmarksLocal = localStorage.getItem('bookmarks');
  bookmarksStore.bookmarks = new Set(JSON.parse(bookmarksLocal)) || new Set();
  //await loadTranslations();
});

const goUp = () => {
  switch(route.name){
    case 'season':
    case 'translation':
      router.push({name: 'media-index'});
      break;
    default:
      router.push({name: 'index'});
      break;
  }
}
</script>

<style scoped>
.bounce-enter-from,
.bounce-leave-to{
  transform: rotate(180deg);
}
.bounce-up-enter-from,
.bounce-up-leave-to{
  transform: translateY(-100%);
}
.flip-enter-from,
.flip-leave-to{
  transform: scale(1, 0);
}

.bounce-enter-active,
.bounce-leave-active,
.bounce-up-enter-active,
.bounce-up-leave-active,
.flip-enter-active,
.flip-leave-active{
  transition: all 0.25s ease-in-out;
}
</style>
