<!-- 开奖时段新增 -->
<template>
	<el-dialog
	title="新增开奖时段"
	:close-on-click="false"
	:visible.sync="visible">
	<el-form :model="dataForm" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="120px">
		<el-form-item size="mini" label="开奖时段一" >
			<el-date-picker
			  v-model="dataForm.startTime"
			  type="datetime"
			  placeholder="开始时间"
			  value-format="yyyy-MM-dd HH:mm"
			  style="width:180px;">
			</el-date-picker>
			<el-date-picker
			  v-model="dataForm.endTime"
			  type="datetime"
			  value-format="yyyy-MM-dd HH:mm"
			  placeholder="结束时间"
			  style="width:180px;">
			</el-date-picker>
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
				visible: false,
				dataForm:{
					startTime:'',
					endTime:''
				},
			}
		},
		methods:{
			init () {
				this.visible = true;
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields()
				})
			},
			dataFormSubmit () {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
					  this.$http({
						url: this.$http.adornUrl(''),
						method: 'post',
						data: this.$http.adornData({
						  'startTime':this.dataForm.startTime,
						  'endTime':this.dataForm.endTime,
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
		}
	}
</script>

<style>
</style>
