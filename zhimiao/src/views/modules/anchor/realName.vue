<!-- 实名资料管理 -->
<template>
	<div class="realName">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input type="text" placeholder="手机号码" v-model="dataForm.mobile" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()" >查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border v-loading="dataListLoading" style="width:100%;">
			<el-table-column
				type="index"
				label="序号"
				header-align="center"
				align="center"
				>
			</el-table-column>
			<el-table-column
				prop="showUserCode"
				label="主播ID"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="realName"
				label="主播姓名"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="maskName"
				label="主播昵称"
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
				prop="idNumber"
				label="主播身份证号"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="alipayAccount"
				label="主播支付宝号"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
			  label="操作"
			  fixed="right"
			  header-align="center"
			  align="center">
			  <template slot-scope="scope">
			    <el-button  v-if="isAuth('sys:streamer:dataManager')" type="text" size="small" @click="addOrUpdateHandle(scope.row.mobile)">修改</el-button>
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
	import AddOrUpdate from './realName-add-or-update'
	export default{
		data(){
			return{
				dataForm:{
					mobile:'',
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
		  AddOrUpdate,
		},
	    activated () {
	      this.getDataList()
	    },
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
				  url: this.$http.adornUrl('/sys/streamer/streamerDataList'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,
					'mobile':this.dataForm.mobile,								
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
			//  修改----同意
			addOrUpdateHandle (mobile) {
				// console.log(mobile)
				this.addOrUpdateVisible = true
				this.$nextTick(() => {
				this.$refs.addOrUpdate.init(mobile)
			})
			},
		}
	}
</script>

<style>
</style>
