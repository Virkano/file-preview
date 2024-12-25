<script setup lang="ts">
import VueOfficePdf from "@vue-office/pdf";
defineProps({
  filePath: {
    type: String,
    required: true,
    default: ''
  }
})
</script>

<template>
  <vue-office-pdf :src="filePath" style="height: 70vh;"/>
</template>

<style scoped lang="scss">

</style>
