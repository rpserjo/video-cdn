<template>
  <q-layout view="lHh LpR lff">
    <q-header elevated class="bg-teal-5">
      <q-toolbar class="flex">
          <q-btn
            icon="live_tv"
            flat
            dense
            round
            @click="router.push({name: 'index'})"
          />
          {{ searchSettingsMenu }}
        <q-toolbar-title class="text-dark">
        <q-input dark dense standout v-model="searchStore.searchQuery" input-class="text-left" class="q-ml-md" @click.stop @keydown.enter="doSearch">
        	<template v-slot:prepend>
        		<q-btn
              icon="tune"
              color="purple"
              flat
              dense
              round
              class="cursor-pointer"
              @click="showSettingsMenu = !showSettingsMenu"
        		/>
        	</template>
          <template v-slot:append>
            <q-icon v-if="searchStore.searchQuery === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchStore.searchQuery = ''" />
          </template>
        </q-input>
        <q-menu v-model="searchSettingsMenu" style="max-width: 320px;">
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
    <q-drawer
      v-model="leftDrawerOpen"
      side="right"
      :width="320"
      bordered
      overlay
      elevated
      :class="darkMode ? 'bg-dark-3': 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <q-list bordered padding>
          <q-item-label header>Settings</q-item-label>
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
    <q-page-container>
    	<template v-if="translationsStore.translations.length > 0">
			<router-view v-slot="{ Component }">
				<keep-alive>
					<component :is="Component" />
				</keep-alive>
			</router-view>    	
    	</template>
    	<div v-else>Translations is loading...</div>    
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {onBeforeMount, reactive, ref, watch} from 'vue';
import { useQuasar } from 'quasar';
import {useTranslationsStore} from "stores/translations";
import { fetchTranslations } from "src/http";
import {useSearchStore} from "stores/search";
import {useRoute, useRouter} from "vue-router";
import { usePlayerStore } from 'src/stores/player';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const leftDrawerOpen = ref(false);
const darkMode = ref(false);
const searchSettingsMenu = ref(false);

const searchStore = useSearchStore();
const playerStore = usePlayerStore();

const clickHandler = () => {
	alert('click');
}
const doSearch = () => {
  if(searchStore.searchQuery.length > 0){
    //console.log(`searching for ${searchStore.searchQuery}`);
    /*router.push({
      name: 'search',
      params: {
        searchQuery: searchStore.searchQuery,
        searchYear: searchStore.searchYear
      }
    });
    searchStore._executeSearch = true;*/
    //console.log(route)
    searchSettingsMenu.value = false;
    //alert(searchSettingsMenu.value)
    router.push({
      name: 'search',
      params: {
        searchQuery: searchStore.searchQuery,
        searchYear: searchStore.searchYear
      }
    });
    searchStore._searchQuery = searchStore.searchQuery;
    searchStore._searchYear = searchStore.searchYear;
    if(route.name === 'search'){
      searchStore.executeSearch();
    }
  }
}

watch(darkMode, (newValue) => {
  $q.dark.set(newValue);
})

/*watch(() => searchStore._executeSearch, (nV) => console.log('ex', nV));*/
//watch(searchSettingsMenu, (nV) => alert(`Search Settings ${nV}`));
const translationsStore = useTranslationsStore();

onBeforeMount(async () => {
  //console.log($q)
  $q.loading.show();
  try{
    const { data } = await fetchTranslations();
    //console.log(data)
    if(data && data.length > 0) translationsStore.setTranslations(data);
  }catch(e){
    console.log(e);
  }finally{
    $q.loading.hide();
  }
})
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
.bounce-enter-active,
.bounce-leave-active,
.bounce-up-enter-active,
.bounce-up-leave-active{
  transition: all 0.25s ease-in-out;
}
</style>
