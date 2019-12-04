<!-- 中奖记录(测试) -->
<template>
	<div class="testRecords">
		<el-form :inline="true" :model="dataForm"  ref="dataForm" :rules="dataRule">
			<el-form-item  prop="startTime">
				<el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.startTime" placeholder="开始日期" :clearable="false"></el-date-picker>
			</el-form-item>
			<el-form-item prop="endTime">
				<el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="dataForm.endTime" placeholder="结束日期" :clearable="false"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-input v-model="dataForm.mobile" placeholder="手机号码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="dataForm.showUserCode" placeholder="用户ID"></el-input>
			</el-form-item>
<!-- 			<el-form-item>
				  <el-select v-model="dataForm.prizeType" placeholder="中奖类型">
					<el-option
					  v-for="item in dataForm.options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
			</el-form-item> -->
			<el-form-item>
				<el-button @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item style="float:right;">
				<el-button @click="exportHandle()" type="success" >导出</el-button>
			</el-form-item>
		</el-form>
		<el-form  :model="dataList1">
			<table  style="width:100%;line-height:40px;text-align: center;">
				<tr>
					<td>抽奖金额</td>
					<td>中奖金额</td>
					<td>差值金额</td>
					<td>比例</td>
				</tr>
				<tr>
					<td>{{this.dataList1.expense}}</td>  <!-- 抽奖金额 -->
					<td>{{this.dataList1.income}}</td>   <!-- 中奖金额 -->
					<td>{{this.dataList1.difference}}</td><!--差值金额 -->
					<td>{{this.dataList1.ratio}}</td><!-- 比例 -->
				</tr>
            </table>
		</el-form>
		<el-table
		 :data="dataList2"
		 v-loading="dataListLoading"
		 border
		 style="width:100%;">
			<el-table-column
				type="index"
				label="序号"
				header-align="center"
				align="center"
				width="80">
			</el-table-column>
			<el-table-column
				prop="userCode"
				label="用户ID"
				header-align="center"
				align="center"
				width="170">
			</el-table-column>
			<el-table-column
				prop="mobile"
				label="手机号"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="maskName"
				label="抽奖人昵称"
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="prizeTime"
				label="抽奖时间"
				sortable
				header-align="center"
				align="center"
				width="170">
			</el-table-column>
			<el-table-column
				prop="prizeNum"
				label="抽奖数量"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="prizeName"
				label="中奖奖项"
				header-align="center"
				align="center"
				:filters="[{ text: '幸运头等奖', value:'幸运头等奖'},{ text: '幸运一等奖', value:'幸运一等奖'},{ text: '幸运二等奖', value:'幸运二等奖'},{ text: '幸运三等奖', value:'幸运三等奖'},{ text: '幸运四等奖', value:'幸运四等奖'},{ text: '幸运五等奖', value:'幸运五等奖'},{ text: '幸运六等奖', value:'幸运六等奖' },{ text: '幸运七等奖', value:'幸运七等奖' },{ text: '幸运八等奖', value:'幸运八等奖' },
				{ text: '幸运九等奖', value:'幸运九等奖'},{ text: '幸运十等奖', value:'幸运十等奖'},{ text: '安慰奖', value:'安慰奖'},]"
				:filter-method="filterTag">
			</el-table-column>
			<el-table-column
				prop="giftName"
				label="中奖礼物"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="giftDiamond"
				label="礼物铃铛"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="giftNum"
				label="礼物数量"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
			<el-table-column
				prop="diamond"
				label="总铃铛"
				sortable
				header-align="center"
				align="center">
			</el-table-column>
		 </el-table>
		<el-pagination
		  @size-change="sizeChangeHandle"
		  @current-change="currentChangeHandle"
		  :current-page="pageIndex"
		  :page-sizes="[10, 20, 50, 100]"
		  :page-size="pageSize"
		  :total="totalPage"
		  layout="total,sizes,prev,pager,next">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					mobile:'',
					startTime:'',
					endTime:'',
					prizeType:'',
					showUserCode:'',
					options: [{
					  value: 0,
					  label: '幸运'
					}, {
					  value: 1,
					  label: '豪华'
					}, {
					  value: '',
					  label: '全部'
					},],
					value: ''
				},
				dataRule: {
				  startTime: [
				    { required: true, message: '开始时间不能为空', trigger: 'blur' },
				  ],
				  endTime:[
					  {required: true, message: '结束时间不能为空', trigger: 'blur' },
				  ],
				},
				dataList1:{
					income:'',
					difference:'',
					expense:'',
					ratio:'',
					coefficientMoney:'',
					rakeBanlance:''
				},
				dataList2:[],
				dataListLoading:false,
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
			}
		},
		activated () {
		  this.getDataList()
		},
		methods:{
			getDataList(){
				this.dataListLoading=true
				this.$http({
					url:this.$http.adornUrl('/sys/ceshi/queryRecordByTime'),
					method:'get',
					params:this.$http.adornParams({
						'pageNo':this.pageIndex,
						'pageSize':this.pageSize,
						'mobile':this.dataForm.mobile,
						'startTime':this.dataForm.startTime,
						'endTime':this.dataForm.endTime,
						'prizeType':this.dataForm.prizeType,
						'showUserCode':this.dataForm.showUserCode
					})
				}).then(({data})=>{
					if(data && data.code===0){
						this.dataList1.income=data.income
						this.dataList1.difference=data.difference
						this.dataList1.expense=data.expense
						this.dataList1.ratio=data.ratio
						this.dataList1.coefficientMoney=data.coefficientMoney
						this.dataList1.rakeBanlance=data.rakeBanlance
						this.dataList2=data.data
						this.totalPage = data.total
					}else{
						this.dataList2=[]
						this.totalPage = 0
					}
					this.dataListLoading=false
				})
			},
		  // 每页数
			sizeChangeHandle (val) {
				this.pageSize = val
				this.pageIndex = 1
				this.getDataList()
			},
		  // 当前页
		    currentChangeHandle (val) {
			  this.pageIndex = val
			  this.getDataList()
		    },
				  filterTag(value, row) {
			return row.prizeName === value;
			},
        //导出
        exportHandle(){
			this.$refs['dataForm'].validate((valid) => {
				if (valid) {
					// console.log(this.dataForm.startTime)
					// console.log(this.dataForm.endTime)
					var startTime=this.dataForm.startTime
					var arr = startTime.split("-");
					var newdt = new Date(Number(arr[0]),Number(arr[1])-1,Number(arr[2])+7);
					var endTime1 = newdt.getFullYear() + "-" +   (newdt.getMonth()+1) + "-" + newdt.getDate();
					// console.log(endTime1)
					var endTime11=new Date(endTime1)
					// console.log(endTime11)
					var endTime=new Date(this.dataForm.endTime)
					// console.log(endTime)
					// console.log(endTime11.getTime())
					// console.log(endTime.getTime())
					if(endTime11.getTime()< endTime.getTime()){
					    alert('只能导出七天内的信息');
					} else {
						this.dataListLoading=true
						this.$http({
							url: this.$http.adornUrl('/sys/excel/PrizedrawRecordGiftExcel'),
							method: 'get',
							responseType:'blob',
							params: this.$http.adornParams({
								'mobile':this.dataForm.mobile,
								'startTime':this.dataForm.startTime,
								'endTime':this.dataForm.endTime,
								'prizeType':this.dataForm.prizeType,
							}),
						}).then(({data}) => {
							// console.log(data)
							let blob = new Blob([data],{type: 'application/vnd.ms-excel'});
							if (window.navigator.msSaveOrOpenBlob) {
								// 如果需要改名字，前台可以自动生成
								navigator.msSaveBlob(blob,"中奖记录");
							} else {
								let link = document.createElement("a");
								let evt = document.createEvent("HTMLEvents");
								evt.initEvent("click", false, false);
								link.href = URL.createObjectURL(blob);
								link.download = "中奖记录";
								link.style.display = "none";
								document.body.appendChild(link);
								link.click();
								window.URL.revokeObjectURL(link.href);
							}
							this.dataListLoading = false
						})
					}
					
				}
			})
        }
		}
	}
</script>

<style>
</style>

