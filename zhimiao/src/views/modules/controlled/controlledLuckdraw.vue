<!-- 可控抽奖(抽奖概览) controlledLuckdraw-->
<template>
	<div class="controlledLuckdraw">
		<!-- 今日状态 todayStates-->
		<div class="todayStates"> 
			<div style="line-height: 20px;">今日状态</div>
			<el-table :data="dataListToday" border v-loading="dataListLoading" style="width:100%;">
				<el-table-column
				  prop="createTime"
				  label="日期"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="充值"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="抽奖"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="中奖"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="比例"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="额度"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="已控"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="已控已中"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="已控未中"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="可控"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="金额"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  label="操作"
				  fixed="right"
				  header-align="center"
				  align="center">
				  <template slot-scope="scope">
					<el-button type="text" size="small" @click="handleDetailToday(scope.row.createTime)">详情</el-button>
				  </template>
				</el-table-column>
			</el-table>
			<!-- 弹窗,今日状态详情 -->
			<Detail-Today v-if="detailTodayVisible" ref="detailToday" @refreshDataList="getDataListToday"></Detail-Today>
		</div>
		<!-- 历史状态 historyStates -->
		<div class="historyStates">
			<div style="margin-top:20px;line-height:20px;">历史状态</div>
			<el-table :data="dataListHistory" border v-loading="dataListLoading" style="width:100%;">
				<el-table-column
				  prop="createTime"
				  label="日期"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="充值"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="抽奖"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="中奖"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="比例"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="额度"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="已控"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="已控已中"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="已控未中"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="可控"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop=""
				  label="金额"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  label="操作"
				  fixed="right"
				  header-align="center"
				  align="center">
				  <template slot-scope="scope">
					<el-button type="text" size="small" @click="handleDetailHistory(scope.row.createTime)">详情</el-button>
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
			<!-- 弹窗,历史状态详情 -->
			<Detail-History v-if="detailHistoryVisible" ref="detailHistory" @refreshDataList="getDataListHistory"></Detail-History>
		</div>
	</div>
</template>
	
<script>
	import DetailToday from './controlledLuckdraw-detail-Today'  //今日状态详情
	import DetailHistory from './controlledLuckdraw-detail-History'  //历史状态详情
	export default{
		data(){
			return{
				dataListToday:[
					{
						createTime:'2019-11-26'
					}
				], //今日状态
				dataListHistory:[
					{
						createTime:'2019-11-25'
					},
					{
						createTime:'2019-11-24'
					},					
				], //历史状态
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				detailTodayVisible:false,  //今日状态详情
				detailHistoryVisible:false,  //历史状态详情
			}
		},
		components: {
		  DetailToday,
		  DetailHistory,
		},
		activated() {
			this.getDataListToday()     //今日状态列表
			this.getDataListHistory()   //历史状态列表
		},
		methods:{
			//今日状态列表
			getDataListToday(){
				// this.dataListLoading=true
				// this.$http({
				//   url: this.$http.adornUrl('/sys/streamer/streamerList'),
				//   method: 'get',
				//   params: this.$http.adornParams({
				// 	// 'pageNo': this.pageIndex,
				// 	// 'pageSize': this.pageSize,            
				// 	// 'mobile': this.dataForm.mobile,
				// 	// 'realName':this.dataForm.realName,
				// 	// 'roomId':this.dataForm.roomId,
				//   })
				// }).then(({data}) => {
				//   if (data && data.code === 0) {
				// 	this.dataListTody = data.data.list
				//   } else {
				// 	this.dataListTody = []
				//   }
				//   this.dataListLoading = false
				// })
			},
			//今日详情
			handleDetailToday(createTime){
				// console.log(createTime)
				this.detailTodayVisible = true
				this.$nextTick(() => {
					this.$refs.detailToday.init(createTime)
				})
			},
			//历史状态列表
			getDataListHistory(){
				// this.dataListLoading=true
				// this.$http({
				//   url: this.$http.adornUrl('/sys/streamer/streamerList'),
				//   method: 'get',
				//   params: this.$http.adornParams({
				// 	// 'pageNo': this.pageIndex,
				// 	// 'pageSize': this.pageSize,            
				// 	// 'mobile': this.dataForm.mobile,
				// 	// 'realName':this.dataForm.realName,
				// 	// 'roomId':this.dataForm.roomId,
				//   })
				// }).then(({data}) => {
				//   if (data && data.code === 0) {
				// 	this.dataListHistory = data.data.list
				//   } else {
				// 	this.dataListHistory = []
				//   }
				//   this.dataListLoading = false
				// })
			},
			//历史详情
			handleDetailHistory(createTime){
				// console.log(createTime)
				this.detailHistoryVisible = true
				this.$nextTick(() => {
					this.$refs.detailHistory.init(createTime)
				})
				
			},
			// 每页数
			sizeChangeHandle (val) {
			this.pageSize = val
			this.pageIndex = 1
			this.getDataListHistoty() //历史状态列表
			},
			// 当前页
			currentChangeHandle (val) {
			this.pageIndex = val
			this.getDataListHistoty()  //历史状态列表
			},
		}
	}
</script>

<style>
</style>
