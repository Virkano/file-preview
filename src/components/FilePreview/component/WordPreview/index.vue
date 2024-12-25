<script setup lang="ts">
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'
import {ref} from "vue";
defineProps({
  filePath: {
    type: String,
    required: true,
    default: ''
  }
})
</script>

<template>
  <vue-office-docx :src="filePath" style="height: 70vh;"/>
</template>

<style scoped lang="scss">

</style>
