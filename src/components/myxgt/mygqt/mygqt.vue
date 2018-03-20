<template>
    <div class="ibox">
        <div class="gqt-item">
            <div class="imgbox">
                <span class="del"></span>
                <span class="imgNum">{{5}}张图</span>
                <img src="" alt="">
                <span class="isGQ">高清</span>
            </div>
            <p class="address">成都 花心公馆</p>
            <p class="time">2017-12-13 14:25:09</p>
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
    .ibox{
        background-color: #fff;
        padding:0 0.3rem;
        box-sizing: border-box;
        font-size: 0.12rem;
        .gqt-item{
            width:4.95rem;
            height:5.43rem;
            float: left;
            .imgbox{
                width:100%;
                height:3.7rem;
                position: relative;
                background-color: rgb(218, 32, 72);
                margin-bottom: 0.36rem;
                .imgNum{
                    width:1.2rem;
                    height:0.52rem;
                    background-color: rgba(0,0,0,0.5);
                    position: absolute;
                    left:0;top:0;
                    font-size: 0.3rem;
                    text-align: center;
                    line-height: 0.52rem;
                    color:#fff;
                }
                .isGQ{
                    width: 0.77rem;
                    font-size: 0.27rem;
                    height:0.45rem;
                    background-color: #ff8800;
                    position: absolute;
                    left:0.1rem;
                    bottom:0.1rem;
                    border-radius: 0.08rem;;
                    text-align: center;
                    line-height: 0.45rem;
                    color:#fff;
                }
                .del{
                    
                }
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

