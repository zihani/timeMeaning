<script setup lang="ts" >
import { ref,onMounted,defineProps,defineEmits ,type Ref,watch, HtmlHTMLAttributes} from 'vue'
import { useBackgroundTheme } from '@/stores/useBackgroundTheme';
const backgroundTheme = useBackgroundTheme();
const props = defineProps({
    timeStr:Object,
    frontText:String
});
const flipper:Ref<any> = ref(null);
const front:Ref<any> = ref(null);
const back:Ref<any> = ref(null);
let duration = 600
// 后牌文字
// let backText = props.backText
// 前牌文字
// let frontText = props.frontText
let frontTextFromData:Ref<number> = ref(0);
let backTextFromData:Ref<number> = ref(1);
let isFlipping:Ref<boolean> =ref(false);
let flipType =ref('down');
let playStatus= false;
onMounted(()=>{
  let digital:any = document.getElementsByClassName("digital")
  //background
  if(backgroundTheme.backgroundColor === "dark"){
    flipper.value.style.background = "#000000";
    flipper.value.style.color = "#ffffff";
    for (const item of digital) {
        item.style.background = "#000000"
    }
  }
  if(backgroundTheme.backgroundColor === "white"){
    flipper.value.style.backgroundColor = "#ffffff";
    flipper.value.style.color = "#000000";
    for (const item of digital) {
        item.style.background = "#ffffff"
    }
  }
})

function _textClass(number){
    return "number"+number
}
function _flip(type, front, back) {
      // 如果处于翻转中，则不执行
    if (isFlipping.value) {
        return false
    }
    frontTextFromData.value = front
    backTextFromData.value = back
    // 根据传递过来的type设置翻转方向
    // flipType = type
    // 设置翻转状态为true
    isFlipping.value = true
    setTimeout(() => {
        // 设置翻转状态为false
        isFlipping.value = false
        frontTextFromData.value = back
    }, duration)
}
// 下翻牌
function flipDown(front, back) {
    _flip('down', front, back)
}
// 上翻牌
function flipUp(front, back) {
    _flip('up', front, back)
}
// 设置前牌文字
function setFront(text) {
    frontTextFromData.value = text
}
// 设置后牌文字
function setBack(text) {
    backTextFromData = text
}
setFront(props.frontText)
watch(() => props.timeStr,  
    (newVal, oldVal) => { 
      flipDown(newVal.nowTimeStr, newVal.nextTimeStr)
    },  
    {  
        deep: true // 开启深度监听  
})
</script>
<template>
  <div class="M-Flipper" ref="flipper" :class="[flipType, {'go': isFlipping}]">
    <div ref="front" class="digital front" :class="_textClass(frontTextFromData)"></div>
    <div ref="back" class="digital back" :class="_textClass(backTextFromData)"></div>
  </div>
</template>
<style scoped>
.M-Flipper {
  display: inline-block;
  position: relative;
  border-radius: 2px;
  width: 80px;
  height: 120px;
  line-height: 120px;
  border: solid 1px #ffffff;
  /* background: #ffffff;
  color: #000000; */
  font-size: 90px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Helvetica Neue';
}

.M-Flipper .digital:before,
.M-Flipper .digital:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  background: #000000;
  overflow: hidden;
  box-sizing: border-box;
}
.M-Flipper .digital:before {
  top: 0;
  bottom: 50%;
  border-radius: 10px 10px 0 0;
  border-bottom: solid 1px #666;
}
.M-Flipper .digital:after {
  top: 50%;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  line-height:0px;
}
/*向下翻*/
.M-Flipper.down .front:before {
  z-index: 3;
}
.M-Flipper.down .back:after {
  z-index: 2;
  transform-origin: 50% 0%;
  transform: perspective(160px) rotateX(180deg);
}
.M-Flipper.down .front:after,
.M-Flipper.down .back:before {
  z-index: 1;
}
.M-Flipper.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown 0.6s ease-in-out both;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}
.M-Flipper.down.go .back:after {
  animation: backFlipDown 0.6s ease-in-out both;
}
/*向上翻*/
.M-Flipper.up .front:after {
  z-index: 3;
}
.M-Flipper.up .back:before {
  z-index: 2;
  transform-origin: 50% 100%;
  transform: perspective(160px) rotateX(-180deg);
}

.M-Flipper.up .front:before,
.M-Flipper.up .back:after {
  z-index: 1;
}
.M-Flipper.up.go .front:after {
  transform-origin: 50% 0;
  animation: frontFlipUp 0.6s ease-in-out both;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}
.M-Flipper.up.go .back:before {
  animation: backFlipUp 0.6s ease-in-out both;
}
@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

.M-Flipper .number0:before,
.M-Flipper .number0:after {
  content: '0';
}

.M-Flipper .number1:before,
.M-Flipper .number1:after {
  content: '1';
}

.M-Flipper .number2:before,
.M-Flipper .number2:after {
  content: '2';
}

.M-Flipper .number3:before,
.M-Flipper .number3:after {
  content: '3';
}

.M-Flipper .number4:before,
.M-Flipper .number4:after {
  content: '4';
}

.M-Flipper .number5:before,
.M-Flipper .number5:after {
  content: '5';
}

.M-Flipper .number6:before,
.M-Flipper .number6:after {
  content: '6';
}

.M-Flipper .number7:before,
.M-Flipper .number7:after {
  content: '7';
}

.M-Flipper .number8:before,
.M-Flipper .number8:after {
  content: '8';
}

.M-Flipper .number9:before,
.M-Flipper .number9:after {
  content: '9';
}
</style>