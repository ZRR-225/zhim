<!-- 用户列表 -->
<template>
  <div class="user-list">
    <el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
      <el-form-item prop="mobile">
        <el-input type="text" placeholder="手机号码" v-model="dataForm.mobile" clearable></el-input>
      </el-form-item>
			<el-form-item>
				<el-input type="text" placeholder="用户昵称" v-model="dataForm.maskName" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input type="text" placeholder="用户ID" v-model="dataForm.userCode" clearable></el-input>
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
        prop="userCode"
        label="用户ID"
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
        prop="mobile"
        label="手机号码"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop='vipLevel'
        label="VIP等级"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop='streamerLevel'
        label="主播等级"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop='allCharm'
        label="总萌力值"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop='surplusCharm'
        label="剩余萌力值"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop='birthday'
        label="生日"
        header-align="center"
        align="center">
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
        prop=" isStreamer"
        label="是否是主播"
        header-align="center"
        align="center">
			<template slot-scope="scope">
			  <el-tag v-if="scope.row.isStreamer ==='是'" size="small">是</el-tag>
			  <el-tag  v-else size="small" type="danger">否</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="todayDiamond"
        label="今日消费(铃铛)"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="allDiamond"
        label="累计消费(铃铛)"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        header-align="center"
        align="center"
        width="150">
          <template slot-scope="scope">
  <!--          <el-button    type="text" size="small" @click="addOrUpdateHandle(scope.row.jobId)">编辑</el-button> -->
            <el-button  v-if="isAuth('sys:maskUser:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.mobile)">加入黑名单</el-button>
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
  import AddOrUpdate from './list-add-or-update'
  export default {
    data(){
      return{
        dataForm:{
          mobile:'',
		 maskName:'',
		 userCode:''
        },
        dataList:[],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
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
          url: this.$http.adornUrl('/sys/maskUser/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,            
			'mobile': this.dataForm.mobile,
			'maskName':this.dataForm.maskName,
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
      addOrUpdateHandle (mobile) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(mobile)
        })
      },
      //加入黑名单
      addBlackList (userCode) {
        this.$confirm('是否将该用户加入黑名单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
			this.$http({
				url:this.$http.adornUrl('/sys/maskUser/update'),
				method:'post',
				data:this.$http.adornData({
					'mobile':this.dataForm.mobile,
					'userCode':userCode
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

<style>
</style>
