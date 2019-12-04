<template>
	<div class="open">
		<el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
<!-- 			<el-form-item>
				<el-input type="text" placeholder="活动" v-model="dataForm.mobile" clearable></el-input>
			</el-form-item> -->
			<el-form-item>
<!-- 				<el-button @click="getDataList()">查询</el-button> -->
				<el-button @click="addNewHandle()" type="primary">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table
			:data="dataList" 
			border 
			v-loading="dataListLoading" 	
			style="width:100%;">
			<el-table-column
			  prop="id"
			  label="活动ID"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="activity"
			  label="活动名称"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="createTime"
			  label="创建时间"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="updaeTime"
			  label="修改时间"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="switchStatus"
			  label="当前活动状态"
			  header-align="center"
			  align="center" >
				<template slot-scope="scope">
				  <el-tag v-if="scope.row.switchStatus === 0" size="small">关闭</el-tag>
				  <el-tag v-if="scope.row.switchStatus === 1" size="small" type="success">开启</el-tag>
				</template>
			</el-table-column>
			<el-table-column
			  label="操作"
			  fixed="right"
			  header-align="center"
			  align="center">
			  <template slot-scope="scope">
			    <el-button  type="text" size="small" @click="openHandle(scope.row.id)" :disabled="scope.row.switchStatus ===1">开启</el-button>
				<el-button  type="text" size="small" @click="closeHandle(scope.row.id)":disabled="scope.row.switchStatus ===0">关闭</el-button>
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
	<!-- 弹窗, 新增-->
		<add-new v-if="addNewVisible" ref="addNew" @refreshDataList="getDataList"></add-new>
	</div>
</template>

<script>
	import AddNew from './open-add-new'
	export default{
		data(){
			return{
				dataForm:{
					id:'',
					activity:'',
					createTime:''
				},
				dataList:[
					// {
					// 	activity:'11'
					// }
				],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				addOrUpdateVisible: false,
				addNewVisible:false,
			}
		},
	    components: {
			AddNew
	    },
	    activated () {
	      this.getDataList()
	    },
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
				  url: this.$http.adornUrl('/sys/maskactivityswitch/list'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
								
				  })
				}).then(({data}) => {
				  if (data && data.code === 0) {
					this.dataList = data.page.list
					this.totalPage = data.page.totalCount
				  } else {
					this.dataList = []
					// this.totalPage = 0
				  }
				  this.dataListLoading = false
				})				
			},
		//新增
			addNewHandle(){
				this.addNewVisible = true
				this.$nextTick(() => {
					this.$refs.addNew.init()
				})
			},
		//开启
		openHandle(id){
			this.$confirm('是否开启该活动, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(()=>{
				this.$http({
					url:this.$http.adornUrl('/sys/maskactivityswitch/update'),
					method:'post',
					data:this.$http.adornData({
						'switchStatus':1,
						'id':id,
						// activity:this.dataForm.mobile,
						// createTime:this.dataForm.createTime,
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
		//关闭
		closeHandle(id){
			// console.log(id)
			this.$confirm('是否关闭该活动, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(()=>{
				this.$http({
					url:this.$http.adornUrl('/sys/maskactivityswitch/update'),
					method:'post',
					data:this.$http.adornData({
						'switchStatus':0,
						'id':id,
						// activity:this.dataForm.activity,
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
