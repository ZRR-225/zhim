<!-- 指定中大奖 -->
<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
<!--      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item> -->
      <el-form-item>
<!--        <el-button @click="getDataList()">查询</el-button> -->
        <el-button v-if="isAuth('sys:maskprizeperson:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
<!--      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column> -->
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="userCode"
        header-align="center"
        align="center"
        label="用户编号">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
			<template slot-scope="scope">
			  <el-tag v-if="scope.row.status === 0" size="small">未删除</el-tag>
			  <el-tag v-if="scope.row.status === 1" size="small" type="success">删除</el-tag>
			</template>
	  </el-table-column>
      <el-table-column
        prop="startTime"
        header-align="center"
        align="center"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="count"
        header-align="center"
        align="center"
        label="次数">
      </el-table-column>
	  <el-table-column
		prop="prizeId"
		header-align="center"
		align="center"
		label="奖品"
		width="183px">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.prizeId ===7" size="small" value="幸运头等奖:秀出天际(52000)">幸运头等奖:秀出天际(52000)</el-tag>
				<el-tag v-if="scope.row.prizeId ===8" size="small" value="幸运一等奖:糖果传奇(33440)">幸运一等奖:糖果传奇(33440)</el-tag>
				<el-tag v-if="scope.row.prizeId ===9" size="small" value="幸运二等奖:飞驰人生(19999)">幸运二等奖:飞驰人生(19999)</el-tag>
				<el-tag v-if="scope.row.prizeId ===10" size="small" value="幸运三等奖:貂888(10000)">幸运三等奖:貂888(10000)</el-tag>
				<el-tag v-if="scope.row.prizeId ===11" size="small" value="幸运四等奖:草莓奶昔(5210)">幸运四等奖:草莓奶昔(5210)</el-tag>
				<el-tag v-if="scope.row.prizeId ===12" size="small" value="幸运五等奖:拳力出击(3000)">幸运五等奖:拳力出击(3000)</el-tag>
				<el-tag v-if="scope.row.prizeId ===13" size="small" value="幸运六等奖:先干为敬(1880)">幸运六等奖:先干为敬(1880)</el-tag>
				<el-tag v-if="scope.row.prizeId ===14" size="small" value="幸运七等奖:恋爱密码(520)">幸运七等奖:恋爱密码(520)</el-tag>
				<el-tag v-if="scope.row.prizeId ===15" size="small" value="幸运八等奖:比翼双飞(188)">幸运八等奖:比翼双飞(188)</el-tag>
				<el-tag v-if="scope.row.prizeId ===16" size="small" value="幸运九等奖:棒棒糖(52)">幸运九等奖:棒棒糖(52)</el-tag> 
				<el-tag v-if="scope.row.prizeId ===17" size="small" value="幸运十等奖:单身盛宴(11)">幸运十等奖:单身盛宴(11)</el-tag>
				<el-tag v-if="scope.row.prizeId ===18" size="small" value="安慰奖:挑逗一下(1)">安慰奖:挑逗一下(1)</el-tag>			
			</template>
      </el-table-column>
<!-- 	  <el-table-column
        prop="prizeId"
        header-align="center"
        align="center"
        label="奖品ID铃铛">
      </el-table-column> -->
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
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
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	<!-- 弹窗, 新增-->
 	<add-new v-if="addNewVisible" ref="addNew" @refreshDataList="getDataList"></add-new>
 
 
  </div>
</template>

<script>
  import AddOrUpdate from './maskprizeperson-add-or-update'
  import AddNew from './maskprizeperson-add-new'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
		// daaa:[],
        dataList: [],
		dataList1: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
		addNewVisible:false,
      }
    },
    components: {
      AddOrUpdate,
	  AddNew
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/maskprizeperson/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList1 = data.data
			this.dataList = data.page.list
			// this.daaa=this.dataList1.concat(this.dataList)
            this.totalPage = data.page.totalCount
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
	  addNewHandle(){
		this.addNewVisible = true
		this.$nextTick(() => {
			this.$refs.addNew.init()
		})
	  },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
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
            url: this.$http.adornUrl('/sys/maskprizeperson/delete'),
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
        })
      }
    }
  }
</script>
