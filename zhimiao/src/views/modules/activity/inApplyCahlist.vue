<!-- 邀请奖励金  提现列表 -->
<template>
	<div class="inApplyCahlist">
	  <el-form :inline="true" :model="dataForm">
		  <el-form-item>
			  <el-input v-model="dataForm.userCode" placeholder="用户ID" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			  <el-input v-model="dataForm.maskName" placeholder="用户昵称" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			  <el-input v-model="dataForm.mobile" placeholder="手机号码" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			  <el-date-picker type="date" v-model="dataForm.createTime" placeholder="提交时间"  value-format="yyyy-MM-dd" clearable></el-date-picker>
		  </el-form-item>
		  <el-form-item>
			  <el-button @click="getDataList()">查询</el-button>
		  </el-form-item>
	  </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="ID"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userCode"
        label="用户ID"
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
        prop="realName"
        label="真实姓名"
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
        prop="bonusMoney"
        label="提现金额（元）"
		sortable
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="提交时间"
		sortable
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="applyStatus"
        label="状态"
        header-align="center"
        align="center"
		:filters="[{ text: '申请中', value:0 }, { text: '拒绝结算', value:2},{ text: '同意结算', value:1},]"
		:filter-method="filterTag">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.applyStatus===0" size="small" >申请中</el-tag>
				<el-tag v-if="scope.row.applyStatus===2" size="small"  type="warning" >拒绝结算</el-tag>
				<el-tag v-if="scope.row.applyStatus===1" size="small" type="success">同意结算</el-tag>
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
		  layout="total, sizes, prev, pager, next">
		</el-pagination>
  </div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					userCode:'',
					mobile:'',
					maskName:'',
					createTime:'',
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
				url: this.$http.adornUrl('/sys/sysMaskapplybonus/BonusList'),
				method: 'get',
				params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
					'mobile': this.dataForm.mobile,
					'maskName':this.dataForm.maskName,
					'userCode':this.dataForm.userCode,
					'createTime':this.dataForm.createTime
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
		  },
		  // 当前页
		  currentChangeHandle (val) {
		    this.pageIndex = val
		    this.getDataList()
		  },
		  filterTag(value, row) {
			return row.status === value;
		  },
		}
	}
</script>

<style>
</style>