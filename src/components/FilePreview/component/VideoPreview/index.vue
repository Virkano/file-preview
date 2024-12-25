<script lang="ts"  setup>
// 视频播放组件
import "vue3-video-play/dist/style.css";
import {videoPlay} from "vue3-video-play";
import {ref,reactive} from "vue";
//事件示例
const props = defineProps({
  filePath: {
    type: String,
    required: true,
    default: ''
  }
})

const onPlay = ()=>{
  // console.log('播放')
}

//播放器
const options = reactive({
  width: '100%', //播放器高度
  height: '100%', //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  webFullScreen:false,//网页全屏
  speed:true,//是否支持快进快退
  currentTime:0,//跳转到固定播放时间(s)
  muted:false,//静音
  autoPlay: true, //自动播放
  loop:false,//循环播放
  mirror:false,//镜像画面
  control: true, //是否显示控制器
  ligthOff:false,//关灯模式
  volume:0.3,//默认音量0-1
  src: props.filePath,
  poster: '', //封面
  speedRate: [1.0,1.25,1.5,2.0], // 可选的播放速度
  controlBtns: [
    "audioTrack",//音轨切换按钮
    "quality",//视频质量切换按钮
    "speedRate",//速率切换按钮
    "volume",//音量
    "setting", //设置
    "pip",//画中画按钮
    "pageFullScreen",//网页全屏按钮
    "fullScreen",//全屏按钮
  ], //显示所有按钮,

})
</script>


<template>
  <div>
    <videoPlay ref="aplayVideo" v-bind="options"  @play="onPlay"/>
  </div>
</template>

<style scoped lang="scss">

</style>
