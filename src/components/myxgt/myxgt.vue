<template>
    <div class="ibox">
        <h3 class="title">
            <p class="left">
                <!--<router-link to="/index/myxgt/myqjt" tag="span" class="title-item">我的全景图</router-link>
                <router-link to="/index/myxgt/mygqt" tag="span" class="title-item">我的高清图</router-link>-->
                <span class="title-item" :class="{'active':this.isActive==1}" @click ="changBG(1)">我的全景图</span>
                <span class="title-item" :class="{'active':this.isActive==2}" @click ="changBG(2)">我的高清图</span>
            </p>
            <p class="right radect" @click="isShowDel()">{{isRedact}}</p>
        </h3>
        <p class="num">
            共 {{listData['total']}} 个设计作品
        </p>

        <div class="Bbox">
            <div class="gqt-item" v-for="(item,key) in listData['data']" :key="key">
                <div class="imgbox"  @click="OpenURL(item)">
                    <Child v-if="item.session_status !=3" :datas="item"></Child>

                    <!-- {{item}} -->
                    <span class="del" v-if="isDel" @click.stop="removeItem(item)"></span>
                    <!-- <span class="imgNum">{{5}}张图</span> -->
                    <img :src="R_IMG + item.session_img" alt="" class="w100" v-if="item.session_status ==3">
                    <span class="isGQ" v-if="isActive == 2">高清</span>
                   
                </div>
            <p class="address">{{item.session_title}}</p>
            <p class="time">{{item.add_time}}</p>
        </div>
    </div>
    </div>
</template>
<script>
import Child from "../address/child.vue";
import {bus} from "@/bus.js";
export default {
    components:{
    Child
    },
      data(){
          return{
                R_IMG : R_IMG,
                data:"",
                isActive:1,
                isAjax : false,
                page_num:1,
                isDel:false,
                isRedact:"编辑",
                type:3,
                user_id:'',//
                listData:{data:[],total:''},
                paramList:{
                // "city_id":this.gValue.checkedArray.init.cityId,//"322"
                "edition_num": "8",
                // "g_city_name":this.gValue.checkedArray.init.cityName,//'\u6210\u90fd'
                // "page_num": 1,
                "per_mdb_id": "3",
                "row_num": "10",
                // "user_id":this.gValue.checkedArray.init.userId,//
                "type": 3
                }
          }
      },
      methods:{
        changBG(x){
                if(x ==2){
                    bus.$emit("gqt",2);
                }
              if(this.isSelf(x)){
                  return;
              }
              this.isActive = x;
                if(this.isActive == 1){
                    this.paramList.type =3;
                }else{
                    this.paramList.type =4;
                }
                this.listData.data=[];
                this.ajax_post_list();
        },
        isSelf(x){
            return x == this.isActive;
        },
        isShowDel(){
            this.isDel = !this.isDel;
            this.isRedact = this.isDel?'完成':'编辑';
        },
        ajax_post_list(){//列表
            this.gValue.checkedArray.init.userId && (this.user_id = this.gValue.checkedArray.init.userId);
            if(this.user_id){ 
                this.isAjax = true;
                this.paramList['user_id'] = this.user_id;
                this.paramList["city_id"] = this.gValue.checkedArray.init.city_id;
                this.paramList["g_city_name"] = this.gValue.checkedArray.init.cityName;
                // this.paramList["city_id"] ="322";
                // this.paramList["g_city_name"] = '\u6210\u90fd';
                // this.paramList["user_id"] = '2435380'//this.user_id;
                this.paramList.page_num = this.page_num;
                ajax_post({"serviceName":"TD_HSV1_3Ddesign_solr_v3","param":this.paramList,"format":"json","need":1},(data)=>{
                    
                data = JSON.parse(data).rows[0];
               
                this.listData.total = data.total_num;
                var dataList = JSON.parse(data.resource_info);
                    if(dataList.length >0){
                        this.isAjax = false;
                        this.listData.data = this.listData.data.concat(dataList);
                    }
            
                })
            }
           
        },
        removeItem(data) {
            var cof = confirm("确认删除");
            if (cof) {
                var jsondata = {
                    complete_id: data.complete_id,
                    user_id: this.paramList.user_id,
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
            if(data =="3"){
                if(this.isActive == 1){
                    this.paramList.type =3;
                }else{
                    this.paramList.type =4;
                }
                if(!this.isAjax){
                        this.paramList.page_num=this.page_num++;
                        this.ajax_post_list();
                }
            }
        },
        //   openUnit(item) {
        //     ajax_post({
        //         "format": "json",
        //         "needAll": "1",
        //         "param": {
        //             "complete_id":item.complete_id,
        //             "user_id":this.gValue.checkedArray.init.userId
        //         },
        //         "serviceName": "TD_BUV1_CompleteResource_info_F"
        //     }, function (res) {
        //         if (getCookieValue('isApp')) {
        //             native_invoke('mydesign', { designinfo: res });
        //         }
        //     });
        // },
        OpenURL(data){//点击跳转
            if(this.isActive == "1"){
                if(getCookieValue('isApp')){
                    //android 打开url
				    native_invoke('openUrl', {url:data.session_vtour, resource_id:data.session_id, resource_img:data.session_img});
                }else{
                    var url = data.resource_url;
                    url = url+"?userId="+(this.gValue.checkedArray.init.userId||'-1')+"&resourceid="+data.session_id;
                    window.open(data.session_vtour);
                }
            }else{
                if (getCookieValue('isApp')) {
                   native_invoke('openEffect',{
                        imageUrl: data.session_img,
                        sessionId:data.session_id,
                        url:window.location.origin+'/3dsjqimgbox/?sectionid='+data.session_id +'&userid='+this.user_id
                    })

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
                    if(this.isActive == 1){
                        this.paramList.type =3;
                    }else{
                        this.paramList.type =4;
                    }
                    this.ajax_post_list();
            }else{
                    if(this.isActive == 1){
                        this.paramList.type =3;
                    }else{
                        this.paramList.type =4;
                    }
                    delete this.paramList['selected_list'];
                    this.ajax_post_list();
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
    .active{
        color: #d81e28;
        font-weight: 600;
    }
    .ibox{
        background-color: #fff;
        .title{
            font-size: 0.36rem;
            font-weight: 100;
            height: 0.84rem;
            padding-top:0.48rem;
            box-sizing: border-box;
            margin-bottom: 0.5rem;
            .title-item{
                padding:0 0.3rem;
                &:first-child{
                    border-right:1px solid #b3b3b3;
                }  
            }
            .radect{
                padding-right:0.3rem;
                color:#ff8800;
            }
        }
        .num{
            color:#999;
            line-height: 1;
            font-size: 0.32rem;
            padding-left:0.3rem;
            box-sizing: border-box;
        }
        .Bbox{
        background-color: #fff;
        padding:0 0.3rem;
        padding-top:0.38rem;
        box-sizing: border-box;
        font-size: 0.12rem;
        overflow: hidden;
        .gqt-item{
            &:nth-child(2n){
                margin-left:0.3rem
            }
            width:4.95rem;
            height:5.43rem;
            float: left;
            .imgbox{
                width:100%;
                height:3.7rem;
                position: relative;
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
                line-height: 1;
                font-size: 0.36rem;
                color:#333;
                height: 0.36rem;
                width:100%;
                overflow:hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
    }
</style>
