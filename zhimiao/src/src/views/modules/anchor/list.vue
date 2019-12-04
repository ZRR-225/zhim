<!-- 主播列表 -->

<template>
	<div class="list">
		<el-form :inline="true":model="dataForm"  @keyup.enter.native="getDataList()">
			<el-form-item prop="mobile">
				<el-input type="text" placeholder="手机号码" v-model="dataForm.mobile" clearable></el-input>
			</el-form-item>
			<el-form-item prop="realName">
				<el-input type="text" placeholder="真实姓名" v-model="dataForm.realName" clearable></el-input>
			</el-form-item>
			<el-form-item prop="userCode">
				<el-input type="text" placeholder="房间ID" v-model="dataForm.roomId" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
<!-- 				<el-button type="primary">新增</el-button>
				<el-button type="danger">批量删除</el-button> -->
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border v-loading="dataListLoading"  style="width:100%;">
			<el-table-column
			  type="index"
			  label="序号"
			  header-align="center"
			  align="center"
			  width="50">
			</el-table-column>
			<el-table-column
			  prop="userCode"
			  label="主播ID"
			  header-align="center"
			  align="center"
			  width="180">
			</el-table-column>
			<el-table-column
			  prop="maskName"
			  label="主播昵称"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="realName"
			  label="主播姓名"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="mobile"
			  label="手机号码"
			  header-align="center"
			  align="center"
			  width="110">
			</el-table-column>
			<el-table-column
			  prop="roomName"
			  label="房间名"
			  header-align="center"
			  align="center"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="roomId"
			  label="房间ID"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="streamerLevel"
			  label="主播等级"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="roomType" 
			  label="房间类型"
			  header-align="center"
			  align="center"
			  width="150"
			  :filters="[{ text: '男神', value:1 }, { text: '女神', value:2},{ text: '唱见', value:3},
				{ text: '娱乐', value:4},{ text: '聊天', value:5}]"
			  :filter-method="filterTag">
				<template slot-scope="scope">
				  <el-tag v-if="scope.row.roomType === 1" size="small">男神</el-tag>
				  <el-tag v-if="scope.row.roomType === 2" size="small" type="success">女神</el-tag>
				  <el-tag v-if="scope.row.roomType === 3" size="small" type="danger">唱见</el-tag>
				  <el-tag v-if="scope.row.roomType === 4" size="small">娱乐</el-tag>
				  <el-tag v-if="scope.row.roomType === 5" size="small" type="success">聊天</el-tag>
<!-- 				  <el-tag v-if="scope.row.roomType === 6" size="small" type="danger">占卜</el-tag>
				  <el-tag v-if="scope.row.roomType === 7" size="small">官方接待</el-tag> -->
				</template>
			</el-table-column>
			<el-table-column
			  prop="isGiveCurrency"
			  label="转账权限"
			  header-align="center"
			  align="center" 
			  :filters="[{ text: '关', value:0},{ text: '开', value:1}]"
			  :filter-method="filterTag1">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.isGiveCurrency === 0" size="small">关</el-tag>
						<el-tag v-if="scope.row.isGiveCurrency === 1" size="small" type="success">开</el-tag>
					</template>
			</el-table-column>
			<el-table-column
			  prop="conRecommend"
			  label="推荐次数"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="conAttention"
			  label="关注人数"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="allLiveTime"
			  label="直播总时长"
			  sortable
			  header-align="center"
			  align="center"
			  width="140">
			</el-table-column>
			<el-table-column
			  prop="tothdayLive"
			  label="今日直播时长"
			  sortable
			  header-align="center"
			  align="center"
			  width="110">
			</el-table-column>
			<el-table-column
			  prop="conUser"
			  label="观看人数"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="allDiamond"
			  label="总萌力"
			  sortable
			  header-align="center"
			  align="center"
			  width="120">
			</el-table-column>
			<el-table-column
			  prop="surplusDiamond"
			  label="剩余萌力"
			  sortable
			  header-align="center"
			  align="center"
			  width="150">
			</el-table-column>
			<el-table-column
			  prop="createTime"
			  label="创建时间"
			  sortable
			  header-align="center"
			  align="center"
			  width="170">
			</el-table-column>
			<el-table-column
			  label="操作"
			  fixed="right"
			  header-align="center"
			  align="center"
			  width="120">
			  <template slot-scope="scope">
				<el-button v-if="isAuth('sys:streamerGrant:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.mobile)">编辑</el-button>
				<!-- <el-button  type="text" size="small" @click="cancellationHandle(scope.row.userCode)">注销</el-button> -->
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	</div>
</template>

<script>
  import AddOrUpdate from './list-add-or-update'
export default{
	data(){
		return{
			dataForm:{
				mobile:'',
				realName:'',
				userCode:'',
				streamerLevel:'',
				roomLevel:'',
				roomId:'',
			},
			dataList:[],
			pageIndex:1,
			pageSize:10,
			totalPage:0,
			dataListLoading: false,
			addOrUpdateVisible:false,
		}
	},
    components: {
      AddOrUpdate,
    },
    activated () {
      this.getDataList()
    },
	methods:{
		// 获取数据列表
		  getDataList () {
			this.dataListLoading=true
			this.$http({
			  url: this.$http.adornUrl('/sys/streamer/streamerList'),
			  method: 'get',
			  params: this.$http.adornParams({
				'pageNo': this.pageIndex,
				'pageSize': this.pageSize,            
				'mobile': this.dataForm.mobile,
				'realName':this.dataForm.realName,
				'roomId':this.dataForm.roomId,
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
		  filterTag(value, row) {
			return row.roomLevel === value;
		  },
		  filterTag1(value,row){
			  return row.isGiveCurrency === value;
		  },
		  // 多选
		 //  selectionChangeHandle (val) {
			// this.dataListSelections = val
		 //  },
		  //编辑
		  addOrUpdateHandle (mobile) {
			this.addOrUpdateVisible = true
			this.$nextTick(() => {
			  this.$refs.addOrUpdate.init(mobile)
			})
		  },
		//注销  将主播变为普通用户
		cancellationHandle(userCode){
			 // console.log(userCode)
			this.$confirm('是否将该主播变为普通用户,是否继续?','提示',{
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(()=>{
			  this.$http({
				url:this.$http.adornUrl(''),
				method:'post',
				data:this.$http.adornData({
					'userCode':userCode
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
	}
}
</script>

<style>
</style>
