<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="用户编号" prop="userCode">
      <el-input v-model="dataForm.userCode" placeholder="用户编号" class="input"></el-input>
    </el-form-item>
	<el-form-item label="状态" prop="status">
		<el-radio-group v-model="dataForm.status">
		  <el-radio  v-for="(status, index) in dataForm.statusList" :label="index" :key="index">{{status}}</el-radio>
		</el-radio-group>
	</el-form-item>
    <el-form-item label="开始时间" prop="startTime">
      <el-date-picker type="datetime" v-model="dataForm.startTime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime">
      <el-date-picker type="datetime" v-model="dataForm.endTime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
    </el-form-item>
    <el-form-item label="次数" prop="count" >
      <el-input v-model="dataForm.count" placeholder="次数" class="input"></el-input>
    </el-form-item>
    <el-form-item label="奖品" prop="prizeId">
	  <el-select v-model="dataForm.prizeId" placeholder="请选择">
		<el-option
		  v-for="item in options"
		  :key="dataForm.prizeId"
		  :label="item.prizeName"
		  :value="item.id">
		</el-option>
	  </el-select>
    </el-form-item>
	<el-form-item label="活动类型"  prop="prizeType">
		  <el-select v-model="dataForm.prizeType" placeholder="活动类型">
			<el-option
			  v-for="item in dataForm.options1"
			  :key="item.value"
			  :label="item.label"
			  :value="item.value">
			</el-option>
		  </el-select>
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
		pageIndex: 1,
		pageSize: 10,
        visible: false,
        dataForm: {
          id: 0,
          userCode: '',
          status: '',
          startTime: '',
          endTime: '',
          count: '',
          prizeId: '',
		  statusList:['未删除','删除'],
		  key: '',
		  prizeType:'',
			options1: [{
			  value: 0,
			  label: '幸运活动'
			}, {
			  value: 1,
			  label: '豪华活动'
			}],
			value: ''
        },
		 options: [],
		prizeId: '',
        dataRule: {
          userCode: [
            { required: true, message: '用户编号不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '开始时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '结束时间不能为空', trigger: 'blur' }
          ],
          count: [
            { required: true, message: '次数不能为空', trigger: 'blur' }
          ],
          prizeId: [
            { required: true, message: '奖品ID铃铛不能为空', trigger: 'blur' }
          ],
          prizeType: [
            { required: true, message: '活动类型不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.$http({
          url: this.$http.adornUrl('/sys/maskprizeperson/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.options = data.data
			// console.log(this.options)
          } else {
            this.dataList = []
            this.totalPage = 0
          }
        })
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/maskprizeperson/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userCode = data.sysMaskPrizePerson.userCode
                this.dataForm.status = data.sysMaskPrizePerson.status
                this.dataForm.startTime = data.sysMaskPrizePerson.startTime
                this.dataForm.endTime = data.sysMaskPrizePerson.endTime
                this.dataForm.count = data.sysMaskPrizePerson.count
                this.dataForm.prizeId = data.sysMaskPrizePerson.prizeId
				this.dataForm.prizeType = data.sysMaskPrizePerson.prizeType
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/maskprizeperson/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userCode': this.dataForm.userCode,
                'status': this.dataForm.status,
                'startTime': this.dataForm.startTime,
                'endTime': this.dataForm.endTime,
                'count': this.dataForm.count,
                'prizeId': this.dataForm.prizeId
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
<style>
	.input{
		width: 220px;
	}
</style>