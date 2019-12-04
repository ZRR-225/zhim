<!-- 账单记录 -->
<template>
	<div class="billRecord">
	  <el-form :inline="true" :model="dataForm">
		<el-form-item>
			<el-date-picker type="date"  v-model="dataForm.drawcashApplyTime" placeholder="提现创建时间" value-format="yyyy-MM-dd"></el-date-picker>
		</el-form-item>
		<el-form-item>
			<el-date-picker type="date"  v-model="dataForm.startDate" placeholder="开始日期"  value-format="yyyy-MM-dd"></el-date-picker>
		</el-form-item>
		<el-form-item>
		  <el-date-picker type="date" v-model="dataForm.endDate" placeholder="结束日期"  value-format="yyyy-MM-dd" ></el-date-picker>
		</el-form-item>
		<el-form-item>
		  <el-button @click="getDataList();getDataList1()">查询</el-button>
		</el-form-item>
	  </el-form>
	  <el-table :data="dataList" border v-loading="dataListLoading" style="width:100%">
		<el-table-column
			prop="settlementNumber"
			label="对公结算次数"
			header-align="center"
			align="center">
		</el-table-column>
		<el-table-column
			prop="drawcashValueSum"
			label="原始总金额"
			header-align="center"
			align="center">
		</el-table-column>
		<el-table-column
			prop="drawcashCharmSum"
			label="结算对应总萌力值"
			header-align="center"
			align="center">
		</el-table-column>
	  </el-table>
	  <el-table :data="dataList1" border v-loading="dataListLoading" style="width:100%">
		<el-table-column
			prop="drawcashApplyTime"
			label="结算时间"
			header-align="center"
			align="center">
		</el-table-column>
		<el-table-column
			prop="drawcashValue"
			label="结算金额"
			header-align="center"
			align="center">
		</el-table-column>
		<el-table-column
			prop="drawcashCharm"
			label="结算对应萌力值"
			header-align="center"
			align="center">
		</el-table-column>
		<el-table-column
			prop="withdrawal"
			label="提现笔数"
			header-align="center"
			align="center">
		</el-table-column>
		<el-table-column
			fixed="right"
			header-align="center"
			align="center"
			width="100"
			label="操作">
			<template slot-scope="scope">
			<!-- v-if="isAuth('sys:gift:updategift')"  -->
			 <el-button  type="text" size="small" @click="seeHandle(scope.row.drawcashApplyTime)">查看</el-button>
			</template>
		  </el-table-column>
	  </el-table>
	<el-pagination
		@size-change="sizeChangeHandle"
		@current-change="currentChangeHandle"
		:current-page="pageIndex"
		:page-sizes="[10, 20, 50, 100]"
		:page-size="pageSize"
		:total="totalPage"
		layout="total, sizes, prev, pager, next,jumper">
	</el-pagination>
	<!-- 查看弹窗 -->
	<el-dialog
	title="查看"
	:close-on-click-model="false"
	:visible.sync="visible"
	width="100%">
		<el-table :data="dataList2" border v-loading="dataListLoading" style="width:100%">
			<el-table-column
				prop="id"
				label="Id"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="maskName"
				label="用户昵称"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="userCode"
				label="用户编号"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="mobile"
				label="手机号码"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="drawcashApplyTime"
				label="申请提现时间"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="applyMoney"
				label="申请金额"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="appplyCharm"
				label="提现萌值"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="disposeTime"
				label="处理时间"
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
			:total="totalPage1"
			layout="total, sizes, prev, pager, next,jumper">
		</el-pagination>
	</el-dialog>
	</div>
</template>

<script>
export default {
	data(){
		return{
			visible: false,
			dataForm:{
				drawcashApplyTime:'',
				startDate:'',
				endDate:'',
				userCode:'',
				mobile:'',
				maskName:'',
				disposeTime:'',
			},
			dataList:[],//概况
			dataList1:[],//总览
			dataList2:[],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			totalPage1: 0,
			dataListLoading: false,
		}
	},
	activated() {
		this.getDataList()
		this.getDataList1()
	},
	methods:{
		// 获取数据表（概况）
			getDataList() {
				this.dataListLoading=true
				this.$http({
				url: this.$http.adornUrl('/sys/maskbillrecord/overview'),
				method: 'get',
				params: this.$http.adornParams({
					'drawcashApplyTime':this.dataForm.drawcashApplyTime,
					'startDate':this.dataForm.startDate,
					'endDate':this.dataForm.endDate,
				})
			}).then(({data}) => {
				if (data && data.code === 0) {
					this.dataList= data.data.list
					this.totalPage = data.data.total
				} else {
					this.dataList = []
				}
				this.dataListLoading = false
				})
			},
			// 获取数据表（总览）
			getDataList1(){
				this.dataListLoading=true
				this.$http({
				url: this.$http.adornUrl('/sys/maskbillrecord/billsurvey'),
				method: 'get',
				params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
					'drawcashApplyTime':this.dataForm.drawcashApplyTime,
					'startDate':this.dataForm.startDate,
					'endDate':this.dataForm.endDate,
				})
			}).then(({data}) => {
				if (data && data.code === 0) {
					this.dataList1= data.data.list
					this.totalPage = data.data.total
				} else {
					this.dataList1= []
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
		  // 多选
		  selectionChangeHandle (inex) {
			this.dataListSelections = val
		  },
		//查看
		seeHandle(drawcashApplyTime){
			this.visible = true
			this.$nextTick(() => {
				this.$http({
				url: this.$http.adornUrl('/sys/maskbillrecord/list'),
				method: 'get',
				params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
					'drawcashApplyTime':drawcashApplyTime,
					'userCode':this.dataForm.userCode,
					'mobile,':this.dataForm.mobile,
					'maskName,':this.dataForm.maskName,
					'disposeTime,':this.dataForm.disposeTime,

				})
			}).then(({data}) => {
				if (data && data.code === 0) {
					this.dataList2= data.page.list
					this.totalPage1 = data.page.total
				} else {
					this.dataList1= []
				}
				this.dataListLoading = false
				})
			})
		},
	},
}
</script>

<style>
</style>
