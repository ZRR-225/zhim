<!-- 轮播图列表 -->
<template>
	<div class="rmap">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input v-model="dataForm.title" placeholder="轮播图标题" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addNewHandle()">新增轮播图</el-button>
			</el-form-item>
		</el-form>
		<el-table
		  :data="dataList" 
		  border
		  v-loading="dataListLoading" 
		  style="width:100%;">
			<el-table-column
			  type="index"
			  label="序号"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="carouselCode"
			  label="轮播图编号"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="title"
			  label="轮播图标题"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  header-align="center"
			  align="center">
				<el-table-column
				  prop="data"
				  label="数据"
				  header-align="center"
				  align="center">
				</el-table-column>
				<el-table-column
				  prop="type"
				  label="数据类型"
				  header-align="center"
				  align="center">
					<template slot-scope="scope">
						<el-tag  v-if="scope.row.type===0" size="small">富文本</el-tag>
						<el-tag  v-if="scope.row.type===1" size="small" type="warning">URL</el-tag>
						<el-tag  v-if="scope.row.type===2" size="small" type="success">用户编号</el-tag>
						<el-tag  v-if="scope.row.type===3" size="small" type="danger">其他</el-tag>
					</template>
				</el-table-column>			  
			</el-table-column>
			<el-table-column
			  prop="createTime"
			  label="创建时间"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="status"
			  label="轮播图状态"
			  header-align="center"
			  align="center">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status===0" size="small" type="warning">不可用</el-tag>
					<el-tag v-else size="small" type="success">可用</el-tag>
				</template>
			</el-table-column>
			<el-table-column
			  prop="imgUrl"
			  label="图片名"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  fixed="right"
			  header-align="center"
			  align="center"
			  width="100"
			  label="操作">
				<template slot-scope="scope">
					<!-- -if="isAuth('sys:rmap:updatamap')" -->
				  <el-button v type="text" size="small" @click="addOrUpdateHandle(scope.row.carouselCode)">修改</el-button>
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
<!--  -->
		<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
<!-- 新增轮播 -->
	    <add-new v-if="addNewVisible" ref="addNew" @refreshDataList="getDataList"></add-new>
	</div>
</template>

<script>
	import AddOrUpdate from './rmap-add-or-update'
	import AddNew from './rmap-add-new'
export default{
	data(){
		return{
			dataForm:{
				title:'',
				carouselCode:'',
			},
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
			addOrUpdateVisible: false,
			addNewVisible: false,
		}
	},
	components: {
		  AddOrUpdate,
		  AddNew,
	},
    activated () {
      this.getDataList()
    },
	methods:{
		//获取数据列表
		getDataList(){
			this.dataListLoading=true
			this.$http({
			  url: this.$http.adornUrl('/sys/rmap/allmap'),
			  method: 'get',
			  params: this.$http.adornParams({
				'pageNo': this.pageIndex,
				'pageSize': this.pageSize,
				'title':this.dataForm.title,
				'carouselCode':this.dataForm.carouselCode,
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
	// 新增
	addNewHandle() {
	  this.addNewVisible = true
	  this.$nextTick(() => {
		this.$refs.addNew.init()
	  })
	},
  //  修改
        addOrUpdateHandle (carouselCode) {
			this.addOrUpdateVisible = true
			this.$nextTick(() => {
			  this.$refs.addOrUpdate.init(carouselCode)
			})
		},
	},

	}
</script>

<style>
</style>
