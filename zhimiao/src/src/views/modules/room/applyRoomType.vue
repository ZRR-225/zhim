<!-- 申请变更房间类型 -->
<template>
	<div class="applyRoomType">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input type="text" placeholder="房主ID" v-model="dataForm.userCode" clearable></el-input>
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
			label="房主名称"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="userCode"
			label="房主ID"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			<el-table-column
			prop="roomId"
			label="房间ID"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="applyTime"
			label="申请时间"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="applyState"
			label="申请状态"
			align="center"
			header-align="center">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.applyState===0" size="small" >申请中</el-tag>
					<el-tag v-if="scope.row.applyState===1" size="small" type="success">通过</el-tag>
					<el-tag v-if="scope.row.applyState===2" size="small" type="warning">拒绝</el-tag>
				</template>
			</el-table-column>
			<el-table-column
			prop="typeName"
			label="申请的房间"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="applyReason"
			label="申请原因"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			  fixed="right"
			  header-align="center"
			  align="center"
			  width="100"
			  label="操作">
			<template slot-scope="scope">
				<!-- v-if="isAuth('sys:maskapplyroomtyperecord:update')" -->
			  <el-button native-type="button"  type="text" size="small" @click="addOrUpdateHandle(scope.row.userCode)" :disabled="scope.row.applyState ===1 || scope.row.applyState ===2">通过</el-button>
			  <el-button native-type="button"  type="text" size="small"  @click="addRefuse(scope.row.userCode)" :disabled="scope.row.applyState ===1 || scope.row.applyState ===2" >拒绝</el-button>
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
		  layout="total,sizes,prev,pager,next,jumper">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					userCode:'',
					type:'',
					applyState:'',
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
			
		},
		activated (){
			this.getDataList()
		},
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
				  url: this.$http.adornUrl('/sys/maskapplyroomtyperecord/list'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'userCode':this.dataForm.userCode,
					'applyState':this.dataForm.applyState,
					// 'applyState':0,
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
			// 通过
			addOrUpdateHandle(userCode){
				// console.log(userCode)
				this.$http({
				  url: this.$http.adornUrl('/sys/maskapplyroomtyperecord/list'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'userCode':userCode,
					'applyState':0,
				  })
				}).then(({data}) => {
				  if (data && data.code === 0) {
						this.dataForm.type=data.data.list[0].type
						// console.log(data.data.list[0].type)
				  } else {
					this.dataList = []
					// this.totalPage = 0
				  }
				})
			this.$confirm('是否允许该主播变更房间类型, 是否继续?', '通过',{
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(()=>{
				this.$http({
					url:this.$http.adornUrl('/sys/maskapplyroomtyperecord/update'),
					method:'post',
					data:this.$http.adornData({
						'userCode':userCode,
						'applyState':1,
						'roomType':this.dataForm.type
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
		  //拒绝
		  addRefuse(userCode){
				// console.log(userCode)
				this.$http({
				  url: this.$http.adornUrl('/sys/maskapplyroomtyperecord/list'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'userCode':userCode,
					'applyState':0,
				  })
				}).then(({data}) => {
				  if (data && data.code === 0) {
						this.dataForm.type=data.data.list[0].type
						// console.log(data.data.list)
				  } else {
					this.dataList = []
					// this.totalPage = 0
				  }
				})
			this.$confirm('是否拒绝该主播变更房间类型, 是否继续?', '拒绝',{
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(()=>{
				this.$http({
					url:this.$http.adornUrl('/sys/maskapplyroomtyperecord/update'),
					method:'post',
					data:this.$http.adornData({
						'userCode':userCode,
						'applyState':2,
						'roomType':this.dataForm.type
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
		  }
		}
	}
</script>

<style>
</style>
