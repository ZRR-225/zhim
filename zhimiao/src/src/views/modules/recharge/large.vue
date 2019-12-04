<!-- 大额充值 -->
<template>
	<div class="recharge_large">
		<el-form :inline="true" :model="dataForm"  ref="dataForm" :rules="dataRule" @keyup.enter.native="getDataList()" style="border-bottom: 1px solid #f3f3f3;">
		  <el-form-item label="手机号码" prop="mobile1">
			<el-input v-model="dataForm.mobile1" type="text" placeholder="手机号码" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
		  		<div>或</div>
		  </el-form-item>
		  <el-form-item label="用户ID" prop="showUserCode">
		  		<el-input v-model="dataForm.showUserCode" type="text" placeholder="用户ID" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			  <el-button @click="getDataList()">确定</el-button>
		  </el-form-item>
		</el-form>
		<div style="line-height: 45px;border-bottom: 1px solid #f3f3f3;">
			<div class="form-line">
			  <span class="label">用户ID: </span>
			  <span class="value">{{dataForm.userCode}}</span>
			</div>
			<div class="form-line">
			  <span class="label">用户昵称: </span>
			  <span class="value">{{dataForm.maskName}}</span>
			</div>
			<div class="form-line">
			  <span class="label">手机号码: </span>
			  <span class="value">{{dataForm.mobile}}</span>
			</div>
		</div>
		<el-form :model="dataForm" ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
				<el-radio-group v-model="type" style="margin-left: 0;">
				  <el-radio-button :label="1" style="margin-left: 0;">大额充值</el-radio-button>
				  <el-radio-button :label="2">其他金额</el-radio-button>
				</el-radio-group>
			<template v-if="type===1">
			<div>
				<div class="amount">
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="">
						<td>
							<ul id="fwmc_xxk" style="list-style: none; display:flex;justify-content: space-around;margin: 50px 0;">
								<li @click="showDetails(index)" class="on" v-for="(item,index) in dataMoney" :class="{'chosse':flag==index}">
									<p class="lingdang">{{item.num1}}铃铛</p>
<!-- 									<p>赠{{item.num2}}铃铛</p> -->
									<p>{{item.price}}</p>
								</li>
							</ul>
						</td>
					</table>
				</div>

				<span slot="footer" class="dialog-footer">
				   <el-button  type="primary"  @click="addOrNewHandle()">确定</el-button>
				</span>
				<el-dialog
				  title='确认充值信息'
				  :visible.sync="addOrNewVisible">
					  <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
						  <el-form-item label="用户ID" prop="userCode">
							<el-input v-model='dataForm.userCode' :disabled="true"></el-input>
						  </el-form-item>
						  <el-form-item label="用户昵称" prop="maskName">
							<el-input v-model="dataForm.maskName" :disabled="true"></el-input>
						  </el-form-item>
						  <el-form-item label="手机号码" prop="mobile">
							<el-input v-model="dataForm.mobile" :disabled="true"></el-input>
						  </el-form-item>
						  <el-form-item label="充值金额" prop="money1">
							<el-input  :disabled="true" v-model="dataForm.money1"></el-input>
						  </el-form-item>
						  <el-form-item label="充值铃铛" prop="diamond">
							<el-input  :disabled="true" v-model="dataForm.diamond"></el-input>
						  </el-form-item>
<!-- 						  <el-form-item label="赠送铃铛" prop="giveDiamond">
							<el-input  :disabled="true" v-model="dataForm.giveDiamond"></el-input>
						  </el-form-item> -->
						</el-form>		
						<span slot="footer" class="dialog-footer">
							<el-button @click="addOrNewVisible = false">取消</el-button>
							<el-button type="primary"  @click="dataFormSubmit1()" :disabled="isDisabled">充值</el-button>
						</span>
				  </el-dialog>
			</div>
			</template>
			<template v-if="type===2">
				<div>
					<el-form style="margin-top: 30px;" :rules="dataRule" :model="dataForm"  ref="dataForm"  @keyup.enter.native="addOrUpdateHandle()">
						 <el-form-item label="充值金额" prop="money">
							<el-input style="width:250px;" placeholder="单位:元" v-model.number="dataForm.money"></el-input>
						 </el-form-item>
						 <el-form-item label="充值原因" prop="reason">
							<el-select v-model="dataForm.reason" placeholder="请选择" style="width:250px;">
								<el-option
								  v-for="item in options"
								  :key="item.value"
								  :value="item.label">
								</el-option>
							</el-select>
						 </el-form-item>
						 <el-form-item label="备注" prop="remark">
							<el-input style="width:280px;" placeholder="备注信息"  v-model="dataForm.remark"></el-input>
						 </el-form-item>
					</el-form>
					<span slot="footer" class="dialog-footer">
					   <el-button type="primary"  @click="addOrUpdateHandle()">确定</el-button>
					</span>
					<el-dialog  title='确认充值信息'  :visible.sync="addOrUpdateVisible">
					  <el-form :model="dataForm" :rules="dataRule"  ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()">
						  <el-form-item label="用户ID" prop="userCode">
							<el-input v-model='dataForm.userCode' :disabled="true"></el-input>
						  </el-form-item>
						  <el-form-item label="用户昵称" prop="maskName">
							<el-input v-model="dataForm.maskName" :disabled="true"></el-input>
						  </el-form-item>
						  <el-form-item label="手机号码" prop="mobile">
							<el-input v-model="dataForm.mobile" :disabled="true"></el-input>
						  </el-form-item>
						  <el-form-item label="充值金额" prop="money">
							<el-input  :disabled="true" v-model="dataForm.money"></el-input>
						  </el-form-item>
						  <el-form-item label="充值铃铛" prop="diamond">
							<el-input  :disabled="true" v-model="dataForm.diamond"></el-input>
						  </el-form-item>
						  <el-form-item label="充值原因" prop="reason">
							<el-input  :disabled="true" v-model="dataForm.reason"></el-input>
						  </el-form-item>
						  <el-form-item label="备注信息" prop="remark">
							<el-input  :disabled="true" v-model="dataForm.remark"></el-input>
						  </el-form-item>
						</el-form>		
						<span slot="footer" class="dialog-footer">
							<el-button @click="addOrUpdateVisible = false">取消</el-button>
							<el-button type="primary" @click="dataFormSubmit2()" :disabled="isDisabled">充值</el-button>
						</span>
					</el-dialog>
				</div>
			</template>
		</el-form>
	</div>
</template>

<script>
	import AddOrUpdate from './large-add-or-update'
	import AddOrNew from './large-add-or-new'
	export default{
		inject:['reload'],
		data(){
			return{
                dataRule: {
					userCode:[
						{ required: true, message: '用户ID不能为空', trigger: 'blur' },
					],
					maskName:[
						{ required: true, message: '用户昵称不能为空', trigger: 'blur' },
					],
					mobile:[
						{ required: true, message: '手机号码不能为空', trigger: 'blur' },
						{ pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, 
						message: '手机号格式错误'}
					],
					mobile1:[
						{ pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, 
						message: '手机号格式错误'}
					],
					diamond:[
						{ required: true, message: '充值铃铛不能为空', trigger: 'blur' },
					],
					// giveDiamond:[
					// 	{ required: true, message: '赠送铃铛不能为空', trigger: 'blur' },
					// ],
					money1:[
						{ required: true, message: '充值金额不能为空', trigger: 'blur' },
					],
                    money: [
                        { required: true, 
						  message: '充值金额的范围在1元-100000元',
						  pattern:/^(?:[1-9]|(?:[1-9][0-9])|(?:[1-9][0-9][0-9])|(?:[1-9][0-9][0-9][0-9])|(?:[1-9][0-9][0-9][0-9][0-9])|(?:100000))$/,
						  trigger: 'blur'
						},
                    ],
					remark:[
						{ required: true, message: '备注信息不能为空', trigger: 'blur' },
					],
					reason:[
						{ required: true, message: '充值原因不能为空', trigger: 'blur' },
					]
                },
				flag: -1,
				type:1,
				isDisabled:false,
				addOrUpdateVisible: false,
				addOrNewVisible:false,
				dataForm:{					
					userCode:'',
					showUserCode:'',
					mobile:'',
					mobile1:'',
					maskName:'',
					money:'',
					diamond:'',
					giveDiamond:'',
					reason:'',
					remark:'',
					money1:'',
				},
				dataMoney: [
				  { price: '10000',num1:'100000',},
				  { price: '20000',num1:'200000',},
				  { price: '50000',num1:'500000',},
				  { price: '100000',num1:'1000000',},		
				],
				dataList:[],
				options: [{
				  value: 0,
				  label: '问题补偿'
				}, {
				  value: 1,
				  label: '系统测试'
				}, {
				  value: 2,
				  label: '特殊奖励'
				}, {
				  value: 3,
				  label: '运营申请'
				}, {
				  value: 4,
				  label: '其他原因'
				}],
				value: ''
			}
		},
		components: {
		  AddOrUpdate,
		  AddOrNew
		},
		activated () {
		  // this.getDataList()
		},
		methods:{
			showDetails(index) {
				 this.flag = index;
				this.dataForm.money1=this.dataMoney[index].price;
				this.dataForm.diamond=this.dataMoney[index].num1;
				// this.dataForm.giveDiamond=this.dataMoney[index].num2;
			},
			getDataList(){
				this.$http({
					url: this.$http.adornUrl('/sys/sysmaskdiamondrecord/queryUserByMobile'),
					method: 'get',
					params: this.$http.adornParams({
							mobile:this.dataForm.mobile1,
							userCode:this.dataForm.userCode,
							money:this.dataForm.money,
							diamond:this.dataForm.money,
							giveDiamond:this.dataForm.giveDiamond,
							reason:this.dataForm.reason,
							remark:this.dataForm.remark,
							showUserCode:this.dataForm.showUserCode
					})
				}).then(({data}) => {
					if (data && data.code === 0) {
						this.dataForm.maskName = data.data.maskName
						this.dataForm.userCode = data.data.userCode
						this.dataForm.mobile = data.data.mobile
						// this.dataList = data.data.list
						// this.totalPage = data.data.total
					} else {
						this.$message({
						  message:data.msg ,
						  type: 'error',
						  duration: 1500,
						})
						this.dataForm.maskName=''
						this.dataForm.userCode=''
						// this.totalPage = 0
					}
				})		
			},
			// 确认充值信息(大额充值)
			addOrNewHandle () {
				this.addOrNewVisible = true
				 this.$nextTick(() => {
					this.$http({
						url: this.$http.adornUrl('/sys/sysmaskdiamondrecord/queryUserByMobile'),
						method: 'get',
						params: this.$http.adornParams({
							mobile:this.dataForm.mobile,
							userCode:this.dataForm.userCode,
							maskName:this.dataForm.maskName,
							mobile:this.dataForm.mobile,
							money:this.dataForm.money1,
							diamond:this.dataForm.diamond,
							giveDiamond:this.dataForm.giveDiamond,
							reason:this.dataForm.reason,
							remark:this.dataForm.remark,
							showUserCode:this.dataForm.showUserCode
						}),
						// data: this.$http.adornData({
						// userCode:this.dataForm.userCode,
						// maskName:this.dataForm.maskName,
						// mobile:this.dataForm.mobile,
						// money:this.dataForm.money1,
						// diamond:this.dataForm.diamond,
						// giveDiamond:this.dataForm.giveDiamond,
						// reason:'大额充值',
						// remark:'大额充值',
						// }),
					}).then(({data}) => {
						if (data && data.code === 0) {
							this.dataForm.maskName = data.data.maskName
							this.dataForm.userCode = data.data.userCode
							this.dataForm.mobile = data.data.mobile
							// this.dataForm.money = data.data.money
							// // this.totalPage = data.data.total
						} else {
							// this.dataList = []
							// this.totalPage = 0
						}
					})					 
				 })

			},
			dataFormSubmit1(){
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
					const loadingObj = this.$loading({
					  lock: true,
					  text: '充值中...',
					  spinner: 'el-icon-loading',
					  background: 'rgba(0, 0, 0, 0.7)',
					});
					this.isDisabled=true
					  this.$http({
						url: this.$http.adornUrl('/sys/sysmaskdiamondrecord/inerstCharm'),
						method: 'post',
						data: this.$http.adornData({
						userCode:this.dataForm.userCode,
						maskName:this.dataForm.maskName,
						mobile:this.dataForm.mobile,
						money:this.dataForm.money1,
						diamond:this.dataForm.diamond,
						giveDiamond:'0',
						reason:'大额充值',
						remark:'大额充值',
						})
					  }).then(({data}) => {
						if (data && data.code === 0) {
						  this.$message({
							message: '充值中......',
							type: 'info',
							duration:800,
							onClose: () => {
							loadingObj.close(
							  this.$message({
								message: '充值成功',
								type: 'success',
								duration:800,})
							  )
							  this.addOrNewVisible = false
							  this.isDisabled=false
							  this.reload();
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
			// 确认充值信息(其他)
			addOrUpdateHandle () {
				this.dataForm.diamond=10*this.dataForm.money,
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {	
						this.$nextTick(()=>{
							this.addOrUpdateVisible = true
								this.$http({
									url: this.$http.adornUrl('/sys/sysmaskdiamondrecord/queryUserByMobile'),
									method: 'get',
									params: this.$http.adornParams({
										userCode:this.dataForm.userCode,
										maskName:this.dataForm.maskName,
										mobile:this.dataForm.mobile,
										money:this.dataForm.money,
										diamond:this.dataForm.diamond,
										giveDiamond:this.dataForm.giveDiamond,
										reason:this.dataForm.reason,
										remark:this.dataForm.remark,
										showUserCode:this.dataForm.showUserCode
									})
								}).then(({data}) => {
									if (data && data.code === 0) {
										// this.dataList = data.data.list
										// // this.totalPage = data.data.total
									} else {
										// this.dataList = []
										// this.totalPage = 0
									}
								})		
						})
					} else {
						return false;
					}
})
						// this.addOrUpdateVisible = true
						// 	this.$http({
						// 		url: this.$http.adornUrl('/sys/sysmaskdiamondrecord/queryUserByMobile'),
						// 		method: 'get',
						// 		params: this.$http.adornParams({
						// 			userCode:this.dataForm.userCode,
						// 			maskName:this.dataForm.maskName,
						// 			mobile:this.dataForm.mobile,
						// 			money:this.dataForm.money,
						// 			diamond:this.dataForm.money,
						// 			giveDiamond:this.dataForm.giveDiamond,
						// 			reason:this.dataForm.reason,
						// 			remark:this.dataForm.remark,
						// 		})
						// 	}).then(({data}) => {
						// 		if (data && data.code === 0) {
						// 			// this.dataList = data.data.list
						// 			// // this.totalPage = data.data.total
						// 		} else {
						// 			// this.dataList = []
						// 			// this.totalPage = 0
						// 		}
						// 	})	
				// this.addOrUpdateVisible = true
				// this.$nextTick(() => {
				// 	this.$http({
				// 		url: this.$http.adornUrl('/sys/sysmaskdiamondrecord/queryUserByMobile'),
				// 		method: 'get',
				// 		params: this.$http.adornParams({
				// 			userCode:this.dataForm.userCode,
				// 			maskName:this.dataForm.maskName,
				// 			mobile:this.dataForm.mobile,
				// 			money:this.dataForm.money,
				// 			diamond:this.dataForm.money,
				// 			giveDiamond:this.dataForm.giveDiamond,
				// 			reason:this.dataForm.reason,
				// 			remark:this.dataForm.remark,
				// 		})
				// 	}).then(({data}) => {
				// 		if (data && data.code === 0) {
				// 			// this.dataList = data.data.list
				// 			// // this.totalPage = data.data.total
				// 		} else {
				// 			// this.dataList = []
				// 			// this.totalPage = 0
				// 		}
				// 	})						
				// })
			},
			dataFormSubmit2(){
				// this.dataForm.diamond=10*this.dataForm.money,
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						const loadingObj = this.$loading({
						  lock: true,
						  text: '充值中...',
						  spinner: 'el-icon-loading',
						  background: 'rgba(0, 0, 0, 0.7)',
						});
						this.isDisabled=true
					  this.$http({
						url: this.$http.adornUrl('/sys/sysmaskdiamondrecord/inerstCharm'),
						method: 'post',
						data: this.$http.adornData({
						userCode:this.dataForm.userCode,
						maskName:this.dataForm.maskName,
						mobile:this.dataForm.mobile,
						money:this.dataForm.money,
						diamond:this.dataForm.diamond,
						giveDiamond:'0',
						reason:this.dataForm.reason,
						remark:this.dataForm.remark,
						})
					  }).then(({data}) => {
						if (data && data.code === 0) {
						  this.$message({
							message: '充值中......',
							type: 'info',
							duration: 1500,
							onClose: () => {
							loadingObj.close(
							  this.$message({
								message: '充值成功',
								type: 'success',
								duration: 1500,})
							  )
							  this.addOrNewVisible = false
							  this.isDisabled=false
							  this.reload();
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
	.on{
		width:160px;
		height:110px;
		text-align:center;
		line-height: 22px;
		background: url(../../../../static/img/b1.png) no-repeat;
		background-size:100% 100%;
	}
	.chosse{
		width:160px;
		height:110px;
		text-align:center;
		line-height: 22px;
		background: url(../../../../static/img/b2.png) no-repeat;
		background-size:100% 100%;
	}
	.lingdang{
		margin: 32px 0;;
	}
</style>
