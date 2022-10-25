<template>
	<h6>Season</h6>
	{{ seasonNum }}
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const seasonNum = ref(0);
const route = useRoute();

seasonNum.value = route.params.seasonNum ? route.params.seasonNum : 1;
</script>