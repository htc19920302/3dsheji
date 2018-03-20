<template>
<transition name="tbox" mode="out-in" >
    <div class="container" >
        <div class="ibox">
            <div class="add-box">
                <p class="title">{{title}}
                    <span class="del" @click="closeWin()"></span> 
                </p>
                <ul class="addBox">
                    <li class="one-item" v-if="data.attr_list"  @click="change(data.attr_value,0)">全部</li>
                    <li :class="isActiveFn(data.attr_value, item)" v-if="data.attr_list" class="addItem" v-for="(item,key) in JSON2OBJ(data.attr_list)" :key="key" @click="change(data.attr_value,item)">
                        <span>{{item.tag_value}}</span>
                    </li>
                    <li v-if="!data.attr_list" class="addItem addItems" v-for="(list,key) in data" :key='key' @click="changeT_tite(list)">
                        <span>{{list.attr_name}}</span>
                    </li>
                </ul>
            </div>
        </div>
       
        <div class="ibox" v-if='child.start'>
            <div class="add-box">
                <p class="title">{{child.title}}
                    <span class="del" @click="closeChild()"></span>
                </p>
                <ul class="addBox">
                     <p class="one-item" @click="change(child.key,0)">全部</p>
                      
                    <li class="addItem" :class="isActiveFn(child.key, item)" v-for="(item,key) in JSON2OBJ(child.list)" :key="key" @click="change(child.key,item)">
                        <span>{{item.tag_value}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
</transition>
</template>
<script>
import {bus} from "@/bus.js";
export default {
  props:['data'],
  data(){
      return{
          title:'',
          t_title:false,
          child:{
              title:null,
              start:false,
              list:[],
              key:''
          }
      }
  },
  methods:{
      isActiveFn(attr_value, data){
          return this.gValue.checkedArray.data[attr_value]==data.tag_value?' active':'';
      },
      closeWin(data){
          if(!data){
              this.$emit('closeWin',0)
          }else{
              this.$emit('closeWin',0,data)
          }
          
      },
      closeChild(){
          this.child.start = false;
      },
      JSON2OBJ(str){
          if( typeof str == 'string'){
               return JSON.parse(str);
          }
          return str
      },
      change(key,item){
        this.gValue.checkedArray.init.tag_value = item.tag_value;
        this.gValue.checkedArray.data[key] = item.tag_value;
        this.$emit("params",key,item)
        this.closeWin();

      },
      setTitle(data){
          if(data.attr_name){
              this.title = data.attr_name
          }else{
              this.title = "筛选"
          }
      },
      changeT_tite(data){
          this.child.list=data.attr_list;
          this.child.key = data.attr_value;
          this.child.start=true;
          this.child.title = data.attr_name;
      },
       stopScorll(e){
            e = e ||event;
            e.preventDefault();
            // e.stopPropagation();
            
        }
  },
  created(){
      
    //   console.log(this.data)
      this.setTitle(this.data);
        // document.documentElement.onscroll = (e)=>{
        //     e = e ||event;
        //     e.stopPropagation();
        //     e.preventDefault();
        //     console.log(1)
        // }
  }
}
</script>
<style lang="less" scoped>
    .tbox-enter-active,.tbox-leave-active{
        transition: all .5s;
        transform: translateX(0%)
        
    }
    .tbox-enter, .tbox-leave-to {
        transition: all .5s;
        transform: translateX(50%)
    }
      .active{
            color:#d81e28;
            position: relative;
            &:after{
                content:"";
                width:0.57rem;
                height:0.38rem;
                position: absolute;
                top:0;bottom:0;right:0.5rem;
                margin:auto;
                background: url('//static.youjiagou.com/youjiagou/resources/images/3dsjq/3dsjandroid/yn.png') no-repeat;
                background-size: 1.74rem 0.79rem;
                background-position: -1.02rem -0.21rem;
            }
      }
        .container{
            position: fixed;
            width: 200%;
            background-color: rgba(0, 0, 0, 0.5);
            height:100%;
            overflow-x:hidden;
            overflow-y: auto;
            left:0;top:0rem;
            z-index: 99;
            &.scrollTop{
                top:1.11rem !important;
            }
            .ibox{
            font-size: 0.12rem;
            position: absolute;
            width: 50%;
            height:100%;
            &.scrollTop{
                top:1.11rem !important;
            }
            .add-box{
                width: 8.65rem;
                height:100%;
                overflow-y: auto;
                position: absolute;
                top:0;right:0;
                background-color: #fff;
                .title{
                    font-size: 0.42rem;
                    width: 100%;
                    height:1.38rem;
                    position: absolute;
                    right: 0;top:0;
                    font-weight: 600;
                    border-bottom:1px solid #b3b3b3;
                    box-sizing: border-box;
                    text-align: center;
                    line-height: 1.37rem;
                    .del{
                        position: absolute;
                        top:0;bottom:0;left:0.7rem;
                        margin:auto;
                        width:0.42rem;height:0.42rem;
                        background: url('//static.youjiagou.com/youjiagou/resources/images/3dsjq/3dsjandroid/yn.png') no-repeat;
                        background-size: 1.74rem 0.79rem;
                        background-position: -0.22rem -0.18rem;
                    }
                }
                .one-item{
                    width:100%;
                    height:1.4rem;
                    padding-left:0.5rem;
                    box-sizing: border-box;
                    line-height: 1.39rem;
                    font-size: 0.38rem;
                    color:#333;
                    border-bottom: 1px solid #e0e0e0;
                }
                .addBox{
                    width:100%;
                    margin-top: 1.38rem;
                    height:calc(100% - 8rem);
                    overflow-y:auto;
                    font-size: 0.38rem;
                    padding-bottom: 1.38rem;
                    box-sizing: border-box;
                    .addItem{
                        padding-left:0.5rem;
                        box-sizing:border-box;
                        width:100%;
                        height:1.4rem;
                        line-height: 1.4rem;
                        border-bottom: 1px solid #e0e0e0;
                        position: relative;
                        &.addItems:after{
                            content:'';
                            width:0.21rem;
                            height:0.39rem;
                            position: absolute;
                            top:0;bottom:0;right:0.48rem;
                            background: url('//static.youjiagou.com/youjiagou/resources/images/3dsjq/3dsjandroid/godown.png') no-repeat;
                            background-size: cover;
                            margin:auto;
                        }
                    }
                }
            }
        }
    }
   
</style>
