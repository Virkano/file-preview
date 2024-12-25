<script setup lang="ts">
import {onMounted, ref} from "vue";
import { XMindEmbedViewer } from 'xmind-embed-viewer'

const props = defineProps({
  filePath: {
    type: String,
    required: true,
    default: ''
  }
})

const xMindViewer = ref()
const XMindContainer = ref<HTMLElement>()
onMounted(() => {
  // console.log(XMindContainer)
  // console.log(XMindEmbedViewer)
  xMindViewer.value = new XMindEmbedViewer({
    el: XMindContainer.value as HTMLElement,
    region: 'cn',
    styles: {
      width: '100%',
      height: '100%'
    }
  })
  // console.log(props.filePath, 'props.filePath')
  fetch(props.filePath)
      .then(res => res.arrayBuffer())
      .then(file => xMindViewer.value.load(file))
})

</script>

<template>
  <div class="x-mind-container" ref="XMindContainer"></div>
  <p class="notice">tips: 按下 Ctrl，滚动鼠标滚轮，放大缩小；鼠标左键在中心点长按可拖动，平移；</p>
</template>

<style scoped>
.x-mind-container{
  width: 100%;
  height: 60vh;
}
</style>