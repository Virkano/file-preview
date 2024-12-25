<template>
  <div class="audio-player-container">
    <div class="audio-player">
      <div class="progress-bar">
        <input
            type="range"
            :value="progress"
            @input="seek"
            min="0"
            max="100"
            class="progress"
        >
        <div class="time">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <div v-if="!isSupported" class="loading-hint">
        不支持该音频格式
      </div>

      <div class="audio-player-button">
        <button @click="togglePlay" class="play-btn" :disabled="!isSupported">
          {{ isPlaying ? '暂停' : '播放' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch, onUnmounted } from 'vue'
import { Howl } from 'howler'

const props = defineProps<{
  filePath: string
}>()

const howl = ref<Howl | null>(null)
const isPlaying = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const isSupported = ref(true)

// 添加音频格式支持检查
const supportedFormats = ['mp3', 'wav',  'm4r', 'ogg', 'flac', 'aac']

const initAudio = () => {
  if (howl.value) {
    howl.value.unload()
  }

  howl.value = new Howl({
    src: [props.filePath],
    html5: true,
    format: supportedFormats, // 添加格式支持
    onplay: () => {
      isPlaying.value = true
      updateProgress()
    },
    onpause: () => {
      isPlaying.value = false
    },
    onload: () => {
      duration.value = howl.value?.duration() || 0
    },
    onstop: () => {
      isPlaying.value = false
    },
    onloaderror: (id, error) => {
      // console.error('Audio load error:', id, error)
      // 可以在这里添加错误提示
      isSupported.value = false
    },
    onplayerror: (id, error) => {
      // console.error('Audio play error:', error)
      // 可以在这里添加错误提示
      isSupported.value = false
    }
  })
}

const togglePlay = () => {
  if (!howl.value) return

  if (howl.value.playing()) {
    howl.value.pause()
  } else {
    howl.value.play()
  }
}

const seek = (event: Event) => {
  if (!howl.value) return

  const target = event.target as HTMLInputElement
  const time = (Number(target.value) / 100) * duration.value
  howl.value.seek(time)
}

const updateProgress = () => {
  if (!howl.value || !isPlaying.value) return

  requestAnimationFrame(updateProgress)
  currentTime.value = howl.value.seek()
  progress.value = (currentTime.value / duration.value) * 100
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// 监听 audioUrl 变化
watch(() => props.filePath, () => {
  initAudio()
})

onMounted(() => {
  initAudio()
})

// 添加组件卸载时的清理
onUnmounted(() => {
  if (howl.value) {
    howl.value.unload()
  }
})
</script>

<style scoped>
.audio-player-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .audio-player {
    padding: 1rem;
    border-radius: 8px;
    background: #f5f5f5;
    width: calc(100% - 2.5rem);
    position: relative;
    .progress-bar {
      margin-top: 1rem;
      .progress {
        width: 100%;
        height: 5px;
        -webkit-appearance: none;
        background: #e2e8f0;
        border-radius: 3px;
        cursor: pointer;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background: #4a5568;
          border-radius: 50%;
        }
      }
      .time {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #4a5568;
      }
    }
    .loading-hint{
      text-align: center;
      padding: 10px;
    }
    .audio-player-button{
      width: 100%;
      text-align: center;
      .play-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background: #4a5568;
        color: white;
        cursor: pointer;
        &:hover {
          background: #2d3748;
        }
        &:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>