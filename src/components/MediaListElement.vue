<template>
  <q-item
    :to="{name: 'media-index', params: { mediaType: props.media_type, mediaId: props.id}}"
  >
    <q-img
      :src="`https://kinopoiskapiunofficial.tech/images/posters/kp_small/${props.kinopoisk_id}.jpg`"
      fit="cover"
      loading="lazy"
      spinner-color="white"
      style="width: 100px; height: 150px;"
    >
      <div class="absolute-bottom-right text-subtitle2">
        {{ props.media_type }}
      </div>
    </q-img>
    <q-item-section style="align-items: initial; justify-content: initial;">
      <q-item-label>{{ props.ru_title }}</q-item-label>
      <q-item-label caption>{{ props.orig_title }} ({{ props.media_year }})</q-item-label>
    </q-item-section>
  </q-item>  
  <q-separator/>
</template>

<script setup>
const props = defineProps(['media_type', 'id', 'kinopoisk_id', 'ru_title', 'orig_title', 'media_year'])
</script>
