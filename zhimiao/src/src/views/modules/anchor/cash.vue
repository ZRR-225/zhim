<!-- 主播提现申请 -->
<template>
	<div class="cash">
		<el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input type="text" placeholder="手机号码" v-model="dataForm.mobile" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input type="text" placeholder="主播昵称" v-model="dataForm.maskName" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
<!-- 				<el-button @click="addNewHandle()" type="primary">新增</el-button> -->
			</el-form-item>
<!-- 			<el-form-item style="float:right;">
				<el-button type="success" @click="billsHandle()" >生成账单</el-button>
			</el-form-item> -->
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
         	  width="50">
			</el-table-column>
			<el-table-column
			  prop="createTime"
			  label="申请时间"
			  sortable
			  header-align="center"
			  align="center"
        	  width="130">
			</el-table-column>
			<el-table-column
			  prop="status"
			  label="申请状态"
			  header-align="center"
			  align="center"
          	  width="110">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status==='未处理'" size="small">未处理</el-tag>
					<el-tag v-if="scope.row.status==='已结' " size="small" type="success">已结</el-tag>
					<el-tag v-if="scope.row.status==='拒结' " size="small" type="warning">拒结</el-tag>
				</template>
			</el-table-column>
			<el-table-column
      prop="userCode"
      label="主播ID"
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
        prop="realName"
        label="真实姓名"
        header-align="center"
        align="center" >
      </el-table-column>
			<el-table-column
			  prop="mobile"
			  label="手机号码"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="alipayAcount"
			  label="支付宝账号"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="idCard"
			  label="身份证号"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="allDiamond"
			  label="总萌力值"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  prop="surplusDiamond"
			  label="扣除萌力值"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="profitMoney"
			  label="提现金额(元)"
			  sortable
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  label="操作"
			  fixed="right"
			  header-align="center"
			  align="center">
			  <template slot-scope="scope">
				  <!--  v-if="isAuth('sys:maskDrawcash:update')" -->
			    <el-button  v-if="isAuth('sys:maskDrawcash:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.mobile)" :disabled="scope.row.status ==='已结'||scope.row.status ==='拒结'">处理</el-button>
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
    <!-- 弹窗,修改 -->
    	<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	<!-- 弹窗, 新增-->
		<add-new v-if="addNewVisible" ref="addNew" @refreshDataList="getDataList"></add-new>
	</div>
</template>

<script>
	import AddOrUpdate from './cash-add-or-update'
	import AddNew from './cash-add-new'
	export default{
		data(){
			return{
				dataForm:{
					mobile:'',
					status:5,
					maskName:'',
				},
				dataList:[],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
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
		methods:{
	      // 获取数据列表
	      getDataList () {
	        this.dataListLoading=true
	        this.$http({
	          url: this.$http.adornUrl('/sys/maskDrawcash/list'),
	          method: 'get',
	          params: this.$http.adornParams({
	            'pageNo': this.pageIndex,
	            'pageSize': this.pageSize,
				'mobile': this.dataForm.mobile,
				'maskName':this.dataForm.maskName,
				'applyState':this.dataForm.status,
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
	      //  修改
	      addOrUpdateHandle (mobile) {
	        this.addOrUpdateVisible = true
	        this.$nextTick(() => {
	          this.$refs.addOrUpdate.init(mobile)
	        })
	      },
				//新增
			addNewHandle(){
				this.addNewVisible = true
				this.$nextTick(() => {
					this.$refs.addNew.init()
				})
			},
		  //生成账单
		  billsHandle(){//sys/maskbillrecord/save  生成账单接口
			// console.log("生成账单")
            this.$http({
              url: this.$http.adornUrl('/sys/maskbillrecord/save'),
              method: 'post',
              data: this.$http.adornData({
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
				this.$alert(data.msg, '生成账单', {
				  // confirmButtonText: '确定',
				  callback: action => {
					// this.$message({
					// 	  message:data.msg,
					// 	  type: 'success',
					// 	  duration: 1500,
					// 	  onClose: () => {
					// 	  this.visible = false
					// 	  this.$emit('refreshDataList')
					// 	}
					// });
				  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
		  },
		}
	}
</script>

<style>
</style>
