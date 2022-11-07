<template>
	<q-intersection
      v-for="(element, key) in list"
      :key="key"
      transition="scale"
      class="item"
    >
      <media-list-element
        :media_type="element.media_type"
        :id="element.id"
        :kinopoisk_id="element.kinopoisk_id"
        :ru_title="element.ru_title"
        :orig_title="element.orig_title"
        :media_year="element.media_year"
      />
    </q-intersection>
</template>
<script setup>
import MediaListElement from "components/MediaListElement.vue";

const { list } = defineProps({
	list: {
		type: Array,
		default: []	
	}
});
</script>

<style scoped>
.item{
	min-height: 150px;
}
</style>
