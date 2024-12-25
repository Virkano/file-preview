<template>
  <div><div class="txt" style="white-space: pre-wrap;">{{ textContent }}</div></div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  filePath: {
    type: String,
    required: true,
    default: ''
  }
})

const textContent = ref<any>("");

const transformData = (data:any)=>{
  return new Promise((resolve)=>{
    let reader = new FileReader();
    reader.readAsText(data,'GBK');
    reader.onload = ()=>{
      resolve(reader.result)
    }
  })
}

axios.get(props.filePath,{
  responseType:"blob",
  transformResponse: [
    async function (data) {
      return await transformData(data);
    },
  ],
}).then(res=>{
  res.data.then((data:any)=>{
    textContent.value = data;
  })
})

</script>
