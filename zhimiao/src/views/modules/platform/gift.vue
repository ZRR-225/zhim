<template>
  <div class="room-gift">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input type="text" placeholder="礼物Id" v-model="dataForm.id" clearable></el-input>
      </el-form-item>
      <el-form-item>
         <el-button  @click="getDataList()">查询</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
         <el-button type="primary"  @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width:100%;">
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
        prop="giftType"
        label="礼物类型"
        header-align="center"
        align="center">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.giftType===0" size="small"  type="warning" >猫粮</el-tag>
				<el-tag v-else size="small" type="success">铃铛</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="礼物ID"
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
        prop="giftImg"
        label="礼物图片"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="giftShowImg"
        label="礼物展示图片"
        header-align="center"
        align="center">
      </el-table-column>
	  <el-table-column
	    prop="giftDarkImg"
	    label="礼物暗色图片"
	    header-align="center"
	    align="center">
	  </el-table-column>
      <el-table-column
        prop="giftRmbValue"
        label="人民币价值"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="empiricalValue"
        label="经验值"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="charmValue"
        label="萌力值"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="giftCoinValue"
        label="金币价值"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="giftDiamondValue"
        label="铃铛"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="isAnimation"
        label="动画"
        header-align="center"
        align="center">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.isAnimation===0" size="small"  type="warning" >非动画</el-tag>
				<el-tag v-else size="small" type="success">动画</el-tag>
			</template>
      </el-table-column>
      <el-table-column
        prop="isEvenBrush"
        label="连刷"
        header-align="center"
        align="center">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.isEvenBrush===0" size="small">非连刷</el-tag>
				<el-tag v-else size="small" type="danger">连刷</el-tag>
			</template>
      </el-table-column>
     <el-table-column
        prop="isShow"
        label="是否展示"
        header-align="center"
        align="center">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.isShow===0" size="small"  type="warning" >否</el-tag>
				<el-tag v-if="scope.row.isShow===1" size="small"  >是</el-tag>
			</template>
      </el-table-column>
    <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="100"
        label="操作">
        <template slot-scope="scope">   
		<!-- v-if="isAuth('sys:gift:updategift')"  -->
          <el-button  type="text" size="small" @click="addNewHandle(scope.row.id)">修改</el-button>
		  <el-button  type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
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
		  layout="total, sizes, prev, pager, next">
    </el-pagination>
<!-- 弹窗, 新增 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	<!-- 弹窗, 修改-->
	<add-new v-if="addNewVisible" ref="addNew" @refreshDataList="getDataList"></add-new>
  </div>
</template>

<script>
  import AddOrUpdate from './gift-add-or-update'
  import AddNew from './gift-add-new'
  export default{
    data(){
      return{
        dataForm:{
          id:''
        },
        dataList:[],
        pageIndex:1,
        pageSize:10,
        totalPage:0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
		addNewVisible:false,
      }
    },
    components: {
      AddOrUpdate,
	  AddNew,
    },
    activated () {
      this.getDataList()
    },
    methods:{
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/gift/allgift'),
          method: 'get',
          params: this.$http.adornParams({
			'pageNo': this.pageIndex,
			'pageSize': this.pageSize, 
			'id':this.dataForm.id
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 
      addOrUpdateHandle () {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
      },
	  // 修改
	  addNewHandle(id){
        this.addNewVisible = true
        this.$nextTick(() => {
          this.$refs.addNew.init(id)
        })
	  },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/gift/deletegift'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },
    }
  }
</script>

<style>
</style>
