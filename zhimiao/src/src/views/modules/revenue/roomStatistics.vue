<!-- 房间类型统计收入  -->
<template>
	<div class="roomStatistics">
		<el-form
			:inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-date-picker type="datetime"  v-model="dataForm.startTime" placeholder="开始日期" :clearable="false"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-date-picker type="datetime"  v-model="dataForm.endTime" placeholder="结束日期" :clearable="false"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-input  type="text" placeholder="房主ID" v-model="dataForm.userCode" clearable></el-input>
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
			prop="roomName"
			label="房间名称"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="roomId"
			label="房间ID"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="music"
			label="音乐收益"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="radio"
			label="电台收益"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="dating"
			label="交友收益"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="recreation"
			label="娱乐收益"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="game"
			label="游戏收益"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="divination"
			label="占卜收益"
			align="center"
			header-align="center">
			</el-table-column>
			<el-table-column
			prop="authority"
			label="官方收益"
			align="center"
			header-align="center">
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
					startTime:'',
					endTime:'',
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

		},
		activated (){
			this.getDataList()
		},
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
				  url: this.$http.adornUrl('/sys/room/roomStatisticsByType'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
					'startTime': this.dataForm.startTime,
					'endTime':this.dataForm.endTime,
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
