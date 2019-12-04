<!-- 爆率干预 burstIntervention-->
<template>
	<div class="burstIntervention">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
		  <el-form-item>
			<el-input v-model="dataForm.userCode" placeholder="用户编号" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			<el-button @click="getDataList()">查询</el-button>
			<el-button v-if="isAuth('sys:maskprizedrawprobability:save')" type="primary" @click="addNewHandle()">新增</el-button>
			<!-- <el-button v-if="isAuth('sys:maskprizedrawprobability:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
		  </el-form-item>
		</el-form>
		<el-table
		  :data="dataList"
		  border
		  v-loading="dataListLoading"
		  @selection-change="selectionChangeHandle"
		  style="width: 100%;">
			<el-table-column
			prop="id"
			header-align="center"
			align="center"
			label="ID"
			width="50">
			</el-table-column>
		  <el-table-column
			prop="userCode"
			header-align="center"
			align="center"
			label="用户编号">
		  </el-table-column>
		  <el-table-column
			prop="probabilityStartTime"
			header-align="center"
			align="center"
			label="概率调整开始时间">
		  </el-table-column>
		  <el-table-column
			prop="probabilityEndTime"
			header-align="center"
			align="center"
			label="概率调整结束时间">
		  </el-table-column>
		  <el-table-column
			prop="tableFlag"
			header-align="center"
			align="center"
			label="用户标识">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.tableFlag === 0" size="small">普通</el-tag>
					<el-tag v-if="scope.row.tableFlag === 1" size="small" type="success">低概率</el-tag>
					<el-tag v-if="scope.row.tableFlag === 2" size="small" type="warning">高概率</el-tag>
				</template>
		  </el-table-column>
		  <el-table-column
			prop="status"
			header-align="center"
			align="center"
			label="是否生效"
			width="80">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status === 0" size="small">未生效</el-tag>
					<el-tag v-if="scope.row.status === 1" size="small" type="success">已生效</el-tag>
				</template>
		  </el-table-column>
		  <el-table-column
			prop="createTime"
			header-align="center"
			align="center"
			label="创建时间">
		  </el-table-column>
		  <el-table-column
			prop="updateTime"
			header-align="center"
			align="center"
			label="更新时间">
		  </el-table-column>
		  <el-table-column
			fixed="right"
			header-align="center"
			align="center"
			width="150"
			label="操作">
			<template slot-scope="scope">
			  <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.userCode)">修改</el-button>
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
	<!-- 弹窗, 新增-->
		<add-new v-if="addNewVisible" ref="addNew" @refreshDataList="getDataList"></add-new>
	</div>
</template>

<script>
  import AddOrUpdate from './burstIntervention-add-or-update'
	import AddNew from './burstIntervention-add-new'
  export default {
    data () {
      return {
        dataForm: {
		  userCode:'',
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
		addNewVisible:false,
      }
    },
    components: {
      AddOrUpdate,
	  AddNew
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/maskprizedrawprobability/prizedrawProbabilityList'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
            'userCode': this.dataForm.userCode,
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (userCode) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(userCode)
        })
      },
	  addNewHandle(){
		  this.addNewVisible = true
		  this.$nextTick(() => {
		  	this.$refs.addNew.init()
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
            url: this.$http.adornUrl('/sys/maskprizedrawprobability/delete'),
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
