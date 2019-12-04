<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="0用户/1房间" prop="surfingType">
      <el-input v-model="dataForm.surfingType" placeholder="0用户/1房间"></el-input>
    </el-form-item>
    <el-form-item label="原号码" prop="originalNumber">
      <el-input v-model="dataForm.originalNumber" placeholder="原号码"></el-input>
    </el-form-item>
    <el-form-item label="靓号" prop="surfingNumber">
      <el-input v-model="dataForm.surfingNumber" placeholder="靓号"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="create">
      <el-input v-model="dataForm.create" placeholder="创建时间"></el-input>
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
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          surfingType: '',
          originalNumber: '',
          surfingNumber: '',
          create: '',
          remark: ''
        },
        dataRule: {
          surfingType: [
            { required: true, message: '0用户/1房间不能为空', trigger: 'blur' }
          ],
          originalNumber: [
            { required: true, message: '原号码不能为空', trigger: 'blur' }
          ],
          surfingNumber: [
            { required: true, message: '靓号不能为空', trigger: 'blur' }
          ],
          create: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/masksurfingrecord/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.surfingType = data.masksurfingrecord.surfingType
                this.dataForm.originalNumber = data.masksurfingrecord.originalNumber
                this.dataForm.surfingNumber = data.masksurfingrecord.surfingNumber
                this.dataForm.create = data.masksurfingrecord.create
                this.dataForm.remark = data.masksurfingrecord.remark
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
              url: this.$http.adornUrl(`/sys/masksurfingrecord/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'surfingType': this.dataForm.surfingType,
                'originalNumber': this.dataForm.originalNumber,
                'surfingNumber': this.dataForm.surfingNumber,
                'create': this.dataForm.create,
                'remark': this.dataForm.remark
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
