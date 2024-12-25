template
<script setup lang="ts">
import { Ref, ref} from "vue";

defineProps({
  filePath: {
    type: String,
    required: true,
    default: ''
  }
})

const image = ref<HTMLElement>() as Ref<HTMLElement>
const rollImg = (e) => {
  let transform = image.value?.style.transform as string
  let zoom = transform?.indexOf("scale") != -1 ? +transform.split("(")[1].split(")")[0] : 1
  zoom += e.wheelDelta / 1200
  if (zoom > 0.1 && zoom < 5) {
    image.value.style.transform = "scale(" + zoom + ")"
  }
}

const moveImg = (e) => {
  let x = e.clientX
  let y = e.clientY
  let left = x - e.target.offsetLeft
  let top = y - e.target.offsetTop
  document.onmousemove = (ev) => {
    e.target.style.left = ev.clientX - left + 'px'
    e.target.style.top = ev.clientY - top + 'px'
  }
  document.onmouseup = () => {
    document.onmousemove = null
  }
}
</script>

<template>

  <div class="wrap" @mousewheel.prevent="rollImg">
    <img :src="filePath" alt="1111" ref="image" @mousedown.prevent="moveImg" />
  </div>
</template>

<style scoped lang="scss">
.wrap {
  position: relative;
  width: 100%;
  height: 65vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  position: absolute;
  cursor: move;
}
</style>
