<template>
  <div class="mod-home">
	 <div style="margin:40px 0;line-height: 40px;"><b style="color: #F56C6C;">{{this.date}}</b>代办事项</div>
	<el-form >  <!-- :model="dataList" -->
		<table style=" width: 90%;line-height: 40px;text-align: center;margin: 0 auto;">           
			<tr>
				<td>主播申请</td>
				<td>提现申请</td>
				<td>房间类型变更申请</td>
				<td>举报次数</td>
				<td>今日大奖设置</td>
				<td>中奖比例</td>
			</tr>
			<tr style="color:#f56c6c;">
				<td>{{this.dataList.applyStreamerNum}}</td>
				<td>{{this.dataList.drawcashNum}}</td>
				<td>{{this.dataList.roomChangeNum}}</td>
				<td>{{this.dataList.reportNum}}</td>
				<td id="report">{{this.dataList.Report}}</td>
				<td id="prizedrawNum" style="color:#000000;">{{this.dataList.prizedrawNum}}</td>
			</tr>  
		</table>
	</el-form>
	 <b style="color:#f56c6c;display:none;line-height:100px;" id="eg">提示：今天是提现账单日，请及时处理</b>	
  </div>
</template>

<script>
  export default {
	  data(){
		  return{
			date:'',
			dataList:{},
			pageIndex: 1,
			pageSize: 10,
			totalPage: 0,
			dataListLoading: false,
		  }
	  },
	  activated() {
	  	this.init()
		this.getDataList()
	  },
	  methods:{
		  init(){
			var now = new Date();
			var year = now.getFullYear(); //得到年份
			var month = now.getMonth(); //得到月份
			var date = now.getDate(); //得到日期
			month = month + 1;
			month = month.toString().padStart(2, "0");
			date = date.toString().padStart(2, "0");
			var defaultDate = `${year}-${month}-${date}`;
			this.date=defaultDate
		  },
			getDataList(){
			this.dataListLoading=true
			this.$http({
			  url: this.$http.adornUrl('/sys/home/allhome'),
			  method: 'get',
			  params: this.$http.adornParams({
				// 'pageNo': this.pageIndex,
				// 'pageSize': this.pageSize,            
				// 'mobile': this.dataForm.mobile,
				// 'maskName':this.dataForm.maskName,
				// 'userCode':this.dataForm.userCode,
			  })
			}).then(({data}) => {
			  if (data && data.code === 0) {
				this.dataList = data.data
				this.dataList.applyStreamerNum=data.data.applyStreamerNum
				this.dataList.drawcashNum=data.data.drawcashNum
				this.dataList.roomChangeNum=data.data.roomChangeNum
				this.dataList.reportNum=data.data.reportNum
				this.dataList.Report=data.data.Report
				this.dataList.prizedrawNum=data.data.prizedrawNum
				// this.totalPage = data.data.total
			  } else {
				this.dataList = []
				// this.totalPage = 0
			  }
			  this.dataListLoading = false
			  if(this.dataList.Report==='不需要设置'){
				 document.getElementById('report').style.color='black'
			  }
			  if(this.dataList.prizedrawNum>=0.9){
				  document.getElementById('prizedrawNum').style.background='orange'
			  }
				var ji = "日一二三四五六".charAt(new Date().getDay());
				var we="星期"+ji
				if(we ==='星期一' || we ==='星期四'){
					document.getElementById('eg').style.display='block'
				}
			})
			},
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
	  }
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
</style>
