import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { previewDirective } from './components/FilePreview/directive/Preview.ts'
const app =createApp(App)
// 注册自定义指令
app.directive('preview', previewDirective);
app.mount('#app')
