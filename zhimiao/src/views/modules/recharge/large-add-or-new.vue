<!-- 确认用户信息 -->
<template>
	  <el-dialog
	  title='确认充值信息'
	  :close-on-click-modal="false"
	  :visible.sync="visible1">
		  <el-form :model="dataForm"  ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
			  <el-form-item label="用户ID" prop="userCode">
				<el-input v-model='dataForm.userCode' :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="用户昵称" prop="maskName">
				<el-input v-model="dataForm.maskName" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号码" prop="mobile">
				<el-input v-model="dataForm.mobile" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="充值金额" prop="">
				<el-input  :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="充值铃铛" prop="">
				<el-input  :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="赠送铃铛" prop="">
				<el-input  :disabled="true"></el-input>
			  </el-form-item>
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
				visible1: false,
				dataForm: {
				  id:0,
				  userCode:'',
				  maskName:'',
				  mobile:'',
				},
			}
		},
		methods:{
			init(mobile) {
				// console.log(mobile)
				this.visible1= true
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields()
					this.$http({
						url: this.$http.adornUrl('/sys/sysmaskdiamondrecord/queryUserByMobile'),
						method: 'get',
						params: this.$http.adornParams({
							 mobile:mobile,
						})
					}).then(({data}) => {
						if (data && data.code === 0) {
							this.dataList = data.data
							// this.totalPage = data.data.total
						} else {
							this.dataList = []
							// this.totalPage = 0
						}
					})	
				})
			},
		}
	}
</script>

<style>
</style>
