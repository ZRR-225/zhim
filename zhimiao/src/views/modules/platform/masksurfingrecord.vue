<!-- 靓号设置 -->
<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
<!-- 	  <el-form-item>
	    <el-select v-model="dataForm.surfingType" clearable placeholder="靓号类型">
			<el-option
			  v-for="item in dataForm.options"
			  :key="item.value"
			  :label="item.label"
			  :value="item.value">
			</el-option>
		</el-select>
	  </el-form-item>	 -->  
      <el-form-item>
<!--        <el-button @click="getDataList()">查询</el-button> -->
		<el-button @click="addNew()" type="primary">新增</el-button>
				<!-- v-if="isAuth('sys:masksurfingrecord:save')" -->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
<!--      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="ID">
      </el-table-column>
<!--      <el-table-column
        prop="surfingType"
        header-align="center"
        align="center"
        label="0用户/1房间">
      </el-table-column> -->
     <el-table-column
        prop="surfingType"
        label="靓号类型"
        header-align="center"
        align="center">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.surfingType===0" size="small"  type="warning" >用户</el-tag>
				<el-tag v-if="scope.row.surfingType===1" size="small" type="success">房间</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="originalNumber"
        header-align="center"
        align="center"
        label="原号码">
      </el-table-column>
      <el-table-column
        prop="surfingNumber"
        header-align="center"
        align="center"
        label="靓号">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
<!--      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column> -->
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
<!--    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
  	<el-dialog
  	title='详情'
  	:visible.sync="addNewVisible"
  	:close-on-click-model="false">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getUser()">
		  <el-form-item>
			<el-input v-model="dataForm.mobile" placeholder="手机号码" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
				<el-button @click="getUser()" type="success">查看信息</el-button>
		  </el-form-item>
		</el-form>
		<el-form :inline="true" :model="dataForm">
			<table  style="width:100%;line-height:40px;text-align: center;">           
				<tr>
					<td>用户Id</td>
					<td>用户昵称</td>
					<td>手机号码</td>
					<td>房间Id</td>
				</tr>
				<tr>
					<td>{{this.dataUserList.userCode}}</td> 
					<td>{{this.dataUserList.maskName}}</td>   
					<td>{{this.dataUserList.mobile}}</td>  
					<td>{{this.dataUserList.roomId}}</td>
				</tr>  
            </table>
		</el-form>
<!-- 		<el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="80px"  style="border-top:1px solid #f5f5f5">
			<el-form-item label="靓号类型" prop="surfingType">
				<el-select v-model="dataForm.surfingType" clearable placeholder="靓号类型">
					<el-option
					  v-for="item in dataForm.options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>	
			<el-form-item label="原号码" prop="originalNumber">
			  <el-input v-model="dataForm.originalNumber" placeholder="原号码"></el-input>
			</el-form-item>
			<el-form-item label="靓号" prop="surfingNumber">
			  <el-input v-model="dataForm.surfingNumber" placeholder="靓号"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			  <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
		</el-form> -->
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
			<el-form-item label="靓号类型" prop="surfingType">
				<el-select v-model="dataForm.surfingType" clearable placeholder="靓号类型">
					<el-option
					  v-for="item in dataForm.options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>	
			<el-form-item label="原号码" prop="originalNumber">
			  <el-input v-model="dataForm.originalNumber" placeholder="原号码"></el-input>
			</el-form-item>
			<el-form-item label="靓号" prop="surfingNumber">
			  <el-input v-model="dataForm.surfingNumber" placeholder="靓号"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
			  <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
	</el-dialog>
  </div>
</template>

<script>
  // import AddOrUpdate from './masksurfingrecord-add-or-update'
  export default {
	inject:['reload'],
    data () {
      return {
		addNewVisible:false,
        dataForm: {
          key: '',
		  surfingType:'',
		  mobile:'',
		  originalNumber:'',
		  surfingNumber:'',
		  remark:'',
		  options: [{
		    value: 0,
		    label: '用户靓号'
		  }, {
		    value: 1,
		    label: '房间靓号'
		   },
		  ],
        },
        dataRule: {
          surfingType: [
            { required: true, message: '靓号类型不能为空', trigger: 'blur' }
          ],
          originalNumber: [
            { required: true, message: '原号码不能为空', trigger: 'blur' }
          ],
          surfingNumber: [
            { required: true, message: '靓号不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ]
        },
        dataList: [],
		dataUserList:{
			maskName:'',
			mobile:'',
			userCode:'',
			roomId:''
		},
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    // components: {
    //   AddOrUpdate
    // },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/masksurfingrecord/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
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
	  addNew(){
		  this.addNewVisible = true
		  // console.log('新增')
	  },
      // addOrUpdateHandle (id) {
      //   this.addOrUpdateVisible = true
      //   this.$nextTick(() => {
      //     this.$refs.addOrUpdate.init(id)
      //   })
      // },
	  //查看用户信息
	  getUser(){
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/masksurfingrecord/queryUser'),
          method: 'get',
          params: this.$http.adornParams({
            'mobile': this.dataForm.mobile,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataUserList.userCode=data.data.userCode
            this.dataUserList.mobile=data.data.mobile
			this.dataUserList.roomId=data.data.roomId
			this.dataUserList.maskName=data.data.maskName
			// console.log(data.data.maskName)
          } else {
            this.dataUserList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
	  },
	  //提交
	  dataFormSubmit(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/masksurfingrecord/investSurfing`),
              method: 'post',
              data: this.$http.adornData({
				'userCode':this.dataUserList.userCode,
				'mobile':this.dataUserList.mobile,
				'roomId':this.dataUserList.roomId,
				'maskName':this.dataUserList.maskName,
                'surfingType': this.dataForm.surfingType,
                'originalNumber': this.dataForm.originalNumber,
                'surfingNumber': this.dataForm.surfingNumber,
                'remark': this.dataForm.remark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message:'成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
					this.reload();
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })		  
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
        //     url: this.$http.adornUrl('/sys/masksurfingrecord/delete'),
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
        // })
      }
    }
  }
</script>
