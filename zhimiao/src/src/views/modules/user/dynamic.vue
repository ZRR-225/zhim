<!-- 用户动态 -->
<template>
	<div class="dynamic">
		<el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input type="text" placeholder="用户ID" v-model="dataForm.userCode" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input type="text" placeholder="用户昵称" v-model="dataForm.userName" clearable></el-input>
			</el-form-item>
		  <el-form-item>
			  <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
			<el-button @click="getDataList()">查询</el-button>
		  </el-form-item>
		</el-form>
		<el-table
		:data="dataList"
		border
		v-loading="dataListLoading"
		 @selection-change="selectionChangeHandle"
		style="width:100%;">
		 <el-table-column
			type="selection"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="id"
			label="ID"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="userCode"
			label="用户ID"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="userName"
			label="用户昵称"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="dynamicCode"
			label="动态编号"
			header-align="center"
			align="center">
		  </el-table-column>		  
		  <el-table-column
			prop="dynamicContent"
			label="发布内容"
			header-align="center"
			align="center">
		  </el-table-column>		  
		  <el-table-column
			prop="dynamicVoiceUrl"
			label="发布的语音"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="createTime"
			label="发布的语音"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="dynamicVoiceTime"
			label="语音时长(秒)"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="status"
			label="删除状态"
			header-align="center"
			align="center"
			:filters="[{ text: '删除', value:0 }, { text: '未删除', value:1}]"
			:filter-method="filterTag">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status===0" size="small"  type="warning" >删除</el-tag>
					<el-tag v-if="scope.row.status===1" size="small" type="success">未删除</el-tag>
				</template>
		  </el-table-column>
		  <el-table-column
			prop="dynamicImageUrl"
			label="图片地址"
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
			<!-- v-if="isAuth('sys:gift:deletedynamic')"  -->
				<el-button  type="text" size="small" @click="deleteHandle(scope.row.dynamicCode)">删除</el-button>
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
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					userCode:'',
					userName:'',
				},
				dataList:[],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				dataListSelections: [],
			}
		},
		components: {
		},
		activated () {
		  this.getDataList()
		},
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
				  url: this.$http.adornUrl('/sys/userdynamic/querydynamic'),
				  method: 'get',
				  params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'userCode':this.dataForm.userCode,
					'userName':this.dataForm.userName,
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
				return row.status === value;
			  },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 删除
      deleteHandle (dynamicCode) {
        var ids = dynamicCode ? [dynamicCode] : this.dataListSelections.map(item => {
          return item.dynamicCode
        })
        this.$confirm(`确定对[dynamicCode=${ids.join(',')}]进行[${dynamicCode ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/userdynamic/deletedynamic'),
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
        }).catch(() => {})
      },
		}
	}
</script>

<style>
</style>
