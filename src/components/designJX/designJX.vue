<template>
    <div class="ibox">
        <h2 class="title">共{{listData['total']}}个设计作品</h2>
        <ul class="content">
            <li class="imgItem" v-for="(item,key) in listData['data']" :key="key">
                <!-- {{item}} -->
                <p class="imgbox" @click="OpenURL(item)">
                    <img :src="R_IMG +item.resource_img" alt="" class="w100">
                </p>
                <p class="description">
                    <span class="word left">{{item.resource_title}}</span>
                    <span class="num right">
                        <i class="eyes"></i><i class="people">{{item.view_num}}</i>
                    </span>
                </p>
            </li>
        </ul>
        <router-view></router-view>
    </div>
   
</template>
<script>
import {bus} from "@/bus.js";
export default {
    // props:['data'],
    data(){
       return{
            R_IMG:R_IMG,
            page_num:1,
            isAjax:false,
            g_city_name:'\u6210\u90fd',//this.gValue.checkedArray.init.cityName
            listData:{data:[],total:""},
            lists:null,
            paramList:{
            "city_id":this.gValue.checkedArray.init.city_id,
            "edition_num": "8",
            "page_num":1,
            "g_city_name":this.gValue.checkedArray.init.cityName,
            "per_mdb_id": "3",
            "row_num": "10",
            "type": 1,
          }
            // serverName:"TD_HSV1_3Ddesign_solr_v3"
       }
    },
    methods:{
        ajax_post_list(){//列表
        // alert('设计精选')
            this.isAjax = true;
            var _this = this;
            // this.paramList.g_city_name = this.g_city_name;
            ajax_post({"serviceName":"TD_HSV1_3Ddesign_solr_v3","param":this.paramList,"format":"json","need":1},(data)=>{
            data = JSON.parse(data).rows[0];
             var dataList = JSON.parse(data.resource_info);
              this.listData.total = data.total_num;
               if(dataList.length > 0){
                    this.listData.data = this.listData.data.concat(dataList);
                    this.isAjax = false;
                    bus.$off("isajax",()=>{});
                }
            })
        },
        busType(data){
            if(data == '1'){
                if(!this.isAjax){
                    this.paramList.page_num=this.page_num++;
                    this.ajax_post_list();
                }
            }
        },
        busFn(data){//获取点击筛选项
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
        OpenURL(data){//点击跳转
             if(getCookieValue('isApp')){
                //android 打开url
				native_invoke('openUrl', {url:data.resource_url, resource_id:data.resource_id, resource_img:data.resource_img});
			}else{
                var url = data.resource_url;
                url = url+"?userId="+(this.gValue.checkedArray.init.userId||'-1')+"&resourceid="+data.resource_id;
                window.open(data.vtour);
            }
        },
       
    },
    created(){
        if(this.listData.total ==""){
             this.ajax_post_list();//c初始化数据
        }
        bus.$on('type',this.busType);
        bus.$on('isajax',this.busFn);
      
    },
    destroyed(){
        bus.$off("isajax",this.busFn);
        bus.$off("type",this.busType);
    }
}
</script>
<style lang="less" scoped>
   
    .ibox{
        background-color: #fff;
        font-size: 0.12rem;
        .title{
            padding-left:0.3rem;
            box-sizing: border-box;
            width:100%;
            height:0.93rem;
            font-size:0.32rem;
            color:#999;
            line-height: 0.93rem;
        }
        .content{
            width:100%;
            padding:0 0.3rem;
            box-sizing: border-box;
            .imgItem{
                width:100%;
                height:6.84rem;
                .imgbox{
                    width: 100%;
                    height:5.84rem;
                    margin-bottom: 0.3rem;
                    
                }
                .description{
                    height:0.32rem;
                    line-height: 1;
                    .word{
                        font-size: 0.32rem;
                        color:#333;
                    }
                    .num{
                        color:#999;
                        display: flex;
                        font-size: 0.28rem;
                        .eyes{
                            width:0.48rem;
                            height:0.32rem;
                            background:url('//static.youjiagou.com/youjiagou/resources/images/3dsjq/3dsjandroid/eyes.png') no-repeat;
                            background-size: cover;
                            margin-right:0.18rem;
                        }
                        .people{
                            font-size: 0.27rem;
                        }

                    }
                }
            }
        }
    }
</style>

