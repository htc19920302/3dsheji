<template>
    <div class="ibox">
        <h3 class="title">
            <span class="num">共 {{listData['total']}} 个设计作品</span>
            <span class="redact" @click="isShowDel()">{{isRedact}}</span>
        </h3>
        <div class="hx-item" @click="addItem()">
            <img src="../../assets/hx.png" alt="" class="w100">
        </div>
        <div class="hx-item" v-for="(item,key) in listData['data']" :key="key">
            <div class="imgBox"  @click="openUnit(item)">
                <!-- {{item}} -->
                <span class="del" v-if="isDel" @click.stop="removeItem(item)"></span>
                <img :src="R_IMG +item.bhouses_img" alt="" class="w100">
            </div>
            <p class="address">{{item.city_name}} {{item.bhouses_type_n}}</p>
            <p class="time">
                <span class="sadd" :title="item.building_name">{{item.building_name}}</span>
                <span >{{dataTime(item.add_time)}}</span>
            </p>

        </div>
    </div>
</template>
<script>
import {bus} from "@/bus.js";
export default {
    data(){
        return{
            R_IMG:R_IMG,
            isDel:false,
            isRedact:"编辑",
            isAjax:false,
             page_num: 1,
            R_IMG:R_IMG,
            user_id:'',
            listData:{data:[],total:''},
            paramList:{
                "city_id":this.gValue.checkedArray.init.cityId,//
                "edition_num":"8",
                "g_city_name":this.gValue.checkedArray.init.cityName,//this.gValue.checkedArray.init.cityName
                // "page_num": 1,
                "per_mdb_id": "3",
                "row_num": "10",
                "user_id":this.gValue.checkedArray.init.userId,//this.gValue.checkedArray.init.userId
                "type": 5
            },
            // serverName:"TD_HSV1_3Ddesign_solr_v3"
        }
    },
    methods:{
         isShowDel(){
            this.isDel = !this.isDel;
            this.isRedact = this.isDel?'完成':'编辑';
        },
        ajax_post_list(){//列表
          this.gValue.checkedArray.init.userId && (this.user_id = this.gValue.checkedArray.init.userId);
            if(this.user_id){
                this.isAjax = true;
                this.paramList["city_id"] = this.gValue.checkedArray.init.city_id;
                this.paramList["g_city_name"] = this.gValue.checkedArray.init.cityName;
                this.paramList["user_id"] = this.user_id;
                this.paramList.page_num = this.page_num;
                ajax_post({"serviceName":"TD_HSV1_3Ddesign_solr_v3","param":this.paramList,"format":"json","need":1},(data)=>{
                data = JSON.parse(data).rows[0];
                this.listData.total = data.total_num;
                var dataList = JSON.parse(data.resource_info);
                    if(dataList.length > 0){
                        this.isAjax = false;
                        this.listData.data =this.listData.data.concat(dataList);
                    }
                })
            }
            
        },
        dataTime(now) {
            now = new Date(now * 1000);
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = ("0" + now.getSeconds()).slice(-2);
            return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
        },
        removeItem(data) {
            // event = evnet ||window.event;
            // event.stopPropagation();
            var cof = confirm("确认删除");
            if (cof) {
                var jsondata = {
                    complete_id: data.complete_id,
                    user_id: this.user_id,
                    is_delete: 1
                };
                ajax_post({
                    "format": "json",
                    "needAll": "1",
                    "param": jsondata,
                    "serviceName": "TD_HSV1_CompleteResource_De"
                },(res)=>{
                    var index = this.listData.data.indexOf(data);
                    this.listData.data.splice(index,1);
                   
                });
            }
        },
        busType(data){
            if(data == '5'){
                if(!this.isAjax){
                    this.paramList.page_num = this.page_num++;
                    this.ajax_post_list();
                }
            }
        },
        busFn(data){
            this.listData.data = [];
            this.page_num = 1;
            if(JSON.stringify(this.gValue.checkedArray.data) != "{}"){
                var selectedArray = [];
                for (var i in this.gValue.checkedArray.data){
                    var str = i + ":" + this.gValue.checkedArray.data[i];
                    selectedArray.push(str);
                }
                this.paramList['selected_list'] = selectedArray.join(',');
                    this.ajax_post_list();
            }else{
                    delete this.paramList['selected_list'];
                    this.ajax_post_list();
            }    
        },
        openUnit(item) {
            ajax_post({
                "format": "json",
                "needAll": "1",
                "param": {
                    "complete_id":item.complete_id,
                    "user_id":this.gValue.checkedArray.init.userId
                },
                "serviceName": "TD_BUV1_CompleteResource_info_F"
            }, function (res) {
                if (getCookieValue('isApp')) {
                    native_invoke('mydesign', { designinfo: res });
                }
            });
        },
        addItem(){
            if(getCookieValue('isApp')){
                native_invoke('addLayout',{},function(){});
            }
        }
    },
    created(){
        this.ajax_post_list();//c初始化数据
        bus.$on('type',this.busType);
        bus.$on('isajax',this.busFn);
        bus.$on('userInit', this.ajax_post_list);
    },
    destroyed(){
        bus.$off("isajax",this.busFn);
        bus.$off("type",this.busType);
        bus.$off('userInit', this.ajax_post_list);
    }
}
</script>
<style lang="less" scoped>
    .ibox{
        height:100%;
        overflow: hidden;;
        background-color: #fff;
        font-size: 0.12rem;
        padding:0 0.3rem;
        box-sizing: border-box;
        .title{
            width:100%;
            height:1.17rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 100;
            .num{
                font-size: 0.32rem;
                color:#999;
            }
            .redact{
                font-size: 0.36rem;
                color:#ff8800;
            }
        }
        .hx-item{
            &:nth-child(2n-1){
                margin-left: 0.3rem;
            }
            background-color: #fff;
            width: 4.95rem;
            height:5.92rem;
            float: left;
            .imgBox{
                width:100%;
                height:4.13rem;
                position: relative;
                margin-bottom: 0.36rem;
                .del{
                    width:0.74rem;
                    height:0.74rem;
                    border-radius: 50%;
                    background-color: rgba(0,0,0,0.6);
                    position: absolute;
                    top:0.24rem;right:0.24rem;
                    background-image: url('//static.youjiagou.com/youjiagou/resources/images/3dsjq/3dsjandroid/del.png');
                    background-repeat: no-repeat;
                    background-size: cover;
                }
            }
            .address{
                font-size: 0.36rem;
                height:0.36rem;
                line-height: 1;
                color:#333;
                width:100%;
                overflow:hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 0.28rem;
            }
            .time{
                font-size: 0.3rem;
                color:#999;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .sadd{
                    width:1.4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

        }
    }

</style>
