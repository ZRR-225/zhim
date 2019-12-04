<!-- 低概率  lowProbability-->
<template>
	<div class="lowProbability">
		<el-radio-group v-model="type" style="margin-bottom: 20px;" @change="getDataList1()">
			  <el-radio-button :label="1">幸运</el-radio-button>
		</el-radio-group>
		<div>
		<template v-if="type === 1">
			<el-table :data="dataList1" v-loading="dataListLoading" border style="width:100%;">
				<el-table-column
					prop="prizeName"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="giftName"
					label="奖品"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="giftNum"
					label="数量"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="prizeDiamond"
					label="奖额"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="probability"
					label="单抽概率"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="tenProbability"
					label="十连抽概率"
					header-align="center"
					align="center">		
				</el-table-column>
				<el-table-column
					prop="hunderProbability"
					label="百连抽概率"
					header-align="center"
					align="center">
				</el-table-column>
			</el-table>
			<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
				<el-col style="margin-left:60px;">回报率</el-col>
				<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
					<el-col id="p1">{{this.returnGProbability}}%</el-col>
					<el-col id="p2">{{this.returnGtenProbability}}%</el-col>
					<el-col id="p3">{{this.returnGhunderProbability}}%</el-col>
				</div>
			</el-form>
			<el-form style="display: flex;justify-content: space-around;width: 525px;float: right;">
				<el-form-item>
					<!-- 单抽概率编辑 -->
					<el-button type="primary" @click="gsingleHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='黄金蛋单抽概率'
				  :visible.sync="gsingleVisible">
					<el-table :data="dataList1">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="probability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability" placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
<!-- 						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-col size="small"  placeholder="请输入内容">{{(((scope.row.prizeDiamond*scope.row.newProbability)/200)*100).toFixed(5)}}%</el-col>
								</template>
						</el-table-column> -->
					</el-table>
					<!-- 计算黄金蛋单抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnGProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnGProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col >{{this.newreturnGProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="gsingleVisible = false">取消</el-button>
					   <el-button type="primary" @click="gsingleVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
<!-- ///////////////////////////////////////////////////////////////////// -->
				<el-form-item>
					<!--十连抽概率编辑 -->
					<el-button type="success"  @click="gtenHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='黄金蛋十连抽概率'
				  :visible.sync="gtenVisible">
					<el-table :data="dataList1">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="tenProbability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability" placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
					</el-table>
					<!-- 计算黄金蛋十连抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnGtenProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnGtenProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.newreturnGtenProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="gtenVisible = false">取消</el-button>
					   <el-button type="primary" @click="gtenVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
<!-- ///////////////////////////////////////////////////////////////////// -->
				<el-form-item>
					<!-- 百连抽概率编辑 -->
					<el-button type="warning"  @click="ghundredHandle()">编辑</el-button>
				</el-form-item>
				<el-dialog
				  title='黄金蛋百连抽概率'
				  :visible.sync="ghundredVisible">
					<el-table :data="dataList1">
						<el-table-column
							prop="prizeName"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftName"
							label="奖品"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="giftNum"
							label="数量"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="prizeDiamond"
							label="奖额"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="hunderProbability"
							label="原概率"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							label="新概率"
							header-align="center"
							align="center">
								<template slot-scope="scope">
								  <el-input size="small" v-model="scope.row.newProbability" placeholder="请输入内容"></el-input>
								</template>
						</el-table-column>
					</el-table>
					<!-- 计算黄金蛋百连抽的新回报率 -->
					<el-form style="display: flex;line-height:40px;border: 1px solid #ebeef5;">
						<el-col style="margin-left:40px;">原回报率</el-col>
						<div style="display: flex;line-height: 40px;float: right;width:50%;justify-content: space-around;text-align: center;">
							<el-col >{{this.returnGhunderProbability}}%</el-col>
						</div>
						<el-button type="primary" @click="newreturnGhunderProbability1()">新回报率校验</el-button>
						<div style="display: flex;line-height: 40px;float: right;width: 80%;justify-content: space-around;text-align: center;">
							<el-col>{{this.newreturnGhunderProbability}}%</el-col>
						</div>
					</el-form>
					<span slot="footer" class="dialog-footer">
					  <el-button @click="ghundredVisible = false">取消</el-button>
					   <el-button type="primary" @click="ghundredVisibleSubmit()">提交</el-button>
					</span>
				</el-dialog>
			</el-form>
		</template>
		</div>
	</div>
	
</template>

<script>
export default{
	inject:['reload'],
	data(){
		return{
			gsingleVisible:false,
			gtenVisible:false,
			ghundredVisible:false,
			type:1,
			dataList1:[],  //黄金蛋列表
			dataList2:[],  //钻石蛋列表
			dataList3:[],  //人品爆发列表
			pageIndex: 1,
			pageSize: 10,
			dataListLoading: false,
			// -------------------------
			returnGProbability:'',
			returnGtenProbability:'',
			returnGhunderProbability:'',
			newreturnGProbability:'',
			newreturnGtenProbability:'',
			newreturnGhunderProbability:'',
			// ---------------------------------

			// ======================================

		}
	},
    activated () {
      this.getDataList1()
    },
	methods: {
		// 黄金蛋数据
      getDataList1(){
		this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/maskprizedrawlow/queryPrizeList'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,          
			'prizeType':0
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList1= data.data
            // this.totalPage = data.data.total
          } else {
            // this.dataList = []
            // this.totalPage = 0
          }
		  this.dataListLoading = false
		  // console.log(this.dataList1.length)
		  // =========================================================
		  //黄金蛋单抽回报率sumTotal1
		  //黄金蛋十抽回报率sumTotal2
		  //黄金蛋百抽回报率sumTotal3
			var array=this.dataList1
			// console.log(array)
			var a1=0
			var a2=0
			var a3=0
			for(let i=0;i<array.length;i++){
				a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].probability)
				a2 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].tenProbability)
				a3 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].hunderProbability)
			}
			var sumTotal1=((a1/20)*100).toFixed(5)
			var sumTotal2=((a2/20)*100).toFixed(5)
			var sumTotal3=((a3/20)*100).toFixed(5)
			this.returnGProbability=sumTotal1
			this.returnGtenProbability=sumTotal2
			this.returnGhunderProbability=sumTotal3
			if(sumTotal1>90){
				document.getElementById("p1").style.background = "red";
				document.getElementById("p1").style.color = "#fff";
			}else if(sumTotal1>85 && sumTotal1<=90){
				document.getElementById("p1").style.background = "orange";
				document.getElementById("p1").style.color = "#fff";
			}
			else if(sumTotal1>80 && sumTotal1<=85){
				document.getElementById("p1").style.background = "yellow";
				document.getElementById("p1").style.color = "#000000";
			}else if(sumTotal1>75 && sumTotal1<=80){
				document.getElementById("p1").style.background = "lightgreen";
				document.getElementById("p1").style.color = "#fff";
			}
			else if(sumTotal1>65&& sumTotal1<=75){
				document.getElementById("p1").style.background = "darkgreen";
				document.getElementById("p1").style.color = "#fff";
			}
			else if(sumTotal1>=0 && sumTotal1<=65){
				document.getElementById("p1").style.background = "blue";
				document.getElementById("p1").style.color = "#fff";
			}
			// =========================================================
			if(sumTotal2>90){
				document.getElementById("p2").style.background = "red";
				document.getElementById("p2").style.color = "#fff";
			}else if(sumTotal2>85 && sumTotal2<=90){
				document.getElementById("p2").style.background = "orange";
				document.getElementById("p2").style.color = "#fff";
			}
			else if(sumTotal2>80 && sumTotal2<=85){
				document.getElementById("p2").style.background = "yellow";
				document.getElementById("p2").style.color = "#000";
			}else if(sumTotal2>75 && sumTotal2<=80){
				document.getElementById("p2").style.background = "lightgreen";
				document.getElementById("p2").style.color = "#fff";
			}
			else if(sumTotal2>65&& sumTotal2<=75){
				document.getElementById("p2").style.background = "darkgreen";
				document.getElementById("p2").style.color = "#fff";
			}
			else if(sumTotal2>=0 && sumTotal2<=65){
				document.getElementById("p2").style.background = "blue";
				document.getElementById("p2").style.color = "#fff";
			}
		// =========================================================
		//黄金蛋百连抽回报率
			if(sumTotal3>90){
				document.getElementById("p3").style.background = "red";
				document.getElementById("p3").style.color = "#fff";
			}else if(sumTotal3>85 && sumTotal3<=90){
				document.getElementById("p3").style.background = "orange";
				document.getElementById("p3").style.color = "#fff";
			}
			else if(sumTotal3>80 && sumTotal3<=85){
				document.getElementById("p3").style.background = "yellow";
				document.getElementById("p3").style.color = "#000";
			}else if(sumTotal3>75 && sumTotal3<=80){
				document.getElementById("p3").style.background = "lightgreen";
				document.getElementById("p3").style.color = "#fff";
			}
			else if(sumTotal3>65&& sumTotal3<=75){
				document.getElementById("p3").style.background = "darkgreen";
				document.getElementById("p3").style.color = "#fff";
			}
			else if(sumTotal3>=0 && sumTotal3<=65){
				document.getElementById("p3").style.background = "blue";
				document.getElementById("p3").style.color = "#fff";
			}
        })

      },
		// 黄金蛋单抽
		gsingleHandle(){
			// console.log('黄金蛋单抽')
			 this.gsingleVisible= true
			 this.$nextTick(() => {
				 this.getDataList1()
			 })
		},
		// 黄金蛋单抽新回报率
		newreturnGProbability1(){
			var array=this.dataList1
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList1.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList1[s].newProbability=Number(y)
			var r=x*y
			var newreturnGProbability=(((a1+r)/20)*100).toFixed(5)
			this.newreturnGProbability=newreturnGProbability
		},
		// 黄金蛋单抽提交
		gsingleVisibleSubmit(){
			//头等奖
			 var array1=this.dataList1
			 var i=0
			 var sum=0
			 for(let i=0;i<array1.length;i++){
				if(i==0){
					array1[0].leftProbability=0
					array1[0].rightProbability=parseFloat(array1[0].newProbability)			
				}else{
					array1[i].leftProbability=(parseFloat(array1[i-1].rightProbability)).toFixed(5)
					array1[i].rightProbability=(parseFloat(array1[i].newProbability)+parseFloat(array1[i].leftProbability)).toFixed(5)
					sum += parseFloat(array1[i-1].newProbability)
				}
				if(i==(array1.length-1)){
					array1[array1.length-1].leftProbability=array1[(array1.length-1)-1].rightProbability
					array1[array1.length-1].rightProbability=1
				}
			 }
			this.dataList1=array1
			 // console.log(this.dataList1)
			 this.dataList1[((this.dataList1).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)

			  this.$http({
				url: this.$http.adornUrl('/sys/maskprizedrawlow/updatePrizeProbability'),
				method: 'post',
				data: this.$http.adornData({
				  'dataList1':this.dataList1,
				  'prizeType':0,
				  'prizeNumber':1,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message: '保存修改',
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.gsingleVisible = false
					  this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
	  },
		// 黄金蛋十抽
		gtenHandle(){
			// console.log('黄金蛋十抽')
			 this.gtenVisible= true
			 this.$nextTick(() => {
				 
			 })
		},
		//黄金蛋十抽新回报率
		newreturnGtenProbability1(){
			var array=this.dataList1
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList1.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList1[s].newProbability=Number(y)
			var r=x*y
			var newreturnGtenProbability=(((a1+r)/20)*100).toFixed(5)
			this.newreturnGtenProbability=newreturnGtenProbability	
		},
		//黄金蛋十连抽提交
		gtenVisibleSubmit(){
			// console.log('黄金蛋十抽提交')
			 var array1=this.dataList1
			 var i=0
			 var sum=0
			 for(let i=0;i<array1.length;i++){
				if(i==0){
					array1[0].leftProbability=0
					array1[0].rightProbability=parseFloat(array1[0].newProbability)			
				}else{
					array1[i].leftProbability=(parseFloat(array1[i-1].rightProbability)).toFixed(5)
					array1[i].rightProbability=(parseFloat(array1[i].newProbability)+parseFloat(array1[i].leftProbability)).toFixed(5)
					sum += parseFloat(array1[i-1].newProbability)
				}
				if(i==(array1.length-1)){
					array1[array1.length-1].leftProbability=array1[(array1.length-1)-1].rightProbability
					array1[array1.length-1].rightProbability=1
				}
			 }
			this.dataList1=array1
			 // console.log(this.dataList1)
			 this.dataList1[((this.dataList1).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)

			  this.$http({
				url: this.$http.adornUrl('/sys/maskprizedrawlow/updatePrizeProbability'),
				method: 'post',
				data: this.$http.adornData({
				  'dataList1':this.dataList1,
				  'prizeType':0,
				  'prizeNumber':10,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message: '保存修改',
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.gsingleVisible = false
					  this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
		},
		// 黄金蛋百抽
		ghundredHandle(){
			// console.log('黄金蛋百抽')
			 this.ghundredVisible= true
			 this.$nextTick(() => {
				 
			 })
		},
		//黄金蛋百抽新回报率
		newreturnGhunderProbability1(){
			var array=this.dataList1
			// console.log(array)
			var a1=0
			var aa=0
			var a2=0
			var a3=0
			var l=(this.dataList1.length)-1
			for(let i=0;i<l;i++){
				 a1 +=parseFloat(array[i].prizeDiamond)*parseFloat(array[i].newProbability)
				 aa +=parseFloat(array[i].newProbability)
			}
			// console.log(aa)
			var s=(array.length)-1
			var x =parseFloat(array[s].prizeDiamond)
			var y =(1-aa).toFixed(5)
			this.dataList1[s].newProbability=Number(y)
			var r=x*y
			var newreturnGhunderProbability=(((a1+r)/20)*100).toFixed(5)
			this.newreturnGhunderProbability=newreturnGhunderProbability
		},
		//黄金蛋百连抽提交
		ghundredVisibleSubmit(){
			// console.log('黄金蛋百抽提交')
			 var array1=this.dataList1
			 var i=0
			 var sum=0
			 for(let i=0;i<array1.length;i++){
				if(i==0){
					array1[0].leftProbability=0
					array1[0].rightProbability=parseFloat(array1[0].newProbability)			
				}else{
					array1[i].leftProbability=(parseFloat(array1[i-1].rightProbability)).toFixed(5)
					array1[i].rightProbability=(parseFloat(array1[i].newProbability)+parseFloat(array1[i].leftProbability)).toFixed(5)
					sum += parseFloat(array1[i-1].newProbability)
				}
				if(i==(array1.length-1)){
					array1[array1.length-1].leftProbability=array1[(array1.length-1)-1].rightProbability
					array1[array1.length-1].rightProbability=1
				}
			 }
			this.dataList1=array1
			 // console.log(this.dataList1)
			 this.dataList1[((this.dataList1).length)-1].newProbability=(parseFloat(1-sum)).toFixed(5)

			  this.$http({
				url: this.$http.adornUrl('/sys/maskprizedrawlow/updatePrizeProbability'),
				method: 'post',
				data: this.$http.adornData({
				  'dataList1':this.dataList1,
				  'prizeType':0,
				  'prizeNumber':100,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message: '保存修改',
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.gsingleVisible = false
					  this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
		},
// --------------------------------------------------------------------------
	
	// ===============================================================


	},
}
</script>

<style>
</style>
