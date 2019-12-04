<template>
  <div class="user-blacklist">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-input v-model="dataForm.mobile" placeholder="手机号码" clearable></el-input>
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
        type="index"
        label="序号"
        header-align="center"
        align="center"
        width="80">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
		sortable
        header-align="center"
        align="center"
		width="150">
      </el-table-column>
      <el-table-column
        prop="blackReason"
        label="拉黑原因"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="durationTime"
        label="拉黑时长"
		sortable
        header-align="center"
        align="center"
		width="150">
      </el-table-column>
      <el-table-column
        prop="userCode"
        label="用户ID"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="maskName"
        label="用户昵称"
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
        prop='vipLevel'
        label="VIP等级"
		sortable
        header-align="center"
        align="center"
		width="110">
      </el-table-column>
      <el-table-column
        prop='streamerLevel'
        label="主播等级"
		sortable
        header-align="center"
        align="center"
		width="110">
      </el-table-column>
      <el-table-column
        prop='allCharmValue'
        label="总萌力值"
		sortable
        header-align="center"
        align="center"
		width="110">
      </el-table-column>
      <el-table-column
        prop='birthday'
        label="生日"
        header-align="center"
        align="center"
		width="100">
      </el-table-column>
      <el-table-column
        prop="yearOld"
        label="年龄"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="constellation"
        label="星座"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="isStreamer"
        label="是否是主播"
        header-align="center"
        align="center"
		width="140"
		:filters="[{ text: '是', value:0 }, { text: '否', value:1}]"
		:filter-method="filterTag">
			<template slot-scope="scope">
			  <el-tag v-if="scope.row.isStreamer === 0" size="small" type="info">是</el-tag>
			  <el-tag v-else size="small">否</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="todayDiamond"
        label="今日消费（元）"
		sortable
        header-align="center"
        align="center"
		width="150">
      </el-table-column>
      <el-table-column
        prop="diamond"
        label="总消费（元）"
		sortable
        header-align="center"
        align="center"
		width="130">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        header-align="center"
        align="center"
		width="150">
          <template slot-scope="scope">
            <el-button  type="text" size="small" @click="deleteBlackList(scope.row.userCode)">移出黑名单</el-button>
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

    <!-- 弹窗, 新增 / 修改 -->
<!--    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
  </div>
</template>

<script>
  // import AddOrUpdate from './blacklist-add-or-update'
  export default{
    data(){
      return{
        dataForm:{
          mobile:''
        },
        dataList:[],
        dataListLoading:false,
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListSelections: [],
        // addOrUpdateVisible: false,
      }
    },
    // components: {
    //   AddOrUpdate,
    // },
    activated () {
      this.getDataList()
    },
    methods:{
      getDataList(){
        this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/masksystemblackrecord/queryByMobile'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,
			'mobile':this.dataForm.mobile
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
		filterTag(value, row) {
		return row.isStreamer === value;
		},
		// // 新增 / 修改
		// addOrUpdateHandle (userId) {
		// 	this.addOrUpdateVisible = true
		// 	this.$nextTick(() => {
		// 	  this.$refs.addOrUpdate.init(userId)
		// 	})
		// },
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
	  //移除黑名单
	  deleteBlackList(userCode){
        this.$confirm('是否将该用户移出黑名单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
			this.$http({
				url:this.$http.adornUrl('/sys/masksystemblackrecord/blackremove'),
				method:'post',
				data:this.$http.adornData({
					'userCode':userCode,
					'mobile':this.dataForm.mobile,
					
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
