<!-- 流水账单 -->
<template>
	<div class="flowBill">

		<el-radio-group v-model="type" style="margin-bottom: 20px;" @change="getDataList1()">
			  <el-radio-button :label="0">日</el-radio-button>
		</el-radio-group>
		<el-radio-group v-model="type" style="margin-bottom: 20px;" @change="getDataList2()">
			  <el-radio-button :label="1">周</el-radio-button>
		</el-radio-group>
		<el-radio-group v-model="type" style="margin-bottom: 20px;" @change="getDataList3()">
			  <el-radio-button :label="2">月</el-radio-button>
		</el-radio-group>
		<div>
<!-- ======================================= -->
<!-- 日-->
		<template v-if="type === 0">
			<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList1()">
				<el-form-item>
					<el-date-picker
					  v-model="dataForm.startTime0"
					  type="date"
					  value-format="yyyy-MM-dd"
					  placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="getDataList1()">查询</el-button>
				</el-form-item>
        <el-form-item style="float:right;">
          <el-button @click="exportHandle1()" type="success" >导出</el-button>
        </el-form-item>
			</el-form>
			<el-table :data="dataList1" border v-loading="dataListLoading" style="width: 100%;">
				<el-table-column
					prop="roomName"
					label="房间名称"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="roomId"
					label="房间ID"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="roomType"
					label="房间类型"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="maskName"
					label="房主名称"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="userCode"
					label="房主ID"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="sumDiamond"
					label="收益-铃铛"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="sumMoney"
					label="收益-RMB"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
				  fixed="right"
				  header-align="center"
				  align="center"
				  width="100"
				  label="操作">
					<template slot-scope="scope">
					  <el-button native-type="button"  type="text" size="small" @click="dayHandle(scope.row.roomId)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
			  @size-change="sizeChangeHandle1"
			  @current-change="currentChangeHandle1"
			  :current-page="pageIndex1"
			  :page-sizes="[10, 20, 50, 100]"
			  :page-size="pageSize1"
			  :total="totalPage1"
			  layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
		<!--日查看弹窗 -->
			<el-dialog
				title='详情'
				:visible.sync="dayVisble"
				:close-on-click-model="false">
					<el-table :data="dataList4" border v-loading="dataListLoading" style="width: 100%;">
						<el-table-column
							prop="maskName"
							label="被打赏人"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="diamond"
							label="收益-铃铛"
							sortable
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="money"
							label="收益-RMB"
							sortable
							header-align="center"
							align="center">
						</el-table-column>
					</el-table>
					<el-pagination
					  @size-change="sizeChangeHandle4"
					  @current-change="currentChangeHandle4"
					  :current-page="pageIndex4"
					  :page-sizes="[10, 20, 50,100]"
					  :page-size="pageSize4"
					  :total="totalPage4"
					  layout="total, sizes, prev, pager, next,jumper">
					</el-pagination>
			</el-dialog>
		</template>
<!-- ======================================= -->
<!-- 周 -->
		<template v-if="type === 1">
			<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList2()">
				<el-form-item>
					<el-date-picker
					  v-model="dataForm.startTime1"
					  type="week"
					  format="yyyy 第 WW 周"
					  value-format="yyyy-MM-dd"
					  placeholder="选择周">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="getDataList22()">查询</el-button>
				</el-form-item>
        <el-form-item style="float:right;">
          <el-button @click="exportHandle2()" type="success" >导出</el-button>
        </el-form-item>
			</el-form>
			<el-table :data="dataList2" border v-loading="dataListLoading" style="width: 100%;">
				<el-table-column
					prop="roomName"
					label="房间名称"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="roomId"
					label="房间ID"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="roomType"
					label="房间类型"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="maskName"
					label="房主名称"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="userCode"
					label="房主ID"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="sumDiamond"
					label="收益-铃铛"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="sumMoney"
					label="收益-RMB"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
				  fixed="right"
				  header-align="center"
				  align="center"
				  width="100"
				  label="操作">
					<template slot-scope="scope">
					  <el-button native-type="button"  type="text" size="small" @click="weekHandle(scope.row.roomId)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
			  @size-change="sizeChangeHandle2"
			  @current-change="currentChangeHandle2"
			  :current-page="pageIndex2"
			  :page-sizes="[10, 20, 50, 100]"
			  :page-size="pageSize2"
			  :total="totalPage2"
			  layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
		<!--周查看弹窗 -->
			<el-dialog
				title='详情'
				:visible.sync="weekVisble"
				:close-on-click-model="false">
					<el-table :data="dataList5" border v-loading="dataListLoading" style="width: 100%;">
						<el-table-column
							prop="maskName"
							label="被打赏人"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="diamond"
							label="收益-铃铛"
							sortable
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="money"
							label="收益-RMB"
							sortable
							header-align="center"
							align="center">
						</el-table-column>
					</el-table>
					<el-pagination
					  @size-change="sizeChangeHandle5"
					  @current-change="currentChangeHandle5"
					  :current-page="pageIndex5"
					  :page-sizes="[10, 20, 50, 100]"
					  :page-size="pageSize5"
					  :total="totalPage5"
					  layout="total, sizes, prev, pager, next,jumper">
					</el-pagination>
			</el-dialog>
		</template>
<!-- ======================================= -->
<!-- 月 -->
		<template v-if="type === 2">
			<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList3()">
				<el-form-item>
					<el-date-picker
					  v-model="dataForm.startTime2"
					  type="month"
					  value-format="yyyy-MM-dd"
					  placeholder="选择月">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button @click="getDataList3()">查询</el-button>
				</el-form-item>
        <el-form-item style="float:right;">
          <el-button @click="exportHandle3()" type="success" >导出</el-button>
        </el-form-item>
			</el-form>
			<el-table :data="dataList3" border v-loading="dataListLoading" style="width: 100%;">
				<el-table-column
					prop="roomName"
					label="房间名称"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="roomId"
					label="房间ID"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="roomType"
					label="房间类型"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="maskName"
					label="房主名称"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="userCode"
					label="房主ID"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="sumDiamond"
					label="收益-铃铛"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="sumMoney"
					label="收益-RMB"
					sortable
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
				  fixed="right"
				  header-align="center"
				  align="center"
				  width="100"
				  label="操作">
					<template slot-scope="scope">
					  <el-button native-type="button"  type="text" size="small" @click="monthHandle(scope.row.roomId)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
			  @size-change="sizeChangeHandle3"
			  @current-change="currentChangeHandle3"
			  :current-page="pageIndex3"
			  :page-sizes="[10, 20, 50, 100]"
			  :page-size="pageSize3"
			  :total="totalPage3"
			  layout="total, sizes, prev, pager, next,jumper">
			</el-pagination>
		<!--月查看弹窗 -->
			<el-dialog
				title='详情'
				:visible.sync="monthVisble"
				:close-on-click-model="false">
					<el-table :data="dataList6" border v-loading="dataListLoading" style="width: 100%;">
						<el-table-column
							prop="maskName"
							label="被打赏人"
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="diamond"
							label="收益-铃铛"
							sortable
							header-align="center"
							align="center">
						</el-table-column>
						<el-table-column
							prop="money"
							label="收益-RMB"
							sortable
							header-align="center"
							align="center">
						</el-table-column>
					</el-table>
					<el-pagination
					  @size-change="sizeChangeHandle6"
					  @current-change="currentChangeHandle6"
					  :current-page="pageIndex6"
					  :page-sizes="[10, 20, 50, 100]"
					  :page-size="pageSize6"
					  :total="totalPage6"
					  layout="total, sizes, prev, pager, next,jumper">
					</el-pagination>
			</el-dialog>
		</template>
		</div>
	</div>

</template>

<script>
export default{
	inject:['reload'],
	data(){
		return{
			gsingleVisible:false,
			type:0,
			dataList1:[],  //日列表
			dataList2:[
				{
					roomId:'1211'
				}
			],  //周列表
			dataList3:[
				{
					roomId:'1211'
				}
			],  //月列表
			dataList4:[],//日查看
			dataList5:[],//周查看
			dataList6:[],//月查看
			pageIndex1: 1,
			pageSize1: 10,
			totalPage1: 0,
			pageIndex2: 1,
			pageSize2: 10,
			totalPage2: 0,
			pageIndex3: 1,
			pageSize3: 10,
			totalPage3: 0,
			pageIndex4: 1,
			pageSize4: 10,
			totalPage4:0,
			pageIndex5: 1,
			pageSize5: 10,
			totalPage5: 0,
			pageIndex6: 1,
			pageSize6: 10,
			totalPage6: 0,
			dataListLoading: false,
			dataForm:{
				value0:'',
				value1:'',
				value2:'',
				startTime0:'',
				startTime1:'',
				startTime2:'',
				endTime:'',
				roomId:'121'
			},
			dayVisble:false,
			weekVisble:false,
			monthVisble:false,

		}
	},
    activated () {
      this.getDataList1()
    },
	methods: {
		//日
      getDataList1(){
		this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/maskcharmrecord/flowBill'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex1,
            'pageSize': this.pageSize1,
            'type':this.type,
            'startTime':this.dataForm.startTime0,
            'endTime':this.dataForm.endTime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList1 = data.data.list
            this.totalPage1 = data.data.total
          } else {
            this.dataList1 = []
            this.totalPage1 = 0
          }
          this.dataListLoading = false
        })
		  // console.log(this.type)
		  // console.log(this.dataForm.startTime0)
      },
	  //日查看
	  dayHandle(roomId){
		// console.log('日查看')
		//   console.log(this.type)
		//   console.log(this.dataForm.startTime0)
		this.dayVisble= true
		this.$nextTick(() => {
			this.$http({
			  url: this.$http.adornUrl('/sys/maskcharmrecord/flowBillDetails'),
			  method: 'get',
			  params: this.$http.adornParams({
				// 'pageNo':1,
				// 'pageSize': 50,
				'pageNo': this.pageIndex4,
				'pageSize': this.pageSize4,	
				'type':this.type,
				'startTime':this.dataForm.startTime0,
				'endTime':this.dataForm.endTime,
				'roomId':roomId,
			  })
			}).then(({data}) => {
			  if (data && data.code === 0) {
				this.dataList4 = data.data.list
				this.totalPage4 = data.data.total
			  } else {
				this.dataList4 = []
				this.totalPage4 = 0
			  }
			  this.dataListLoading = false
			})
		})
	  },
      //日导出
      exportHandle1(){
          this.$http({
              url: this.$http.adornUrl('/sys/excel/flowBillExcel'),
              method: 'get',
              responseType:'blob',
              params: this.$http.adornParams({
                  'type':this.type,
                  'startTime':this.dataForm.startTime0,
                  'endTime':this.dataForm.endTime
              }),

          }).then(({data}) => {
              // console.log(data)
              let blob = new Blob([data],{type: 'application/vnd.ms-excel'});
              if (window.navigator.msSaveOrOpenBlob) {
                  // 如果需要改名字，前台可以自动生成
                  navigator.msSaveBlob(blob,"流水账单(日)");
              } else {
                  let link = document.createElement("a");
                  let evt = document.createEvent("HTMLEvents");
                  evt.initEvent("click", false, false);
                  link.href = URL.createObjectURL(blob);
                  link.download = "流水账单(日)";
                  link.style.display = "none";
                  document.body.appendChild(link);
                  link.click();
                  window.URL.revokeObjectURL(link.href);
              }
              this.dataListLoading = false
          })
      },
// =======================
		//周
      getDataList2(){
		  // console.log('周')
		this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/maskcharmrecord/flowBill'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex2,
            'pageSize': this.pageSize2,
			'type':this.type,
			'startTime':this.dataForm.startTime1,
			'endTime':this.dataForm.endTime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList2 = data.data.list
            this.totalPage2 = data.data.total
          } else {
            this.dataList2 = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })

      },
      getDataList22(){
		var startTime=this.dataForm.startTime1
		var arr = startTime.split("-");
		var newdt = new Date(Number(arr[0]),Number(arr[1])-1,Number(arr[2])+7);
		var endTime = newdt.getFullYear() + "-" +   (newdt.getMonth()+1) + "-" + newdt.getDate();
		// console.log(startTime)
		this.dataForm.startTime1=startTime
		this.dataForm.endTime=endTime
		// console.log(this.dataForm.endTime)
		   // this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/maskcharmrecord/flowBill'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex2,
            'pageSize': this.pageSize2,
			'type':this.type,
			'startTime':this.dataForm.startTime1,
			'endTime':this.dataForm.endTime,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList2 = data.data.list
            this.totalPage2 = data.data.total
          } else {
            this.dataList2 = []
            this.totalPage2 = 0
          }
          this.dataListLoading = false
        })

      },
	  //周查看
	  weekHandle(roomId){
		// console.log('周查看')
		//   console.log(this.type)
		//   console.log(this.dataForm.startTime1)
		//   console.log(this.dataForm.endTime)
		this.weekVisble= true
		this.$nextTick(() => {
			this.$http({
			  url: this.$http.adornUrl('/sys/maskcharmrecord/flowBillDetails'),
			  method: 'get',
			  params: this.$http.adornParams({
				'pageNo': this.pageIndex5,
				'pageSize': this.pageSize5,
				'type':this.type,
				'startTime':this.dataForm.startTime1,
				'endTime':this.dataForm.endTime,
				'roomId':roomId,
			  })
			}).then(({data}) => {
			  if (data && data.code === 0) {
				this.dataList5 = data.data.list
				this.totalPage5 = data.data.total
			  } else {
				this.dataList5 = []
				this.totalPage5 = 0
			  }
			  this.dataListLoading = false
			})
		})
	  },

      //周导出
      exportHandle2(){
          this.$http({
              url: this.$http.adornUrl('/sys/excel/flowBillExcel'),
              method: 'get',
              responseType:'blob',
              params: this.$http.adornParams({
                  'type':this.type,
                  'startTime':this.dataForm.startTime1,
                  'endTime':this.dataForm.endTime
              }),

          }).then(({data}) => {
              // console.log(data)
              let blob = new Blob([data],{type: 'application/vnd.ms-excel'});
              if (window.navigator.msSaveOrOpenBlob) {
                  // 如果需要改名字，前台可以自动生成
                  navigator.msSaveBlob(blob,"流水账单(周)");
              } else {
                  let link = document.createElement("a");
                  let evt = document.createEvent("HTMLEvents");
                  evt.initEvent("click", false, false);
                  link.href = URL.createObjectURL(blob);
                  link.download = "流水账单(周)";
                  link.style.display = "none";
                  document.body.appendChild(link);
                  link.click();
                  window.URL.revokeObjectURL(link.href);
              }
              this.dataListLoading = false
          })
      },
// =======================
	//月
	 getDataList3(){
		  // console.log(this.type)
		   this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/maskcharmrecord/flowBill'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex3,
            'pageSize': this.pageSize3,
			'type':this.type,
			'startTime':this.dataForm.startTime2,
			'endTime':this.dataForm.endTime
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList3 = data.data.list
            this.totalPage3 = data.data.total
          } else {
            this.dataList3 = []
            this.totalPage3 = 0
          }
          this.dataListLoading = false
        })
		  // console.log(this.type)
		  // console.log(this.dataForm.startTime)
	 },
	//月查看
	monthHandle(roomId){
	// console.log('月查看')
	//   console.log(this.type)
		this.monthVisble= true
		this.$nextTick(() => {
			this.$http({
			  url: this.$http.adornUrl('/sys/maskcharmrecord/flowBillDetails'),
			  method: 'get',
			  params: this.$http.adornParams({
				'pageNo': this.pageIndex6,
				'pageSize': this.pageSize6,
				'type':this.type,
				'startTime':this.dataForm.startTime2,
				'endTime':this.dataForm.endTime,
				'roomId':roomId,
			  })
			}).then(({data}) => {
			  if (data && data.code === 0) {
				this.dataList6 = data.data.list
				this.totalPage6 = data.data.total
			  } else {
				this.dataList6 = []
				this.totalPage6 = 0
			  }
			  this.dataListLoading = false
			})
		})
	},
    //月导出
    exportHandle3(){
        this.$http({
            url: this.$http.adornUrl('/sys/excel/flowBillExcel'),
            method: 'get',
            responseType:'blob',
            params: this.$http.adornParams({
                'type':this.type,
                'startTime':this.dataForm.startTime2,
                'endTime':this.dataForm.endTime
            }),

        }).then(({data}) => {
            // console.log(data)
            let blob = new Blob([data],{type: 'application/vnd.ms-excel'});
            if (window.navigator.msSaveOrOpenBlob) {
                // 如果需要改名字，前台可以自动生成
                navigator.msSaveBlob(blob,"流水账单(月)");
            } else {
                let link = document.createElement("a");
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, false);
                link.href = URL.createObjectURL(blob);
                link.download = "流水账单(月)";
                link.style.display = "none";
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(link.href);
            }
            this.dataListLoading = false
        })
    },
//===========================
	 //日
      sizeChangeHandle1(val) {
        this.pageSize1 = val
        this.pageIndex1 = 1
        this.getDataList1()
      },
      // 当前页
      currentChangeHandle1(val) {
        this.pageIndex1 = val
        this.getDataList1()
      },
      sizeChangeHandle4(val) {
        this.pageSize4 = val
        this.pageIndex4 = 1
        this.dayHandle()
      },
      // 当前页
      currentChangeHandle4(val) {
        this.pageIndex4 = val
        this.dayHandle()
      },
	 //===========================
	 //周
      sizeChangeHandle2(val) {
        this.pageSize2 = val
        this.pageIndex2 = 1
        this.getDataList22()
      },
      // 当前页
      currentChangeHandle2(val) {
        this.pageIndex2 = val
        this.getDataList22()
      },
      sizeChangeHandle5(val) {
        this.pageSize5 = val
        this.pageIndex5 = 1
        this.weekHandle()
      },
      // 当前页
      currentChangeHandle5(val) {
        this.pageIndex5 = val
        this.weekHandle()
      },
	 //===========================
	 //月
      sizeChangeHandle3(val) {
        this.pageSize3 = val
        this.pageIndex3 = 1
        this.getDataList3()
      },
      // 当前页
      currentChangeHandle3(val) {
        this.pageIndex3 = val
        this.getDataList3()
      },
	  //月查看
      sizeChangeHandle6(val) {
        this.pageSize6 = val
        this.pageIndex6 = 1
        this.monthHandle()
      },
      // 当前页
      currentChangeHandle6(val) {
        this.pageIndex6 = val
        this.monthHandle()
      },
	},
}
</script>

<style>
</style>
