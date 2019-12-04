<template>
	<el-dialog
	title='新增提现主播'
    :close-on-click-modal="false"
    :visible.sync="visible1">
		<el-form :model="dataForm"  ref="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
				<el-form-item label="手机号码" prop="mobile">
				<el-input v-model="dataForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名" prop="realName">
				<el-input v-model="dataForm.realName"></el-input>
				</el-form-item>
			</el-form>
		<span slot="footer" class="dialog-footer">
		  <el-button @click="visible1 = false">取消</el-button>
		   <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default{
		data() {
			return {
				visible1: false,
				dataForm:{
					mobile:'',
					realName:''
				},
				dataRule: {
				  mobile: [
					{ required: true, message: '手机号不能为空', trigger: 'blur' },
					{ pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '手机号格式错误'}
				  ],
				  // realName:[
					 // { required: true, message: '真实姓名不能为空', trigger: 'blur' },
				  // ]
				}
			}
		},
		methods: {
			init() {
				this.visible1 = true;
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields()
				})
			},
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
				if (valid) {
				  this.$http({
					url: this.$http.adornUrl('sys/maskDrawcash/save'),
					method: 'post',
					data: this.$http.adornData({
					  'mobile':this.dataForm.mobile,
					  'realName':this.dataForm.realName
					})
				  }).then(({data}) => {
					if (data && data.code === 0) {
					  this.$message({
						message: data.msg,
						type: 'success',
						duration: 1500,
						onClose: () => {
						  this.visible1 = false
						  this.$emit('refreshDataList')
						}
					  })
					} else {
					  this.$message.error(data.msg)
					}
				  })
				}
			});
			},
		}
	}
</script>

<style>
</style>
