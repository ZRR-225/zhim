<!-- 铃铛消费账单 testdiamondConsumption-->
<template>
	<div class="testdiamondConsumption">
<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input placeholder="用户ID" v-model="dataForm.userCode" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="手机号码" v-model="dataForm.mobile" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="用户昵称" v-model="dataForm.maskName" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item style="float:right;">
				<el-button @click="exportHandle()" type="success">导出</el-button>
			</el-form-item>
		</el-form>
		<el-table
		 :data="dataList"
		 border
		 v-loading="dataListLoading"
		 style="width: 100%">
		  <el-table-column
			prop="userCode"
			header-align="center"
			align="center"
			label="用户ID">
		  </el-table-column>
		  <el-table-column
			prop="maskName"
			header-align="center"
			align="center"
			label="用户昵称">
		  </el-table-column>
		  <el-table-column
			prop="mobile"
			header-align="center"
			align="center"
			label="手机号码">
		  </el-table-column>
		  <el-table-column
			prop="rechargeDiamondNumber"
			header-align="center"
			align="center"
			label="充值铃铛数">
		  </el-table-column>
		  <el-table-column
			prop="prizeDrawDiamondNumber"
			header-align="center"
			align="center"
			label="抽奖铃铛">
		  </el-table-column>
		  <el-table-column
			prop="wonDrawDiamondNumber"
			header-align="center"
			align="center"
			label="中奖铃铛">
		  </el-table-column>
		  <el-table-column
			prop="consumeDrawDiamondNumber"
			header-align="center"
			align="center"
			label="消费铃铛数">
		  </el-table-column>
		  <el-table-column
			prop="balanceDiamondNumber"
			header-align="center"
			align="center"
			label="铃铛数余额">
		  </el-table-column>
		  <el-table-column
			prop="charmChangeDiamondNumber"
			header-align="center"
			align="center"
			label="萌力值转化铃铛数">
		  </el-table-column>
		</el-table>
		<el-pagination
		  @size-change="sizeChangeHandle"
		  @current-change="currentChangeHandle"
		  :current-page="pageIndex"
		  :page-sizes="[10, 20, 50, 100]"
		  :page-size="pageSize"
		  :total="totalPage"
		  layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>		
	</div>
</template>

<script>
	export default{
		data() {
			return {
				dataForm:{
					userCode:'',
					mobile:'',
					maskName:'',
				},
				dataList:[],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,				
			}
		},
		created () {
		  this.getDataList()
		},
		methods: {
			// 获取数据列表
			getDataList () {
				this.$http({
				  url: this.$http.adornUrl('/sys/ceshi/querydiamondbillceshi'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
					'userCode': this.dataForm.userCode,
					'mobile': this.dataForm.mobile,
					'maskName': this.dataForm.maskName,
				  })
				}).then(({data}) => {
				  if (data && data.code === 0) {
					this.dataList = data.data.list
					this.totalPage = data.data.total
				  } else {
					this.dataList = []
					this.totalPage = 0
				  }
				  this.dataListLoading = false
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
			// 导出数据
			exportHandle(){
				// // this.visible = true
				// // this.$nextTick(() => {
				// // })
				// console.log('导出')
				this.$http({
				  url: this.$http.adornUrl('/sys/excel/diamondBillExcel'),
				  method: 'get',
				  responseType:'blob',
				  params: this.$http.adornParams({
					// 'pageNo': this.pageIndex,
					// 'pageSize': this.pageSize,     
					'mobile':this.dataForm.mobile,
					'userCode':this.dataForm.userCode,
					'maskName':this.dataForm.maskName,
				  }),
				 
				}).then(({data}) => {
					// console.log(data)
					let blob = new Blob([data],{type: 'application/vnd.ms-excel'});
			  if (window.navigator.msSaveOrOpenBlob) {
								// 如果需要改名字，前台可以自动生成
				  navigator.msSaveBlob(blob,"铃铛账单");
			  } else {
				  let link = document.createElement("a");
				  let evt = document.createEvent("HTMLEvents");
				  evt.initEvent("click", false, false);
				  link.href = URL.createObjectURL(blob); 
				  link.download = "铃铛账单";
				  link.style.display = "none";
				  document.body.appendChild(link);
				  link.click();
				  window.URL.revokeObjectURL(link.href);
			  }
				  this.dataListLoading = false
				})

			},
		}
	}
</script>

<style>
</style>

