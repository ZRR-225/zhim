<!-- 新抽奖(盈亏比例) newProfitandloss -->
<template>
	<div class="newProfitandloss">
		<el-form :model="dataForm" :rules="dataRule" ref="dataForm">
			<el-form-item>
				<div>当前盈利概率： {{this.dataForm.radio1}}</div>
			</el-form-item>
			<el-form-item>
				<div>当前垫蛋概率： {{this.dataForm.radio2}}</div>
			</el-form-item>
			<el-form-item label="盈利概率" prop="private">
				<el-input class="input"  v-model="dataForm.private" placeholder="盈利概率"></el-input>
			</el-form-item>
			<el-form-item label="垫蛋概率" prop="deficit">
				<el-input class="input"  v-model="dataForm.deficit" placeholder="垫蛋概率"></el-input>
			</el-form-item>
			<el-form-item class="button1">
				<el-button @click="handle()" type="primary">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
		export default{
		inject:['reload'],
		data() {
			return {
				dataForm:{
					radio1:'0.2',
					radio2:'0.3',
					private:'0.2',//盈利概率
					deficit:'0.3',//垫蛋概率
				},
				dataRule:{
				  private: [
					{ required: true, message: '盈利概率不能为空', trigger: 'blur' },
					{	pattern: 
					 /^(?:0\.\d+|[01](?:\.0)?)$/,//正则
						message: '盈利概率不能大于1且保留2位小数'
					}
				  ],
				  deficit: [
					{ required: true, message: '垫蛋概率比例不能为空', trigger: 'blur' },
					{	pattern: 
					 /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/,//正则
						message: '垫蛋概率比例不能大于1且保留2位小数'
					}
				  ],
				},
	
			}
		},
		methods: {
			//提交
			handle(){
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						console.log(this.dataForm.deficit)
					}
				})
				
			}
		},
	}
</script>

<style>
	.input{
		width:200px;
		text-align: center;
	}
</style>
