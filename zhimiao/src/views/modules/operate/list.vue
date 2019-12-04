<!-- 主播列表 -->
<template>
	<div>
		<el-form :inline="true" >
			<el-form-item>
				<el-input type="text" placeholder="平台名称" v-model="dataForm.platform" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button>搜索</el-button>
				<el-button type="primary">新增</el-button>
				<el-button type="danger">批量删除</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border v-loading="dataListLoading" @section-change="selectionChangeHandle" style="width:100%;">
			<el-table-column
			  type="selection"
			  header-align="center"
			  align="center">
			</el-table-column>
			<el-table-column
			  type="index"
			  label="序号"
			  header-align="center"
			  align="center"
         width="50">
			</el-table-column>
			<el-table-column
			  prop="platform"
			  label="平台"
			  header-align="center"
			  align="center"
        width="80">
			</el-table-column>
			<el-table-column
			  prop="date"
			  label="日期"
			  header-align="center"
			  align="center"
        width="110">
			</el-table-column>
			<el-table-column
			  prop="newUsers"
			  label="新增用户"
			  header-align="center"
			  align="center"
         width="90">
			</el-table-column>
			<el-table-column
			  prop="activeUsers"
			  label="活跃用户"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="startups"
			  label="启动次数"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="cumulative"
			  label="累计用户"
			  header-align="center"
			  align="center"
        width="180">
			</el-table-column>
			<el-table-column
			  prop="payment"
			  label="付费用户"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="totalpayment"
			  label="付费总额"
			  header-align="center"
			  align="center" >
			</el-table-column>
			<el-table-column
			  prop="perCapita"
			  label="人均付费"
			  header-align="center"
			  align="center" >
			</el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        header-align="center"
        align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" >编辑</el-button>
          </template>
      </el-table-column>
		</el-table>
		<el-pagination
		  :current-page="pageIndex"
		  :page-sizes="[10, 20, 50, 100]"
		  :page-size="pageSize"
		  :total="totalPage"
		  layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
		<div class="cont">
			<liste v-if="yiban" ref="yiban"></liste>
			<file v-if="wdj" ref="wdj"></file>
		</div>

	</div>
</template>

<script>
	import liste from './liste' 
	import file from './file' 
	export default{
		inject:['reload'],
		data(){
			return{
				dataForm:{
					platform:'',
					test:'0'
				},
				dataList:[{
            platform:'IOS',
            date:'2019-07-23',
            newUsers:'1200',
            activeUsers:'1000',
            startups:'1200',
            cumulative:'1234',
            payment:'1200',
            totalpayment:'12000',
            perCapita:'1200'
					},
				],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				dataListSelections: [],
				yiban: false,
				wdj: false,
			}
		},
		components:{
			liste,
			file,
		},
		activated () {
		  this.init()
		},
		methods:{
			init(){
				// var test=this.dataForm.test
				// if(test=='1234'){
				// 	console.log('test')
				// 	this.reload();
				// 	this.$router.push({ path: '/recharge-large', name: 'recharge-large', meta: { title: '大额充值' } },)
					
				// }
				
			},
		  // 多选
		  selectionChangeHandle (val) {
			this.dataListSelections = val
		  },
		},
		mounted() {
			var test=this.dataForm.test
			if (test>=1000) {
				console.log('大于')
				this.yiban = true
			} else{
				console.log('小于')
				this.wdj = true
			}
		}
	}
</script>

<style>
	.cont{
		display: flex;
		justify-content: space-around;
		margin-top:30px;
	}
</style>