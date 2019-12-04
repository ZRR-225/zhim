<!-- 爆率干预新增/修改 -->
<template>
  <el-dialog
    title="修改"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
		<el-form-item label="用户编号" prop="userCode">
		  <el-input v-model="dataForm.userCode" placeholder="用户编号"></el-input>
		</el-form-item>
		<el-form-item label="开始时间" prop="probabilityStartTime">
			<el-date-picker type="datetime"  v-model="dataForm.probabilityStartTime" placeholder="概率调整开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		</el-form-item>
		<el-form-item label="结束时间" prop="probabilityEndTime">
			<el-date-picker type="datetime"  v-model="dataForm.probabilityEndTime" placeholder="概率调整结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		</el-form-item>
		<el-form-item label="用户标识" prop="tableFlag">
			<el-select v-model='dataForm.tableFlag' placeholder="请选择">
				<el-option
				  v-for="item in dataForm.options"
				  :key="item.value"
				  :label="item.label"
				  :value="item.value">
				</el-option>				
			</el-select>
		</el-form-item>
		<el-form-item label="是否生效" prop="status">
			<el-radio-group v-model="dataForm.status">
			  <el-radio  v-for="(status, index) in dataForm.statusList" :label="index" :key="index">{{status}}</el-radio>
			</el-radio-group>
		</el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
		pageIndex: 1,
		pageSize: 10,
        dataForm: {
          id: 0,
          userCode: '',
          probabilityStartTime: '',
          probabilityEndTime: '',
          status:1,
		  statusList:['未生效','已生效'],
          createTime: '',
          updateTime: '',
		  tableFlag:'',
		  options: [{
		  		  value:0,
		  		  label:'普通概率'
		  		}, {
		  		  value:1,
		  		  label: '低概率'
		  		}, {
		  		  value:2,
		  		  label: '高概率'
		  		}],
		  value:'',
        },
        dataRule: {
          userCode: [
            { required: true, message: '用户编号不能为空', trigger: 'blur' }
          ],
          probabilityStartTime: [
            { required: true, message: '概率调整开始时间不能为空', trigger: 'blur' }
          ],
          probabilityEndTime: [
            { required: true, message: '概率调整结束时间不能为空', trigger: 'blur' }
          ],
          tableFlag: [
            { required: true, message: '用户标识不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '是否生效不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ]
        }
      }
	},
    methods: {
      init (userCode) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields(
		  )
            this.$http({
              url: this.$http.adornUrl(`/sys/maskprizedrawprobability/prizedrawProbabilityList/`),
              method: 'get',
              params: this.$http.adornParams({
				  'userCode':this.dataForm.userCode,
				  'pageNo': this.pageIndex,
				  'pageSize': this.pageSize,
				}
			  )
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userCode = data.data.list[0].userCode
                this.dataForm.probabilityStartTime = data.data.list[0].probabilityStartTime
                this.dataForm.probabilityEndTime = data.data.list[0].probabilityEndTime
                this.dataForm.tableFlag = data.data.list[0].tableFlag
                this.dataForm.status = data.data.list[0].status
                this.dataForm.createTime = data.data.list[0].createTime
                this.dataForm.updateTime = data.data.list[0].updateTime
				this.dataForm.id = data.data.list[0].id
				
              }
            })
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/maskprizedrawprobability/update`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userCode': this.dataForm.userCode,
                'probabilityStartTime': this.dataForm.probabilityStartTime,
                'probabilityEndTime': this.dataForm.probabilityEndTime,
                'tableFlag': this.dataForm.tableFlag,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }

</script>

