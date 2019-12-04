<!-- 粉丝详情 -->
<template>
  <el-dialog
    title="详情"
    :close-on-click-modal="false"
    :visible.sync="visible">
	<el-table
	 :data="dataList"
	 v-loading="dataListLoading">
		<el-table-column
		prop="userCode"
		label="被关注者ID"
		header-align="center"
		align="center">
		</el-table-column>	
		<el-table-column
		prop="maskName"
		label="被关注用户昵称"
		header-align="center"
		align="center">
		</el-table-column>
		<el-table-column
		prop="isSteamerFrom"
		label="被关注者是否主播"
		header-align="center"
		align="center">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.isSteamerFrom===0" size="small"  type="warning" >否</el-tag>
				<el-tag v-if="scope.row.isSteamerFrom===1" size="small" type="success">是</el-tag>
			</template>
		</el-table-column>
		<el-table-column
		prop="fromUserCode"
		label="关注者ID"
		header-align="center"
		align="center">
		</el-table-column>
		<el-table-column
		prop="maskNameFrom"
		label="关注者昵称"
		header-align="center"
		align="center">
		</el-table-column>
		<el-table-column
		prop="createTime"
		label="关注时间"
		header-align="center"
		align="center">
		</el-table-column>
		<el-table-column
		prop="isSteamer"
		label="关注者是否主播"
		header-align="center"
		align="center">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.isSteamer===0" size="small"  type="warning" >否</el-tag>
				<el-tag v-if="scope.row.isSteamer===1" size="small" type="success">是</el-tag>
			</template>
		</el-table-column>
	</el-table>
		<el-pagination
		  @size-change="sizeChangeHandle"
		  @current-change="currentChangeHandle"
		  :current-page="pageIndex"
		  :page-sizes="[5,10, 20, 50, 100]"
		  :page-size="pageSize"
		  :total="totalPage"
		  layout="total, sizes, prev, pager, next,jumper">
		</el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" type="primary">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
		pageIndex: 1,
		pageSize: 10,
		totalPage: 0,
        dataForm: {
			userCode:'',
		},
		dataList:[],
		dataListLoading: false,
      }
    },
    methods: {
      init (userCode) {
        this.visible = true
        this.$nextTick(() => {
				this.dataListLoading=true
				this.$http({
				url: this.$http.adornUrl(`/sys/userfans/queryuserfansdetailed`),
				method: 'get',
				params:this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'userCode':userCode,
				})
			}).then(({data}) => {
			if (data && data.code === 0) {
				this.dataList=data.data.list
				this.totalPage = data.data.total
			  }
			  this.dataListLoading = false
			})
        })
      },
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


