<!-- 转账统计 -->
<template>
	<div class="transferAccounts">
		<el-form :inline="true":model="dataForm"  @keyup.enter.native="getDataList()">
			<el-form-item>
			  <el-date-picker type="date" v-model="dataForm.createTime" placeholder="时间"  value-format="yyyy-MM-dd"></el-date-picker>
			</el-form-item>
			<el-form-item prop="fromUserCode">
				<el-input type="text" placeholder="转出方ID" v-model="dataForm.fromUserCode"></el-input>
			</el-form-item>
			<el-form-item prop="toUserCode">
				<el-input type="text" placeholder="转出入ID" v-model="dataForm.toUserCode"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
		:data="dataList"
		v-loading="dataListLoading"
		border
		style="width:100%;">			
			<el-table-column
				type="index"
				label="序号"
				header-align="center"
				align="center"
				width="50">
			</el-table-column>
			<el-table-column
				prop="giveCurrencyRecordCode"
				label="赠送货币记录"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="createTime"
				label="时间"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="fromUserCode"
				label="转出方ID"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="fromUserCodeName"
				label="转出方昵称"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="toUserCode"
				label="转入方ID"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="toUserCodeName"
				label="转入方昵称"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="currencyNum"
				label="转账额(铃铛)"
				header-align="center"
				align="center">
			</el-table-column>
		</el-table>
		<el-pagination
		  @size-change="sizeChangeHandle"
		  @current-change="currentChangeHandle"
		  :current-page="pageIndex"
		  :page-sizes="[10, 20, 50, 100]"
		  :page-size="pageSize"
		  :total="totalPage"
		  layout="total,sizes,prev,pager,next">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					fromUserCode:'',
					toUserCode:'',
					createTime:'',
				},
				dataList:[],
				pageIndex:1,
				pageSize:10,
				totalPage:0,
				dataListLoading: false,
			}
		},
		activated() {
			 this.getDataList()
		},
		methods:{
			//获取数据
			getDataList(){
				this.dataListLoading=true
				this.$http({
					url:this.$http.adornUrl('/sys/currencyrecord/queryCurrencyRecord'),
					method:'get',
					params:this.$http.adornParams({
						'pageNo':this.pageIndex,
						'pageSize':this.pageSize,
						'fromUserCode':this.dataForm.fromUserCode,
						'createTime':this.dataForm.createTime,
						'toUserCode':this.dataForm.toUserCode,
					})
				}).then(({data})=>{
					if(data && data.code===0){
						this.dataList=data.data.list
						this.totalPage = data.data.total
					}else{
						this.dataList=[]
						this.totalPage = 0
					}
					this.dataListLoading=false
				})
			},
			// 每页数
			sizeChangeHandle (val) {
				this.pageSize = val
				this.pageIndex = 1
				this.getDataList()
			},
			// 当前页
			currentChangeHandle (val) {
				this.pageIndex = val
				this.getDataList()
			},
		},
	}
</script>

<style>
</style>
