<!-- 修改轮播图 -->
<template>
	<el-dialog
	title="修改轮播图"
	:close-on-click="false"
	:visible.sync="visible">
	<el-form :model="dataForm" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="120px">
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
			  header="application/octet-stream"
			  list-type="picture"
			  :before-upload="beforeAvatarUpload"
			  :on-remove="handleRemove"
			  :file-list="fileList1">
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传一张图片</div>
			</el-upload>
		</el-form-item>
      <el-form-item label="轮播图状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio  v-for="(status, index) in dataForm.statusList1" :label="index" :key="index">{{status}}</el-radio>
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
		inject:['reload'],
		data(){
			return{
				visible: false,
				dataForm:{
					startTime:'',
					endTime:'',
					carouselCode:'',
					title:'',
					type:'',
					status:'',
					imgUrl:'',
				    statusList:['富文本内容','url地址','用户编号'],
					statusList1:['不可用','可用'],
					data:'',
				},
				fileList1: [
					{name: '',
					
					 url:" 'http://zhimiaoimg.sc-msr.com/'+name"},
				],
				pageIndex:1,
				pageSize:10,
				totalPage:0,
				uptoken: {
					token: '',
					key: ""
				},
			}
		},
		methods:{
			init (carouselCode) {
				this.visible = true;
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields()
					this.$http({
					  url: this.$http.adornUrl('/sys/rmap/allmap'),
					  method: 'get',
					  params: this.$http.adornParams({
						'pageNo': this.pageIndex,
						'pageSize': this.pageSize, 
						'carouselCode':carouselCode
					  })
					}).then(({data}) => {
					  if (data && data.code === 0) {
						  this.dataForm.carouselCode=data.data.list[0].carouselCode
						  this.dataForm.type=data.data.list[0].type
							this.dataForm.title=data.data.list[0].title
							this.dataForm.data=data.data.list[0].data
							this.dataForm.status=data.data.list[0].status
							this.dataForm.imgUrl=data.data.list[0].imgUrl
							this.fileList1[0].name=data.data.list[0].imgUrl
							this.fileList1[0].url='http://zhimiaoimg.sc-msr.com/'+data.data.list[0].imgUrl
					  } else {
						// this.dataList = []
						// this.totalPage = 0
					  }
					  this.dataListLoading = false
					})
					
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
			dataFormSubmit () {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
					  this.$http({
						url: this.$http.adornUrl('/sys/rmap/updatamap'),
						method: 'post',
						data: this.$http.adornData({
							'type':this.dataForm.type,
							'title':this.dataForm.title,
							'data':this.dataForm.data,
							'status':this.dataForm.status,
							'carouselCode':this.dataForm.carouselCode,
							'imgUrl':this.dataForm.imgUrl,
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
	    beforeAvatarUpload(file) {
			this.uptoken.key = file.name;
			this.dataForm.imgUrl=file.name;
			// console.log(this.dataForm.imgUrl)
		},
		  handleRemove(file, fileList) {
			// console.log(file, fileList);
		  },
		}
	}
</script>

<style>
</style>


