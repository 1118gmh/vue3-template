<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {useRoute,useRouter} from 'vue-router'
import axios from 'axios';
const route = useRoute()
const router = useRouter()
const resultImg = ref('')
const isPay = ref(false)
const isTip = ref(true)
const copyWX = ()=>{
	var input = document?.getElementById("wxh"); //选择要复制的内容
  input.select();
	input.setSelectionRange(0, input.value.length); //选取input里面文字的长度
	document.execCommand('Copy'); //复制选中的文字到粘贴板
  window.alert("微信号已复制，请前往微信添加！")
  var chatUrl = "weixin://";
  if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
    var ifr = document.createElement("iframe");
    ifr.src = chatUrl;
    ifr.style.display = "none";
    document.body.appendChild(ifr);
  } else {
    window.location.href = chatUrl;
  }
}

const toLoad = ()=>{
  window.location.href = "https://apps.apple.com/cn/app/id1606870909"
}


// const downloadIamge = ()=> {
//       console.log(1)
//       var image = new Image();
//       //跨域会导致a标签在部分浏览器中会直接打开新标签页 解决跨域 Canvas 污染问题
//       image.setAttribute("crossOrigin", "anonymous");
//       image.onload = function () {
//         var canvas = document.createElement("canvas");
//         canvas.width = image.width;
//         canvas.height = image.height;
 
//         var context = canvas.getContext("2d");
//         context.drawImage(image, 0, 0, image.width, image.height);
//         var url = canvas.toDataURL("image/png");
 
//         // 生成一个a元素
//         var a = document.createElement("a");
//         // 创建一个单击事件
//         var event = new MouseEvent("click");
 
//         // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
//         a.download = "下载图片名称";
//         // 将生成的URL设置为a.href属性
//         a.href = url;
 
//         // 触发a的单击事件
//         a.dispatchEvent(event);
//       };
//       // console.log('http://'+resultImg.value.slice(8))
//       image.src = resultImg.value
//     }

// const imgRef = ref(null)
// const loop = ref("")
// const downloadIamge = ()=> {
//   console.log(1)
//     // html2canvas(imgRef.value).then((canvas) => {
//     //   console.log(canvas)
//     //     // let dataURL = canvas.toDataURL("image/jpg");
//     //     // this.dataURL = dataURL;
//     // });
// }
// const downLoadImage = ()=>{
//       // //下载图片地址和图片名
//       // var image = new Image();
//       // // 解决跨域 Canvas 污染问题
//       // image.setAttribute("crossOrigin", "anonymous");
//       // image.onload = function() {
//       //   var canvas = document.createElement("canvas");
//       //   canvas.width = image.width;
//       //   canvas.height = image.height;
//       //   var context = canvas.getContext("2d");
//       //   context.drawImage(image, 0, 0, image.width, image.height);
//       //   var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
//       //   var a = document.createElement("a"); // 生成一个a元素
//       //   var event = new MouseEvent("click"); // 创建一个单击事件
//       //   a.download = name || "photo"; // 设置图片名称
//       //   a.href = url; // 将生成的URL设置为a.href属性
//       //   a.dispatchEvent(event); // 触发a的单击事件
//       // };
//       // image.src = resultImg.value;
//         var canvas = document.createElement("canvas");
//         canvas.width = imgRef.value.width;
//         canvas.height = imgRef.value.height;
//         var context = canvas.getContext("2d");
//         var url = context.getImageData(0,0,imgRef.value.width, imgRef.value.height)
//         // context.drawImage(imgRef.value, 0, 0, imgRef.value.width, imgRef.value.height);
//         // var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
//         var a = document.createElement("a"); // 生成一个a元素
//         var event = new MouseEvent("click"); // 创建一个单击事件
//         a.download = name || "photo"; // 设置图片名称
//         a.href = url; // 将生成的URL设置为a.href属性
//         a.dispatchEvent(event); // 触发a的单击事件
//       console.log(imgRef.value)
      
// }

// const exportImg = (url: string, name?: string): void => {
//   const x = new XMLHttpRequest();
//   x.open("GET", url, true);
//   x.responseType = "blob";
//   x.onload = function () {
//     const url = window.URL.createObjectURL(x.response);
//     console.log(url);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = name ? name : url;
//     a.click();
//   };
//   x.send();
// };
// const touchStart = () => {
//   clearTimeout(loop.value)
//   loop.value = setTimeout(()=>{
//     exportImg(resultImg.value)
//   },1000)
// }
// const touchEnd = () => {
//   clearTimeout(loop.value)
// }
// const aaa = ()=>{
//   console.log(resultImg.value)
//   window.aaaa(resultImg.value)
// }
const getImg = async ()=>{
  const osn = route.query.osn
  console.log(osn)
  const ispayRes = await axios.post("https://nanguimi.zhenxinzhenyi.cn/api/testing/payresult",{osn:osn,platv:2})
  console.log(ispayRes)
  if(ispayRes.data.data.result === "2"){
      isPay.value = true
      _baq.track("active_pay_h5", {assets_id: "1314", product_name: '九型人格', product_price: 19.9})
      const img = ispayRes.data.data.img
      console.log(img)
    if(img !== null){
      resultImg.value = img
    }
  }else{
    return false
  }
}
const back = ()=>{
  sessionStorage.clear()
  router.push({
    path: "/Start"
  })
}
const hasPay = ()=>{
  getImg().then(res=>{
    if(!res){
      isTip.value = false
    }
  })
}
onMounted(()=>{
  getImg()
})
</script>
<template>
<div class="result_wrapper">
    <div style="display:relative;" v-if="isPay">
      <!-- <div @click="aaa" style="width: 100px;height:100px;background:red;">瞎在</div> -->
       <input type="text" id="wxh" class="wxh" name="wxh" value="zcj9179" readonly="readonly">
      <div class="btn" @click="copyWX"></div>
      <img :src="resultImg" alt="" class="result_img">
    </div>
    <div v-else style="position: absolute;width: 70vw;height: 30vw;top: 40vh;left: 15vw;display: flex;justify-content: space-between;align-items: center;color: #666;flex-direction: column;border-radius: 3vw;box-shadow: 1px 1px 10px 0 rgba(0, 0, 0, .3);z-index: 100;background-color: white;">
      <div style="display: flex;justify-content: center;align-items:center;flex: 1;width: 100%;border-bottom: 1px solid #f6f6f6;" v-if="isTip">请问您是否已支付该订单？</div>
      <div style="display: flex;justify-content: center;align-items:center;flex: 1;width: 100%;border-bottom: 1px solid #f6f6f6;" v-else>抱歉，您还未支付！</div>
      <div style="display: flex;flex-basis: 8vw;width: 100%;justify-content: space-between;align-items: center;">
        <div style="flex: 1;height: 100%;text-align: center;line-height: 8vw;border-right: 1px solid #f6f6f6;border-bottom-left-radius: 3vw;" class="return" @click="back">重新测试</div>
        <div style="flex: 1;height: 100%;text-align: center;line-height: 8vw;border-bottom-right-radius: 3vw;" class="hasPay" @click="hasPay">已支付</div>
      </div>
    </div>
    <div class="finish_mask" :style="isPay ? 'display:none;' : 'display:block;'"></div>
    <img src="@/assets/load.png" alt="" style="width: 100vw;position: fixed;bottom: 0;" @click="toLoad">
</div>
</template>
<style lang="scss" scoped>
.result_wrapper {
  width: 100vw;
  position: relative;
}
.result_img {
    width: 100%;
}
.wxh {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.btn {
  z-index: 999;
  position: absolute;
  top: 127.8vw;
  left: 41.5vw;
  width: 43.5vw;
  height: 9vw;
  
}
.return:active {
  background-color: #ccc;
  color: white;
}
.hasPay:active {
  background-color: #ccc;
  color: white;
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
</style>