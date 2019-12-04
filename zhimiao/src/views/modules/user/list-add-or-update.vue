<!-- 用户列表 加入黑名单 -->
<template>
  <el-dialog
    title="加入黑名单"
    :close-on-click-modal="false"
    :visible.sync="visible">
   <el-form :model="dataForm" ref="dataForm" label-width="100px">
      <el-form-item label="用户ID" prop="userCode">
        <el-input v-model='dataForm.userCode' :disabled="true" ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="maskName">
        <el-input v-model="dataForm.maskName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="关闭原因" prop="reson">
        <el-radio-group v-model="dataForm.reson">
          <el-radio label="辱骂攻击">辱骂攻击</el-radio>
          <el-radio label="内容低俗">内容低俗</el-radio>
          <el-radio label="违法违规">违法违规</el-radio>
          <el-radio label="色情低俗">色情低俗</el-radio>
        </el-radio-group>
      </el-form-item>
        <el-form-item label="关闭时间" prop="closeTime">
          <el-radio-group v-model="dataForm.closeTime">
            <el-radio label="2小时">2小时</el-radio>
            <el-radio label="一天">一天</el-radio>
            <el-radio label="一周">一周</el-radio>
            <el-radio label="一个月">一个月</el-radio>
			<el-radio label="永久关闭">永久关闭</el-radio>
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
  export default {
    data() {
      return {
        visible: false,
		pageIndex: 1,
		pageSize: 10,
        dataForm: {
			reson:'辱骂攻击',
			closeTime:'小时',
			userCode:'',
			userName:'',
			maskName:''
		},
      }
    },
    methods: {
      init (mobile) {
        this.visible = true
        this.$nextTick(() => {
			this.$refs['dataForm'].resetFields()
				this.$http({
				url: this.$http.adornUrl(`/sys/maskUser/list`),
				method: 'get',
				params:this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'mobile':mobile,
					'maskName':this.dataForm.maskName,
					'userCode':this.dataForm.userCode,
				})
			}).then(({data}) => {
			if (data && data.code === 0) {
				this.dataForm.userCode=data.data.list[0].userCode
				this.dataForm.maskName=data.data.list[0].maskName
			  }
			})
        })
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
			  this.$http({
				  url:this.$http.adornUrl(`/sys/maskUser/update`),
				  method:'post',
				  data:this.$http.adornData({
					 'reson':this.dataForm.reson,
					 'closeTime':this.dataForm.closeTime,
					 'userCode':this.dataForm.userCode,
					 'maskName':this.dataForm.maskName,
				  })
			  }).then(({data})=>{
					if (data && data.code === 0) {
					  this.$message({
						message: '保存修改',
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
        });
      },
    }
  }
</script>
