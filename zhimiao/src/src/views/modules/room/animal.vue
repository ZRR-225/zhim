<!-- 斗兽棋 -->
<template>
	<div class="animalChecker">
		<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
			<el-form-item>
				<el-input v-model="dataForm.showId" placeholder="房间ID" clearable></el-input>
			</el-form-item>
			<el-form-item label="游戏状态">
				<el-select v-model="dataForm.animalStatus" clearable placeholder="游戏状态">
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
			<el-form-item style="margin-left: 20px;">
			  <el-button @click="closeHandle()" type="danger" >全部关闭</el-button>
			</el-form-item>
		</el-form>
		<el-table
		  :data="dataList"
		  border
		  v-loading="dataListLoading"
		  style="width:100%;">
		  <el-table-column
			prop="showId"
			label="房间ID"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="roomName"
			label="房间名称"
			header-align="center"
			align="center">
		  </el-table-column>
		  <el-table-column
			prop="roomType"
			label="房间类型"
			header-align="center"
			align="center">
		  </el-table-column>
      <!-- 0/关闭  1/开启-->
		  <el-table-column
			prop="animalStatus"
			label="游戏状态"
			header-align="center"
			align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.animalStatus === 0" size="small" >关闭</el-tag>
          <el-tag v-if="scope.row.animalStatus === 1" size="small" type="success">开启</el-tag>
        </template>
		  </el-table-column>
		 <el-table-column
			label="操作"
			header-align="center"
			align="center">
			<template slot-scope="scope">
			  <el-button type="text" v-show="scope.row.animalStatus===0"  size="small"  @click="Handle1(scope.row.showId)">开启</el-button>
			  <el-button type="text"  v-show="scope.row.animalStatus===1" size="small" @click="Handle2(scope.row.showId)">关闭</el-button>
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
	</div>
</template>

<script>
	export default{
		data(){
			return{
				dataForm:{
					showId:'',
            animalStatus:'',
					options: [{
						value: 1,
						label: '开启'
						},
						{
						value: 0,
						label: '关闭'
						},
						{
						value: '',
						label: '全部'
						}],

				},
				dataList:[],
				dataListLoading:false,
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
			}
		},
		activated () {
		  this.getDataList()
		},
		methods:{
			getDataList(){
          this.dataListLoading=true
          this.$http({
              url: this.$http.adornUrl('/sys/room/animalCardList'),
              method: 'get',
              params: this.$http.adornParams({
                  'pageNo': this.pageIndex,
                  'pageSize': this.pageSize,
                  'roomId':this.dataForm.showId,
                  'animalStatus':this.dataForm.animalStatus
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
			//全部关闭
			closeHandle(){
				// console.log('全部关闭')
        this.$http({
            url:this.$http.adornUrl(`/sys/room/updateAllAnimalStatus`),
            method:'post',
            data:this.$http.adornData({
                'animalStatus':3,
            })
        }).then(({data})=>{
            if (data && data.code === 0){
                this.$message({
                    message: data.msg,
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
			},
      //开启斗兽棋游戏
			Handle1(showId){
				this.$confirm('是否开启该房间的斗兽棋游戏, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(()=>{
				this.$http({
					url:this.$http.adornUrl('/sys/room/updateAnimalStatus'),
					method:'post',
					data:this.$http.adornData({
						'animalStatus':1,
						'roomId':showId,
					})
				}).then(({data})=>{
					if (data && data.code === 0){
					  this.$message({
						message: data.msg,
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
      //  关闭斗兽棋游戏
			Handle2(showId){
				this.$confirm('是否关闭该房间的斗兽棋游戏, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(()=>{
				this.$http({
					url:this.$http.adornUrl('/sys/room/updateAnimalStatus'),
					method:'post',
					data:this.$http.adornData({
						'animalStatus':0,
						'roomId':showId,
					})
				}).then(({data})=>{
					if (data && data.code === 0){
					  this.$message({
						message: data.msg,
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
		}
	}
</script>

<style>
</style>
