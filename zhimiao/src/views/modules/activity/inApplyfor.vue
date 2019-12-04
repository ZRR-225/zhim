<!--邀请奖励金提现申请-->
<template>
    <div class="inApplyfor">
      <el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input type="text" placeholder="手机号码" v-model="dataForm.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" placeholder="用户昵称" v-model="dataForm.maskName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" placeholder="用户ID" v-model="dataForm.userCode"></el-input>
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
          prop="id"
          label="ID"
          header-align="center"
          align="center">
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
          prop="applyStatus"
          label="申请状态"
          header-align="center"
          align="center"
          width="110">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.applyStatus===0" size="small">申请中</el-tag>
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
          prop="bonusMoney"
          label="提现金额(元)"
          sortable
          header-align="center"
          align="center" >
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          align="center">
          <template slot-scope="scope">
            <!--  v-if="isAuth('sys:maskDrawcash:update')" -->
            <el-button  type="text" size="small" @click="Handle(scope.row.id)">处理</el-button>
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

<!--详情-->
      <el-dialog
          title="处理"
          :close-on-click-model="false"
          :visible.sync="visible">
        <el-form :model="dataForm1"  ref="dataForm1" label-width="100px" @keyup.enter.native="dataFormSubmit()">
          <el-form-item label="ID" prop="id">
            <el-input v-model='dataForm1.id' :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="maskName">
            <el-input v-model='dataForm1.maskName' :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户ID" prop="userCode">
            <el-input v-model='dataForm1.userCode' :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model='dataForm1.realName' :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model='dataForm1.mobile' :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="提现金额" prop="bonusMoney">
            <el-input v-model='dataForm1.bonusMoney' :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="提现状态" prop="status">
            <el-radio-group v-model="dataForm1.status">
              <el-radio  v-for="(status, index) in dataForm1.statusList" :label="index" :key="index">{{status}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="拒绝原因" prop="remark">
            <el-select v-model='dataForm1.remark' placeholder="请选择">
              <el-option
                v-for="item in dataForm1.options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
		  <el-button @click="visible = false">取消</el-button>
		   <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
		</span>
      </el-dialog>
    </div>
</template>

<script>
    export default{
        inject:['reload'],
        data(){
            return {
                visible:false,
                dataForm:{
                    mobile:'',
                    maskName:'',
                    userCode:'',
					id:'',
                },
                dataForm1:{
					id:'',
                    userCode:'',
                    mobile:'',
                    realName:'',
                    status:'',
					applyStatus:'',
                    maskName:'',
					profitMoney:'',
                    statusList:['同意','拒绝',],
                    remark:'其他原因',
                    options: [{
                        value:1,
                        label: '账号未填写支付宝信息'
                    }, {
                        value:2,
                        label: '金额低于100'
                    }, {
                        value:3,
                        label: '账号有可疑操作'
                    }, {
                        value: 4,
                        label: '账号已被加入黑名单'
                    }, {
                        value:5,
                        label: '其他原因'
                    }],
                    value:'',
                },
                dataList:[
                    {
                        mobile:'15562122361',
                        realName:'1',
                        maskName:'2',
                        profitMoney:'3',

                    }
                ],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading:false,
            }
        },
        activated () {
            this.getDataList()
        },
        methods:{
            // 获取数据列表
            getDataList () {
                this.dataListLoading=true
                this.$http({
                    url: this.$http.adornUrl('/sys/sysMaskapplybonus/applyBonusList'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'pageNo': this.pageIndex,
                        'pageSize': this.pageSize,
                        'mobile': this.dataForm.mobile,
                        'maskName':this.dataForm.maskName,
                        'userCode':this.dataForm.userCode,
						'id':this.dataForm.id,
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
            //详情处理
            Handle(id){
                // console.log(id)
                this.visible=true
                this.$http({
                    url: this.$http.adornUrl('/sys/sysMaskapplybonus/applyBonusList'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'pageNo': this.pageIndex,
                        'pageSize': this.pageSize,
                        'mobile':this.dataForm1.mobile,
						'id':id,
                        'maskName':this.dataForm1.maskName,
                        'userCode':this.dataForm1.userCode,
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
						this.dataForm1.maskName=data.data.list[0].maskName,
						this.dataForm1.userCode=data.data.list[0].userCode,
						this.dataForm1.realName=data.data.list[0].realName,
						this.dataForm1.mobile=data.data.list[0].mobile,
						this.dataForm1.id=data.data.list[0].id
						this.dataForm1.bonusMoney=data.data.list[0].bonusMoney						
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
            //提交
            dataFormSubmit(){
				// console.log(this.dataForm1.status)
				var applyStatus=(this.dataForm1.status)+1
				// console.log(applyStatus)
				this.dataForm1.applyStatus=applyStatus
				// console.log(this.dataForm1.applyStatus)
                this.$refs['dataForm1'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl('/sys/sysMaskapplybonus/dealApplyBonus'),
                            method: 'post',
                            data: this.$http.adornData({
                                'applyStatus':this.dataForm1.applyStatus,
								'remark':this.dataForm1.remark,
								'id':this.dataForm1.id,
                            })
                        }).then(({data}) => {
                            if (data && data.code === 0) {
                                this.$message({
                                    message:data.msg,
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.visible = false
										this.reload();
                                        this.$emit('refreshDataList')
                                    }
                                })
                            }
                            else {
                                this.$message.error(data.msg)
                            }
                        })
                    }
                });
            },
        },
    }
</script>

<style scoped>

</style>
