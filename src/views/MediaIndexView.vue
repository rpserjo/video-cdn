<template>
  <div>
    <q-card flat bordered>
      <q-card-section horizontal>
        <q-img
          :src="`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${mediaStore.mediaApiData.kinopoisk_id}.jpg`"
          style="width: 300px; max-width: 33%;"
          loading="lazy"
        >
          <div class="absolute-bottom-right text-subtitle2">
            {{ mediaType }}
          </div>
        </q-img>
        <q-separator vertical />
        <q-card-section>
          <div class="text-h6">
            {{ mediaStore.mediaApiData.ru_title }}
          </div>
          <div class="text-subtitle2">
            {{ mediaStore.mediaApiData.orig_title }} ({{ mediaStore.mediaApiData.media_year }})
          </div>
        </q-card-section>
        <div class="absolute-top-left">
          <q-btn
            round
            color="secondary"
            size="md"
            :icon="bookmarksStore.isBookmarked(route.params.mediaType, route.params.mediaId) ? 'bookmark_remove' : 'bookmark_add'"
            @click="bookmarksStore.toggleBookmark(route.params.mediaType, route.params.mediaId)"
          />
        </div>
      </q-card-section>
    </q-card>
     <q-list bordered padding>
      <q-item-label header>Translations</q-item-label>
      <template v-if="mediaType === 'movies'">
        <q-item v-ripple v-for="(translation, key) in translations" :key="key">
          <media-element
            :media-title="translationsStore.smartTitle(translation)"
            :media-links="mediaStore.translation(translation)"
            :poster="`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${mediaStore.mediaApiData.kinopoisk_id}.jpg`"
            :watch-key="`movie_${route.params.mediaId}`"
            :download-name="mediaStore.mediaDownloadTitle"
          />
        </q-item>
      </template>
      <template v-else>
        <q-item clickable v-ripple v-for="(translation, key) in translations" :key="key" :to="{name: 'translation', params: {translationId: translation}}">
          <q-item-section avatar>
            <q-icon color="secondary" name="folder" />
          </q-item-section>
          <q-item-section>
            {{ translationsStore.smartTitle(translation) }}
          </q-item-section>
        </q-item>
      </template>
     </q-list>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMediaStore } from 'src/stores/media';
import { useTranslationsStore } from 'src/stores/translations';
import MediaElement from 'src/components/MediaElement.vue';
import {useBookmarksStore} from "stores/bookmarks";

const route = useRoute();
const mediaStore = useMediaStore();
const translationsStore = useTranslationsStore();
const bookmarksStore = useBookmarksStore();
const mediaType = ref('');
const mediaId = ref(0);

const translations = computed(() => mediaStore.translations);

onMounted(() => {
	mediaType.value = route.params.mediaType;
	mediaId.value = route.params.mediaId;
});
</script>
