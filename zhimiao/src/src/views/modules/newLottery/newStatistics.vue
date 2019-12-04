<!-- 新抽奖(中奖记录统计)newStatistics-->
<template>
	<div class="newStatistics">
		<el-form :inline="true" :model="dataForm" ref="dataForm">
			<el-form-item  prop="startTime">
				<el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dataForm.startTime" placeholder="开始日期" :clearable="false"></el-date-picker>
			</el-form-item>
			<el-form-item prop="endTime">
				<el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.endTime" placeholder="结束日期" :clearable="false"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-input v-model="dataForm.mobile" placeholder="手机号码"></el-input>
			</el-form-item>
			<el-form-item>
				  <el-select v-model="dataForm.prizeType" placeholder="中奖类型">
					<el-option
					  v-for="item in dataForm.options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-form  :model="dataList1">
			<table  style="width:100%;line-height:40px;text-align: center;">
				<tr>
					<td>抽奖金额</td>
					<td>中奖金额</td>
					<td>差值金额</td>
					<td>用户回报率</td>
					<td>公共奖池</td>
				</tr>
				<tr>
					<td>{{this.dataList1.expense}}</td>  <!-- 抽奖金额 -->
					<td>{{this.dataList1.income}}</td>   <!-- 中奖金额 -->
					<td>{{this.dataList1.difference}}</td><!--差值金额 -->
					<td>{{this.dataList1.ratio}}</td><!-- 用户回报率 -->
					<td>{{this.dataList1.ratio}}</td><!-- 公共奖池 -->
				</tr>
			</table>
		</el-form>
		<el-table
		 :data="dataList2"
		 v-loading="dataListLoading"
		 border
		 style="width:100%;">
			<el-table-column
				prop="userCode"
				label="用户ID"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="mobile"
				label="手机号"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="maskName"
				label="抽奖人昵称"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop=""
				label="抽奖金额"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop=""
				label="中奖金额"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop=""
				label="差值金额"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop=""
				label="回报率"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop=""
				label="个人奖池金额"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				label="操作"
				header-align="center"
				align="center"
				fixed="right">
			<template slot-scope="scope">
			  <el-button  type="text" size="small" @click="addOrUpdateHandle(scope.row.userCode)">详情</el-button>
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
		  layout="total,sizes,prev,pager,next">
		</el-pagination>	
		<!-- 查看详情 -->
		<el-dialog
		title="详情"
		:close-on-click-model="false"
		:visible.sync="visible"
		width="80%">
			<el-form :inline="true" :model="dataForm1">
				<el-form-item  prop="startTime">
					<el-date-picker type="date" value-format="yyyy-MM-dd" v-model="dataForm1.startTime" placeholder="开始日期" :clearable="false"></el-date-picker>
				</el-form-item>
				<el-form-item prop="endTime">
					<el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm1.endTime" placeholder="结束日期" :clearable="false"></el-date-picker>
				</el-form-item>
				<el-form-item>
					  <el-select v-model="dataForm1.prizeType" placeholder="中奖类型">
						<el-option
						  v-for="item in dataForm1.options"
						  :key="item.value"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					  </el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="getDataList1()">查询</el-button>
				</el-form-item>
			</el-form>
			<el-form>
						<el-form  :model="dataList4">
					<table  style="width:100%;line-height:40px;text-align: center;">
						<tr>
							<td>抽奖金额</td>
							<td>中奖金额</td>
							<td>差值金额</td>
							<td>用户回报率</td>
							<td>公共奖池</td>
						</tr>
						<tr>
							<td>{{this.dataList4.expense}}</td>  <!-- 抽奖金额 -->
							<td>{{this.dataList4.income}}</td>   <!-- 中奖金额 -->
							<td>{{this.dataList4.difference}}</td><!--差值金额 -->
							<td>{{this.dataList4.ratio}}</td><!-- 用户回报率 -->
							<td>{{this.dataList4.ratio}}</td><!-- 公共奖池 -->
						</tr>
					</table>
				</el-form>
			</el-form>
			<el-table :data="dataList3" border v-loading="dataListLoading" style="width:100%">
				<el-table-column
					type="selection"
					header-align="center"
					align="center"
					width="50">
				</el-table-column>
				<el-table-column
					prop="userCode"
					label="用户ID"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="mobile"
					label="手机号"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="maskName"
					label="抽奖人昵称"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop=""
					label="抽奖时间"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop=""
					label="抽奖数量"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop=""
					label="中奖奖项"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop=""
					label="中奖礼物"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop=""
					label="奖品单价"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop=""
					label="奖品数量"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop=""
					label="奖品总价"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				visible:false,
				dataListLoading:false,
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataList1:{},  //数据
				dataList2:[ //列表
					{
						userCode:'123',
						mobile:'121212',
					},{
						userCode:'456',
						mobile:'131313',
					}
				],
				dataList3:[], //详情列表
				dataList4:{
					expense:'10000'
				},  //详情数据
				dataForm:{
					mobile:'',
					startTime:'',
					endTime:'',
					prizeType:'',
					options: [{
					  value: 0,
					  label: '幸运'
					}, {
					  value: 1,
					  label: '豪华'
					}, {
					  value: '',
					  label: '全部'
					},],
					value: ''
				},
				dataForm1:{
					startTime:'',
					endTime:'',
					prizeType:'',
					options: [{
					  value: 0,
					  label: '幸运'
					}, {
					  value: 1,
					  label: '豪华'
					}, {
					  value: '',
					  label: '全部'
					},],
					value: ''
				}, //详情查询
			}
		},
		activated () {
			this.getDataList()
		},
		methods:{
			getDataList(){
				
			},
			//查看详情
			addOrUpdateHandle(){
				this.visible=true
			},
			//查看详情列表
			getDataList1(){
				
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
			filterTag(value, row) {
				return row.prizeName === value;
			},
		}
	}
</script>

<style>
</style>
