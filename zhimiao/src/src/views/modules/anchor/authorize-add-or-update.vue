<template>
  <el-dialog
    title='编辑'
    :close-on-click-modal="false"
    :visible.sync="visible">
  <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="用户ID" prop="userCode">
        <el-input v-model='dataForm.userCode' :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="maskName">
        <el-input v-model="dataForm.maskName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="dataForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="dataForm.idCard" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="支付宝账号" prop="alipayAcount">
        <el-input v-model="dataForm.alipayAcount"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="dataForm.mobile" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="申请时间" prop="applyTime">
        <el-input v-model="dataForm.applyTime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="房间类型" prop="roomType">
        <el-radio-group v-model="dataForm.roomType">
          <el-radio :label="1">男神</el-radio>
		  <el-radio :label="2">女神</el-radio>
		  <el-radio :label="3">唱见</el-radio>
		  <el-radio :label="4">娱乐</el-radio>
		  <el-radio :label="5">聊天</el-radio>
<!-- 		  <el-radio :label="6">占卜</el-radio>
		  <el-radio :label="7">官方接待</el-radio> -->
		</el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
       <el-button  native-type="button" type="primary" @click="dataFormSubmit()">提交</el-button>
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
			id:0,
			userCode:'',
			maskName:'',
			realName:'',
			mobile:'',
			applyTime:'',
			applicationTime:'',
			roomType:1,
			// statusList:['音乐','电台','交友','娱乐','陪玩','占卜','官方接待'],
			idCard:'',
			alipayAcount:'',
        },
        dataRule: {
          realName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
			{	pattern: /^[\u4E00-\u9FA5]+$/,  //正则
				message: '用户名只能为中文'
			}
          ],
		  alipayAcount:[
			  {required: true, message: '支付宝号不能为空', trigger: 'blur' },
		  ],
		  roomLevel:[
			  {required: true, message: '请选择房间类型', trigger: 'change' }
		  ],
        }
      };
    },
    methods: {
      init (mobile) {
		// console.log(this.dataForm.status)
        this.visible = true
        this.$nextTick(() => {
		this.$refs['dataForm'].resetFields()
        this.$http({
          url: this.$http.adornUrl(`/sys/streamerGrant/grantList/`),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,            
			'mobile':mobile,
			'applyState':0,
		  })
		}).then(({data}) => {
        if (data && data.code === 0) {
			this.dataForm.realName=data.data.list[0].realName
			this.dataForm.userCode=data.data.list[0].userCode
			this.dataForm.maskName=data.data.list[0].maskName
			this.dataForm.mobile=data.data.list[0].mobile 
			this.dataForm.applicationTime=data.data.list[0].applicationTime
			this.dataForm.roomType=data.data.list[0].roomType
			this.dataForm.applyTime=data.data.list[0].applyTime
			this.dataForm.idCard=data.data.list[0].idCard
			this.dataForm.alipayAcount=data.data.list[0].alipayAcount
		  }
		})
        })
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
			if (valid) {
			  this.$http({
				url: this.$http.adornUrl('/sys/streamerGrant/update'),
				method: 'post',
				data: this.$http.adornData({
				  'userCode':this.dataForm.userCode,
				  'roomType':this.dataForm.roomType,
				  'realName':this.dataForm.realName,
				  'applyState':1,
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
