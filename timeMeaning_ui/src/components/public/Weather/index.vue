
<script setup lang="ts">
import { defineComponent ,ref ,onMounted,watch,nextTick  } from 'vue'
import type { Ref } from "vue";
   
</script>
<template>
    <div class="Weather">
        <div class="container">
            <!-- 左边 -->
            <div class="left-side">
                <!-- 渐变 -->
                <div class="gradient"></div>
                <div class="date-container">
                    <h2 class="date-dayname" id="date-dayname">周六</h2>
                    <span class="date-day" id="date-day">2020-06-06</span>
                    <!-- location 图标 -->
                    <span class="iconfont" id="location">&#xe6e5;开封</span>
                </div>

                <div class="weather-conteiner">
                    <!-- 天气图标 -->
                    <span class="iconfont" id="weather-l">&#xe61f;</span>
                    <div class="weather-temp" id="weather-temp">30℃</div>
                    <div class="weather-desc" id="weather-desc">晴天</div>
                </div>
            </div>
            <!-- 右边部分 -->
            <div class="right-side">
                <div class="today-info-container">
                    <div class="today-info">
                        <!-- PM2.5 -->
                        <div class="pm clearfix ">
                            <span class="title">PM2.5</span>
                            <span class="value" id="pm">00</span>
                        </div>
                        <!-- 湿度 -->
                        <div class="humidity clearfix a">
                            <span class="title">湿度</span>
                            <span class="value" id="humidity">00</span>
                        </div>
                        <!-- 风速 -->
                        <div class="wind clearfix ">
                            <span class="title">风速</span>
                            <span class="value" id="wind">00</span>
                        </div>
                    </div>
                </div>
                <div class="week-container">
                    <ul class="week-list">
                        <li class="active" id="day1">
                            <!-- 天气图标 -->
                            <span class="iconfont">&#xe61f;</span>
                            <span class="day-name">周六</span>
                            <span class="day-temp">30℃</span>
                        </li>
                        <li id="day2">
                            <!-- 天气图标 -->
                            <span class="iconfont">&#xe61f;</span>
                            <span class="day-name">周日</span>
                            <span class="day-temp">30℃</span>
                        </li>
                        <li id="day3">
                            <!-- 天气图标 -->
                            <span class="iconfont">&#xe61f;</span>
                            <span class="day-name">周一</span>
                            <span class="day-temp">30℃</span>
                        </li>
                        <li id="day4">
                            <!-- 天气图标 -->
                            <span class="iconfont">&#xe61f;</span>
                            <span class="day-name">周二</span>
                            <span class="day-temp">30℃</span>
                        </li>
                        <li id="day5">
                            <!-- 天气图标 -->
                            <span class="iconfont">&#xe61f;</span>
                            <span class="day-name">周三</span>
                            <span class="day-temp">30℃</span>
                        </li>
                        <li id="day6">
                            <!-- 天气图标 -->
                            <span class="iconfont">&#xe61f;</span>
                            <span class="day-name">周四</span>
                            <span class="day-temp">30℃</span>
                        </li>
                        <li id="day7">
                            <!-- 天气图标 -->
                            <span class="iconfont">&#xe61f;</span>
                            <span class="day-name">周五</span>
                            <span class="day-temp">30℃</span>
                        </li>
                    </ul>
                </div>
                <!-- <div class="location-container">
                    <input type="text" id="city" placeholder="位置">
                    <button class="location-button" id="location-button">
                        <span class="iconfont" >&#xe6e5;查询</span>
                    </button>
                </div> -->
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
ul {
    list-style: none;
}
/* 高度塌陷问题 */

.clearfix::after,
.clearfix::before {
    content: "";
    display: table;
    clear: both;
}

body {
    width: 100%;
    height: 100vh;
    background-color: #424242;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    height: 270px;
    width: 800px;
    background-color: #1F252D;
    color: #ffffff;
    border-radius: 25px;
    box-shadow: 0 70px -10px rgba(0, 0, 0, 0.2);
}

.left-side {
    position: relative;
    width: 300px;
    height: 100%;
    /* background-color: red; */
    border-radius: 25px 0 0 25px;
    box-shadow: 0 35px -10px rgba(0, 0, 0, 0.2);
    float: left
}

.gradient {
    width: 100%;
    height: 100%;
    /* background-color: red; */
    position: absolute;
    background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
    border-radius: 25px 0 0 25px;
    opacity: 0.8;
}

.date-container {
    position: absolute;
    top: 25px;
    left: 25px;
}

.date-container .date-dayname {
    display: block;
    margin-top: 4px;
}

#location {
    display: block;
    margin-top: 4px;
}

.weather-conteiner {
    position: absolute;
    bottom: 25px;
    left: 25px;
}

#weather-l {
    font-size: 20px;
}

.weather-temp {
    font-size: 2em;
    font-weight: bold;
}

.weather-desc {
    font-size: 20px;
}


/* 右边部分 */

.right-side {
    float: right;
    /* background-color: red; */
    padding-top: 25px;
    margin-right: 10px;
    height: 100%;
    box-sizing: border-box;
    position: relative;
}

.today-info {
    /* background-color: royalblue; */
    padding: 15px 15px 0 15px;
    margin: 0 25px 25px 25px;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

.today-info div {
    border-bottom: 10px;
}

.today-info .a {
    margin: 6px 0px;
}

.today-info .title {
    float: left;
}

.today-info .value {
    float: right;
}

.week-list {
    margin: 10px 35px;
    border-radius: 10px;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
}

.week-list li {
    float: left;
    /* background-color: red; */
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    transition: 200ms;
}

.week-list li span {
    display: block;
}

.week-list {
    position: relative;
    z-index: 99999;
}

.week-list li:hover {
    transform: scale(1.1);
    background-color: #ffffff;
    color: #222831;
}

.week-list .iconfont {
    font-size: 20px;
}

.active {
    transform: scale(1.1);
    background-color: #ffffff;
    color: #222831;
}

.week-list .day-name {
    margin-top: 10px;
    text-align: center;
}

.week-list .day-temp {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
}

.location-container {
    padding: 25px 35px;
    position: relative;
    /* background-color: red; */
    width: 330px;
    height: 126px;
}

.location-container input {
    outline: none;
    width: 300px;
    height: 28px;
    padding: 6px;
    display: block;
    box-sizing: border-box;
    /* font-weight: bold; */
    position: absolute;
    bottom: -15px;
    left: calc(50% - 150px);
    border: none;
    border-radius: 5px;
    color: #222831;
}

.location-container button {
    outline: none;
    width: 320px;
    /* height: 28px; */
    padding: 8px;
    box-sizing: border-box;
    border-radius: 25px;
    border: none;
    color: #FFFFFF;
    /* font-size: 18px; */
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 50px -5px rgba(0, 0, 0, 0.3);
    background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
    transition: 200ms;
    position: absolute;
    bottom: -80px;
    left: calc(50% - 160px);
}

.location-container button:hover {
    transform: scale(1.05);
}
</style>
<style scoped >
@import '@/assets/iconfont/iconfont.css';
</style>