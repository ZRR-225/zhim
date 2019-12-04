<template>
  <el-dialog
    title="编辑"
    :close-on-click-modal="false"
    :visible.sync="visible">
   <el-form :model="dataForm" ref="dataForm" label-width="100px">
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
       <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        dataForm: {},
      };
    },
    methods: {
      init (userId) {
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
    }
  }
</script>
