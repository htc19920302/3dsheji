<template>
    <div class="ibox">
        <div class="qjt-item">
            <div class="imgBox">
                <span class="del">111</span>
            </div>
            <p class="address">成都 花心公馆</p>
            <p class="time">2017-12-13 14:25:09</p>
        </div>
    </div>
</template>
<script>
import {bus} from "@/bus.js";
export default {
    created(){
        bus.$on("data",(data)=>{
            console.log(data)
        })
    }
}
</script>
<style lang="less" scoped>
    .ibox{
        background-color: #fff;
        padding:0 0.3rem;
        font-size: 0.12rem;
        .qjt-item{
            width:4.95rem;
            height:5.43rem;
            box-sizing: border-box;
            float: left;
            .imgBox{
                width: 100%;
                height:3.7rem;
                position: relative;
                background-color: rgb(248, 2, 228);
                margin-bottom: 0.36rem;
            }
            .address{
                line-height: 1;
                font-size: 0.36rem;
                color:#333;
                height: 0.36rem;
                margin-bottom: 0.24rem;
            }
            .time{
                font-size: 0.25rem;
                line-height: 1;
                height:0.25rem;
                color:#999;
            }
        }
    }
</style>

