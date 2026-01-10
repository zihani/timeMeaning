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
import endUrl1 from '@/assets/mp3/end1.wav';
import endUrl2 from '@/assets/mp3/end2.wav';
import ding from '@/assets/mp3/ding.m4a';
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
let initialCountdownSeconds = 0; // 记录倒计时开始时的总秒数
let countdownStartTime = 0; // 记录倒计时开始的时间戳

// --- Web Audio 状态 ---
let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null; // 用于拖动时的 tick 声
let endAudioBuffer1: AudioBuffer | null = null; // 用于倒计时的音频1（奇数秒）
let endAudioBuffer2: AudioBuffer | null = null; // 用于倒计时的音频2（偶数秒）
let endAudioSource: AudioBufferSourceNode | null = null; // 倒计时音频源
let isStoppingAudioIntentionally = false; // 标记是否是主动停止音频

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
    console.log("AudioContext 创建成功，状态:", audioContext.state);
    
    // 加载拖动时的 tick 音频
    console.log("正在加载拖动音频路径:", bginUrl);
    const response = await fetch(bginUrl);
    if (!response.ok) throw new Error(`拖动音频 HTTP 错误! 状态: ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    console.log("✓ 拖动音频解码成功，缓冲区长度:", audioBuffer.duration, "秒");
    
    // 加载倒计时音频 end1.wav（奇数秒使用）
    console.log("正在加载倒计时音频1路径:", endUrl1);
    const end1Response = await fetch(endUrl1);
    if (!end1Response.ok) {
      throw new Error(`倒计时音频1 HTTP 错误! 状态: ${end1Response.status}, URL: ${endUrl1}`);
    }
    const end1ArrayBuffer = await end1Response.arrayBuffer();
    endAudioBuffer1 = await audioContext.decodeAudioData(end1ArrayBuffer);
    console.log("✓ 倒计时音频1解码成功，缓冲区长度:", endAudioBuffer1.duration, "秒");
    
    // 加载倒计时音频 end2.wav（偶数秒使用）
    console.log("正在加载倒计时音频2路径:", endUrl2);
    const end2Response = await fetch(endUrl2);
    if (!end2Response.ok) {
      throw new Error(`倒计时音频2 HTTP 错误! 状态: ${end2Response.status}, URL: ${endUrl2}`);
    }
    const end2ArrayBuffer = await end2Response.arrayBuffer();
    endAudioBuffer2 = await audioContext.decodeAudioData(end2ArrayBuffer);
    console.log("✓ 倒计时音频2解码成功，缓冲区长度:", endAudioBuffer2.duration, "秒");
    
    console.log("✓ 音频初始化完成，endAudioBuffer1 已就绪:", !!endAudioBuffer1, "endAudioBuffer2 已就绪:", !!endAudioBuffer2);
  } catch (e) {
    console.error("❌ 音频初始化失败:", e);
    if (e instanceof Error) {
      console.error("错误详情:", e.message, e.stack);
    }
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

// 播放倒计时音频（根据剩余秒数交替播放 end1 和 end2）
const playCountdownAudio = (remainingSeconds: number) => {
  // 根据剩余秒数选择播放哪个音频：奇数秒用 end1，偶数秒用 end2
  // 计算已过去的秒数（从倒计时开始算起）
  const elapsedSeconds = initialCountdownSeconds > 0 
    ? initialCountdownSeconds - remainingSeconds 
    : 0;
  
  // 根据已过去秒数判断：第1秒(0)、第3秒(2)、第5秒(4)... 用 end1；第2秒(1)、第4秒(3)... 用 end2
  // elapsedSeconds 从 0 开始：0(第1秒), 1(第2秒), 2(第3秒)...
  // 所以：elapsedSeconds % 2 === 0 时用 end1，elapsedSeconds % 2 === 1 时用 end2
  const useEnd1 = elapsedSeconds % 2 === 0;
  const selectedBuffer = useEnd1 ? endAudioBuffer1 : endAudioBuffer2;
  const audioName = useEnd1 ? 'end1' : 'end2';
  
  if (!audioContext || !selectedBuffer || remainingSeconds <= 0) {
    console.warn(`倒计时音频播放失败: context 或 ${audioName} buffer 未准备好，或剩余时间为 0`);
    if (!audioContext) console.warn("audioContext 为空");
    if (!selectedBuffer) console.warn(`${audioName} buffer 为空`);
    if (remainingSeconds <= 0) console.warn(`剩余时间为 ${remainingSeconds}`);
    return;
  }

  // 停止之前的音频源
  stopCountdownAudio();

  // 确保 AudioContext 处于运行状态
  if (audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log('AudioContext 已恢复:', audioContext.state);
    }).catch((e) => {
      console.error('AudioContext 恢复失败:', e);
    });
  }

  // 创建新的音频源
  endAudioSource = audioContext.createBufferSource();
  endAudioSource.buffer = selectedBuffer;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.6; // 稍微提高音量，确保能听到
  endAudioSource.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // 使用正常播放速度，不循环播放（每次只播放一次）
  endAudioSource.playbackRate.value = 1.0;
  endAudioSource.loop = false;
  
  // 添加音频播放结束监听
  endAudioSource.onended = () => {
    // 音频播放完成是正常的，不需要处理
    endAudioSource = null;
  };
  
  try {
    // 从音频开头播放，播放整个音频文件
    const currentTime = audioContext.currentTime;
    endAudioSource.start(currentTime);
    console.log(`✓ 播放倒计时音频 ${audioName}: 剩余=${remainingSeconds}s, 已过=${elapsedSeconds}s, 状态=${audioContext.state}`);
  } catch (e) {
    console.error(`播放音频 ${audioName} 时出错:`, e);
    // 如果出错，立即重试
    if (remainingSeconds > 0 && selectedBuffer) {
      try {
        stopCountdownAudio();
        endAudioSource = audioContext.createBufferSource();
        endAudioSource.buffer = selectedBuffer;
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.6;
        endAudioSource.connect(gainNode);
        gainNode.connect(audioContext.destination);
        endAudioSource.playbackRate.value = 1.0;
        endAudioSource.loop = false;
        endAudioSource.onended = () => {
          endAudioSource = null;
        };
        endAudioSource.start(audioContext.currentTime);
        console.log(`✓ 重试播放倒计时音频 ${audioName}: 剩余=${remainingSeconds}s`);
      } catch (retryError) {
        console.error(`重试播放音频 ${audioName} 失败:`, retryError);
      }
    }
  }
};

// 停止倒计时音频
const stopCountdownAudio = () => {
  if (endAudioSource) {
    // 标记这是主动停止，不是意外停止
    isStoppingAudioIntentionally = true;
    // 先清除 onended 监听器，避免触发
    endAudioSource.onended = null;
    try {
      endAudioSource.stop();
    } catch (e) {
      // 音频可能已经停止，这是正常的
    }
    endAudioSource = null;
    // 重置标志（使用更短的延迟，确保在下一个音频源创建前重置）
    setTimeout(() => {
      isStoppingAudioIntentionally = false;
    }, 50);
  }
};

// 更新倒计时音频播放位置（每秒交替播放 end1 和 end2）
let lastUpdatedSecond = -1; // 记录上次更新的秒数

const updateCountdownAudio = (remainingSeconds: number, initialSeconds: number) => {
  if (!audioContext || (!endAudioBuffer1 && !endAudioBuffer2) || remainingSeconds <= 0) {
    if (remainingSeconds <= 0) {
      stopCountdownAudio();
      lastUpdatedSecond = -1;
    }
    return;
  }

  // 检查 AudioContext 状态，确保处于运行状态
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume().then(() => {
      console.log('AudioContext 已恢复:', audioContext.state);
      // 恢复后如果音频源不存在，重新播放音频
      if (remainingSeconds > 0 && !endAudioSource && (endAudioBuffer1 || endAudioBuffer2)) {
        playCountdownAudio(remainingSeconds);
        lastUpdatedSecond = remainingSeconds;
      }
    }).catch((e) => {
      console.error('AudioContext 恢复失败:', e);
    });
  }

  // 检查音频源是否还在播放，如果没有则立即重新播放
  if (!endAudioSource && audioContext && audioContext.state === 'running' && (endAudioBuffer1 || endAudioBuffer2)) {
    playCountdownAudio(remainingSeconds);
    lastUpdatedSecond = remainingSeconds;
    return;
  }

  // 每当秒数变化时，播放对应的音频（end1 或 end2）
  if (remainingSeconds !== lastUpdatedSecond) {
    // 停止之前的音频源（如果有）
    stopCountdownAudio();
    
    // 播放对应秒数的音频（end1 或 end2）
    playCountdownAudio(remainingSeconds);
    
    lastUpdatedSecond = remainingSeconds;
  }
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
  // 停止所有倒计时相关的定时器
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  // 停止倒计时音频
  stopCountdownAudio();
  
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

const startCountdown = async () => {
  // 确保 AudioContext 处于运行状态
  if (audioContext) {
    if (audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
        console.log('AudioContext 已恢复，状态:', audioContext.state);
      } catch (e) {
        console.error('AudioContext 恢复失败:', e);
      }
    }
    
    // 检查音频是否已加载
    if (!endAudioBuffer1 && !endAudioBuffer2) {
      console.warn("倒计时音频尚未加载完成，等待加载...");
      // 等待一段时间后重试
      setTimeout(() => {
        if ((endAudioBuffer1 || endAudioBuffer2) && totalSeconds.value > 0) {
          startCountdown();
        }
      }, 500);
      return;
    }
  }
  
  // 停止之前的定时器
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  // 记录初始倒计时时间和开始时间戳
  initialCountdownSeconds = totalSeconds.value;
  countdownStartTime = Date.now();
  console.log("开始倒计时，初始时间:", initialCountdownSeconds, "秒");
  
  // 开始播放倒计时音频（第一秒播放 end1）
  if (initialCountdownSeconds > 0) {
    // 传入剩余时间（开始时等于初始时间），会播放 end1（因为 elapsedSeconds = 0，0 % 2 === 0）
    playCountdownAudio(initialCountdownSeconds);
  }
  
  // 使用精确的时间戳来控制倒计时，确保每一秒都是准确的
  // 使用 setInterval 但基于时间戳计算，避免累积误差
  let lastSecond = initialCountdownSeconds;
  
  timerInterval = window.setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - countdownStartTime; // 已过去的时间（毫秒）
    const remainingTime = Math.max(0, initialCountdownSeconds * 1000 - elapsedTime); // 剩余时间（毫秒）
    const remainingSeconds = Math.floor(remainingTime / 1000); // 转换为秒，向下取整
    
    // 检查是否倒计时结束
    if (remainingTime <= 0 || remainingSeconds < 0) {
      totalSeconds.value = 0;
      stopCountdownAudio();
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      lastUpdatedSecond = -1;
      alert('Time is up!');
      return;
    }
    
    // 只有当秒数变化时才更新显示和音频，确保每一秒都精确同步
    if (remainingSeconds !== lastSecond && remainingSeconds !== totalSeconds.value) {
      totalSeconds.value = remainingSeconds;
      lastSecond = remainingSeconds;
      
      // 更新音频播放，根据剩余秒数交替播放 end1 和 end2
      updateCountdownAudio(remainingSeconds, initialCountdownSeconds);
    }
  }, 50); // 使用50ms的短间隔，确保每秒都精确检测到变化
};

onMounted(() => {
  initAudio();
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  stopCountdownAudio();
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