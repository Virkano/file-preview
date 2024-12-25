<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch} from "vue";
import { useFilePreview } from './hook/usePreview.ts'

const props = defineProps({
  isPreviewOpen: {
    type: Boolean,
    required: true,
    default: false
  },
  filePreviewLink: {
    type: String,
    required: true,
    default: ''
  },
  fileName: {
    type: String,
    required: true,
    default: ''
  },
  keyTimer: {
    type: Number,
    required: true,
    default: 0
  },
})
const visible = ref(false);
const componentName = ref<HTMLElement>()
// 关闭弹窗的方法
const close = () => {
  visible.value = false;
};

// 监听键盘的esc事件
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close();
  }
};

// 通过链接下载文件
const download = () => {
  const a = document.createElement('a');
  a.href = props.filePreviewLink;
  a.download = props.fileName;
  a.click();
}
// 在组件挂载时监听esc事件
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

// 在组件销毁前移除esc事件监听
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});

watch(() => props.keyTimer, (newVal) => {
  visible.value = true;
  console.log(props.filePreviewLink)
  if (props.fileName.indexOf('.') !== -1) {
    const { url, name, component } = useFilePreview({ url: props.filePreviewLink, name: props.fileName}).previewInfo as any
    // 动态导入组件
    componentName.value = component
    console.log(componentName.value)
  }
}, { immediate: true, deep: true})
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-options">
        <p>文件名称：{{ fileName }}</p>
        <p><button @click="download">下载至本地</button></p>
      </div>
      <div class="modal-body">
        <component :is="componentName" :file-path="filePreviewLink" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  z-index: 999999;
}

.modal-content {
  background-color: #fff;
  width: 75%;
  max-height: 85vh;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.modal-body {
  width: calc(100% - 40px);
  height: calc( 100% - 40px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.modal-options{
  display: flex;
  justify-content: space-between;
  button{
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
}

.modal-body p {
  margin: 0;
  font-size: 16px;
  color: #333;
}
</style>
