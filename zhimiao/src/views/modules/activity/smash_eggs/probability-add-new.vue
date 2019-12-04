<!-- 砸蛋概率新增 -->
<template>
	<el-dialog
	title="新增中奖概率"
	:close-on-click="false"
	:visible.sync="visible">
		<el-form :model="dataForm" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="120px">
			<el-form-item size="mini" label="类型">
				<el-radio-group v-model="dataForm.type">
				  <el-radio :label="1">幸运</el-radio>
				  <el-radio :label="2">豪华</el-radio>
				</el-radio-group>
			</el-form-item>
			<template v-if="dataForm.type === 1">
				<el-form-item size="mini" label="三等奖">
					<el-input v-model="dataForm.diamondThreePrize" placeholder="三等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="四等奖">
					<el-input v-model="dataForm.diamondFourPrize" placeholder="四等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="五等奖">
					<el-input v-model="dataForm.diamondFivePrize" placeholder="五等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="六等奖">
					<el-input v-model="dataForm.diamondSixPrize" placeholder="六等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="七等奖">
					<el-input v-model="dataForm.diamondSevenPrize" placeholder="七等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="八等奖">
					<el-input v-model="dataForm.diamondEightprize" placeholder="八等奖概率"  ></el-input>
				</el-form-item>
<!-- 				<el-form-item label="剩余概率">
					<el-col>{{1-dataForm.zsum}}</el-col>
				</el-form-item> -->
			</template>
			<template v-if="dataForm.type === 2">
				<el-form-item size="mini" label="十连抽系数">
					<el-input v-model="dataForm.goldTenNumber" placeholder="十连抽系数"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="百连抽系数">
					<el-input v-model="dataForm.goldHunderdNumber" placeholder="十连抽系数"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="特等奖">
					<el-input v-model="dataForm.goldEspeciallyPrize" placeholder="特等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="一等奖">
					<el-input v-model="dataForm.goldOnePrize" placeholder="一等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="二等奖">
					<el-input v-model="dataForm.goldTwoPrize" placeholder="二等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="三等奖">
					<el-input v-model="dataForm.goldThreePrize" placeholder="三等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="四等奖">
					<el-input v-model="dataForm.goldFourPrize" placeholder="四等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="五等奖">
					<el-input v-model="dataForm.goldFivePrize" placeholder="五等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="六等奖">
					<el-input v-model="dataForm.goldSixPrize" placeholder="六等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="七等奖">
					<el-input v-model="dataForm.goldSevenPrize" placeholder="七等奖概率"></el-input>
				</el-form-item>
				<el-form-item size="mini" label="八等奖">
					<el-input v-model="dataForm.goldEigthPrize" placeholder="八等奖概率"></el-input>
				</el-form-item>
			</template>
		</el-form>
		<span slot="footer" class="dialog-footer">
		  <el-button @click="visible = false">取消</el-button>
		   <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default{
	data(){
		return{
			visible: false,
			dataForm:{
				type:1,
//幸运
				diamondThreePrize:'',
				diamondFourPrize:'',
				diamondFivePrize:'',
				diamondSixPrize:'',
				diamondSevenPrize:'',
				diamondEightprize:'',
//豪华
				goldTenNumber:1.2,
				goldHunderdNumber:1.5,
				goldEspeciallyPrize:'',
				goldOnePrize:'',
				goldTwoPrize:'',
				goldThreePrize:'',
				goldFourPrize:'',
				goldFivePrize:'',
				goldSixPrize:'',
				goldSevenPrize:'',
				goldEigthPrize:'',
			},
		}
	},
	methods:{
		init () {
			this.visible = true;
			this.$nextTick(() => {
				
			})
		},
		dataFormSubmit () {
			//幸运
			var zthird=Number(this.dataForm.diamondThreePrize)
			var zfourth=Number(this.dataForm.diamondFourPrize)
			var zfifth=Number(this.dataForm.diamondFivePrize)
			var zsixth=Number(this.dataForm.diamondSixPrize)
			var zseventh=Number(this.dataForm.diamondSevenPrize)
			var zeighth=Number(this.dataForm.diamondEightprize)
			var zsum=parseFloat(zthird+zfourth+zfifth+zsixth+zseventh+zeighth)
			// this.dataForm.zsum=parseFloat(zsum)
			// console.log(zsum)
			//豪华
			var hespec=Number(this.dataForm.goldEspeciallyPrize)
			var hone=Number(this.dataForm.goldOnePrize)
			var htwo=Number(this.dataForm.goldTwoPrize)
			var hthird=Number(this.dataForm.goldThreePrize)
			var hfourth=Number(this.dataForm.goldFourPrize)
			var hfifth=Number(this.dataForm.goldFivePrize)
			var hsixth=Number(this.dataForm.goldSixPrize)
			var hseventh=Number(this.dataForm.goldSevenPrize)
			var heighth=Number(this.dataForm.goldEigthPrize)
			var hsum=parseFloat(hespec+hone+htwo+hthird+hfourth+hfifth+hsixth+hseventh+heighth)
			// console.log(hsum)
//-------------------------------------------------------------------------------------
			if ( zsum == 1 || hsum==1) {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
					  this.$http({
						url: this.$http.adornUrl('/sys/maskprizeprobabilityrecord/save'),
						method: 'post',
						data: this.$http.adornData({
						  diamondThreePrize:this.dataForm.diamondThreePrize,
						  diamondFourPrize:this.dataForm.diamondFourPrize,
						  diamondFivePrize:this.dataForm.diamondFivePrize,
						  diamondSixPrize:this.dataForm.diamondSixPrize,
						  diamondSevenPrize:this.dataForm.diamondSevenPrize,
						  diamondEightprize:this.dataForm.diamondEightprize,
						  // 
						  goldTenNumber:this.dataForm.goldTenNumber,
						  goldHunderdNumber:this.dataForm.goldHunderdNumber,
						  goldEspeciallyPrize:this.dataForm.goldEspeciallyPrize,
						  goldOnePrize:this.dataForm.goldOnePrize,
						  goldTwoPrize:this.dataForm.goldTwoPrize,
						  goldThreePrize:this.dataForm.goldThreePrize,
						  goldFourPrize:this.dataForm.goldFourPrize,
						  goldFivePrize:this.dataForm.goldFivePrize,
						  goldSixPrize:this.dataForm.goldSixPrize,
						  goldSevenPrize:this.dataForm.goldSevenPrize,
						  goldEigthPrize:this.dataForm.goldEigthPrize,
						  
						})
					  }).then(({data}) => {
						if (data && data.code === 0) {
						  this.$message({
							message: '保存修改',
							type: 'success',
							duration: 1500,
							onClose: () => {
							  this.visible = false
							  this.$emit('refreshDataList')
							}
						  })
						} else {
						  this.$message.error(data.msg)
						}
					  })
					}
				});
			} else{
				this.$message({
					message: '中奖概率和不等于1',
					type: 'error',
				});
			}

		}
	}
}
</script>

<style>
</style>
