<!-- 历史状态详情  History-->
<template>
	<div>
		<el-dialog
		title='详情'
		:visible.sync="visible1"
		width="85%">
			<el-form>
				<el-form-item>
					已控未中  :  {{this.PersonDiamondNo}}
				</el-form-item>
			</el-form>
			<el-table :data="dataListHistoryDeatil" border v-loading="dataListLoading" style="width:100%;">
				<el-table-column
				  prop="userCode"
				  label="用户ID"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="maskName"
				  label="用户昵称"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="dataTime"
				  label="最后抽奖时间"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="payDiamond"
				  label="充值"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="drwaPrizeDiamond"
				  label="抽奖"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="winPrizeDiamond"
				  label="中奖"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="ratio"
				  label="比例"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="drawPersonDiamond"
				  label="已控"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="drawPersonDiamondYes"
				  label="已控已中"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  prop="drawPersonDiamondNo"
				  label="已控未中"
				  header-align="center"
				  align="center" >
				</el-table-column>
				<el-table-column
				  label="操作"
				  fixed="right"
				  header-align="center"
				  align="center">
				  <template slot-scope="scope">
					<el-button type="text" size="small" @click="designHandle(scope.row.userCode)">指定中大奖</el-button>
				  </template>
				</el-table-column>
			</el-table>
			<el-pagination
			  @size-change="sizeChangeHandle"
			  @current-change="currentChangeHandle"
			  :current-page="pageIndex"
			  :page-sizes="[10, 20, 50, 100]"
			  :page-size="pageSize"
			  :total="totalPage"
			  layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
		</el-dialog>
		<el-dialog
			title='指定中大奖'
			:visible.sync="visible2">
			<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
				<el-form-item label="用户编号" prop="userCode">
				  <el-input v-model="dataForm.userCode" placeholder="用户编号"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-radio-group v-model="dataForm.status">
					  <el-radio  v-for="(status, index) in dataForm.statusList" :label="index" :key="index">{{status}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="开始时间" prop="startTime">
				  <el-date-picker type="datetime" v-model="dataForm.startTime" placeholder="开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间" prop="endTime">
				  <el-date-picker type="datetime" v-model="dataForm.endTime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
				<el-form-item label="次数" prop="count">
				  <el-input v-model="dataForm.count" placeholder="次数"></el-input>
				</el-form-item>
				<el-form-item label="奖品" prop="prizeId">
					<el-select v-model="dataForm.prizeId" placeholder="请选择">
					<el-option
						v-for="item in options"
						:key="dataForm.prizeId"
						:label="item.prizeName"
						:value="item.id">
					</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			  <el-button @click="visible2 = false">取消</el-button>
			  <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>


<script>
	export default{
		inject:['reload'],
		data() {
			return {
				visible1:false,
				visible2:false,
				dataListLoading:false,
				dataListHistoryDeatil:[],  //历史状态详情列表
				PersonDiamondNo:'',  
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				time:'',
				dataForm: {
				    id: 0,
				    userCode: '',
				    status: '',
				    startTime: '',
				    endTime: '',
				    count: '',
				    prizeId: '',
					statusList:['未删除','删除'],
					key: '',
				  },
				  options: [],
				  prizeId: '',
				  dataRule: {
				    userCode: [
				      { required: true, message: '用户编号不能为空', trigger: 'blur' }
				    ],
				    status: [
				      { required: true, message: '状态不能为空', trigger: 'blur' }
				    ],
				    startTime: [
				      { required: true, message: '开始时间不能为空', trigger: 'blur' }
				    ],
				    endTime: [
				      { required: true, message: '结束时间不能为空', trigger: 'blur' }
				    ],
				    count: [
				      { required: true, message: '次数不能为空', trigger: 'blur' }
				    ],
				    prizeId: [
				      { required: true, message: '奖品ID铃铛不能为空', trigger: 'blur' }
				    ]
				  },
			}
		},
		activated() {
			this.init()   //历史状态列表
		},
		methods: {
			init(dataTime) {
				this.time=dataTime
				// console.log(this.time)
				this.visible1 = true;
				this.$nextTick(() => {
					this.dataListLoading=true   
					this.$http({
					  url: this.$http.adornUrl('/sys/maskprizestatis/drawWinStatisList'),
					  method: 'get',
					  params: this.$http.adornParams({
						'pageNo': this.pageIndex,
						'pageSize': this.pageSize,            
						'dataTime':dataTime, 
					  })
					}).then(({data}) => {
					  if (data && data.code === 0) {
						this.dataListHistoryDeatil = data.data
						this.PersonDiamondNo=data.PersonDiamondNo
					  } else {
						this.dataListHistoryDeatil = []
					  }
					  this.dataListLoading = false
					})
				})
			},
			//designHandle  指定中大奖
			designHandle(userCode){
				this.dataForm.userCode=userCode
				this.visible2 = true;
				console.log(userCode)
				this.$http({
				    url: this.$http.adornUrl('/sys/maskprizeperson/list'),
				    method: 'get',
				    params: this.$http.adornParams({
				      'page': this.pageIndex,
				      'limit': this.pageSize,
				      'key': this.dataForm.key
				    })
				  }).then(({data}) => {
				    if (data && data.code === 0) {
				      this.options = data.data
				// console.log(this.options)
				    } else {
				      this.dataList = []
				      this.totalPage = 0
				    }
				  })
			// ----------------------------------------------------
				
				// this.$http({
				//   url: this.$http.adornUrl(``),
				//   method: 'get',
				//   params: this.$http.adornParams({
				// 	  'pageNo': this.pageIndex,
				// 	  'pageSize': this.pageSize,            
				// 	  'userCode':userCode,		
				//   })
				// }).then(({data}) => {
				//   if (data && data.code === 0) {
				//     this.dataForm.userCode = data.sysMaskPrizePerson.userCode
				//     this.dataForm.status = data.sysMaskPrizePerson.status
				//     this.dataForm.startTime = data.sysMaskPrizePerson.startTime
				//     this.dataForm.endTime = data.sysMaskPrizePerson.endTime
				//     this.dataForm.count = data.sysMaskPrizePerson.count
				//     this.dataForm.prizeId = data.sysMaskPrizePerson.prizeId
				//   }
				// })
			},
			//指定中大奖提交
			dataFormSubmit () {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						this.$http({
						  url: this.$http.adornUrl(`/sys/maskprizeperson/update`),
						  method: 'post',
						  data: this.$http.adornData({
							'userCode': this.dataForm.userCode,
							'status': this.dataForm.status,
							'startTime': this.dataForm.startTime,
							'endTime': this.dataForm.endTime,
							'count': this.dataForm.count,
							'prizeId': this.dataForm.prizeId
						  })
						}).then(({data}) => {
						  if (data && data.code === 0) {
							this.$message({
							  message: '操作成功',
							  type: 'success',
							  duration: 1500,
							  onClose: () => {
								this.visible2 = false
								this.$emit('refreshDataList')
							  }
							})
						  } else {
							this.$message.error(data.msg)
						  }
						})	  
					}
				})
			},
			// 每页数
			sizeChangeHandle (val) {
			this.pageSize = val
			this.pageIndex = 1
			this.init(this.time) //今日状态详情列表
			},
			// 当前页
			currentChangeHandle (val) {
			this.pageIndex = val
			this.init(this.time)  //今日状态详情列表
			},
		}
	}
</script>

<style>
</style>
