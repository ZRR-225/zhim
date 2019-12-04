<!-- 邀请列表 -->
<template>
  <div class="invitation">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.toUserCode" placeholder="邀请者用户ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.toUserName" placeholder="邀请者昵称"></el-input>
      </el-form-item>
<!--      <el-form-item>-->
<!--        <el-date-picker-->
<!--          v-model="dataForm.startTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-date-picker-->
<!--          v-model="dataForm.endTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择日期">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button @click="getDataList()" type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width:100%;">
      <el-table-column
        prop="toUserCode"
        label="邀请者用户ID"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="toUserName"
        label="邀请者昵称"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="invitationCode"
        label="邀请码"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="bonusNumber"
        label="用户总奖金"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="notBonusNumber"
        label="用户未提奖金"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="offlineCount"
        label="下线数量"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-button  type="text" size="small" @click="addOrUpdateHandle(scope.row.toUserCode)">查看详情</el-button>
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
	    <!-- 弹窗, 详情 -->
	<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>

</template>

<script>
	 import AddOrUpdate from './invitation-add-or-update'
  export default {
      data(){
          return {
              dataForm: {
                  userCode: '',
                  maskName: '',
                  startTime: '',
                  endTime: '',
              },
              dataList:[],
              dataList1:[],
              detailVisible:false,
			  addOrUpdateVisible:false,
              dataListLoading: false,
              pageIndex: 1,
              pageSize: 10,
              totalPage: 0,
          }
      },
    components: {
      AddOrUpdate,
    },
      activated(){
          this.getDataList()
      },
      methods:{
          getDataList(){
              this.$http({
                  url: this.$http.adornUrl('/sys/invitationbonus/querybonus'),
                  method: 'get',
                  params: this.$http.adornParams({
                      'pageNo': this.pageIndex,
                      'pageSize': this.pageSize,
                      'toUserCode':this.dataForm.toUserCode,
                      'toUserName':this.dataForm.toUserName,

                  })
              }).then(({data}) => {
                  if (data && data.code === 0) {
                      this.dataList=data.data.list
                      // console.log(data.data)
                      this.totalPage = data.data.total
                  } else {

                  }
                  this.dataListLoading = false
              })
          },
      //编辑 (表单操作)
      addOrUpdateHandle (toUserCode) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(toUserCode)
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
      }
  }
</script>

<style>

</style>


