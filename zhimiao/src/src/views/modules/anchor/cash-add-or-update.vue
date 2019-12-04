<!-- 主播提现  修改 -->
<template>
	<el-dialog
	title='处理'
    :close-on-click-modal="false"
    :visible.sync="visible">
		<el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
		  <el-form-item label="真实姓名" prop="realName">
			<el-input v-model='dataForm.realName' :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="身份证号" prop="idCard">
			<el-input v-model='dataForm.idCard' :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="支付宝账号" prop="alipayAcount">
			<el-input v-model='dataForm.alipayAcount' :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="提现金额" prop="profitMoney">
			<el-input v-model='dataForm.profitMoney' :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="萌力值" prop="surplusDiamond">
			<el-input v-model='dataForm.surplusDiamond' :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="提现状态" prop="status">
			<el-radio-group v-model="dataForm.status">
			  <el-radio  v-for="(status, index) in dataForm.statusList" :label="index" :key="index">{{status}}</el-radio>
			</el-radio-group>
		  </el-form-item>
		  <el-form-item label="拒绝原因" prop="reason">
			<el-select v-model='dataForm.reason' placeholder="请选择">
				<el-option
				  v-for="item in dataForm.options"
				  :key="item.value"
				  :label="item.label"
				  :value="item.label">
				</el-option>				
			</el-select>
		  </el-form-item>
		  <div style="text-align: center;color: #DD0000;">选择同意,平台即扣除该主播萌力值,由运营方及时向主播支付提现金额。</div>
		</el-form>
		<span slot="footer" class="dialog-footer">
		  <el-button @click="visible = false">取消</el-button>
		   <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
		</span> 
	</el-dialog>
</template>

<script>
export default{
	data() {
		return {
			visible: false,
			pageIndex: 1,
			pageSize: 10,
			dataForm:{
				userCode:'',
				profitMoney:'',
				surplusDiamond:'',
				mobile:'',
				idCard:'',
				alipayAcount:'',
				realName:'',
				status:'',
				maskName:'',
				statusList:['拒绝','同意'],
				reason:'其他原因',
				options: [{
						  value:1,
						  label: '账号未填写支付宝信息'
						}, {
						  value:2,
						  label: '萌力值金额低于100'
						}, {
						  value:3,
						  label: '账号有可疑操作'
						}, {
						  value: 4,
						  label: '账号已被加入黑名单'
						}, {
						  value:5,
						  label: '其他原因'
						}],
				value:'',
			},
        dataRule: {
          // idCard: [
          //   { required: true, message: '身份证不能为空', trigger: 'blur' },
          // ],
		  // alipayAcount:[
			 //  {required: true, message: '支付宝号不能为空', trigger: 'blur' },
		  // ],
        }
		}
	},
	methods: {
		init(mobile) {
			// console.log(this.dataForm.status)
			this.visible = true
			this.$nextTick(() => {
				this.$refs['dataForm'].resetFields()
				this.$http({
				  url: this.$http.adornUrl(`/sys/maskDrawcash/list/`),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'mobile':mobile,				
					'maskName':this.dataForm.maskName,
					'applyState':0,
				  })
				}).then(({data}) => {
				if (data && data.code === 0) {
					this.dataForm.userCode=data.data.list[0].userCode,
					this.dataForm.surplusDiamond=data.data.list[0].surplusDiamond,
					this.dataForm.profitMoney=data.data.list[0].profitMoney
					this.dataForm.status=data.data.list[0].status
					this.dataForm.idCard=data.data.list[0].idCard
					this.dataForm.alipayAcount=data.data.list[0].alipayAcount
					this.dataForm.realName=data.data.list[0].realName
				  }
				})
			})
		},
		dataFormSubmit() {
			 // if(this.dataForm.status===0){
				//  this.$message({
				// 	 message:'拒绝原因不能为空',
				// 	 type:'danger',
				// 	 duration:1000,
				//  })
			 // }
			this.$refs['dataForm'].validate((valid) => {
				if (valid) {
				  this.$http({
					url: this.$http.adornUrl('/sys/maskDrawcash/update'),
					method: 'post',
					data: this.$http.adornData({
					  'userCode':this.dataForm.userCode,
					  'status':this.dataForm.status,
					  'profitMoney':this.dataForm.profitMoney,
					  'surplusDiamond':this.dataForm.surplusDiamond,
						'idCard':this.dataForm.idCard,
						'alipayAcount':this.dataForm.alipayAcount,
						'realName':this.dataForm.realName,
						'reason':this.dataForm.reason,
					})
				  }).then(({data}) => {
					if (data && data.code === 0) {
					  this.$message({
						message:data.msg,
						type: 'success',
						duration: 1500,
						onClose: () => {
						  this.visible = false
						  this.$emit('refreshDataList')
						}
					  })
					}
					 else {
					  this.$message.error(data.msg)
					}
				  })
				}
			});
		},
	},
}
</script>

<style>
</style>
