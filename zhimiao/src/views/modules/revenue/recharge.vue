<!-- 充值记录 -->
<template>
  <div class="recharge">
	  <el-form :inline="true" :model="dataForm">
		  <el-form-item>
			  <el-input v-model="dataForm.mobile" placeholder="手机号码" clearable></el-input>
		  </el-form-item>
		  <el-form-item>
			  <el-button @click="getDataList()">查询</el-button>
		  </el-form-item>
		  <el-form-item style="float:right;">
			  <el-button @click="exportHandle()" type="success">导出</el-button>
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
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="充值记录ID"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="username"
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
        prop="payMoney"
        label="支付金额"
        header-align="center"
        align="center">
      </el-table-column>
     <el-table-column
        prop="payMode"
        label="支付方式"
        header-align="center"
        align="center"
		:filters="[{ text: '微信', value:0 }, { text: '支付宝', value:1},{ text: '苹果', value:2},{ text: '后台大额', value:3}]"
		:filter-method="filterTag">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.payMode===0" size="small" type="success">微信</el-tag>
				<el-tag v-if="scope.row.payMode===1" size="small" type="danger">支付宝</el-tag>
				<el-tag v-if="scope.row.payMode===2" size="small">苹果</el-tag>
				<el-tag v-if="scope.row.payMode===3" size="small" type="warning">后台大额</el-tag>
			</template>
      </el-table-column>
     <el-table-column
        prop="source"
        label="支付方式详情"
        header-align="center"
        align="center"
		:filters="[{ text: 'ios', value:0 }, { text: '安卓', value:1},{ text: 'H5', value:2},{ text: '公众号', value:3},{ text: '后台大额', value:5}]"
		:filter-method="filterTag2">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.source===0" size="small" type="success">ios</el-tag>
				<el-tag v-if="scope.row.source===1" size="small" type="danger">安卓</el-tag>
				<el-tag v-if="scope.row.source===2" size="small"  type="info">H5</el-tag>
				<el-tag v-if="scope.row.source===3" size="small" type="warning">公众号</el-tag>
				<el-tag v-if="scope.row.source===5" size="small">后台大额</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="diamondNumber"
        label="购买铃铛数"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="payNo"
        label="充值记录订单号"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="payStatus"
        label="充值记录状态"
        header-align="center"
        align="center"
		:filters="[{ text: '未支付', value:0 }, { text: '支付成功', value:1}]"
		:filter-method="filterTag1">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.payStatus===0" size="small"  type="warning" >未支付</el-tag>
				<el-tag v-if="scope.row.payStatus===1" size="small" type="success">支付成功</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="createTime"
		label="创建时间"
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
  export default{
    data(){
      return{
		visible: false,
        dataForm:{
          mobile:'',
		  userCode:'',
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
    components: {
    },
    activated () {
      this.getDataList()
    },
    methods:{
		getDataList(){
			this.dataListLoading=true
			this.$http({
			  url: this.$http.adornUrl('/sys/recharge/queryrecharge'),
			  method: 'get',
			  params: this.$http.adornParams({
				'pageNo': this.pageIndex,
				'pageSize': this.pageSize,     
				'mobile':this.dataForm.mobile
			  })
			}).then(({data}) => {
			  if (data && data.code === 0) {
				this.dataList = data.data.list
				this.totalPage = data.data.total
			  } else {
				this.dataList = []
				// this.totalPage = 0
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
      // 多选
      selectionChangeHandle (inex) {
        this.dataListSelections = val
      },
	  filterTag(value, row) {
		return row.payMode === value;
	  },
	  filterTag1(value, row) {
		return row.payStatus === value;
	  },
	  filterTag2(value, row) {
		return row.source === value;
	  },
      // 新增 / 修改
      addOrUpdateHandle (userId) {
        // this.addOrUpdateVisible = true
        // this.$nextTick(() => {
        //   this.$refs.addOrUpdate.init(userId)
        // })
      },
		// 导出数据
		exportHandle(){
			this.$http({
			  url: this.$http.adornUrl('/sys/excel/payRecordExcel'),
			  method: 'get',
			  responseType:'blob',
			  params: this.$http.adornParams({   
				'mobile':this.dataForm.mobile,
				'userCode':this.dataForm.userCode,
				// 'maskName':this.dataForm.maskName,
				// 'createTime':this.dataForm.createTime,
			  }),
			 
			}).then(({data}) => {
				// console.log(data)
				let blob = new Blob([data],{type: 'application/vnd.ms-excel'});
          if (window.navigator.msSaveOrOpenBlob) {
							// 如果需要改名字，前台可以自动生成
              navigator.msSaveBlob(blob,"充值记录");
          } else {
              let link = document.createElement("a");
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("click", false, false);
              link.href = URL.createObjectURL(blob); 
              link.download = "充值记录";
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
