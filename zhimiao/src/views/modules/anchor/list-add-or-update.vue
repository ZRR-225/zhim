<template>
    <el-dialog
      title="编辑"
      :close-on-click-modal="false"
      :visible.sync="visible">
		<el-form :model="dataForm" ref="dataForm" :rules="dataRule" label-width="100px"  @keyup.enter.native="dataFormSubmit()">
			<el-form-item label="主播Code" prop="userCode">
			  <el-input v-model="dataForm.userCode" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="主播昵称" prop="maskName">
			  <el-input  v-model="dataForm.maskName" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="主播姓名" prop="realName">
			  <el-input  v-model="dataForm.realName"></el-input>
			</el-form-item>
			<el-form-item label="手机号码" prop="mobile">
			  <el-input v-model="dataForm.mobile" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="房间名称" prop="roomName">
			  <el-input v-model="dataForm.roomName" :disabled="true"></el-input>
		   </el-form-item>
<!-- 		<el-form-item label="直播权限" prop="roomLevel">
			<el-radio-group v-model="dataForm.roomLevel">
				<el-radio  v-for="(roomLevel, index) in dataForm.statusList" :label="index" :key="index">{{roomLevel}}</el-radio>
			</el-radio-group>
		</el-form-item> -->
		<el-form-item label="房间类型" prop="roomType">
			<el-radio-group v-model="dataForm.roomType">
			  <el-radio :label="1">男神</el-radio>
			  <el-radio :label="2">女神</el-radio>
			  <el-radio :label="3">唱见</el-radio>
			  <el-radio :label="4">娱乐</el-radio>
			  <el-radio :label="5">聊天</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="转账权限" prop="isGiveCurrency">
			<el-radio-group v-model="dataForm.isGiveCurrency">
				<el-radio  v-for="(isGiveCurrency, index) in dataForm.statusList" :label="index" :key="index">{{isGiveCurrency}}</el-radio>
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
    data(){
      return{
		pageIndex: 1,
		pageSize: 10,
        visible:false,
        dataForm:{
          userCode:'',
          maskName:'',
          realName:'',
          mobile:'',
		  roomId:'',
          roomName:'',
          isGiveCurrency:'',  //转账权限
		  statusList:['关','开'], //转账权限
		  roomType:''
        },
        dataRule: {
          // realName: [
          //   { required: true, message: '', trigger: 'blur' },
          // ],
		  roomType:[
			  {required: true, message: '请选择房间类型', trigger: 'change' }
		  ],
        }
      }
    },
    methods:{
      init(mobile){
        this.visible = true
        this.$nextTick(() => {
		this.$refs['dataForm'].resetFields()
        this.$http({
          url: this.$http.adornUrl(`/sys/streamer/streamerList/`),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,            
			'mobile':mobile,
			'realName':this.dataForm.realName,
			'roomId':this.dataForm.roomId,
		  })
		}).then(({data}) => {
          if (data && data.code === 0) {
			this.dataForm.userCode=data.data.list[0].userCode
			this.dataForm.maskName=data.data.list[0].maskName
			this.dataForm.realName=data.data.list[0].realName
			this.dataForm.mobile=data.data.list[0].mobile
			this.dataForm.roomName=data.data.list[0].roomName
			this.dataForm.roomType=data.data.list[0].roomType
			this.dataForm.isGiveCurrency=data.data.list[0].isGiveCurrency
			}
		})	
        })
      },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
			if (valid) {
			  this.$http({
				url: this.$http.adornUrl(`/sys/streamer/update`),
				method: 'post',
				data: this.$http.adornData({
				  'userCode':this.dataForm.userCode,
				  'roomType':this.dataForm.roomType,
				  'realName':this.dataForm.realName,
				  'isGiveCurrency':this.dataForm.isGiveCurrency

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

<style>
</style>
