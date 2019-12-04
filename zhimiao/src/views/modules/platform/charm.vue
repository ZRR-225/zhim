<!-- 主播萌力值 -->
<template>
	<div class="chram">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getdDataList()">
			<el-form-item>
				<el-date-picker
				  v-model="dataForm.startDate"
				  type="date"
				  value-format="yyyy-MM-dd"
				  :clearable="false"
				  placeholder="开始日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-date-picker
				  v-model="dataForm.endDate"
				  type="date"
				  value-format="yyyy-MM-dd"
				  :clearable="false"
				  placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item>
			<el-input v-model="dataForm.maskName" placeholder="主播名称" clearable></el-input>
			</el-form-item>
			<el-form-item>
			<el-input v-model="dataForm.mobile" placeholder="手机号码" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList1();getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
		:data="dataList1"
		border
		v-loading="dataListLoading"
		style="width:100%;">
			<el-table-column
			prop="steamerNumber"
			label="主播总数"
			sortable
			header-align="center"
			align="center">
			</el-table-column>
			<el-table-column
			prop="charmValueSum"
			label="总萌力值"
			header-align="center"
			align="center">
			</el-table-column>
			<el-table-column
			prop="charmValueJieS"
			label="可结算萌力值"
			header-align="center"
			align="center">
			</el-table-column>
			<el-table-column
			prop="charmValueSteamer"
			label="收益(元)"
			header-align="center"
			align="center">
			</el-table-column>
		</el-table>
		<el-table
		  :data="dataList"
		  border
		  v-loading="dataListLoading"
		  style="width:100%;">
			<el-table-column
			type="index"
			label="序号"
			header-align="center"
			align="center"
			width="80">
			</el-table-column>
			<el-table-column
			prop="maskName"
			label="主播姓名"
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
			prop="charmValueSum"
			label="收入萌力值"
			sortable
			header-align="center"
			align="center">
			</el-table-column>
			<el-table-column
			prop="charmValueJieS"
			label="萌力值收支"
			sortable
			header-align="center"
			align="center">
			</el-table-column>
			<el-table-column
			prop="charmValueSteamer"
			label="资金收支"
			sortable
			header-align="center"
			align="center">
			</el-table-column>
<!-- 			<el-table-column
			label="操作"
			fixed="right"
			header-align="center"
			align="center"
			width="150">
			<template slot-scope="scope">
				 <el-button  type="text" size="small" @click="addOrUpdateHandle(scope.row)">编辑</el-button>
			</template>
			</el-table-column> -->
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
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					value:'',
					maskName:'',
					mobile:'',
					startDate:'',
					endDate:'',
				},
				dataList:[],
				dataList1:[],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				dataListSelections: [],
				addOrUpdateVisible: false,
			}
		},
		activated () {
		  this.getDataList1()
		  this.getDataList()
		},
		methods:{
		  //查询主播总数信息
			getDataList1() {
				this.dataListLoading=true
				this.$http({
				url: this.$http.adornUrl('/sys/bill/allbilldate'),
				method: 'get',
				params: this.$http.adornParams({
					'startDate':this.dataForm.startDate,
					'endDate':this.dataForm.endDate,
					'mobile':this.dataForm.mobile,
					'maskName':this.dataForm.maskName					
				})
			}).then(({data}) => {
				if (data && data.code === 0) {
					this.dataList1= data.data
					// this.totalPage = data.totalCount
				} else {
					this.dataList1= []
					// this.totalPage = 0
				}
				this.dataListLoading = false
				})
			},
		  // 获取主播信息列表
			getDataList () {
				this.dataListLoading=true
				this.$http({
				url: this.$http.adornUrl('/sys/bill/steamerbilldate'),
				method: 'get',
				params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,   
					'startDate':this.dataForm.startDate,
					'endDate':this.dataForm.endDate,
					'mobile':this.dataForm.mobile,
					'maskName':this.dataForm.maskName
				})
			}).then(({data}) => {
				if (data && data.code === 0) {
					this.dataList = data.data.list
					this.totalPage = data.data.total
				} else {
					this.dataList = []
					// this.totalPage = 0
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
		}
	}
</script>

<style>
</style>
