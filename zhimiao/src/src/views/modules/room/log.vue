<!-- 房间管理员操作日志 -->
<template>
	<div class="room-log">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input placeholder="操作人ID" v-model="dataForm.fromUserCode" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="操作人昵称" v-model="dataForm.fromUserName" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="被操作人ID" v-model="dataForm.toUserCode" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="被操作人昵称" v-model="dataForm.toUserName" clearable></el-input>
			</el-form-item>
			<el-form-item>
			  <el-date-picker type="date" v-model="dataForm.createTime" placeholder="操作时间"  value-format="yyyy-MM-dd"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-input placeholder="操作房间Id" v-model="dataForm.roomId" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
		 :data="dataList"
		 border
		 v-loading="dataListLoading"
		 style="width: 100%">
		  <el-table-column
			prop="id"
			header-align="center"
			align="center"
			label="Id">
		  </el-table-column>
		  <el-table-column
			prop="fromUserCode"
			header-align="center"
			align="center"
			label="操作人ID">
		  </el-table-column>
		  <el-table-column
			prop="fromUserName"
			header-align="center"
			align="center"
			label="操作人昵称">
		  </el-table-column>
		  <el-table-column
			prop="toUserCode"
			header-align="center"
			align="center"
			label="被操作人ID">
		  </el-table-column>
		  <el-table-column
			prop="toUserName"
			header-align="center"
			align="center"
			label="被操作人昵称">
		  </el-table-column>
		  <el-table-column
			prop="type"
			header-align="center"
			align="center"
			label="操作类型"
			:filters="[{ text: '设置管理员', value:0 }, { text: '删除管理员', value:1},{ text: '抱麦', value:2},
			{text: '下麦', value:3},{text: '禁麦', value:4},{text: '解除禁麦', value:5},
			{text: '踢出房间', value:6},{text: '更新房间描述说明', value:7}]"
			:filter-method="filterTag">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.type === 0" size="small" type="success">设置管理员</el-tag>
					<el-tag v-if="scope.row.type === 1" size="small" type="info">删除管理员</el-tag>
					<el-tag v-if="scope.row.type === 2" size="small" type="danger">抱麦</el-tag>
					<el-tag v-if="scope.row.type === 3" size="small" >下麦</el-tag>
					<el-tag v-if="scope.row.type === 4" size="small" type="warning">禁麦</el-tag>
					<el-tag v-if="scope.row.type === 5" size="small" type="danger">解除禁麦</el-tag>
					<el-tag v-if="scope.row.type === 6" size="small" >踢出房间</el-tag>
					<el-tag v-if="scope.row.type === 7" size="small" type="success">更新房间描述说明</el-tag>
				</template>
		  </el-table-column>
		  <el-table-column
			prop="createTime"
			header-align="center"
			align="center"
			label="操作时间">
		  </el-table-column>
		  <el-table-column
			prop="content"
			header-align="center"
			align="center"
			label="操作内容">
		  </el-table-column>
		  <el-table-column
			prop="roomId"
			header-align="center"
			align="center"
			label="操作房间ID">
		  </el-table-column>
		</el-table>
		<el-pagination
		  @size-change="sizeChangeHandle"
		  @current-change="currentChangeHandle"
		  :current-page="pageIndex"
		  :page-sizes="[10, 20, 50, 100]"
		  :page-size="pageSize"
		  :total="totalPage"
		  layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					fromUserCode:'',
					fromUserName:'',
					toUserCode:'',
					toUserName:'',
					createTime:'',
					roomId:'',
					type:'',
				},
				dataList:[],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
			}
		},
		created () {
		  this.getDataList()
		},
		methods: {
			// 获取数据列表
			getDataList () {
				this.$http({
				  url: this.$http.adornUrl('/sys/managerlog/queryoperationlog'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
					'fromUserCode': this.dataForm.fromUserCode,
					'fromUserName': this.dataForm.fromUserName,
					'toUserCode': this.dataForm.toUserCode,
					'toUserName': this.dataForm.toUserName,
					'createTime': this.dataForm.createTime,
					'roomId': this.dataForm.roomId,
					'type': this.dataForm.type,
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
			return row.type === value;
			},
		},
	}
</script>

<style>
</style>
