<template>
  <div id="app">
    <header>
        <div class="one-title">
            <router-link to="/" tag="span" class="title-item active" @click.native="showTitle()">设计精选</router-link>
            <router-link to="/index/mydesign" tag="span" class="title-item"  @click.native="showTitle()">我的设计</router-link>
            <router-link to="/index/myxgt" tag="span" class="title-item"  @click.native="showTitle()">我的效果图</router-link>
            <router-link to="/index/myhx" tag="span" class="title-item"  @click.native="showTitle()">我的户型</router-link>
        </div>
        <div class="two-title" :class="{'fixed':isFixed}" v-if="!showtitle">
            <span class="city tw-item" :class="{'tw-active':checkedArray[item.attr_value]}" @click="isShowAdd(1,item)" v-for="(item,key) in first_rows" :key="key">{{checkedArray[item.attr_value]?checkedArray[item.attr_value]:item.attr_name}}</span>
            <span class="screens tw-item" @click="isShowAdd(1)" v-if="showSX">筛选</span> 
        </div>
        <Address v-if="screen" @closeWin="isShowAdd" :data="activeAttr" @params="pushData" :class="{'scrollTop':isFixed}"></Address>
    </header>
    <router-view />
  </div>
</template>

<script>
import {bus} from "@/bus.js";
export default {
  name: 'App',
    data(){
      return {
         first_rows:[],
         showSX:false,
         last_rows:[],
         list_rows:{},
         hidden:false,
         showtitle:true,
         activeAttr:null,
         user_id:'',
         city_id:'',
         isFixed:false,
         g_city_name:'',
         checkedArray:{},
         screen:false,
         page_num: 1,
         isajax: false,
         paramTitie:{
         "edition_num":"8",
         "per_mdb_id":"3",
         "type": 1
         }

      }
    },
    watch:{
		$route(val){
			switch (val.name) {
				case "DesignJX":
                    this.showSX = false;
                    this.paramTitie["type"] = 1;			
                    this.checkedArray = {};
                    this.gValue.checkedArray.data = {};
                    this.ajax_post_menu();	
					break;
				case "Mydesign":
					this.paramTitie["type"] = 2;
                    this.showSX =true;       
                    this.paramTitie['user_id'] =this.user_id;//'2426733';
					this.paramTitie['g_city_name'] = this.g_city_name;//;"\u6210\u90fd"	
					this.checkedArray = {};
					this.gValue.checkedArray.data = {};
						
                    this.ajax_post_menu();
					break;
				case "Myxgt":
					this.paramTitie["type"] = 3;
                     this.showSX =true;
					this.paramTitie['user_id'] = this.user_id;;//this.user_id;
					this.paramTitie['g_city_name'] = this.g_city_name;//this.gValue.checkedArray.init.city_name;
						
					this.checkedArray = {};
					this.gValue.checkedArray.data = {};
                    this.ajax_post_menu();
					break;
				case "Myhx":
                    this.showSX =true;
					this.paramTitie["type"] = 5;
					this.paramTitie['user_id'] =this.user_id;
					this.paramTitie['g_city_name'] =this.g_city_name;
					this.checkedArray = {};
					this.gValue.checkedArray.data = {};
                    this.ajax_post_menu();	
					break;
				default:
					break;
			}
		}
    },
    methods:{
        showTitle(){
            this.showtitle = true;
        },
      
    ajax_post_menu(){//菜单

        // if(this.paramTitie["type"] == 5 ||this.paramTitie["type"] == 3 || this.paramTitie["type"] ==2 ||this.paramTitie['type'] ==4){
        //   if(this.user_id){
        //       ajax_post({"serviceName":"TD_HSV1_3dchannel_tag_filter","param":this.paramTitie,"format":"json","need":1},(data)=>{
        //         var first_rows =[],last_rows=[];
        //         data = JSON.parse(data).rows[0];
        //             if(data.tag_info){  
        //                 var list =  JSON.parse(data.tag_info);
        //                 for(let i =0;i < list.length;i++){
        //                     if(i < 3){
        //                         first_rows.push(list[i]);
        //                         this.first_rows = first_rows;
        //                     }else{
        //                         last_rows.push(list[i]);
        //                         this.last_rows = last_rows;
        //                     }
        //                 }
        //             }
        //     })
        //   }
        // }else{
           
              ajax_post({"serviceName":"TD_HSV1_3dchannel_tag_filter","param":this.paramTitie,"format":"json","need":1},(data)=>{
				  
                var first_rows =[],last_rows=[];
				this.last_rows = [],
         		this.first_rows = [];
                data = JSON.parse(data).rows[0];
                    if(data.tag_info){
                    var list =  JSON.parse(data.tag_info);
                    if(list.length > 0){
                        this.showtitle = false;
                    }else{
                        this.showtitle = true;
                    }
                        for(let i =0;i < list.length;i++){
							if(i < 3){
								first_rows.push(list[i]);
								this.first_rows = first_rows;
							}else{
								last_rows.push(list[i]);
								this.last_rows = last_rows;
							}
						}
                	}
            })
        //   } 
        
      },
      isShowAdd(stutas, data){
        if(!data){
          this.activeAttr = this.last_rows;
        }else{
          this.activeAttr = data;
        }
        if(stutas == true){
          this.screen = true;
          this.hidden = true;
          if(getCookieValue('isApp')){
                     native_invoke('checkScroll',{canScrolll:false},function(){});
          }
        }else{
            if(getCookieValue('isApp')){
                     native_invoke('checkScroll',{canScrolll:true},function(){});
            }
          this.screen = false;
          this.hidden = false;
        }
	  },
      onScroll(){
        window.onscroll = ()=>{
            var _scrollTop= document.documentElement.scrollTop || document.body.scrollTop;
            var _height = document.querySelector('.ibox').offsetHeight - document.querySelector('header').offsetHeight;
            var _url = window.location.hash;
           if(_scrollTop >100){
              this.isFixed = true;
           } else{
              this.isFixed = false;
           }
           var type = '';
              if(_url == "#/"){
                type = 1;
              }else if(_url == "#/index/mydesign"){
                type =2;
              }else if(_url == "#/index/myxgt"){
                type =3;
              }else if(_url == "#/index/myhx"){
                type = 5;
              }
           if(_scrollTop > _height - 700){
              bus.$emit('type',type);
           }
		}
	  },
	  isUrl(){
			 var _url = window.location.hash;
             var type = "";
			    if(_url == "#/"){
             this.showSX =false;
					type = 1;	
					this.paramTitie["type"] = type;
					this.ajax_post_menu();
				}else if(_url == "#/index/mydesign"){
           this.showSX =true;
					type =2; 
					this.paramTitie["type"] = type;
					this.paramTitie['user_id'] = this.user_id;
					this.ajax_post_menu();                  	  	
				}else if(_url == "#/index/myxgt"){
           this.showSX =true;
					type =3;
					this.paramTitie["type"] = type;
					this.paramTitie['user_id'] = this.user_id;
					this.ajax_post_menu();  			  	
				}else{
					type = 5;
           this.showSX =true;
					this.paramTitie["type"] = type;
                    this.paramTitie['user_id'] = this.user_id;//;'2426733'
					this.ajax_post_menu();  
                } 
        },
         pushData(key,value){   
            if(value == 0){
                delete this.checkedArray[key];
                delete this.gValue.checkedArray.data[key];
                bus.$emit('isajax',false);
            }else{
                this.checkedArray[key]= value.tag_value;
                this.gValue.checkedArray.data[key] = value.tag_value;
                bus.$emit('isajax',true);
            }
        }
    },
   
    created(){
        this.onScroll();
        bus.$on('params',(key,value)=>{
            if(value == 0){
                delete this.checkedArray[key];
                delete  this.gValue.checkedArray.data[key];
                bus.$emit('isajax',false);
            }else{
                this.checkedArray[key]= value.tag_value;
                this.gValue.checkedArray.data[key] = value.tag_value;
                bus.$emit('isajax',true);
            }
        });
        // document.addEventListener('touchmove',this.moveChild,false);
    },
    
    mounted(){
		this.isUrl();
      if(getCookieValue('isApp')) {
            native_invoke && native_invoke("getUserId",{},(data)=>{
                try{  
					data = JSON.parse(data);
                    this.gValue.checkedArray.init.userId   = data.userId;
                    this.user_id = data.userId;
                    this.g_city_name = data.cityName;
                    this.city_id =  data.cityId;
                    this.gValue.checkedArray.init.cityName = data.cityName;
                    this.gValue.checkedArray.init.cityId   = data.cityId;
                    	this.isUrl();
                    bus.$emit('userInit');
                }catch(t){}
            });
        }
    },
     destroyed(){
        bus.$off("params",()=>{});  
    }
  }
</script>
<style lang="less" scoped>
.hidden{
  overflow:hidden;
}
#app {
  position: relative;
  width:100%;
  height: 100%;
  .one-title{
		width:100%;
		height:1.3rem;
		font-size: 0.36rem;
		display: flex;
		color:#333;
		background-color: #fff;
		border-bottom: 1px solid #e0e0e0;
		box-sizing:border-box;
		margin-bottom: 0.24rem;
		.title-item{
		flex:1;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-bottom: 0.05rem solid transparent;
		}
		.router-link-exact-active{
		color:#d81e28;
		font-weight: 600;
		border-bottom-color: #d81e28;
		}
  }
  .two-title{
    background-color: #fff;
    font-size: 0.36rem;
    overflow: hidden;;
    width:100%;
    display: flex;
    height: 1.11rem;
    border-top:1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    box-sizing: border-box;
    &.fixed{
      position:fixed;
      left:0;top:0;
      z-index: 1011;
    }
    .tw-item{
		&.tw-active{
			color:#d81e28;
			&:after{
			content:"";
			display: inline-block;
			width:0.22rem;
			height:0.12rem;
			margin-left:0.24rem;
			background-image:url('//static.youjiagou.com/youjiagou/resources/images/3dsjq/3dsjandroid/normal1.png');
			background-repeat: no-repeat;
			background-size:1.36rem 0.62rem;
			background-position: -0.15rem -0.22rem ;
			}
		}
      flex:1;
      line-height: 1.11rem;
      text-align:center;
      display: flex;
      justify-content: center;
      align-items: center;
      &:after{
        content:"";
        display: inline-block;
        width:0.22rem;
        height:0.12rem;
        margin-left:0.24rem;
        background-image:url('//static.youjiagou.com/youjiagou/resources/images/3dsjq/3dsjandroid/normal1.png');
        background-repeat: no-repeat;
        background-size:1.36rem 0.62rem;
        background-position: -0.53rem -0.22rem;
      }
    }
    .screens{
       &:after{
        content:"";
        display: inline-block;
        width:0.3rem;
        height:0.34rem;
        margin-left:0.24rem;
        background-image:url('//static.youjiagou.com/youjiagou/resources/images/3dsjq/3dsjandroid/normal1.png');
        background-repeat: no-repeat;
        background-size:1.36rem 0.62rem;
        background-position: -0.86rem -0.22rem;
      }
    }
  }
}
</style>
