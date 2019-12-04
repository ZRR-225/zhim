<!-- 房间列表  新增/修改 -->
<template>
    <el-dialog
      title="关闭房间"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-form :model="dataForm" ref="dataForm" label-width="100px" >
		<el-form-item label="房间名称" prop="roomName">
			<el-input v-model="dataForm.roomName"  :disabled="true"></el-input>
		</el-form-item>
        <el-form-item label="关闭原因" prop="reson">
          <el-radio-group v-model="dataForm.reson">
            <el-radio :label="1">辱骂攻击</el-radio>
            <el-radio :label="2">内容低俗</el-radio>
            <el-radio :label="3">违法违规</el-radio>
            <el-radio :label="4">色情低俗</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关闭时间" prop="closeTime">
          <el-radio-group v-model="dataForm.closeTime">
            <el-radio :label="1">2小时</el-radio>
            <el-radio :label="2">一天</el-radio>
            <el-radio :label="3">一周</el-radio>
            <el-radio :label="4">一个月</el-radio>
			<el-radio :label="5">永久关闭</el-radio>
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
        visible:false,
		pageIndex: 1,
		pageSize: 10,
        dataForm:{
			reson:1,
			closeTime:1,
			roomId:'',
			roomName:''
        },
      }
    },
    methods:{
      init(roomId){
        this.visible = true
        this.$nextTick(() => {
			this.$refs['dataForm'].resetFields()
			this.$http({
			url: this.$http.adornUrl(`/sys/room/info`),
			method: 'get',
			params: this.$http.adornParams({
				'pageNo': this.pageIndex,
				'pageSize': this.pageSize,            
				'roomId':roomId
			})
		}).then(({data}) => {
        if (data && data.code === 0) {
			this.dataForm.roomId=data.data[0].roomId
			this.dataForm.roomName=data.data[0].roomName
		  }
		})
        })
      },
      dataFormSubmit(){	  
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
			  this.$http({
				  url:this.$http.adornUrl(`/sys/room/update`),
				  method:'post',
				  data:this.$http.adornData({
					 'reson':this.dataForm.reson,
					 'closeTime':this.dataForm.closeTime,
					 'roomId':this.dataForm.roomId,
					 'roomName':this.dataForm.roomName
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
      }
    }
  }
</script>

<style>
</style>
