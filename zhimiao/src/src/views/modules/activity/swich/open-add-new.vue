<!-- 新增活动 -->
<template>
	<el-dialog
	title='新增活动'
    :close-on-click-modal="false"
    :visible.sync="visible">
		<el-form :model="dataForm"  ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
		  <el-form-item label="活动名称" prop="activity">
			<el-input v-model="dataForm.activity"></el-input>
		  </el-form-item>
		  <el-form-item label="是否开启" prop="switchStatus">
			<el-radio-group v-model="dataForm.switchStatus">
			  <el-radio  v-for="(switchStatus, index) in dataForm.statusList" :label="index" :key="index">{{switchStatus}}</el-radio>
			</el-radio-group>
		  </el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
		  <el-button @click="visible= false">取消</el-button>
		   <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
		</span> 
	</el-dialog>
</template>

<script>
	export default{
		data() {
			return {
				visible: false,
				dataForm:{
					activity:'',
					switchStatus:0,
					statusList:['关闭','开启'],
				},
			}
		},
		methods: {
			init() {
				this.visible = true;
				this.$nextTick(() => {
					
				})
			},
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
				if (valid) {
				  this.$http({
					url: this.$http.adornUrl('/sys/maskactivityswitch/save'),
					method: 'post',
					data: this.$http.adornData({
					  'switchStatus':this.dataForm.switchStatus,
					  'activity':this.dataForm.activity
					})
				  }).then(({data}) => {
					if (data && data.code === 0) {
					  this.$message({
						message: data.msg,
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
			},
		}	
	}
</script>

<style>
</style>
