<!-- 房间列表 -->
<template>
  <div class="room-list">
    <el-form :inline="true" :model="dataForm"  @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.roomName" placeholder="房间名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.roomId" placeholder="房间ID" clearable></el-input>
      </el-form-item>
		<el-form-item>
			  <el-select v-model="dataForm.isRecommend" placeholder="推荐房间">
				<el-option
				  v-for="item in dataForm.options"
				  :key="item.value"
				  :label="item.label"
				  :value="item.value">
				</el-option>
			  </el-select>
		</el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width:100%;">
      <el-table-column
        type="index"
        label="序号"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roomId"
        label="房间ID"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="roomName"
        label="房间名"
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="maskName"
        label="厅主昵称"
        header-align="center"
        align="center">
      </el-table-column>
<!--      <el-table-column
        prop="roomLevel"
        label="权限等级"
        header-align="center"
        align="center"
	  :filters="[{ text: '普通', value:0 }, { text: '才艺', value:1},{ text: '厅主', value:2}]"
		:filter-method="filterTag1">
      </el-table-column> -->
      <el-table-column
        prop="roomState"
        label="房间状态"
        header-align="center"
        align="center"
	  :filters="[{ text: '开播', value:'开播' }, { text: '下播', value:'下播'},]"
	  :filter-method="filterTag">
<!--          <template slot-scope="scope">
            <el-tag
              :type="scope.row.state === '开播' ? 'success' : 'info'"
              disable-transitions>{{scope.row.state}}
            </el-tag>
          </template> -->
      </el-table-column>
      <el-table-column
        prop="isRecommend"
        label="推荐房间"
        header-align="center"
        align="center"
	  :filters="[{ text: '不推荐', value:0 }, { text:'推荐', value:1},]"
	  :filter-method="filterTag1">
         <template slot-scope="scope">
				  <el-tag v-if="scope.row.isRecommend === 0" size="small" >不推荐</el-tag>
				  <el-tag v-if="scope.row.isRecommend === 1" size="small" type="success">推荐</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="lastLiveTime"
        label="最近开播时间"
        sortable
        header-align="center"
        align="center"
		width="175">
      </el-table-column>
      <el-table-column
        prop="liveTime"
        label="最近直播时长"
        sortable
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="conNumber"
        label="在线人数"
        sortable
        header-align="center"
        align="center">
      </el-table-column>
      <el-table-column
        prop="giftValue"
        label="收到礼物"
		sortable
        header-align="center"
        align="center">
      </el-table-column>
     <el-table-column
        label="更改推荐"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-button native-type="button"  v-if="isAuth('sys:room:recommend')" type="primary" v-show="scope.row.isRecommend===0"  size="small"  @click="Handle1(scope.row.roomId)">推荐</el-button>
		  <el-button native-type="button"  v-if="isAuth('sys:room:recommend')" type="primary" v-show="scope.row.isRecommend===1" size="small" @click="Handle2(scope.row.roomId)">不推荐</el-button>
		</template>
      </el-table-column>
<!--     <el-table-column
        label="更改推荐"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-tag  v-if="isAuth('sys:room:recommend')" native-type="button" type="button" v-show="scope.row.isRecommend===0"  size="small"  @click="Handle1(scope.row.roomId)">{{scope.row.isRecommend}}</el-tag>
		  <el-tag  v-if="isAuth('sys:room:recommend')" native-type="button" type="button" v-show="scope.row.isRecommend===1" size="small" @click="Handle2(scope.row.roomId)">{{scope.row.isRecommend}}</el-tag>
		</template>
      </el-table-column> -->
      <el-table-column
        label="操作"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-button v-if="isAuth('sys:room:update')" type="text" size="small" @click="addOrUpdateHandle(scope.row.roomId)">关闭房间</el-button>
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

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>

  </div>
</template>

<script>
  import AddOrUpdate from './list-add-or-update'
  export default{
    data(){
      return{
		  show:true,
        dataForm:{
          roomName:'',
		  roomId:'',
		  isRecommend:'',
		  options: [{
		    value: 1,
		    label: '推荐'
		  }, {
		    value: 0,
		    label: '不推荐'
		   },
		   {
		     value: '',
		     label: '全部'
		   },
		  ],
        },
        dataList:[],
        dataListLoading:false,
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListSelections: [],
        addOrUpdateVisible:false,
      }
    },
    components: {
      AddOrUpdate,
    },
    activated () {
      this.getDataList()
    },
    methods:{
      getDataList(){
        this.dataListLoading=true
        this.$http({
          url: this.$http.adornUrl('/sys/room/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageNo': this.pageIndex,
            'pageSize': this.pageSize,            
			'roomName': this.dataForm.roomName,
			'roomId':this.dataForm.roomId,
			'isRecommend':this.dataForm.isRecommend
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
	Handle1(roomId){
		// console.log('改变推荐')
		// console.log(roomId)
	    this.$confirm('是否推荐该房间, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(()=>{
		this.$http({
			url:this.$http.adornUrl(`/sys/room/recommend`),
			method:'post',
			data:this.$http.adornData({
				'isRecommend':1,
				'roomId':roomId,
			})
		}).then(({data})=>{
			if (data && data.code === 0){
			  this.$message({
				message: '操作成功',
				type: 'success',
				duration: 1500,
				onClose: () => {
				  this.getDataList()
				}
			  })
			}else {
			  this.$message.error(data.msg)
			}
		})
	  }).catch(()=>{})
	},
	Handle2(roomId){
		// console.log('关闭推荐')
		// console.log(roomId)
	    this.$confirm('是否不推荐该房间, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(()=>{
		this.$http({
			url:this.$http.adornUrl('/sys/room/recommend'),
			method:'post',
			data:this.$http.adornData({
				'isRecommend':0,
				roomId:roomId,
			})
		}).then(({data})=>{
			if (data && data.code === 0){
			  this.$message({
				message: '操作成功',
				type: 'success',
				duration: 1500,
				onClose: () => {
				  this.getDataList()
				}
			  })
			}else {
			  this.$message.error(data.msg)
			}
		})
	  }).catch(()=>{})
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
	  filterTag(value, row) {
		return row.roomState === value;
	  },
	  filterTag1(value, row) {
		return row.isRecommend === value;
	  },
      //编辑 (表单操作)
      addOrUpdateHandle (roomId) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(roomId)
        })
      },
    }
  }
</script>

<style>
</style>
