<!-- 消费记录 -->
<template>
  <div class="record">
	<el-form :inline="true" :model="dataForm">
	  <el-form-item>
		  <el-input v-model="dataForm.fromUserCode" placeholder="用户ID" clearable></el-input>
	  </el-form-item>
	  <el-form-item>
		  <el-date-picker type="date" v-model="dataForm.createTime" placeholder="创建时间" value-format="yyyy-MM-dd" clearable></el-date-picker>
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
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="giftType"
        label="礼物类型"
        header-align="center"
        align="center"
		:filters="[{ text: '猫粮', value:0 }, { text: '铃铛', value:1}]"
		:filter-method="filterTag">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.giftType===0" size="small"  type="danger" >猫粮</el-tag>
				<el-tag v-if="scope.row.giftType===1" size="small" type="success">铃铛</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="fromUserCode"
        label="消费用户ID"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fromUserName"
        label="消费用户昵称"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="toUserCode"
        label="目标用户ID"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="toUserName"
        label="目标用户昵称"
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
        prop="giftName"
        label="礼物名称"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="giftValue"
        label="礼物单价"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="giftNumber"
        label="礼物数量"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="giftValueSum"
        label="礼物总价"
        header-align="center"
        align="center">
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
          fromUserCode:'',
		  createTime:''
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
			  url: this.$http.adornUrl('/sys/recordsgift/querygiftrecords'),
			  method: 'get',
			  params: this.$http.adornParams({
				'pageNo': this.pageIndex,
				'pageSize': this.pageSize,
				'fromUserCode':this.dataForm.fromUserCode,
				'createTime':this.dataForm.createTime,
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
		return row.giftType === value;
	  },
      // 新增 / 修改
      addOrUpdateHandle () {
        // this.addOrUpdateVisible = true
        // this.$nextTick(() => {
        //   this.$refs.addOrUpdate.init()
        // })
      },
		// 导出数据
		exportHandle(){
		this.dataListLoading=true
        this.$http({
            url: this.$http.adornUrl('/sys/excel/RecordsGiftExcel'),
            method: 'get',
            responseType:'blob',
            params: this.$http.adornParams({
                'fromUserCode':this.dataForm.fromUserCode,
                'createTime':this.dataForm.createTime,
            }),

        }).then(({data}) => {
            // console.log(data)
            let blob = new Blob([data],{type: 'application/vnd.ms-excel'});
            if (window.navigator.msSaveOrOpenBlob) {
                // 如果需要改名字，前台可以自动生成
                navigator.msSaveBlob(blob,"消费记录");
            } else {
                let link = document.createElement("a");
                let evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, false);
                link.href = URL.createObjectURL(blob);
                link.download = "消费记录";
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

