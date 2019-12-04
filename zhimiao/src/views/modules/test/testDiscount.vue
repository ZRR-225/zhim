<!-- 提现(测试) testDiscount -->
<template>
  <div class="testDiscount">
	  <el-form :inline="true" :model="dataForm">
		  <el-form-item>
			  <el-input v-model="dataForm.userCode" placeholder="用户ID" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			  <el-input v-model="dataForm.maskName" placeholder="用户昵称" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			  <el-input v-model="dataForm.mobile" placeholder="手机号码" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			  <el-date-picker type="date" v-model="dataForm.createTime" placeholder="提交时间"  value-format="yyyy-MM-dd" clearable></el-date-picker>
		  </el-form-item>
		  <el-form-item>
			  <el-button @click="getDataList()">查询</el-button>
		  </el-form-item>
		  <el-form-item style="float:right;">
			  <el-button @click="exportHandle()" type="success" >导出</el-button>
		  </el-form-item>
	  </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="userCode"
        label="用户ID"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="maskName"
        label="用户昵称"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="drawcashValue"
        label="提现金额（元）"
		sortable
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="提交时间"
		sortable
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        header-align="center"
        align="center"
		:filters="[{ text: '申请中', value:2 }, { text: '拒绝结算', value:0},{ text: '同意结算', value:1},]"
		:filter-method="filterTag">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.status===2" size="small" >申请中</el-tag>
				<el-tag v-if="scope.row.status===0" size="small"  type="warning" >拒绝结算</el-tag>
				<el-tag v-if="scope.row.status===1" size="small" type="success">同意结算</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="drawcashCharm"
        label="扣除萌力值"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="disposeTime"
        label="处理时间"
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
		  layout="total, sizes, prev, pager, next">
		</el-pagination>
<!--    弹窗, 新增 / 修改
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update> -->
		<!-- 导出数据的弹窗 -->
	<el-dialog
		title="导出数据"
		:close-on-click-model="false"
		:visible.sync="visible">
			<el-form :model="dataExport" ref="dataForm" label-width="80px">
				  <el-form-item label="文件名" prop="fileName">
					<el-input v-model="dataExport.fileName"></el-input>
				  </el-form-item>
				  <el-form-item label="文件类型" prop="fileType">
					  <el-col>{{dataExport.fileType}}</el-col>
				  </el-form-item>
				  <el-form-item label="编码" prop="fileName">
					<el-col>{{dataExport.fileCode}}</el-col>
				  </el-form-item>
				<el-form-item label="导出数据" prop="fileData">
				  <el-select v-model="dataExport.fileData" placeholder="请选择">
					<el-option
					  v-for="item in dataExport.options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			  <el-button @click="visible = false">取消</el-button>
			   <el-button type="primary" @click="dataExportSubmit()">提交</el-button>
			</span>  
	</el-dialog>
  </div>
</template>

<script>
  // import AddOrUpdate from './discount-add-or-update'
  export default{
    data(){
      return{
		visible: false,
        dataForm:{
          userCode:'',
		mobile:'',
		maskName:'',
		createTime:'',
        },
        dataList:[],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        addOrUpdateVisible: false,
		dataExport:{
			fileName:'',
			fileType:'Excel',
			fileCode:'UTF-8',
			fileData:'',
			options:[
				{
					value:1,
					label:'全部'
				},
				{
					value:2,
					label:'查询结果'
				},
				{
					value:3,
					label:'选中结果'
				}
			],
		}
      }
    },
    // components: {
    //   AddOrUpdate,
    // },
    activated () {
      this.getDataList()
    },
    methods:{
      getDataList(){
		this.dataListLoading=true
		this.$http({
			url: this.$http.adornUrl('/sys/ceshi/querydrawcashceshi'),
			method: 'get',
			params: this.$http.adornParams({
				'pageNo': this.pageIndex,
				'pageSize': this.pageSize,     
				'userCode':this.dataForm.userCode,
				'mobile':this.dataForm.mobile,
				'maskName':this.dataForm.maskName,
				'createTime':this.dataForm.createTime,
				
			  })
			}).then(({data}) => {
			  if (data && data.code === 0) {
					this.dataList = data.data.list
					this.totalPage = data.data.total
			  } else {
				this.dataList = []
				this.totalPage = 0
			  }
			  this.dataListLoading = false
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
      // 新增 / 修改
      addOrUpdateHandle (userCode) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(userCode)
        })
      },
	  filterTag(value, row) {
		return row.status === value;
	  },
		// 导出数据
		exportHandle(){
			this.dataListLoading=true
			// // this.visible = true
			// // this.$nextTick(() => {
			// // })
			// console.log('导出')
			this.$http({
			  url: this.$http.adornUrl('/sys/excel/maskDrawcashExcel'),
			  method: 'get',
			  responseType:'blob',
			  params: this.$http.adornParams({
				// 'pageNo': this.pageIndex,
				// 'pageSize': this.pageSize,     
				'mobile':this.dataForm.mobile,
				'userCode':this.dataForm.userCode,
				'maskName':this.dataForm.maskName,
				'createTime':this.dataForm.createTime,
			  }),
			 
			}).then(({data}) => {
				// console.log(data)
				let blob = new Blob([data],{type: 'application/vnd.ms-excel'});
          if (window.navigator.msSaveOrOpenBlob) {
							// 如果需要改名字，前台可以自动生成
              navigator.msSaveBlob(blob,"提现记录");
          } else {
              let link = document.createElement("a");
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("click", false, false);
              link.href = URL.createObjectURL(blob); 
              link.download = "提现记录";
              link.style.display = "none";
              document.body.appendChild(link);
              link.click();
              window.URL.revokeObjectURL(link.href);
          }
			  this.dataListLoading = false
			})

		},
		//导出数据提交
		dataExportSubmit(){
			
		},
    }
  }
</script>

<style>
</style>

