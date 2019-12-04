<!-- 奖品数量新增/修改 -->
<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" :rules="dataRule" @keyup.enter.native="dataFormSubmit()" label-width="120px">
		<el-form-item label="开始时间" prop="startTime">
		  <el-date-picker type="datetime" v-model="dataForm.startTime" :disabled="true" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		</el-form-item>
		<el-form-item label="结束时间" prop="endTime">
		  <el-date-picker type="datetime" v-model="dataForm.endTime" :disabled="true" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
		</el-form-item>
		<el-form-item label="奖池取值系数" prop="prizeCoefficient">
		  <el-input v-model="dataForm.prizeCoefficient" placeholder="奖池取值系数"></el-input>
		</el-form-item>
      <el-form-item label="状态" prop="status">
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
        dataForm: {
          id: 0,
		  status:'',
          createTime: '',
          startTime:'',
          endTime: '',
          prizeNumber: '',
          sumPoolMoney: '',
          prizeCoefficient: '',
          prizePoolMoney: '',
          timeCode: '',
		 statusList:['关闭','开启'],
        },
        dataRule: {
          // createTime: [
          //   { required: true, message: '创建时间不能为空', trigger: 'blur' }
          // ],
          // startTime: [
          //   { required: true, message: '开始时间不能为空', trigger: 'blur' }
          // ],
          // endTime: [
          //   { required: true, message: '结束时间不能为空', trigger: 'blur' }
          // ],
          // prizeNumber: [
          //   { required: true, message: '设置铃铛大奖数量不能为空', trigger: 'blur' }
          // ],
          // sumPoolMoney: [
          //   { required: true, message: '奖池总金额不能为空', trigger: 'blur' }
          // ],
          prizeCoefficient: [
            { required: true, message: '奖池取值系数不能为空', trigger: 'blur' },
			{ 
				message: '奖池取值系数不能为负数不能大于1',
				pattern:/^(?:0\.\d+|[01](?:\.0000)?)$/,
				trigger: 'blur'
			},
          ],
          // prizePoolMoney: [
          //   { required: true, message: '抽奖池金额不能为空', trigger: 'blur' }
          // ],
          // timeCode: [
          //   { required: true, message: '时间段表标识不能为空', trigger: 'blur' }
          // ]
        }
      }
    },
    methods: {
		getNowTime() {

   },
      init (id) {
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       var date = now.getDate(); //得到日期
	   var date1 = now.getDate()+1; //得到日期的下一天
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
	   date1 = date1.toString().padStart(2, "0");
	   var time='15:00:00'
	   var time1='03:00:00'
       var defaultDate = `${year}-${month}-${date} ${time}`;
	   var defaultDate1 = `${year}-${month}-${date1} ${time1}`;
       this.$set(this.dataForm, "startTime", defaultDate);
	   this.$set(this.dataForm, "endTime", defaultDate1);
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/maskprizenumberrecord/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createTime = data.sysMaskPrizeNumberRecord.createTime
                this.dataForm.startTime = data.sysMaskPrizeNumberRecord.startTime
                this.dataForm.endTime = data.sysMaskPrizeNumberRecord.endTime
                this.dataForm.prizeNumber = data.sysMaskPrizeNumberRecord.prizeNumber
                this.dataForm.sumPoolMoney = data.sysMaskPrizeNumberRecord.sumPoolMoney
                this.dataForm.prizeCoefficient = data.sysMaskPrizeNumberRecord.prizeCoefficient
                this.dataForm.prizePoolMoney = data.sysMaskPrizeNumberRecord.prizePoolMoney
                this.dataForm.timeCode = data.sysMaskPrizeNumberRecord.timeCode
				this.dataForm.status = data.sysMaskPrizeNumberRecord.status
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
              url: this.$http.adornUrl(`/sys/maskprizenumberrecord/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'createTime': this.dataForm.createTime,
                'startTime': this.dataForm.startTime,
                'endTime': this.dataForm.endTime,
                'prizeNumber': this.dataForm.prizeNumber,
                'sumPoolMoney': this.dataForm.sumPoolMoney,
                'prizeCoefficient': this.dataForm.prizeCoefficient,
                'prizePoolMoney': this.dataForm.prizePoolMoney,
                'timeCode': this.dataForm.timeCode,
				'status':this.dataForm.status,
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
