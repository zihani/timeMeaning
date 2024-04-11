<script setup lang="ts" >
import { onMounted, ref,defineComponent,type Ref} from "vue";
// import audio from "@/assets/audio/ding_Audio.mp3"
import Flipper from './common/Flipper.vue'
let timer = null
let flipObjs =  []
// let audioPath = audio
function ding(){

}
function initdate(fromDatas){
      let time = fromDatas[0]+fromDatas[1]+":"+fromDatas[2]+fromDatas[3]+":"+fromDatas[4]+fromDatas[5]
      // 从cooik中获取设置时间
      switch(time){
        case '6:00:00':
          ding();
          break;
        case '9:00:00':
          ding();
          break; 
        case '12:00:00':
          ding();
          break; 
        case '15:00:00':
          ding();
          break;
        case '18:00:00':
          ding();
          break;
        case '21:08:00':
          ding();
          break;
        case '00:03:00':
          ding();
          break;
      }
       // 如果时间到整点调取音频文件 
 }

const flipperHour1:Ref<any> = ref({nowTimeStr:"",nextTimeStr:""});
const flipperHour2:Ref<any> = ref({nowTimeStr:"",nextTimeStr:""});
const flipperMinute1:Ref<any> = ref({nowTimeStr:"",nextTimeStr:""});
const flipperMinute2:Ref<any> = ref({nowTimeStr:"",nextTimeStr:""});
const flipperSecond1:Ref<any> = ref({nowTimeStr:"",nextTimeStr:""});
const flipperSecond2 :Ref<any> = ref({nowTimeStr:"",nextTimeStr:""});
const timeStr :Ref<object> = ref({nowTimeStr:"",nextTimeStr:""});
// setTimeout(function(){
// },1000);
// debugger
flipObjs = [
  flipperHour1,
  flipperHour2,
  flipperMinute1,
  flipperMinute2,
  flipperSecond1,
  flipperSecond2
]
let hour1:string = ""
let hour2:string = ""
let minute1:string = ""
let minute2:string = ""
let second1:string = ""
let second2:string = ""
function init(){
  let now = new Date()
  let nowTimeStr = formatDate(new Date(now.getTime()), 'hhiiss')
  for (let i = 0; i < flipObjs.length; i++) {
      if(i === 0){
        hour1 = nowTimeStr[i]
      }
      if(i === 1){
        hour2 = nowTimeStr[i]
      }
      if(i === 2){
        minute1 = nowTimeStr[i]
      }
      if(i === 3){
        minute2 = nowTimeStr[i]
      }
      if(i === 4){
        second1 = nowTimeStr[i]
      }
      if(i === 5){
        second2 = nowTimeStr[i]
      }
        // flipObjs[i].value.nowTimeStr = nowTimeStr[i]
  }
}
init()
    // 开始计时
function run() {
      timer = setInterval(() => {
        // 获取当前时间
        let now = new Date()
        let nowTimeStr = formatDate(new Date(now.getTime() - 1000), 'hhiiss')
        let nextTimeStr = formatDate(now, 'hhiiss')
        for (let i = 0; i < flipObjs.length; i++) {
            if (nowTimeStr[i] === nextTimeStr[i]) {
            continue
            }
            flipObjs[i].value.nowTimeStr = nowTimeStr[i] 
            flipObjs[i].value.nextTimeStr = nextTimeStr[i]
        }
        // const fromDatas= flipObjs.map(item =>{
        //     return item.frontTextFromData
        // })
        // initdate(fromDatas)
    }, 1000)
}
    // 正则格式化日期
function formatDate(date, dateFormat) {
      /* 单独格式化年份，根据y的字符数量输出年份
     * 例如：yyyy => 2019
            yy => 19
            y => 9
     */
      if (/(y+)/.test(dateFormat)) {
        dateFormat = dateFormat.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      // 格式化月、日、时、分、秒
      let o = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          // 取出对应的值
          let str = o[k] + ''
          /* 根据设置的格式，输出对应的字符
           * 例如: 早上8时，hh => 08，h => 8
           * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
           * 例如: 下午15时，hh => 15, h => 15
           */
          dateFormat = dateFormat.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : padLeftZero(str)
          )
        }
      }
      return dateFormat
}
// 日期时间补零
function  padLeftZero(str) {
      return ('00' + str).substr(str.length)
}
onMounted(()=>{
   run();
})
const show = ref(true)
function timess(){
     show.value = !show.value
}
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    // 页面变为可见状态时执行的操作
    init()
    run();
    timess()
  } 
});
const fen:Ref<boolean> = ref(true)
function showfen(){
  setTimeout(() => {
    fen.value = !fen.value
        // 设置翻转状态为false
    showfen()
  }, 600)
}
showfen()

</script>
<template>
    <div class="Time" v-if="show">
        <Flipper :timeStr="flipperHour1" :frontText="hour1" />
        <Flipper :timeStr="flipperHour2" :frontText="hour2" />
        <div v-if="fen" class="fen">:</div>
        <div v-else class="fen">&zwnj;</div>
        <Flipper :timeStr="flipperMinute1" :frontText="minute1" />
        <Flipper :timeStr="flipperMinute2" :frontText="minute2" />
        <div v-if="fen" class="fen">:</div>
        <div v-else class="fen"> &zwnj; </div>
        <Flipper :timeStr="flipperSecond1" :frontText="second1" />
        <Flipper :timeStr="flipperSecond2" :frontText="second2" />
    </div>
    <div class="Time" v-else>
        <Flipper :timeStr="flipperHour1" :frontText="hour1" />
        <Flipper :timeStr="flipperHour2" :frontText="hour2" />
        <Flipper :timeStr="flipperMinute1" :frontText="minute1" />
        <Flipper :timeStr="flipperMinute2" :frontText="minute2" />
        <Flipper :timeStr="flipperSecond1" :frontText="second1" />
        <Flipper :timeStr="flipperSecond2" :frontText="second2" />
    </div>
    <!-- <audio ref="audio" :src="audioPath"></audio> -->
</template>
<style>
.fen{
    display: inline-block;
    width:16px; 
    height: 100%;
    position: relative;
    text-align: center;
    font-size: 60px; 
    bottom:75px;
    color:#000000;
}
.Time {
    text-align: center;
}
.Time .M-Flipper {
    margin: 0 3px;
}
.Time em {
    display: inline-block;
    line-height: 102px;
    font-style: normal;
    vertical-align: top;
}
</style>