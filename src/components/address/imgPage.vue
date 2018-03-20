<template>
	<div class="big-img">
		<img class="bimg" :src="R_IMG + showImg.pic_img" alt="">
		<!-- R_IMG -->
		<div class="img-box">
			<div class="img-list-info">
				<div class="left-card">
					<p class="room-title">{{showImg.task_title}}</p>
					<p class="number-text"><span>{{pageIndex}}</span>/{{pageCount}}</p>
				</div>
				<ul class="img-right-list-box" v-if="smimg">
					<li class="img-bar" :class="{'active':showImg.pic_img==vimg.pic_img}" v-for="(vimg, key) in smimg" :key="key" @click="changeBigImg(vimg, key)" ><img :src="R_IMG + vimg.pic_img" alt=""></li>	
				</ul>
			</div>
		</div>
		<span class="downloadBtn" @click="downloadImg()"></span>
		<span class="removeBtn" @click="removeImg()"></span>
	</div>
</template>

<script>
// import { bus } from '@/lib/bus.js'
import {bus} from "@/bus.js";
export default {

	created(){
		var sectionid = this.$route.params.session_id;
		this.sectionid = sectionid;
		if(!sectionid){
			this.$router.push({name:'Myxgt'})
		}
            this.ajax_get_list({
				session_id: sectionid,
				user_id:this.gValue.checkedArray.init.userId
			})
	},
	data() {
		return {
			smimg:[],
			showImg:{
				pic_img:null,
			},
			pageCount:0,
			pageIndex:1,
			sectionid:'',
			R_IMG:R_IMG
		}
	},
	methods: {
		ajax_get_list(data){
			ajax_post({"serviceName":"TD_BUV1_UserPic_GqInfo","param":data,"format":"json","need":1},(res)=>{
				res = JSON.parse(res);
				console.log(res)
            // this.$http.get({
            //     "format":"json",
            //     "needAll":"1",
            //     "param": data,
            //     "serviceName":"TD_BUV1_UserPic_GqInfo"
            // }).then(res => {
                if(res.code == 0){
					if( res.rows.length>0){
						this.smimg = res.rows;
						console.log(res.rows)
						this.pageCount = res.rows.length;
						this.showImg = res.rows[0];
					}else{
						console.log("没有高清图")
					}
                }
            // }, err => {
            //     console.log(err)
			// })
			})
		},
		changeBigImg(img,index){
			this.showImg = img;
			this.pageIndex = Number(index)+1;
		},
		removeImg(){
			let isshow = confirm("是否要删除图片");
			if(isshow){
					ajax_post({"serviceName":"TD_HSV1_UsePic_Gq_Del","param":{task_id:this.showImg.task_id,user_id:this.gValue.checkedArray.init.userId},"format":"json","need":1},(res)=>{
						res = JSON.parse(res);
							if(res.code == 0){
								this.ajax_get_list({
									session_id: this.sectionid,
									user_id:this.gValue.checkedArray.init.userId
								})
							}
					})
				// this.$http.get({
				// 	"format":"json",
				// 	"needAll":"1",
				// 	"param": {
				// 		task_id:this.showImg.task_id,
				// 		user_id:this.defvalue.pops.userId
				// 	},
				// 	"serviceName":"TD_HSV1_UsePic_Gq_Del"
				// }).then(res => {
				// 	if(res.code == 0){
				// 		this.ajax_get_list({
				// 			session_id: this.sectionid,
				// 			user_id:this.defvalue.pops.userId
				// 		})
				// 	}
				// }, err => {
				// 	console.log(err)
				// })
			}
			
		},
		downloadImg(){
			var src = R_IMG+this.showImg.pic_img;
			if (window.messenger && window.messenger.downLoadImg) {
               	window.messenger.downLoadImg(src);
			}
		}
	}
}
</script>

<style scoped lang='less'>
@rem:1/100rem;
.big-img{
	width:100%;
	height:100%;
	overflow: hidden;
	position: absolute;
	left:0;top:0;
	background: #ccc;
	display: flex;
    justify-content: center;
    align-items: center;
	.bimg{
		width:100%;
		display: block;
	}
}
.removeBtn{
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY3OTU4MDQ3QkUzMTExRTdCMjAyQ0Y2NkFBNUI1NDZGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY3OTU4MDQ4QkUzMTExRTdCMjAyQ0Y2NkFBNUI1NDZGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njc5NTgwNDVCRTMxMTFFN0IyMDJDRjY2QUE1QjU0NkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njc5NTgwNDZCRTMxMTFFN0IyMDJDRjY2QUE1QjU0NkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7uBNNGAAABMUlEQVR42uyasQrCMBCGGym4WHF3Flcn9QHExc0n8Sl8FSc3H8JBRMGl7u4K7eIS/+oNTpq2SdT6H3zcUO6SrwmpEJXWOqhC1IKKBEUoQhE/Ih2wBBegDblITcfGBJSF47cL1qBVsP4MhiD+9IrMS0gEUjv/hhXJtkizZI8ERJ8WsfXTQJUpDj1N0tYLUZU/fsMcb0Db2AIFVshoPH4QKUIRPyL6xfFZ9BlXhCIUoQhFKEIRilCEIhShyE9EaKmPcvCMW+tvRK6Smx7m1ZCcuBDZSh55EBlLPrgQWUguex/yLp7vSxbGVdm1giF1sNOPOIIpiHLUvyOSnrGMsZcxjerz3o+0wQr0HG+tPZiAk6tTK2s8ADOwAanFyafSM+vdzyNx/yDxvygUoQhFfipuAgwAh3bcxcqaO0cAAAAASUVORK5CYII=') no-repeat center center;
	background-size:cover;
	width: 60*@rem;
	height: 60*@rem;
	position: absolute;
	top: 50*@rem;
	right: 40*@rem;
	cursor:pointer;
}
.downloadBtn{
	background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAABp0lEQVRYhe2ZvUoDQRCAvywSLSyiItrYirVIII2FpSIEawufIHmEzTyCvoFgryD6ADYJIVhra6WI0cJCU2QsskdOjIl/u/FgP1jYmZ27/e7Y4o7JqSopZoEKsAMsA5OE5xW4Bo6BAxFpJwu5lOwWcAQUgut9zhOwKyJn0JfdBE4Bkyp8ALrAfEC5e+cwl8p1gW0ROUdVC6ra1j4NVS2qKqpa1rCUa7Uabv9GKt9W1YIBqsCMe4o6sA40A77ND4hI03nUXWoGqBqgnKqrAJ3AbgMRkQ49n4SyAVZccAe0glsNQURa9LwAVgww5YJbj/seAjk3Dr95beI1ZYaW/TOirC+irC+irC8yJTsRaJ8N4MTNV396k1CyS278ikwdgyjri1Fn9obvfyX9hpthi6NkL4G9P1MZgIh8uTZTxyDK+iLK+iLK+iLK+iLK+iLK+sIAL26+OE6RISReLwa4csECsDYen8FYa9foeQFcGfp/nQAHQD641QCstXl6PgknBtgHHl2iBFwAxcBu77DWFp1HyaUegf1R3ZrnkJKOaT7p1mSyD5bwrzuMbx0QA5moBc5yAAAAAElFTkSuQmCC') no-repeat center center;
	background-size:44*@rem 44*@rem;
	width: 60*@rem;
	height: 60*@rem;
	position: absolute;
	top: 50*@rem;
	right: 125*@rem;
	cursor:pointer;
}
.img-box{
	width: 500*@rem;
	height: 100*@rem;
	position: absolute;
	bottom: 40	*@rem;
	left: 0;
	right: 0;
	margin: auto;
	font-size: 12px;
	border-radius: 10px;
	background-color: rgba(0,0,0,.5);
}
.left-card{
	width: 120*@rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	justify-content: center;
	align-items: center;
	background-color: rgba(0,0,0,.7);
	float: left;
}
.img-list-info{
	display: flex;
	width: 100%;
	height: 100%;
	color: #fff;
	justify-content: center;
	align-items: center;
}
.img-right-list-box{
	flex: 1;
	height: 100%;
	box-sizing: border-box;
	padding: 5*@rem;
	overflow: auto;
	.img-bar{
		list-style: none;
		float: left;
		box-sizing: border-box;
		padding: 5*@rem;
		height: 100%;
		&.active{
			padding: 0;
			border: 5*@rem solid #4e9ffb;
		}
		img{
			height: 100%;
		}
	}
}
.room-title{
	font-size: 15*@rem;
	text-align: center;
}
.number-text{
	text-align: center;
	span{
		font-size: 25*@rem;
	}
	font-size: 12*@rem;
}
</style>