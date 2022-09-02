<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
import { computed } from '@vue/reactivity';
import boyList from '@/assets/boy/boyList'
import girlList from '@/assets/girl/girlList'
import "swiper/css/pagination";
import { Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import { Autoplay, Pagination } from "swiper";

const router = useRouter()
const route = useRoute()
console.log(route.query)
const isClickButton = ref(false)
const isMask = ref(false)
const bgImg = ref('')
let osn = '' //单号
const sex = ref('')

let browser: any = navigator.userAgent.toLowerCase();
let isWechat: any = browser.match(/MicroMessenger/i) == "micromessenger";


// 点击弹框支付
const finishBtn = () => {
    _baq.track("game_addiction_h5", {assets_id: "1314"})
    isClickButton.value = true
    isMask.value = true
}
const clickMask = () => {
    isClickButton.value = false
    isMask.value = false
}

// 微信支付
const wxPay = () => {
    axios.post("https://nanguimi.zhenxinzhenyi.cn/api/testing/wxpay",{osn:osn,platv:2}).then(res=>{
        console.log(res)
        if(res.data.code === 0){
            window.location.href = res.data.data
        }
    })


}
//支付宝支付
const zfbPay = () => {
    axios.post("https://nanguimi.zhenxinzhenyi.cn/api/testing/alipay",{osn:osn,platv:2}).then(res=>{
        console.log(res)
        if(res.data.code === 0){
            window.location.href = res.data.data
        }
    })

}
const onSwiper = (swiper) => {
        console.log(swiper);
      };
const onSlideChange = () => {
    console.log('slide change');
};
const s = ref(0)
const m = ref(0)
const h = ref("00")
const minutes = computed(()=>{
    return m.value<10?'0'+m.value:m.value+''
})
const seconds = computed(()=>{
    return s.value<10?'0'+s.value:s.value+''
})
// 倒计时
const resetTime = (timeStamp:number) => {
    let t = timeStamp;
    m.value = Math.floor(t / 60 % 60);
    s.value = Math.floor(t % 60);
    let timer = setInterval(function () {

        if(s.value === 0){
            if(m.value >0){
                m.value --;
                s.value = 60;
            }else{
                s.value = 0;
                clearInterval(timer)
            }
        }
        s.value--;
    }, 1000)
}

onMounted(() => {
    bgImg.value = sessionStorage.getItem('bgImg')
    osn = sessionStorage.getItem('osn')
    sex.value = sessionStorage.getItem('sex')
    resetTime(1800)
    // axios.post("http://nanguimi.zhenxinzhenyi.cn/api/testing/answer",{
    //     sex: sessionStorage.getItem('sex'),
    //     data: sessionStorage.getItem('data')
    // }).then((res)=>{
    //     console.log(res)
    //     if(res.data.code === 0){
    //         bgImg.value = res.data.data.img
    //         resetTime(1800)
    //         osn = res.data.data.osn
    //         console.log(osn)
    //     }else {
    //         console.log('error')
    //     }
    // })
    
})
</script>
<template>
    <div class="finish_wrapper">
        <!-- <div class="finish_countdown">
            <span>{{ h }}</span>
            <span>{{ minutes }}</span>
            <span>{{ seconds }}</span>
        </div> -->
        <div style="width: 100vw;position: relative;">
            <img src="@/assets/boy_bg.jpg" alt="" style="width: 100vw;" v-if="sex === '1'">
            <img src="@/assets/girl_bg.jpg" alt="" style="width: 100vw;" v-else>
            <div style="position: absolute;width: 76vw;top: 86vw;left:12vw;">
                  <swiper
                    :pagination="{
                        dynamicBullets: true
                    }"
                    :modules="[Pagination,Autoplay]"
                    :autoplay="{
                        delay: 2500,
                        disableOnInteraction: false,
                    }"
                    :loop="true"
                    @swiper="onSwiper"
                    @slideChange="onSlideChange"
                    style="width: 76vw;height: 37vw;"
                >
                    <template v-if="sex === '1'">
                        <swiper-slide v-for="(item,index) in boyList" :key="index" style="width: 76vw;box-sizing: border-box;padding: 3vw;">
                            <img :src="item" alt="" style="width: 100%;">
                        </swiper-slide>
                    </template>
                    <template v-else>
                        <swiper-slide v-for="(item2,index2) in girlList" :key="index2" style="width: 76vw;box-sizing: border-box;padding: 3vw;">
                            <img :src="item2" alt="" style="width: 100%;">
                        </swiper-slide>
                    </template>
                    
                </swiper>
                
            </div>
        </div>
        <div class="finish_mask" :style="isMask ? 'display:block;' : 'display:none;'" @click="clickMask"></div>
        <div class="finish_pay" :style="isClickButton ? 'transform: translateY(vw)' : 'transform: translateY(155vw)'">
            <img src="@/assets/finishPay.jpg" alt="" class="finish_img">
            <div class="wx_pay" @click="wxPay"></div>
            <div class="zfb_pay" @click="zfbPay"></div>
            <div class="finish_countdown2">
                <span>{{ h }}:</span>
                <span>{{ minutes }}:</span>
                <span>{{ seconds }}</span>
            </div>
        </div>
        <div class="finish_button">
            <div style="width: 70vw;height:12vw;position:fixed;bottom:8vw;left:15vw;border-radius:6vw;"
                @click="finishBtn"></div>
        </div>
    </div>
</template>
<style lang="scss">
.swiper-pagination-bullet {
    background: white;
}
</style>
<style lang="scss" scoped>

.swiper {
    width: 80vw;
    height: 35vw;
}
.finish_countdown2 {
    position: absolute;
    bottom: 36vw;
    right: 8vw;
    color: white;
}
.finish_wrapper {
    position: relative;
    width: 100vw;
}

.finish_countdown {
    width: 19.5vw;
    height: 4.5vw;
    position: absolute;
    top: 21.5vw;
    left: 45vw;
    display: flex;
    justify-content: space-around;
    font-size: 2vw;
    font-size: 3vw;
}

.finish_title {
    font-size: 30px;
    font-weight: 500;
    color: #9beff7;
    margin-top: 20px;
    margin-left: 20px;
}

.finish_title2 {
    font-size: 18px;
    font-weight: 400;
    color: #9beff7;
    margin-top: 20px;
    margin-left: 20px;
}

.finish_content {
    margin-top: 100px;
    margin-left: 20px;
    font-size: 16px;
    color: #9beff7;
}

.finish_button {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    background: url(@/assets/finish.png);
    background-size: 100%;
    background-position: bottom;
    background-repeat: no-repeat;

}

.finish_pay {
    z-index: 100;
    position: fixed;
    bottom: 0;
    width: 100vw;
    transition: .5s;
    background-color: white;
    border-top-left-radius: 6vw;
    border-top-right-radius: 6vw;
    overflow: hidden;
}

.finish_img {
    width: 100%;
    height: 100%;
}

.finish_mask {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
}

.wx_pay,
.zfb_pay {
    z-index: 100;
    height: 13vw;
    width: 100%;
    position: absolute;
    opacity: .5;
}

.wx_pay {
    bottom: 16.6vw;

}

.zfb_pay {
    bottom: 4vw;
}
</style>