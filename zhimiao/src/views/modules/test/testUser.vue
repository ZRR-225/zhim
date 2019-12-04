<!-- 测试用户 -->
<template>
	<div class="testUser">
		<el-table
		:data="dataList"
		border
		v-loading="dataListLoading"
		style="width:100%;"
		>      
		  <el-table-column
			prop="id"
			label="序号"
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
			prop="showUserCode"
			label="靓号"
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
			prop="createTime"
			label="创建时间"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="isCeshi"
			label="是否为测试"
			header-align="center"
			align="center"
			:filters="[{ text: '否', value:0 }, { text:'是', value:1},]"
		    :filter-method="filterTag">
				 <template slot-scope="scope">
						  <el-tag v-if="scope.row.isCeshi === 0" size="small" >否</el-tag>
						  <el-tag v-if="scope.row.isCeshi === 1" size="small" type="success">是</el-tag>
				  </template>
		  </el-table-column>
		 <el-table-column
			label="更改测试"
			header-align="center"
			align="center">
			<template slot-scope="scope">
			  <el-button native-type="button" type="primary" v-show="scope.row.isCeshi===0"  size="small"  @click="Handle1(scope.row.id)">是</el-button>
			  <el-button native-type="button" type="primary" v-show="scope.row.isCeshi===1" size="small" @click="Handle2(scope.row.id)">否</el-button>
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
	</div>
</template>

<script>
	export default{
		data() {
			return {
				dataList:[],
				dataListLoading:false,
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
			}
		},
		activated () {
		  this.getDataList()
		},
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
				  url: this.$http.adornUrl('/sys/ceshi/ceshiPersonList'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
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
			//非测试变成测试  0->1
			Handle1(id){
				this.$confirm('是否变更为测试, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(()=>{
				this.$http({
					url:this.$http.adornUrl(`/sys/ceshi/updateCeshiPerson`),
					method:'post',
					data:this.$http.adornData({
						'isCeshi':1,
						'id':id,
					})
				}).then(({data})=>{
					if (data && data.code === 0){
					  this.$message({
						message: '操作成功',
						type: 'success',
						duration: 1500,
						onClose: () => {
						  this.getDataList()
						}
					  })
					}else {
					  this.$message.error(data.msg)
					}
				})
			  }).catch(()=>{})
			},
			//测试变成非测试  1->0
			Handle2(id){
				this.$confirm('是否变更为非测试, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(()=>{
				this.$http({
					url:this.$http.adornUrl(`/sys/ceshi/updateCeshiPerson`),
					method:'post',
					data:this.$http.adornData({
						'isCeshi':0,
						'id':id,
					})
				}).then(({data})=>{
					if (data && data.code === 0){
					  this.$message({
						message: '操作成功',
						type: 'success',
						duration: 1500,
						onClose: () => {
						  this.getDataList()
						}
					  })
					}else {
					  this.$message.error(data.msg)
					}
				})
			  }).catch(()=>{})
			},
			filterTag(value, row) {
				return row.isCeshi === value;
			},
		}
	}
</script>

<style>
</style>
