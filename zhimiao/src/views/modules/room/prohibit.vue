<!-- 房间封禁 -->
<template>
	<div class="prohibi">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input type="text" placeholder="房间Id" v-model="dataForm.roomId" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
			:data="dataList" 
			stripe 
			v-loading="dataListLoading" 
			style="width:100%;">
			<el-table-column
			  type="index"
			  label="序号"
			  header-align="center"
			  align="center"
			  width="50">
			</el-table-column>
			<el-table-column
			  prop="roomId"
			  label="房间Id"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="roomName"
			  label="房间名称"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="createTime"
			  label="开始时间"
				sortable
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="endTime"
			  label="结束时间"
		       sortable
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="openTime"
			  label="解封时间"
			  sortable
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="blackReason"
			  label="拉黑原因"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="state"
			  label="房间状态"
			  header-align="center"
			  align="center">
				<template slot-scope="scope">
				  <el-tag v-if="scope.row.state === 0" size="small" type="info">封禁中</el-tag>
				  <el-tag v-if="scope.row.state === 1" size="small">解封</el-tag>
				</template>
			</el-table-column>
			<el-table-column
			  header-align="center"
			  align="center"
			  width="100"
			  label="操作">
			<template slot-scope="scope">
			  <el-button v-if="isAuth('sys:maskroomblack:update')" type="text" size="small" @click="addRoomList(scope.row.roomId)" :disabled="scope.row.state===1">解封</el-button>
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
<!-- 		<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
	</div>
</template>

<script>
// import AddOrUpdate from './prohibt-add-or-update'
export default {
	data() {
		return {
			dataForm: {
				roomId:'',
				state:1,
				// applyState:0,
			},
			dataList:[],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			dataListSelections: [],
			addOrUpdateVisible: false,
		}
	},
    // components: {
    //   AddOrUpdate,
    // },
    activated () {
      this.getDataList()
    },
	methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/maskroomblack/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
			'roomId':this.dataForm.roomId,
			// 'applyState':this.dataForm.applyState,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
       //  修改
		 // addOrUpdateHandle (roomId) {
		 //   this.addOrUpdateVisible = true
		 //   this.$nextTick(() => {
			//  this.$refs.addOrUpdate.init(roomId)
		 //   })
		 // },
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
	  //解封id
	  addRoomList(roomId){
		// console.log(roomId)
        this.$confirm('是否将该主播解封, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
			this.$http({
				url:this.$http.adornUrl('/sys/maskroomblack/update'),
				method:'post',
				data:this.$http.adornData({
					'roomId':roomId,
					'state':this.dataForm.state
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
	},
}
	
</script>

<style>
</style>
