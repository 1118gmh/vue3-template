<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
const router = useRouter()
const route = useRoute()
const isClickButton = ref(false)
const isMask = ref(false)
let browser: any = navigator.userAgent.toLowerCase();
let isWechat: any = browser.match(/MicroMessenger/i) == "micromessenger";

const aliPay = (res: any) => {
    const div = document.createElement('div');
    div.innerHTML = res.data.option;  //res.data是返回的表单
    console.log('res.option', res.data.option);
    document.body.appendChild(div);
    (document as any).forms.alipaysubmit.submit();
}


// 点击弹框支付
const finishBtn = () => {
    isClickButton.value = true
    isMask.value = true
}
const clickMask = () => {
    isClickButton.value = false
    isMask.value = false
}
//微信方法
const onBridgeReady = (request_data: object): void => {
    (window as any).WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        request_data,
        (res: any) => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                // Notify({ type: "success", message: "支付成功" });
                router.push({
                    path: "/result",
                });
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            }
        }
    );
};
const wechatPay = (result: object): void => {
    //封装请求微信支付接口数据
    var request_data = {
        appId: (result as any).appId,
        timeStamp: (result as any).timeStamp + "",
        nonceStr: (result as any).nonceStr,
        package: (result as any).package,
        signType: "MD5",
        paySign: (result as any).paySign,
    };
    if (typeof (window as any).WeixinJSBridge == "undefined") {
        if ((document as any).addEventListener) {
            (document as any).addEventListener(
                "WeixinJSBridgeReady",
                onBridgeReady(request_data),
                false
            );
        } else if ((document as any).attachEvent) {
            (document as any).attachEvent(
                "WeixinJSBridgeReady",
                onBridgeReady(request_data)
            );
            (document as any).attachEvent(
                "OnWeixinJSBridgeReady",
                onBridgeReady(request_data)
            );
        }
    } else {
        onBridgeReady(request_data);
    }
};
// 微信支付
const wxPay = () => {
    if(isWechat){
        // 微信内支付
        console.log('微信内')
        // orderPay({
        //     pay_type: pay_typeA,
        //     order_sn: order_snA,
        //     gateway: gatewayA,
        //     wap_return_url: wap_return_urlA,
        //     open_id: gather.openid,
        // }).then((res: any) => {
        //     if (res) {
        //         // 微信内置
        //         wechatPay(res.data.option);
        //     }
        // });
    //     wechatPay({
    //       "appId": "wx2421b1c4370ecxxx",   //公众号ID，由商户传入    
    //       "timeStamp": "1395712654",   //时间戳，自1970年以来的秒数    
    //       "nonceStr": "e61463f8efa94090b1f366cccfbbb444",      //随机串    
    //       "package": "prepay_id=wx21201855730335ac86f8c43d1889123400", //由下单接口返回
    //       "signType": "RSA",     //微信签名方式：    
    //       "paySign": "oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ\/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq\/xDg==" //微信签名
    //   });
    }else {
        // 微信外支付
        console.log('微信外')
        // 请求接口，获取h5_hrl跳转       

    }

    
}
//支付宝支付
const zfbPay = () => {
        // orderPay({
        //   pay_type: pay_typeA,
        //   order_sn: order_snA,
        //   gateway: gatewayA,
        //   wap_return_url: wap_return_urlA,
        // }).then((res: any) => {
            // 返回的是表单
        //   if (res.code == 0) {
        //     aliPay(res);
        //   }
        // });

}
</script>
<template>
    <div class="finish_wrapper">
        <div class="finish_countdown">
            <span>00</span>
            <span>30</span>
            <span>00</span>
        </div>
        <div style="" class="finish_mask" :style="isMask ? 'display:block;' : 'display:none;'" @click="clickMask"></div>
        <div class="finish_pay" :style="isClickButton ? 'transform: translateY(vw)' : 'transform: translateY(155vw)'">
            <img src="@/assets/finishPay.png" alt="" class="finish_img">
            <div class="wx_pay" @click="wxPay"></div>
            <div class="zfb_pay" @click="zfbPay"></div>
        </div>
        <div class="finish_button">
            <div style="width: 70vw;height:12vw;position:fixed;bottom:8vw;left:15vw;border-radius:6vw;"
                @click="finishBtn"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.finish_wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url(@/assets/finishBG.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-color: #201b1d;
}
.finish_countdown {
    width: 19.5vw;
    height: 20px;
    position: absolute;
    top: 21.5vw;
    left: 45vw;
    display: flex;
    justify-content: space-around;
    font-size: 2vw;
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
    bottom: 45vw;

}

.zfb_pay {
    bottom: 32vw;
}
</style>