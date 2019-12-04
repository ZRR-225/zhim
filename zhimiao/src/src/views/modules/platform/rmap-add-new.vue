<!-- 新增轮播图 -->
<template>
	<el-dialog
	title="新增轮播图"
	:close-on-click="false"
	:visible.sync="visible">
	<el-form :model="dataForm" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="120px">
<!-- 		<el-form-item label="轮播图编号" prop="carouselCode">
			<el-input v-model='dataForm.carouselCode'></el-input>
		</el-form-item> -->
		<el-form-item label="轮播图标题" prop="title">
			<el-input v-model='dataForm.title'></el-input>
		</el-form-item>
		<el-form-item label="类型" prop="type">
			<el-radio-group v-model="dataForm.type">
			  <el-radio  v-for="(type, index) in dataForm.statusList" :label="index" :key="index">{{type}}</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="数据" prop="data">
			<el-input v-model='dataForm.data'></el-input>
		</el-form-item>
		<el-form-item label="轮播图片" prop="imgUrl">
			 <el-upload
			  action="https://up.qiniup.com"
			  :data="uptoken"
			  :limit='1'
			  list-type="picture"
			  header="application/octet-stream"
			  :before-upload="beforeAvatarUpload"
			  :on-remove="handleRemove">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传一张图片</div>
			</el-upload>
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
		inject:['reload'],
		data(){
			return{
				visible: false,
				dataForm:{
					carouselCode:'',
					title:'',
					type:'',
					imgUrl:'',
				    statusList:['富文本内容','url地址','用户编号','其他'],
					data:'',
				},
				uptoken: {
					token: '',
					key: ""
				},
			}
		},
		methods:{
			init () {
				this.visible = true;
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields()
					this.$http({
					  url: this.$http.adornUrl('/sys/qiniupicture/gettoken'),
					  method: 'get',
					}).then(({data}) => {
					  if (data && data.code === 0) {
						this.uptoken.token= data.data.token
					  }
					})
				})
			},
			beforeAvatarUpload(file) {
				this.uptoken.key = file.name;
				this.dataForm.imgUrl=file.name;
				// console.log(this.dataForm.imgUrl)
			},
			handleRemove(file, fileList) {
				// console.log(file, fileList);
			},
			dataFormSubmit () {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
					  this.$http({
						url: this.$http.adornUrl('/sys/rmap/insertmap'),
						method: 'post',
						data: this.$http.adornData({
						  // 'startTime':this.dataForm.startTime,
						  // 'endTime':this.dataForm.endTime,
						  // 'carouselCode':this.dataForm.carouselCode,
						  'title':this.dataForm.title,
						  'type':this.dataForm.type,
						  'data':this.dataForm.data,	
						  'imgUrl':this.dataForm.imgUrl
						})
					  }).then(({data}) => {
						if (data && data.code === 0) {
						  this.$message({
							message: data.msg,
							type: 'success',
							duration: 1500,
							onClose: () => {
							  this.visible = false
							  this.reload();
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

