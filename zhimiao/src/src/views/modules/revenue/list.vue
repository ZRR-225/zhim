<!-- 对公账单 -->
<template>
	<div>
		<el-form :inline="true" >
			<el-form-item>
				<el-date-picker type="datetime"  v-model="dataForm.startTime" placeholder="开始日期" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-date-picker type="datetime"  v-model="dataForm.endTime" placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-form  :model="dataList1">
			<table  style="width:100%;line-height:40px;text-align:center;">           
				<tr>
					<td>主播人数</td>
					<td>获得萌力值</td>
					<td>消耗萌力值</td>
					<td>结算萌力值</td>
					<td>结算金额（元）</td>
				</tr>
				<tr>
					<td>{{this.dataList1.steamerNumber}}</td>
					<td>{{this.dataList1.incomeCharm}}</td>
					<td>{{this.dataList1.expendCharm}}</td>
					<td>{{this.dataList1.surplusCharm}}</td>
					<td>{{this.dataList1.surplusMoney}}</td>
				</tr>  
            </table>
		</el-form>
		<el-table :data="dataList" border v-loading="dataListLoading" style="width:100%;">
			</el-table-column>
			<el-table-column
			  type="index"
			  label="序号"
			  header-align="center"
			  align="center"
			  width="50">
			</el-table-column>
			<el-table-column
			  prop="maskName"
			  label="主播昵称"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="userCode"
			  label="主播ID"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="mobile"
			  label="手机号码"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="operation"
			  label="收入/支出"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="source"
			  label="操作"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="useTime"
			  label="时间"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="charmValue"
			  label="萌力值"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="diamondValue"
			  label="铃铛"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
	<!-- 	    <el-table-column
			  label="操作"
			  fixed="right"
			  header-align="center"
			  align="center">
				<template slot-scope="scope">
					<el-button type="text" size="small" >编辑</el-button>
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
		  layout="total,sizes,prev,pager,next,jumper">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					startTime:'',
					endTime:''
				},
				dataList1:{
					steamerNumber:'',
					incomeCharm:'',
					expendCharm:'',
					surplusCharm:'',
					surplusMoney:'',
				},
				dataList:[],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
			}
		},
		activated () {
		  this.getDataList()
		},
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
					url:this.$http.adornUrl('/sys/sysMaskSettlement/querySettlementList'),
					method:'get',
					params:this.$http.adornParams({
						'pageNo':this.pageIndex,
						'pageSize':this.pageSize,
						'startTime':this.dataForm.startTime,
						'endTime':this.dataForm.endTime,
					})
				}).then(({data})=>{
					if(data && data.code===0){
						this.dataList1.steamerNumber=data.steamerNumber
						this.dataList1.incomeCharm=data.incomeCharm
						this.dataList1.expendCharm=data.expendCharm
						this.dataList1.surplusCharm=data.surplusCharm
						this.dataList1.surplusMoney=data.surplusMoney
						this.dataList=data.data
						this.totalPage = data.total
					}else{
						this.dataList=[]
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
		}
	}
</script>

<style>
</style>
