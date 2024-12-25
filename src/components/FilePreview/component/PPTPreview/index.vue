<script setup lang="ts">
import VueOfficePptx from "@vue-office/pptx";
import {ref} from "vue";
defineProps({
  filePath: {
    type: String,
    required: true,
    default: ''
  }
})

const loading = ref(true)

const handleRendered = () => loading.value = false

</script>

<template>
  <div class="show-container" :class="{'show-container-loading': loading}">
<!--    <vue-office-pptx :src="filePath" style="height: 100%;" @rendered="handleRendered"/>-->
  </div>
</template>

<style scoped lang="scss">
:deep(.vue-office-pptx-main) {
  height: 100%;
}
:deep(.pptx-preview-wrapper){
  width: 100% !important;
  height: 100% !important;
}
.show-container{
  height: 100%;
  position: relative;
  &.show-container-loading{
    height: 100%;
    &::before{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: block;
      background-color: rgba(101, 23, 23, 0.51);
    }
  }
}
</style>
