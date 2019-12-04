<!-- 修改实名信息 -->
<template>
  <el-dialog
    title='编辑'
    :close-on-click-modal="false"
    :visible.sync="visible">
  <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="用户ID" prop="userCode">
        <el-input v-model='dataForm.userCode' :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="dataForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model="dataForm.idNumber"></el-input>
      </el-form-item>
      <el-form-item label="支付宝账号" prop="alipayAccount">
        <el-input v-model="dataForm.alipayAccount"></el-input>
      </el-form-item>
<!--      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="dataForm.mobile" :disabled="true"></el-input>
      </el-form-item> -->
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
        dataForm: {
			id:0,
			userCode:'',
			realName:'',
			mobile:'',
			idNumber:'',
			alipayAccount:'',
        },
        dataRule: {
          realName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
			{	pattern: /^[\u4E00-\u9FA5]+$/,  //正则
				message: '用户名只能为中文'
			}
          ],
		alipayAccount:[
			{ required: true, message: '支付宝账号不能为空', trigger: 'blur' },
		],
		idNumber:[
			{
				required: true,
				pattern:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
				message:'身份证格式错误'
			}
		],
        }
      };
    },
    methods: {
      init (mobile) {
		  // console.log(mobile)
        this.visible = true
        this.$nextTick(() => {
		this.$refs['dataForm'].resetFields()
        this.$http({
          url: this.$http.adornUrl(`/sys/streamer/streamerDataList`),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,            
			'mobile':mobile,
		  })
		}).then(({data}) => {
        if (data && data.code === 0) {
			this.dataForm.userCode=data.page.list[0].userCode
			this.dataForm.realName=data.page.list[0].realName
			// this.dataForm.mobile=data.data[0].mobile
			this.dataForm.idNumber=data.page.list[0].idNumber
			this.dataForm.alipayAccount=data.page.list[0].alipayAccount
		  }
		})
        })
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
			if (valid) {
			  this.$http({
				url: this.$http.adornUrl('/sys/streamer/dataManager'),
				method: 'post',
				data: this.$http.adornData({
				  'userCode':this.dataForm.userCode,
				  'realName':this.dataForm.realName,
				  'alipayAccount':this.dataForm.alipayAccount,
				  'idNumber':this.dataForm.idNumber
				})
			  }).then(({data}) => {
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

