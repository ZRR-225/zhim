<!-- 房间封禁新增/修改列表 -->
<template>
	<el-dialog
	title='修改'
    :close-on-click-modal="false"
    :visible.sync="visible">
		<el-form :model="dataForm" ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
		  <el-form-item label="房间Id" prop="roomId">
			<el-input v-model='dataForm.roomId' :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="房间昵称" prop="roomName">
			<el-input v-model='dataForm.roomName' :disabled="true"></el-input>
		  </el-form-item>
		  <el-form-item label="房间状态" prop="state">
			<el-radio-group v-model="dataForm.state">
			  <el-radio  v-for="(state, index) in dataForm.statusList" :label="index" :key="index">{{state}}</el-radio>
			</el-radio-group>
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
	data() {
		return {
			visible: false,
			dataForm:{
				state:0,
				statusList:['封禁','解封']
			}
		}
	},
	methods: {
		init(roomId) {
			this.visible = true
			this.$nextTick(() => {
				this.$refs['dataForm'].resetFields()
				this.$http({
				  url: this.$http.adornUrl(`/sys/roomblack/info/`),
				  method: 'get',
				  params: this.$http.adornParams({
					// 'pageNo': this.pageIndex,
					// 'pageSize': this.pageSize,            
					// 'mobile':mobile,
				  })
				}).then(({data}) => {
				if (data && data.code === 0) {
					this.dataForm.roomName=data.data.roomName
					this.dataForm.roomId=data.data.roomId
					this.dataForm.state=data.data.state
				  }
				})
			})
		},
		dataFormSubmit() {
			this.$refs['dataForm'].validate((valid) => {
				if (valid) {
				  this.$http({
					url: this.$http.adornUrl('/sys/roomblack/update'),
					method: 'post',
					data: this.$http.adornData({
					  'userCode':this.dataForm.userCode,
					  'grantLevel':this.dataForm.grantLevel,
					  'realName':this.dataForm.realName
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
		},
	},
}
</script>

<style>
</style>
