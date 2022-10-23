<template>
  <q-page>
<!--    {{ route.params }}
    <p/>
    {{ searchStore.searchQuery }} / {{ searchStore.searchYear}}
    <p/>
    {{ searchStore._searchQuery }} / {{ searchStore._searchYear}}
    <hr>-->
    <!--    <div class="q-pa-md row items-start q-gutter-md" v-for="(searchResult, key) in searchStore.searchResults" :key="key">
      <q-card class="my-card">
            <img :src="`https://kinopoiskapiunofficial.tech/images/posters/kp/${searchResult.kinopoisk_id}.jpg`">
            <q-card-section>
              <div class="text-h6">{{ searchResult.ru_title }}</div>
              <div class="text-subtitle2">{{ searchResult.orig_title }}</div>
            </q-card-section>
          </q-card>-->
      <q-list bordered separator>
        <q-item clickable v-ripple v-for="(searchResult, key) in searchStore.orderedResults" :key="key">
<!--          <q-item-section>-->
            <q-img
              :src="`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${searchResult.kinopoisk_id}.jpg`"
              fit="cover"
              loading="lazy"
              spinner-color="white"
              style="width: 100px; height: 150px;"
            />
<!--
          </q-item-section>
-->
          <q-item-section>
            <q-item-label>{{ searchResult.ru_title }}</q-item-label>
            <q-item-label caption>{{ searchResult.orig_title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    <div v-if="searchStore.searchResults.length === 0">
      Nothing found
    </div>
<!--    </div>-->
    <hr>
<!--    {{ searchStore.searchResults }}-->
  </q-page>
</template>

<script setup>
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router';
import {useSearchStore} from "stores/search";
import {onBeforeMount, onMounted, watch} from "vue";
import {storeToRefs} from "pinia";
import {searchQuery} from "src/http";
import {useQuasar} from "quasar";

const route = useRoute();
const searchStore = useSearchStore();
const $q = useQuasar();

/*searchStore.searchQuery = route.params.searchQuery;
searchStore.searchYear = route.params.searchYear;*/

onBeforeRouteUpdate((to, from) => {
  //console.log('route update', to, from);
  if(to.name === 'search'){
    //console.log('match');
    searchStore.searchQuery, searchStore._searchQuery = to.params.searchQuery;
    searchStore.searchYear, searchStore._searchYear = to.params.searchYear;
/*
    searchStore._executeSearch = true;
*/
  }
})

onBeforeMount(() => searchStore._executeSearch = false);

onMounted(() => {
  console.log('on mounted')
  searchStore.searchQuery = searchStore._searchQuery = route.params.searchQuery;
  searchStore.searchYear = searchStore._searchYear = route.params.searchYear;
  searchStore.executeSearch();
/*
  searchStore._executeSearch = true;
*/
})

/*watch(() => route, (newRoute) => {
  console.log('new route', newRoute)
}, {deep: true});*/

/*watch([() => searchStore._searchQuery, () => searchStore._searchYear], ([newQuery, newYear]) => {
  //console.log('new search', newQuery, newYear)
  try{
    const types = searchStore.searchTypes.filter(type => type.checked === true).map(type => type.key);
    console.log('searching for ', searchStore._searchQuery, searchStore._searchYear, 'in', types);
  }catch(e){
    console.log(e);
  }
})*/
watch(() => searchStore._executeSearch, async (newValue) =>{
  console.log('execute', newValue)
  if(newValue === true){
    $q.loading.show();
    console.log('search fired');
    const types = searchStore.searchTypes.filter(type => type.checked === true).map(type => type.key);
    console.log('searching for ', searchStore._searchQuery, searchStore._searchYear, 'in', types);
    searchStore._executeSearch = false;
    try{
      searchStore.searchResults = [];
      for(const type of types){
        console.log('searching in', type)
        const response = await searchQuery(type, searchStore._searchQuery, searchStore._searchYear);
        if(response && response.data.length > 0){
          searchStore.searchResults = [...searchStore.searchResults, ...response.data];
        }
      }
    }catch(e){

    }finally{
      $q.loading.hide();
    }
  }
})
</script>
