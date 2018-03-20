<template>
    <div class="ibox">
      <div class="content">
        <p class="title" v-if="lineUp">排队中</p>
        <p class="title" v-if="XRing">渲染中</p>
        <p class="title" v-if="XRfailed">渲染失败</p>
        <p class="c-item">预计耗时{{timer.total_time}}个小时</p>
        <p class="c-item">{{timer.yue}}月{{timer.ri}}日{{timer.shi}}:{{timer.fen}}分完成</p>
        <p class="c-item">（退出APP也会渲染哦）</p>
        <button class="c-btn" v-if="XRfailed">重新渲染</button>
      </div>  
    </div>

</template>
<script>
export default {
  props:['datas'],
  data(){
      return{
          lineUp:false,
          XRing:false,
          XRfailed:false,
          timer:""
      }
  },
  methods:{
      getTime(id){
           ajax_post({
                "format": "json",
                "needAll": "1",
                "param": {
                    "session_id":id
                },
                "serviceName": "TD_HSV1_Session_Time"
            },(res) => {
                console.log(res)
                var beginTime = new Date(res.rows[0].last_data*1000);
                    var yue = beginTime.getMonth()+1;
                    var ri  = beginTime.getDate();
                    var shi = beginTime.getHours() >9?beginTime.getHours():'0'+beginTime.getHours();
                    var fen = beginTime.getMinutes() >9?beginTime.getMinutes():'0'+beginTime.getMinutes();
                    this.timer = {
                        total_time:res.rows[0].total_time,
                        yue:yue,
                        ri:ri,
                        shi:shi,
                        fen:fen
                    }
            })
        },
        cxxrfn(){
            if(this.id, this.defvalue.pops.userId){
                ajax_post({
                    "format": "json",
                    "needAll": "1",
                    "param": {
                        "session_id":this.id,
                        "task_status":1,
                        "is_front":1,
                        "user_id":this.defvalue.pops.userId
                    },
                    "serviceName": "TD_HSV_Render_Session_Update_V1"
                },(res) => {
                    window.location.reload();
                })
            }
        },
  },
  created(){
      this.getTime(this.datas.session_id)

      console.log(this.datas.session_status)
      if(this.datas.session_status == 1 || this.datas.session_status == 6){
          this.lineUp=true;
      }else if(this.datas.session_status == 2){
          this.XRing=true;
      }else if(this.datas.session_status == 5){
          this.XRfailed=true;
      }
  }
}
</script>
<style lang="less" scoped>
   .ibox{
        width:100%;;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f6f6f6;
        .content{
            width:100%;
            text-align: center;
            .title{
                line-height: 1;
                height:0.33rem;
                font-size: 0.32rem;
                width:100%;
                color:#ff8800;
                margin-bottom: 0.22rem;
            }
            .c-item{
                color:#a7a7a7;
                font-size: 0.26rem;
                line-height: 1;
                margin-bottom:0.13rem;
                &:last-child{
                    margin-bottom: 0.28rem ;
                }
            }
            .c-btn{
                width:2.5rem;
                height:0.66rem;
                background-color: #ff8800;
                color:#fff;
                font-size: 0.32rem;
                border:0;
                outline: none;
                border-radius: 0.33rem;
                &:active{
                    background-color: #ff7700;
                }
            }
        
        }
   }
</style>
