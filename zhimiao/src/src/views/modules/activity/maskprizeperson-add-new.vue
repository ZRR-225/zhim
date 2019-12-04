<template>
	<el-dialog
	title='新增'
    :close-on-click-modal="false"
    :visible.sync="visible1">
		<el-form :model="dataForm"  ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
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
				},
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

				}
			  });
			},
		}	
	}
</script>

<style>
</style>
