<!-- 抽奖奖品列表 -->
<template>
	<div class="prizelist">
		<div>
			<el-radio-group v-model="type" style="margin-bottom:20px;" @change="getDataList1()">
				<el-radio-button :label="1">幸运</el-radio-button>
			</el-radio-group>
			<el-radio-group v-model="type" style="margin-bottom:20px;" @change="getDataList2()">
				  <el-radio-button :label="2">豪华</el-radio-button>
			</el-radio-group>
			<el-radio-group v-model="type" style="margin-bottom:20px;" @change="getDataList3()">
				  <el-radio-button :label="3">人品爆发</el-radio-button>
			</el-radio-group>
		</div>
		<template v-if="type===1">
			<el-table :data="dataList1" v-loading="dataListLoading" border style="width:100%;">
				<el-table-column
				prop="prizeName"
				label="奖项名称"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品名称"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
			 	prop=""
				label="奖品个数"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品价值"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品动效"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				  label="操作"
				  fixed="right"
				  header-align="center"
				  align="center"
				  width="120">
				  <template slot-scope="scope">
					<el-button type="text" size="small"  @click="oneEditHandle()">编辑</el-button>
					<el-button  type="text" size="small" @click="oneDelHandle()">删除</el-button>
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
			<!-- 编辑弹窗 -->
			<el-dialog
				title='编辑'
				:visible.sync="oneEditVisible">
				<el-table :data="dataList4" border style="width:100%;"></el-table>
			</el-dialog>
			<!-- 删除弹窗 -->
			<el-dialog
				title='删除'
				:visible.sync="oneDelVisible">
			</el-dialog>
		</template>
		<template v-if="type===2">
			<el-table :data="dataList2" v-loading="dataListLoading" border style="width:100%;">
				<el-table-column
				prop="dd"
				label="奖项名称"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品名称"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品个数"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品价值"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品动效"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				  label="操作"
				  fixed="right"
				  header-align="center"
				  align="center"
				  width="120">
				  <template slot-scope="scope">
					<el-button type="text" size="small"  @click="twoEditHandle()">编辑</el-button>
					<el-button  type="text" size="small" @click="twoDelHandle()">删除</el-button>
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
			<!-- 编辑弹窗 -->
			<el-dialog
				title='编辑'
				:visible.sync="twoEditVisible">
			</el-dialog>
			<!-- 删除弹窗 -->
			<el-dialog
				title='删除'
				:visible.sync="twoDelVisible">
			</el-dialog>
		</template>
		<template v-if="type===3">
			<el-table :data="dataList3" v-loading="dataListLoading" border style="width:100%;">
				<el-table-column
				prop="dd"
				label="奖项名称"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品名称"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品个数"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品价值"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				prop=""
				label="奖品动效"
				header-align="center"
				align="center">
				</el-table-column>
				<el-table-column
				  label="操作"
				  fixed="right"
				  header-align="center"
				  align="center"
				  width="120">
				  <template slot-scope="scope">
					<el-button type="text" size="small"  @click="threeEditHandle()">编辑</el-button>
					<el-button  type="text" size="small" @click="threeDelHandle()">删除</el-button>
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
			<!-- 编辑弹窗 -->
			<el-dialog
				title='编辑'
				:visible.sync="threeEditVisible">
			</el-dialog>
			<!-- 删除弹窗 -->
			<el-dialog
				title='删除'
				:visible.sync="threeDelVisible">
			</el-dialog>
		</template>
	</div>
</template>

<script>
export default{
	inject:['reload'],
	data(){
		return{
			oneEditVisible:false,//黄金蛋编辑
		    oneDelVisible:false,//黄金蛋删除
			twoEditVisible:false,//钻石蛋编辑
			twoDelVisible:false,//钻石蛋删除
			threeEditVisible:false, //人品编辑
			threeDelVisible:false, //人品删除
			type:1,
			dataList1:[
				{
					dd:'1122'
				}
			],  //黄金蛋列表
			dataList2:[
				{
					dd:'3344'
				}
			],  //钻石蛋列表
			dataList3:[
				{
					dd:'5566'
				}
			],  //人品爆发列表
			dataList4:[],//黄金蛋编辑操作列表
			pageIndex: 1,
			pageSize: 10,
			totalPage:0,
			dataListLoading: false,
		}
	},
	activated (){
		this.getDataList1()
	},
	methods:{
		getDataList1(){
			this.dataListLoading=true
			this.$http({
			  url: this.$http.adornUrl('/sys/maskprizedraw/queryPrizeList'),
			  method: 'get',
			  params: this.$http.adornParams({
				'pageNo': this.pageIndex,
				'pageSize': this.pageSize,          
				'prizeType':0
			  })
			}).then(({data}) => {
			  if (data && data.code === 0) {
				this.dataList1= data.data
				// this.totalPage = data.data.total
			  } else {
				// this.dataList = []
				// this.totalPage = 0
			  }
			  this.dataListLoading = false
			})
		},
		getDataList2(){
			
		},
		getDataList3(){
			
		},
		//黄金蛋编辑
		oneEditHandle(){
			// console.log('黄金蛋编辑')
			this.oneEditVisible=true
		},
		//黄金蛋删除
		oneDelHandle(){
			// console.log('黄金蛋删除')
			this.oneDelVisible=true
		},
		//钻石蛋编辑
		twoEditHandle(){
			// console.log('钻石蛋编辑')
			this.twoEditVisible=true
		},
		//钻石蛋删除
		twoDelHandle(){
			// console.log('钻石蛋删除')
			this.twoDelVisible=true
		},
		//人品编辑
		threeEditHandle(){
			console.log('人品编辑')
			this.threeEditVisible=true
		},
		//人品删除
		threeDelHandle(){
			// console.log('人品删除')
			this.threeDelVisible=true
		},
		// 每页数
		sizeChangeHandle (val) {
			this.pageSize = val
			this.pageIndex = 1
			this.getDataList1()
			this.getDataList2()
			this.getDataList3()
		},
		// 当前页
		currentChangeHandle (val) {
			this.pageIndex = val
			this.getDataList1()
			this.getDataList2()
			this.getDataList3()
		},
		
	}
}
</script>

<style>
</style>
