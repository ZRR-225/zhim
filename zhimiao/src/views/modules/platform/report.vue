<!-- 举报管理 -->
<template>
	<div class="report">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input v-model="dataForm.mobile" placeholder="手机号码" clearable></el-input>
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
				width="80">
			</el-table-column>
			<el-table-column
				prop="reportName"
				label="举报人"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="reportUserCode"
				label="举报人ID"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="maskName"
				label="被举报人"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="maskCode"
				label="被举报人ID"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="mobile"
				label="被举报人手机号"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="content"
				label="被举报原因"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="reportTime"
				label="被举报时间"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
		  <el-table-column
				label="操作"
				fixed="right"
				header-align="center"
				align="center"
				width="150">
				  <template slot-scope="scope">
	<!-- 				<el-button  type="text" size="small" @click="addOrUpdateHandle(scope.row.jobId)">编辑</el-button> -->
					<el-button   v-if="isAuth('sys:maskUser:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.mobile)">移入黑名单</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
   <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	</div>
</template>

<script>
import AddOrUpdate from './report-add-or-update'
export default{
	data(){
		return{
			dataForm:{
				mobile:''
			},
			dataList:[],
			dataListLoading:false,
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			addOrUpdateVisible: false,
		}
			
	},
    components: {
      AddOrUpdate,
    },
    activated () {
      this.getDataList()
    },
	methods:{
		getDataList(){
			this.dataListLoading=true
			this.$http({
				url: this.$http.adornUrl('/sys/maskreportrecord/queryByMobile'),
				method: 'get',
				params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
					 mobile:this.dataForm.mobile
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
      // 新增 / 修改
      addOrUpdateHandle (mobile) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(mobile)
        })
      },
		//移入黑名单
      addBlackList (mobile) {
  //       this.$confirm('是否将该用户加入黑名单, 是否继续?', '提示', {
  //         confirmButtonText: '确定',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(()=>{
		// 	this.$http({
		// 		url:this.$http.adornUrl('/sys/maskUser1/update'),
		// 		method:'post',
		// 		data:this.$http.adornData({
		// 			'mobile':mobile
		// 		})
		// 	}).then(({data})=>{
		// 		if (data && data.code === 0){
		// 		  this.$message({
		// 			message: '操作成功',
		// 			type: 'success',
		// 			duration: 1500,
		// 			onClose: () => {
		// 			  this.getDataList()
		// 			}
		// 		  })
		// 		}else {
		// 		  this.$message.error(data.msg)
		// 		}
		// 	})
		// }).catch(()=>{})
      },
	}
}
</script>

<style>
</style>
