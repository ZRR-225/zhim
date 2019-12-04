<template>
  <el-dialog
    title="编辑"
    :close-on-click-model="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" label-width="100px">
      <el-form-item label="主播Id" prop="anchorId">
        <el-input v-model="dataForm.anchorId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="主播昵称" prop="anchorName">
        <el-input v-model="dataForm.anchorName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="dataForm.phone" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="提现金额" prop="cash">
        <el-input v-model="dataForm.cash" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">申请中</el-radio>
          <el-radio :label="1">批准</el-radio>
          <el-radio :label="2">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
       <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default{
    data() {
      return {
        visible: false,
        dataForm:{
            anchorId:'100001',
            anchorName:'猜猜我是谁',
            phone:'13245343422',
            cash:'1200',
            status:0,
            addTime:'2019-07-29'
        },
      }
    },
    methods: {
      init (userCode) {
        this.visible = true
        this.$nextTick(() => {
        })
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$message({
              type: 'success',
              message: '保存修改',
              duration:1500,
            });
            this.visible = false
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style>
</style>
