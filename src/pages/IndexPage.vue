<template>
  <q-page class="flex flex-center">
    {{ translationsStore.translations.length }}
    {{ translationsStore.smartTitle(2) }}
    {{ translationsStore.smartTitle(20000) }}
  </q-page>
</template>

<script setup>
import {useTranslationsStore} from "stores/translations";

const translationsStore = useTranslationsStore();
</script>
