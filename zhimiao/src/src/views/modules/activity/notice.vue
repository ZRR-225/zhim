<!-- 中奖通知设置 -->
<template>
	<div class="notice">
		<el-form  :model="dataForm" ref="dataForm" label-width="200px" >
			<el-form-item label="房间内中奖通知" prop="startBroadcast">
				<el-input class="inputt"  @keyup.native="changeAmount1"  v-model="dataForm.startBroadcast" placeholder="房间内中奖通知"></el-input>
<!-- 			<el-button @click="roomHandle()" type="primary" class="buttonn">提交</el-button> --> <!-- 房间内中奖通知 -->
			</el-form-item>
			<el-form-item label="全服中奖通知" prop="endBroadcast" class="form2">
				<el-input class="inputt"  @keyup.native="changeAmount2"  v-model="dataForm.endBroadcast" placeholder="全服中奖通知"></el-input>
				<!-- <el-input type="number" v-model="dataForm.endBroadcast" class="inputt"></el-input> -->
<!-- 				<el-button @click="allHandle()" type="primary" class="buttonn">提交</el-button> --> <!-- 全服中奖通知 -->
			</el-form-item>
			<b style="color:#f56c6c;display:none;margin-left: 100px;" id="eg">提示:房间内中奖通知必须小于全服中奖通知</b>	
			<el-form-item class="button1">
				<el-button @click="handle()" type="primary">提交</el-button>
			</el-form-item>
		</el-form>	

	</div>

</template>

<script>
	export default {
		inject:['reload'],
		data(){
			return{
				// roomVisble:false,
				// allVisble:false,
				pageIndex: 1,
				pageSize: 10,
				dataForm:{
					startBroadcast:'',
					endBroadcast:'',
				}
			}
		},
		activated () {
		  this.getDataList()
		},		
		methods:{
			getDataList(){
			this.$http({
			  url: this.$http.adornUrl('/sys/masksystemconstants/queryShout'),
			  method: 'get',
			  params: this.$http.adornParams({
				// 'pageNo': this.pageIndex,
				// 'pageSize': this.pageSize,            
				'startBroadcast': this.dataForm.startBroadcast,
				'startBroadcast':this.dataForm.startBroadcast
			  })
			}).then(({data}) => {
			  if (data && data.code === 0) {
				this.dataForm.endBroadcast = data.data.endBroadcast
				this.dataForm.startBroadcast = data.data.startBroadcast
				// this.totalPage = data.data.total
			  } else {
				// this.dataList = []
				// this.totalPage = 0
			  }
			  this.dataListLoading = false
			})
			},
			changeAmount1(){
				this.dataForm.startBroadcast = this.dataForm.startBroadcast.replace(/[^\d]/g, '')
			},
			changeAmount2(){
				this.dataForm.endBroadcast = this.dataForm.endBroadcast.replace(/[^\d]/g, '')
			},
			//房间中奖通知
			handle(){
				// console.log('房间中奖通知')
				var startBroadcast=Number(this.dataForm.startBroadcast)
				var endBroadcast=Number(this.dataForm.endBroadcast)
				if(startBroadcast>endBroadcast){
					// console.log(startBroadcast)
					// console.log(endBroadcast)
					// console.log('大于')
					document.getElementById('eg').style.display="block"
				}
				else{
					// console.log(startBroadcast)
					// console.log(endBroadcast)
					document.getElementById('eg').style.display="none"
					this.$http({
						url:this.$http.adornUrl(`/sys/masksystemconstants/updateShout`),
						method:'post',
						data:this.$http.adornData({
							'endBroadcast':this.dataForm.endBroadcast,
							'startBroadcast':this.dataForm.startBroadcast,
						})
					}).then(({data})=>{
						if (data && data.code === 0){
						  this.$message({
							message: '操作成功',
							type: 'success',
							duration: 1500,
							onClose: () => {
							  this.reload();
							  this.getDataList()
							}
						  })
						}else {
						  this.$message.error(data.msg)
						}
					})	
				}

			},
			//全服中奖通知
			// allHandle(){
			// 	this.$http({
			// 		url:this.$http.adornUrl(`sys/masksystemconstants/updateShout`),
			// 		method:'post',
			// 		data:this.$http.adornData({
			// 			'endBroadcast':this.dataForm.endBroadcast,
			// 			'startBroadcast':this.dataForm.startBroadcast,
			// 		})
			// 	}).then(({data})=>{
			// 		if (data && data.code === 0){
			// 		  this.$message({
			// 			message: '操作成功',
			// 			type: 'success',
			// 			duration: 1500,
			// 			onClose: () => {
			// 			  this.getDataList()
			// 			}
			// 		  })
			// 		}else {
			// 		  this.$message.error(data.msg)
			// 		}
			// 	})
			// },
			
		},
	}
</script>

<style>
	.notice{
		margin-top:50px;
	}
	.form2{
		margin-top:40px;
	}
	.inputt{
		width:200px;
		text-align: center;
	}
	.button1{
		margin-top:40px;
	}
 input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance:textfield;
    }    
    input[type="number"]{
        -moz-appearance:textfield;
    }
</style>
