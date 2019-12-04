<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
  <el-form-item label="大奖数量" prop="prizeNumbser">
      <el-input v-model="dataForm.prizeNumbser" placeholder="大奖数量" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="开始时间" prop="startTime">
      <el-date-picker type="datetime" v-model="dataForm.startTime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime">
      <el-date-picker type="datetime" v-model="dataForm.endTime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
    </el-form-item>
    <el-form-item label="中奖数量" prop="number">
      <el-input v-model="dataForm.number" placeholder="中奖数量不能大于大奖数量"></el-input>
	  <el-col id="t1" style="color: #f56c6c;font-size: 12px;line-height: 1;padding-top: 4px;position: absolute;top: 100%;left: 0;"></el-col>
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
		visible1:false,
        pageIndex: 1,
        pageSize: 10,
        dataForm: {
          id: 0,
          timeCode: '',
          startTime: '',
          endTime: '',
          number: '',
          status: '',
		  statusList:['关闭','开启'],
		  prizeNumbser:'',
        },
        dataRule: {
          timeCode: [
            { required: true, message: '时间段标识不能为空', trigger: 'blur' }
          ],
          startTime: [
            { required: true, message: '大奖开始时间不能为空', trigger: 'blur' }
          ],
          endTime: [
            { required: true, message: '大奖结束时间不能为空', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '中奖数量不能为空', trigger: 'blur' },
			 // { pattern:/^this.dataForm.number<=this.dataForm.prizeNumbser$/,  message: '中奖数量要小于大奖数量'}
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
      // 获取数据列表
        this.$http({
          url: this.$http.adornUrl('/sys/masksuperprizetime/list'),
          method: 'get',
          params: this.$http.adornParams({
		  'pageNo': this.pageIndex,
		  'pageSize': this.pageSize, 
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
				this.dataForm.timeCode = data.timeCode
				this.dataForm.prizeNumbser=data.prizeNumbser
				this.totalPage = data.page.totalCount
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
              url: this.$http.adornUrl(`/sys/masksuperprizetime/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.timeCode = data.sysMaskSuperPrizeTime.timeCode
                this.dataForm.startTime = data.sysMaskSuperPrizeTime.startTime
                this.dataForm.endTime = data.sysMaskSuperPrizeTime.endTime
                this.dataForm.number = data.sysMaskSuperPrizeTime.number
                this.dataForm.status = data.sysMaskSuperPrizeTime.status
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
			if(this.dataForm.number>=this.dataForm.prizeNumbser){
				// document.getElementById('t1').innerHTML="中奖数量大于大奖数量"
				this.$message('中奖数量大于大奖数量')
			}
			if(this.dataForm.number<0){
				// document.getElementById('t1').innerHTML="不能为负数"
				this.$message('中奖数量不能为负数')
			}
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/masksuperprizetime/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'timeCode': this.dataForm.timeCode,
                'startTime': this.dataForm.startTime,
                'endTime': this.dataForm.endTime,
                'number': this.dataForm.number,
                'status': this.dataForm.status
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
