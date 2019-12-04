<!--新抽奖(奖池分配比例) newDistribution -->
<template>
	<div class="newDistribution">
		<el-form :model="dataForm" :rules="dataRule" ref="dataForm">
			<el-form-item>
				<div>当前总私人奖池： {{this.dataForm.radio1}}</div>
			</el-form-item>
			<el-form-item>
				<div>当前公共奖池： {{this.dataForm.radio2}}</div>
			</el-form-item>
			<el-form-item label="私人奖池比例" prop="private">
				<el-input class="input"  v-model="dataForm.private" placeholder="私人奖池比例"></el-input>
			</el-form-item>
			<el-form-item label="公共奖池比例" prop="public">
				<el-input class="input"  v-model="dataForm.public" placeholder="公共奖池比例"></el-input>
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
					radio1:'1234',
					radio2:'5678',
					private:'0.2',//私人
					public:'0.05',//公共
				},
				dataRule:{
				  private: [
					{ required: true, message: '私人奖池比例不能为空', trigger: 'blur' },
					{	pattern: 
					 /^(?:0\.\d+|[01](?:\.0)?)$/,//正则
						message: '私人奖池比例不能大于1且保留2位小数'
					}
				  ],
				  public: [
					{ required: true, message: '公共奖池比例不能为空', trigger: 'blur' },
					{	pattern: 
					 /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/,//正则
						message: '公共奖池比例不能大于1'
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
						console.log(this.dataForm.public)
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
