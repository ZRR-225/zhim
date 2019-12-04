<!-- 主播申请表 -->
<template>
  <div class="anchor-authorize">
	<el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
		<el-form-item>
			<el-input type="text" placeholder="手机号码" v-model="dataForm.mobile" clearable></el-input>
		</el-form-item>
		<el-form-item>
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
		  type="index"
		  label="序号"
		  header-align="center"
		  align="center"
		  width="50">
		</el-table-column>
		<el-table-column
		  prop="userCode"
		  label="主播ID"
		  header-align="center"
		  align="center"
		  width="180">
		</el-table-column>
		<el-table-column
		  prop="maskName"
		  label="用户昵称"
		  header-align="center"
		  align="center">
		</el-table-column>
		<el-table-column
		  prop="realName"
		  label="真实姓名"
		  header-align="center"
		  align="center" >
		</el-table-column>
		<el-table-column
		  prop="mobile"
		  label="手机号码"
		  header-align="center"
		  align="center"
		  width="110">
		</el-table-column>
		<el-table-column
		  prop="idCard"
		  label="身份证号"
		  header-align="center"
		  align="center" >
		</el-table-column>
		<el-table-column
		  prop="alipayAcount"
		  label="支付宝账号"
		  header-align="center"
		  align="center" >
		</el-table-column>
		<el-table-column
		  prop="applyState"
		  label="申请状态"
		  header-align="center"
		  align="center" >
			<template slot-scope="scope">
				<el-tag v-if="scope.row.applyState ==='申请中'" size="small">申请中</el-tag>
				<el-tag v-if="scope.row.applyState ==='通过'" size="small" type="success">通过</el-tag>
				<el-tag v-if="scope.row.applyState ==='拒绝'" size="small" type="danger">拒绝</el-tag>
			</template>
		</el-table-column>
<!-- 		<el-table-column
		  prop="authenticationStatus"
		  label="是否认证"
		  header-align="center"
		  align="center"
		  width="150">
				<template slot-scope="scope">
				  <el-tag v-if="scope.row.authenticationStatus === '未认证'" size="small">未认证</el-tag>
				  <el-tag v-if="scope.row.authenticationStatus === '认证'" size="small" type="success">认证</el-tag>
				</template>
		</el-table-column> -->
		<el-table-column
		  prop="applyTime"
		  label="申请时间"
		  sortable
		  header-align="center"
		  align="center"
		  width="150">
		</el-table-column>
		<el-table-column
		  prop="gender"
		  label="性别"
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
		  <el-button native-type="button" v-if="isAuth('sys:streamerGrant:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.mobile)" :disabled="scope.row.applyState ==='通过' || scope.row.applyState ==='拒绝'">通过</el-button>
			<el-button native-type="button" v-if="isAuth('sys:streamerGrant:refuseGrant')" type="text" size="small"  @click="addRefuse(scope.row.userCode)" :disabled="scope.row.applyState ==='通过' || scope.row.applyState ==='拒绝'">拒绝</el-button>
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
  import AddOrUpdate from './authorize-add-or-update'
  export default {
    data () {
      return {
		dataForm:{
			mobile:'',
			userCode:'',
			applyState:0,
		},
        dataList: [],
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
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/streamerGrant/grantList'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,            
			'mobile': this.dataForm.mobile,
			'applyState':this.dataForm.applyState,
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
      //  修改----同意
      addOrUpdateHandle (mobile) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(mobile)
        })
      },
	  //拒绝
	  addRefuse(userCode){
		// console.log(userCode)
        this.$confirm('是否拒绝该用户成为主播, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
			this.$http({
				url:this.$http.adornUrl('/sys/streamerGrant/refuseGrant'),
				method:'post',
				data:this.$http.adornData({
					'userCode':userCode,
					'applyState':2,
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
      // 删除
      deleteHandle (id) {
        // var ids = id ? [id] : this.dataListSelections.map(item => {
        //   return item.id
        // })
        // this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   this.$http({
        //     url: this.$http.adornUrl('/anchor/authorize/delete'),
        //     method: 'post',
        //     data: this.$http.adornData(ids, false)
        //   }).then(({data}) => {
        //     if (data && data.code === 0) {
        //       this.$message({
        //         message: '操作成功',
        //         type: 'success',
        //         duration: 1500,
        //         onClose: () => {
        //           this.getDataList()
        //         }
        //       })
        //     } else {
        //       this.$message.error(data.msg)
        //     }
        //   })
        // }).catch(() => {})
      },
    }
  }
</script>
