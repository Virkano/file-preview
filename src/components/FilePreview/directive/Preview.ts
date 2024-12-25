import {h, render} from 'vue'
import FilePreview from '../index.vue'

export const previewDirective = {
    mounted(el: HTMLElement, binding: any) {
        // 点击元素时触发预览
        el.addEventListener('click', () => {
            console.log('点击元素触发预览', binding.value)
            const vNode = h(FilePreview, {
                isPreviewOpen: true,
                filePreviewLink: `${binding.value.url}`,
                fileName: binding.value.name,
                // 时间戳
                keyTimer: new Date().getTime(),
            })
            render(vNode, document.body)
        });

    }
};