<!-- 新抽奖(指定中大奖) newprizeperson -->
<template>
	<div class="newprizeperson">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input v-model="dataForm.userCode" placeholder="用户Id" clearable></el-input>
			</el-form-item>
			<el-form-item>
			  <el-select v-model="dataForm.prizeId" placeholder="奖品">
				<el-option
				  v-for="item in options"
				  :key="dataForm.prizeId"
				  :label="item.prizeName"
				  :value="item.id">
				</el-option>
			  </el-select>
			</el-form-item>
		  <el-form-item>
	       <el-button @click="getDataList()">查询</el-button>
			<el-button v-if="isAuth('sys:maskprizeperson:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
		  </el-form-item>
		  <el-form-item style="float: right;">
			  <div>公共奖池:{{this.totalVaule}}</div>
		  </el-form-item>
		</el-form>
		
		<el-table
		  :data="dataList"
		  border
		  v-loading="dataListLoading"
		  style="width: 100%;">
			<el-table-column
				type="selection"
				header-align="center"
				align="center"
				width="50">
			</el-table-column>	
			<el-table-column
				prop="id"
				header-align="center"
				align="center"
				label="ID">
			</el-table-column>
			<el-table-column
				prop="userCode"
				header-align="center"
				align="center"
				label="用户编号">
			</el-table-column>
			<el-table-column
				prop="status"
				header-align="center"
				align="center"
				label="状态">
				<template slot-scope="scope">
				  <el-tag v-if="scope.row.status === 0" size="small">未删除</el-tag>
				  <el-tag v-if="scope.row.status === 1" size="small" type="success">删除</el-tag>
				</template>
			</el-table-column>
			<el-table-column
			prop="startTime"
			header-align="center"
			align="center"
			label="开始时间">
			</el-table-column>
			<el-table-column
			prop="endTime"
			header-align="center"
			align="center"
			label="结束时间">
			</el-table-column>
			<el-table-column
			prop="count"
			header-align="center"
			align="center"
			label="次数">
			</el-table-column>
			<el-table-column
			prop="prizeId"
			header-align="center"
			align="center"
			label="奖品"
			width="165px">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.prizeId ===1" size="small" value="豪华头等奖:秀出天际">豪华头等奖:秀出天际</el-tag> 
					<el-tag v-if="scope.row.prizeId ===2" size="small" value="豪华一等奖:糖果传奇">豪华一等奖:糖果传奇</el-tag>
					<el-tag v-if="scope.row.prizeId ===3" size="small" value="豪华二等奖:飞驰人生">豪华二等奖:飞驰人生</el-tag>
					<el-tag v-if="scope.row.prizeId ===7" size="small" value="幸运头等奖:糖果传奇">幸运头等奖:糖果传奇</el-tag>
					<el-tag v-if="scope.row.prizeId ===8" size="small" value="幸运一等奖:飞驰人生">幸运一等奖:飞驰人生</el-tag>
					<el-tag v-if="scope.row.prizeId ===9" size="small" value="幸运二等奖:草莓奶昔">幸运二等奖:草莓奶昔</el-tag>
					<el-tag v-if="scope.row.prizeId ===10" size="small" value="幸运三等奖:惊喜大礼">幸运三等奖:惊喜大礼</el-tag>
					<el-tag v-if="scope.row.prizeId ===11" size="small" value="幸运四等奖:恋爱密码">幸运四等奖:恋爱密码</el-tag>
					<el-tag v-if="scope.row.prizeId ===12" size="small" value="幸运五等奖:比翼双飞">幸运五等奖:比翼双飞</el-tag>
					<el-tag v-if="scope.row.prizeId ===13" size="small" value="幸运六等奖:棒棒糖">幸运六等奖:棒棒糖</el-tag>
					<el-tag v-if="scope.row.prizeId ===14" size="small" value="幸运七等奖:单身盛宴">幸运七等奖:单身盛宴</el-tag>
					<el-tag v-if="scope.row.prizeId ===15" size="small" value="幸运八等奖:挑逗一下">幸运八等奖:挑逗一下</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				header-align="center"
				align="center"
				width="150"
				label="操作">
				<template slot-scope="scope">
				  <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
				  <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
			layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	</div>
</template>

<script>
	import AddOrUpdate from './newprizeperson-add-or-update'
	export default{
		data(){
			return{
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				addOrUpdateVisible:false,
				dataForm:{
					id: 0,
					userCode:'',
					prizeId:'',
					key: '',
				},
				options: [],
				dataList:[],
				totalVaule:'1200',//公共奖池
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
				this.dataListLoading = true
				this.$http({
				  url: this.$http.adornUrl('/sys/maskprizeperson/list'),
				  method: 'get',
				  params: this.$http.adornParams({
					'page': this.pageIndex,
					'limit': this.pageSize,
					'key': this.dataForm.key
				  })
				}).then(({data}) => {
				  if (data && data.code === 0) {
					this.dataList1 = data.data
					this.options = data.data
					this.dataList = data.page.list
					// this.daaa=this.dataList1.concat(this.dataList)
					this.totalPage = data.page.totalCount
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
			addOrUpdateHandle (id) {
				this.addOrUpdateVisible = true
				this.$nextTick(() => {
				  this.$refs.addOrUpdate.init(id)
				})
			},
			      // 删除
			deleteHandle (id) {
				var ids = id ? [id] : this.dataListSelections.map(item => {
				  return item.id
				})
				this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
				  this.$http({
					url: this.$http.adornUrl('/sys/maskprizeperson/delete'),
					method: 'post',
					data: this.$http.adornData(ids, false)
				  }).then(({data}) => {
					if (data && data.code === 0) {
					  this.$message({
						message: '操作成功',
						type: 'success',
						duration: 1500,
						onClose: () => {
						  this.getDataList()
						}
					  })
					} else {
					  this.$message.error(data.msg)
					}
				  })
				})
			}
		}
	  }
	</script>
<style>
</style>
