// hooks/useFilePreview.ts
import {markRaw, reactive} from 'vue';
import ExcelPreview from '../component/ExcelPreview/index.vue'
import PDFPreview from '../component/PDFPreview/index.vue'
import PicturePreview from '../component/PicturePreview/index.vue'
import PPTPreview from '../component/PPTPreview/index.vue'
import VideoPreview from '../component/VideoPreview/index.vue'
import WordPreview from '../component/WordPreview/index.vue'
import FilesPreview from '../component/FilesPreview/index.vue'
import OfficePreview from '../component/OfficePreview/index.vue'
import AudioPreview from '../component/AudioPreview/index.vue'
import XMindPreview from '../component/XMindPreview/index.vue'

const imageType = [
    "jpg",
    "png",
    "gif",
    "jpeg",
    "bmp",
    "webp",
    "svg",
    "tiff",
    "tif",
    "jpeg",
    "jfif",
    "pjpeg",
    "pjp"
]

const officeType = ["docx", "xlsx", "pdf", "pptx"]

const outOfficeType = ["doc", "xls", "ppt"]

const videoType = ["mp4", "avi", "wmv", "rmvb", "flv", "mkv"]

const audioType = ["mp3", "wav","wma", "m4a", "ac3","dts","mmf", "m4r","mp2", "wv", "ogg", "flac", "aac"]

const filesType = [
    "txt",
    "md",
    "log",
    "json",
    "xml",
    "html",
    "css",
    "js",
    "java",
    "c",
    "cpp",
    "h",
    "hpp",
    "py",
    "rb",
    "go",
    "sh",
    "bat",
    "ps1",
    "psm1",
    "ps1xml",
    "psc1",
    "psd1",
    "psm1",
    "ps1xml",
    "psc1",
    "psd1",
    "ps1xml",
    "psc1",
    "ps1xml",
    "psc1",
    "psd1"
]

const xMindType = ['xmind']

const imagePreview = (file: { url: string, name?: string | null | undefined}) => {
    console.log('图片预览')
    const { url, name } = file
    return {
        url,
        name: name ? name : '',
        component: reactive(markRaw(PicturePreview))
    }
}

const officePreview = (file: { url: string, name?: string | null | undefined }) => {
    console.log('office 预览')
    const { url, name } = file
    const doc = ['docx']
    const excel = ['xlsx']
    const pdf = ['pdf']
    const ppt = ['pptx']
    const prefix = url.slice(url.lastIndexOf('.') + 1)
    let result = {
        url,
        name: name ? name : '',
        component: reactive(markRaw({}))
    }
    if (doc.includes(prefix)) result.component = reactive(markRaw(WordPreview))
    if (excel.includes(prefix)) result.component = reactive(markRaw(ExcelPreview))
    if (pdf.includes(prefix)) result.component = reactive(markRaw(PDFPreview))
    if (ppt.includes(prefix)) result.component = reactive(markRaw(PPTPreview))

    return result
}

const videoPreview = (file: { url: string, name?: string | null | undefined }) => {
    console.log('视频预览')
    const { url, name } = file
    return {
        url,
        name: name ? name : '',
        component: reactive(markRaw(VideoPreview))
    }
}

const filesPreview = (file: { url: string, name?: string | null | undefined }) => {
    console.log('文件预览')
    const { url, name } = file
    return {
        url,
        name: name ? name : '',
        component: reactive(markRaw(FilesPreview))
    }
}

const specialOfficePreview = (file: { url: string, name?: string | null | undefined }) => {
    console.log('office 预览')
    const { url, name } = file
    return {
        url,
        name: name ? name : '',
        component: reactive(markRaw(OfficePreview))
    }
}

const audioPreview = (file: { url: string, name?: string | null | undefined }) => {
    console.log('audio 预览')
    const { url, name } = file
    return {
        url,
        name: name ? name : '',
        component: reactive(markRaw(AudioPreview))
    }
}

export const mindPreview = (file: { url: string, name?: string | null | undefined }) => {
    console.log('xmind 预览')
    const { url, name } = file
    return {
        url,
        name: name ? name : '',
        component: reactive(markRaw(XMindPreview))
    }
}

export const checkFile = (file: { url: string, name?: string | null | undefined }) => {
    const { url } = file
    console.log('文件类型', url)
    const fileType = url.slice(url.lastIndexOf('.') + 1).toLowerCase()

    console.log(fileType, '当前文件类型')

    const checkType = (typeArray:string[]) => {
        return typeArray.includes(fileType)
    }
    if (checkType(imageType)) return imagePreview(file)
    if (checkType(officeType)) return officePreview(file)
    if (checkType(videoType)) return videoPreview(file)
    if (checkType(filesType)) return filesPreview(file)
    if (checkType(outOfficeType)) return specialOfficePreview(file)
    if (checkType(audioType)) return audioPreview(file)
    if (checkType(xMindType)) return mindPreview(file)
}

export const useFilePreview = (file: { url: string, name?: string | null | undefined }) => {
    const previewInfo = checkFile(file)
    return {
        previewInfo
    };
}
