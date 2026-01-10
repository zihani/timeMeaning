<template>
  <div class="timer-wrapper">
    <div class="timer-container" ref="containerRef">
      <svg class="timer-svg" viewBox="0 0 200 200">
        <circle class="bg-ring" cx="100" cy="100" r="90" />
        <circle 
          class="progress-ring" 
          cx="100" 
          cy="100" 
          r="90" 
          :style="progressStyle"
        />
      </svg>

      <div 
        class="handle" 
        :class="{ 'is-dragging': isDragging }"
        @mousedown.prevent="onMouseDown"
        :style="handleStyle"
      ></div>

      <div class="time-display">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from 'vue';
// 导入音频资源
import bginUrl from '@/assets/mp3/bgin.wav';
// import bginUrl from '@/assets/mp3/end.wav';
// --- 常量定义 ---
const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MAX_MINUTES = 60; // 最大计时时间

// --- 状态变量 ---
const containerRef = ref<HTMLElement | null>(null);
const totalSeconds = ref(0);
const isDragging = ref(false);
let lastAngle = 0; 
let timerInterval: number | null = null;

// --- Web Audio 状态 ---
let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;

// --- 计算属性 ---
const formattedTime = computed(() => {
  const mins = Math.floor(totalSeconds.value / 60);
  const secs = totalSeconds.value % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
});

const progressStyle = computed(() => {
  const percent = totalSeconds.value / (MAX_MINUTES * 60);
  const offset = CIRCUMFERENCE - percent * CIRCUMFERENCE;
  return {
    strokeDashoffset: offset,
    strokeDasharray: CIRCUMFERENCE,
    transition: isDragging.value ? 'none' : 'stroke-dashoffset 1s linear'
  };
});

const handleStyle = computed(() => {
  const percent = totalSeconds.value / (MAX_MINUTES * 60);
  const angle = percent * 2 * Math.PI - Math.PI / 2;
  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS;
  return {
    transform: `translate(${x}px, ${y}px)`,
    transition: isDragging.value ? 'none' : 'transform 1s linear'
  };
});

// --- 音频逻辑 ---
const initAudio = async () => {
  try {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    console.log("正在加载音频路径:", bginUrl); // 确认路径是否正确
    const response = await fetch(bginUrl);
    
    if (!response.ok) throw new Error(`HTTP 错误! 状态: ${response.status}`);
    
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    console.log("音频解码成功，缓冲区长度:", audioBuffer.duration);
  } catch (e) {
    console.error("音频初始化失败:", e);
  }
};

const playTick = (speed: number) => {
  if (!audioContext || !audioBuffer) {
    console.warn("声音播放失败: context 或 buffer 未准备好");
    return;
  }

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  const gainNode = audioContext.createGain();
  // 临时调大音量测试
  gainNode.gain.value = 0.5; 

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // 临时延长播放时长到 0.2s 确认是否有声
  source.start(0, 0, 0.2);
};

// --- 交互逻辑 ---
const updatePosition = (e: MouseEvent) => {
  if (!isDragging.value || !containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  window.requestAnimationFrame(() => {
    let angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let normalizedAngle = angle + Math.PI / 2;
    if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;

    // 声音触发检测：每滑动约 4 度触发一次声音
    const angleDiff = Math.abs(normalizedAngle - lastAngle);
    if (angleDiff > 0.07) {
      playTick(angleDiff);
      lastAngle = normalizedAngle;
    }

    const percent = normalizedAngle / (2 * Math.PI);
    totalSeconds.value = Math.round(percent * MAX_MINUTES * 60);
  });
};

const onMouseDown = async () => {
  if (audioContext && audioContext.state === 'suspended') {
    await audioContext.resume();
    console.log('AudioContext 已激活:', audioContext.state);
  }
  isDragging.value = true;
  if (timerInterval) clearInterval(timerInterval);
  
  window.addEventListener('mousemove', updatePosition);
  window.addEventListener('mouseup', onMouseUp);
};

const onMouseUp = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', updatePosition);
  window.removeEventListener('mouseup', onMouseUp);
  
  if (totalSeconds.value > 0) {
    startCountdown();
  }
};

const startCountdown = () => {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = window.setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
    } else {
      if (timerInterval) clearInterval(timerInterval);
      alert('Time is up!');
    }
  }, 1000);
};

onMounted(() => {
  initAudio();
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
  audioContext?.close();
  window.removeEventListener('mousemove', updatePosition);
  window.removeEventListener('mouseup', onMouseUp);
});
</script>

<style scoped>
.timer-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1a;
}

.timer-container {
  position: relative;
  width: 280px;
  height: 280px;
  user-select: none;
}

.timer-svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

circle {
  fill: none;
  stroke-width: 10;
}

.bg-ring {
  stroke: #333;
}

.progress-ring {
  stroke: #00d2ff;
  stroke-linecap: round;
}

.time-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 3rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
}

.handle {
  position: absolute;
  width: 24px;
  height: 24px;
  background: #fff;
  border: 4px solid #00d2ff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
  cursor: grab;
  z-index: 10;
  box-shadow: 0 0 15px rgba(0, 210, 255, 0.5);
}

.is-dragging {
  cursor: grabbing;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.8);
}
</style>