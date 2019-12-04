<!-- 邀请  查看详情-->
<template>
    <el-dialog
      title="查看详情"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-table
        :data="dataList1"
        border
        v-loading="dataListLoading"
        >
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
          prop="fromUserCode"
          label="被邀请者用户ID"
          header-align="center"
          align="center"
		   width="120">
        </el-table-column>
        <el-table-column
          prop="fromUserName"
          label="被邀请者昵称"
          header-align="center"
          align="center">
        </el-table-column>
        <el-table-column
          prop="bonusNumber"
          label="用户总奖金"
          header-align="center"
          align="center">
        </el-table-column>
<!--        <el-table-column
          prop="creteTime"
          label="邀请时间"
          header-align="center"
          align="center">
        </el-table-column> -->
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
    </el-dialog>
</template>

<script>
  export default{
    data(){
      return{
        visible:false,
		pageIndex: 1,
		pageSize: 10,
		totalPage:0,
	    dataList1:[],
		dataListLoading: false,
		num:'',
      }
    },
    methods:{	
		  init(toUserCode){
			// console.log(toUserCode)
			this.visible = true
			var num=toUserCode
			// console.log(num)
			this.num=num
			this.$nextTick(() => {
				this.$http({
				url: this.$http.adornUrl(`/sys/invitationbonus/querybonusdetails`),
				method: 'get',
				params: this.$http.adornParams({
					'pageNo': this.pageIndex,
					'pageSize': this.pageSize,            
					'toUserCode':toUserCode
				})
			}).then(({data}) => {
				if (data && data.code === 0) {
                      this.dataList1=data.data.list
                      console.log(data.data.list)
                      this.totalPage = data.data.total
				  }
				})
			})
		  },
		 // 每页数
		  sizeChangeHandle (val) {
		      this.pageSize = val
		      this.pageIndex = 1
		      this.init(this.num)
		  },
		  // 当前页
		  currentChangeHandle (val) {
		      this.pageIndex = val
		      this.init(this.num)
		  },
      }
    }
</script>

<style>
</style>
