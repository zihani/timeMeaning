<template>
    <div id="banner" :class="{'home-banner':isHome}">
        <div  class="banner-img">
            <canvas>
                <template v-if="isHome">
                    <div class="focusinfo">
                        <div class="header-tou">
                            <!-- <router-link to="/"><img :src="websiteInfo.avatar"></router-link> -->
                        </div>
                        <!-- 社交信息 -->
                        <div class="top-social">
                            <div v-for="item in socials" :key="item.id" :title="item.title"><a :href="item.href" target="_blank" :style="{'color':item.color}"><i class="iconfont" :class="item.icon"></i></a></div>
                        </div>
                    </div>
                    <!--左右倾斜-->
                    <div class="slant-left"></div>
                    <div class="slant-right"></div>
                </template>
            </canvas>
        </div>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data(){
            return{
                websiteInfo: {slogan:"博客"},
                socials: [],
                 // 定义星星数组
                stars:[],
                // 定义星星的最小缩放比例
                STAR_MIN_SCALE:0.2,
                width:"",
                height:"",
                // 定义缩放比例
                scale:1, // device pixel ratio
                // 定义速度对象
                velocity:{ x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 },
                // 定义溢出阈值
                OVERFLOW_THRESHOLD:50,
                // 获取canvas元素
                canvas:document.querySelector('canvas'),
                // 定义星星的颜色
                STAR_COLOR:'#fff',
                // 定义星星的大小
                STAR_SIZE:5,
                // 定义星星的数量
                STAR_COUNT:(window.innerWidth + window.innerHeight) / 8,
                // 获取canvas的绘图上下文
                context:document.querySelector('canvas'),
                // 定义鼠标指针的位置
                pointerX:0,
                pointerY:0,
                // 定义触摸输入标志
                touchInput:false,
            }
        },
        props:{
            src:{
                type: String,
                default: require("@/assets/img/backgroundImage.jpeg")
            },
            isHome:{
                type: [Boolean,String],
                default: false
            }
        },
        created(){
            this.getWebSiteInfo()
            this.getSocial()
        },
        mounted() {
            this.initanimation();
        },
        methods:{
            initanimation(){
                this.canvas = document.querySelector('canvas')
                this.context = this.canvas.getContext('2d');
                // 生成星星
                this.generate();
                // 调整大小
                this.resize();
                // 运行动画
                this.step();
                // 当窗口大小改变时，重新调整大小
                window.onresize = this.resize;
                // 当鼠标在canvas上移动时，更新鼠标指针位置、
                this.canvas.onmousemove = this.onMouseMove;
                // 当触摸屏在canvas上移动时，更新鼠标指针位置
                this.canvas.ontouchmove = this.onTouchMove;
                // 当触摸屏离开canvas时，更新鼠标指针位置
                this.canvas.ontouchend = this.onMouseLeave;
                // 当鼠标离开文档时，更新鼠标指针位置
                document.onmouseleave = this.onMouseLeave;
            },
            //生成星星
            generate() {
                for (let i = 0; i < this.STAR_COUNT; i++) {
                    this.stars.push({
                        x: 0,
                        y: 0,
                        z: this.STAR_MIN_SCALE + Math.random() * (0.5- this.STAR_MIN_SCALE),
                    });
                }
            },
            // 将星星放置到随机位置
            placeStar(star) {
                star.x = Math.random() * this.width;
                star.y = Math.random() * this.height;
            },
            // 调整大小
            resize() {
                // 获取设备像素比例
                this.scale = window.devicePixelRatio || 1;
                // 设置画布的宽度和高度
                this.width = window.innerWidth * this.scale;
                this.height = window.innerHeight * this.scale;
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                // 将所有星星重新放置到屏幕上
                this.stars.forEach(this.placeStar);
            },
            // 回收星星并重新放置到新的位置
            recycleStar(star) {
                // 初始化方向为 'z'
                let direction = 'z';
                // 获取速度的绝对值
                let vx = Math.abs(this.velocity.x);
                let vy = Math.abs(this.velocity.y);
                // 如果速度的绝对值大于1，则根据速度的大小随机确定方向
                if (vx > 1 || vy > 1) {
                    let axis;
                    // 如果水平速度大于垂直速度，则根据水平速度的比例随机确定水平或垂直方向
                    if (vx > vy) {
                        axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
                    } else {
                        axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
                    }
                    // 根据方向确定具体的移动方向
                    if (axis === 'h') {
                        direction = this.velocity.x > 0 ? 'l' : 'r';
                    } else {
                        direction = this.velocity.y > 0 ? 't' : 'b';
                    }
                }
                // 随机设置星星的缩放比例
                star.z = this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE);
                // 根据方向设置星星的位置
                if (direction === 'z') {
                    // 如果方向为 'z'，则将星星放置在屏幕中心
                    star.z = 0.1;
                    star.x = Math.random() * this.width;
                    star.y = Math.random() * this.height;
                } else if (direction === 'l') {
                    // 如果方向为 'l'，则将星星放置在屏幕左侧
                    star.x = -this.OVERFLOW_THRESHOLD;
                    star.y = this.height * Math.random();
                } else if (direction === 'r') {
                    // 如果方向为 'r'，则将星星放置在屏幕右侧
                    star.x = this.width + this.OVERFLOW_THRESHOLD;
                    star.y = this.height * Math.random();
                } else if (direction === 't') {
                    // 如果方向为 't'，则将星星放置在屏幕顶部
                    star.x = this.width * Math.random();
                    star.y = -this.OVERFLOW_THRESHOLD;
                } else if (direction === 'b') {
                    // 如果方向为 'b'，则将星星放置在屏幕底部
                    star.x = this.width * Math.random();
                    star.y = this.height + this.OVERFLOW_THRESHOLD;
                }
            },
            // 动画的每一帧
            step() {
                // 清空画布
                this.context.clearRect(0, 0, this.width, this.height);
                // 更新星星的位置和速度
                this.update();
                // 绘制星星
                this.render();
                // 请求下一帧动画
                requestAnimationFrame(this.step);
            },
            // 更新星星的位置和速度
            update() {
                // 缓动速度
                this.velocity.tx *= 0.96;
                this.velocity.ty *= 0.96;
                // 更新速度
                this.velocity.x += (this.velocity.tx - this.velocity.x) * 0.8;
                this.velocity.y += (this.velocity.ty - this.velocity.y) * 0.8;
                // 遍历所有星星
                this.stars.forEach((star) => {
                    // 根据速度和缩放比例更新星星的位置
                    star.x += this.velocity.x * star.z;
                    star.y += this.velocity.y * star.z;
                    // 根据速度和缩放比例更新星星的位置（使星星围绕屏幕中心旋转）
                    star.x += (star.x - this.width / 2) * this.velocity.z * star.z;
                    star.y += (star.y - this.height / 2) * this.velocity.z * star.z;
                    // 更新星星的缩放比例
                    star.z += this.velocity.z;
                    // 如果星星超出屏幕范围，则重新放置到屏幕上
                    if (
                        star.x < -this.OVERFLOW_THRESHOLD ||
                        star.x > this.width + this.OVERFLOW_THRESHOLD ||
                        star.y < -this.OVERFLOW_THRESHOLD ||
                        star.y > this.height + this.OVERFLOW_THRESHOLD
                    ) {
                        this.recycleStar(star);
                    }
                });
            },
            // 绘制星星
            render() {
                // 遍历所有星星
                this.stars.forEach((star) => {
                    // 设置绘制星星的样式
                    this.context.beginPath();
                    this.context.lineCap = 'round';
                    this.context.lineWidth = this.STAR_SIZE * star.z * this.scale;
                    this.context.globalAlpha = 0.5 + 0.5 * Math.random();
                    this.context.strokeStyle = this.STAR_COLOR;
                    // 绘制星星的路径
                    this.context.beginPath();
                    this.context.moveTo(star.x, star.y);
                    // 计算星星的尾巴坐标
                    let tailX = this.velocity.x * 2;
                    let tailY = this.velocity.y * 2;
                    // 如果尾巴坐标的绝对值小于0.1，则设置为0.5
                    if (Math.abs(tailX) < 0.1) tailX = 0.5;
                    if (Math.abs(tailY) < 0.1) tailY = 0.5;
                    // 绘制星星的尾巴
                    this.context.lineTo(star.x + tailX, star.y + tailY);
                    this.context.stroke();
                });
            },
            // 移动鼠标指针
            movePointer(x, y) {
                // 如果之前有记录鼠标指针的位置，则计算鼠标指针的移动距离，并更新速度
                if (typeof this.pointerX === 'number' && typeof this.pointerY === 'number') {
                    let ox = x - this.pointerX;
                    let oy = y - this.pointerY;
                    this.velocity.tx = this.velocity.tx + (ox / 8) * this.scale * (this.touchInput ? 1 : -1);
                    this.velocity.ty = this.velocity.ty + (oy / 8) * this.scale * (this.touchInput ? 1 : -1);
                }
                // 更新鼠标指针的位置
                this.pointerX = x;
                this.pointerY = y;
            },
            // 当鼠标在canvas上移动时的事件处理函数
            onMouseMove(event) {
                this.touchInput = false;
                this.movePointer(event.clientX, event.clientY);
            },
            // 当触摸屏在canvas上移动时的事件处理函数
            onTouchMove(event) {
                this.touchInput = true;
                this.movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
                event.preventDefault();
            },
            // 当鼠标离开canvas时的事件处理函数
            onMouseLeave() {
                this.pointerX = null;
                this.pointerY = null;
            },
            getSocial(){
                this.$store.dispatch('getSocials').then(data =>{
                    this.socials = data
                })
            },
            getWebSiteInfo(){
                this.$store.dispatch('getSiteInfo').then(data =>{
                    this.websiteInfo = data
                })
            }
        }
    }
</script>

<style scoped lang="less">
    #banner {
        position: relative;
        margin-top: 80px;
        width: 100%;
        height: 200px;
        .banner-img{
            transition: all 0.2s linear;
            overflow: hidden;
            width: 100%;
            height: 100%;
            /* 背景渐变 */
            background-image: linear-gradient(-225deg, rgb(92, 18, 161) 40%,
                    #302041 80%,  #1a1331 100%);
            canvas {
                width: 100%;
                height: 100%;
            }
            &:hover {
                transform: scale(1.1, 1.1);
                filter: contrast(130%);
            }
        }
        &.home-banner {
            height: 550px;
            .banner-img{
                z-index: -1;
                transition: unset;
                width: 100%;
                height: 100%;
                /* 背景渐变 */
                background-image: linear-gradient(-225deg, #FF1361 0%,
                        #43107a 90%,  #231557 100%);
                &:hover {
                    transform: unset;
                    filter: unset;
                }
            }
            .slant-left {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-bottom: 100px solid #FFF;
                border-right: 800px solid transparent;
                left: 0;
                bottom: 0;
            }
            .slant-right {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-bottom: 100px solid #FFF;
                border-left: 800px solid transparent;
                right: 0;
                bottom: 0;
            }
        }
    }
    .focusinfo {
        position: relative;
        max-width: 800px;
        padding: 0 10px;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        text-align: center;
        img {
            width: 80px;
            height: auto;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.3);
        }
        .header-info {
            width: 60%;
            font-size: 14px;
            color: #EAEADF;
            background: rgba(0, 0, 0, 0.66);
            padding: 20px 30px;
            margin: 30px auto 0 auto;
            font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
            letter-spacing: 1px;
            line-height: 30px;
        }
        .top-social {
            height: 32px;
            margin-top: 30px;
            margin-left: 10px;
            list-style: none;
            display: inline-block;
            font-family: miranafont,"Hiragino Sans GB",STXihei,"Microsoft YaHei",SimSun,sans-serif;
            div {
                float: left;
                margin-right: 10px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                width: 32px;
                background: white;
                border-radius: 100%;
            }
        }
    }
    @media (max-width: 960px){
        #banner {height: 400px;}
    }
    @media (max-width: 800px){
        #banner {display: none;}
    } 
    @media (max-wodth: 800px) {
        
    }
 
</style>
