<script setup lang="ts">
import {ref} from "vue";
const props = defineProps({
  filePath: {
    type: String,
    required: true,
    default: ''
  }
})

const previewPath = ref('')
const getPreviewUrl = (url: string) => {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
}
previewPath.value = getPreviewUrl(props.filePath)
</script>

<template>
  <div style="height: 60vh">
    <iframe :src="previewPath" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<style scoped lang="scss">

</style>