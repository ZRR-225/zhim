<!-- 用户粉丝 -->
<template>
	<div class="fans">
		<el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input type="text" placeholder="用户ID" v-model="dataForm.userCode" clearable></el-input>
			</el-form-item>
		  <el-form-item>
			<el-button @click="getDataList()">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-table
		:data="dataList"
		border
		v-loading="dataListLoading"
		style="width:100%;">
		  <el-table-column
			prop="maskName"
			label="用户昵称"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="realName"
			label="真实姓名"
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
			prop="userNumber"
			label="粉丝人数"
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
			prop="isSteamer"
			label="是否是主播"
			header-align="center"
			align="center"			
			:filters="[{ text: '否', value:0 }, { text: '是', value:1}]"
			:filter-method="filterTag">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.isSteamer===0" size="small"  type="warning" >否</el-tag>
					<el-tag v-if="scope.row.isSteamer===1" size="small" type="success">是</el-tag>
				</template>
		  </el-table-column>
		  <el-table-column
			label="操作"
			fixed="right"
			header-align="center"
			align="center"
			width="150">
			  <template slot-scope="scope">
				<el-button  v-if="isAuth('sys:userfans:queryuserfansdetailed')" type="text" size="small" @click="addOrUpdateHandle(scope.row.userCode)">查看</el-button>
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
		<!-- 查看详情 -->
		<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	</div>
</template>

<script>
	import AddOrUpdate from './fans-add-or-update'
	export default{
		data(){
			return{
				dataForm:{
					userCode:'',
				},
				dataList:[],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				addOrUpdateVisible: false,
			}
		},
		components: {
			AddOrUpdate
		},
		activated () {
		  this.getDataList()
		},
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
				  url: this.$http.adornUrl('/sys/userfans/queryuserfans'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'userCode':this.dataForm.userCode,
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
			return row.isSteamer === value;
			},
      // 查看
			addOrUpdateHandle (userCode) {
				this.addOrUpdateVisible = true
				this.$nextTick(() => {
				  this.$refs.addOrUpdate.init(userCode)
				})
			},
		}
	}
</script>

<style>
</style>
