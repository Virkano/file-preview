<script setup lang="ts">
import {ref} from "vue";

const urlList = ref<{ url: string, name: string }[]>(
    [

    ]
)
const active = ref(-1)
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in urlList" :key="item.url" @click="active = index" :class="{active: active === index}" v-preview="item">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  text-align: left;
  li{
    margin-bottom: 10px;
    &:hover{
      color: #409eff;
      cursor: pointer;
    }
    &.active{
      color: #409eff;
    }
  }
}
</style>
