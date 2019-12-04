
<template>
  <div class="inSetup">
    <el-form style="margin-bottom:20px">
      <el-button @click.prevent="addRow()" type="primary">新增</el-button>
    </el-form>
    <div class="table">
        <el-form :model="tableForm" ref="tableForm">
			<el-table
				class="bankTable" 
				:data="tableForm.bankData" 
				border>
				<el-table-column label="分销级别">
					<template slot-scope="scope">
						<el-form-item :prop="`bankData.${scope.$index}.bonusLevel`"  :rules="tableRules.bonusLevel">
						<el-input v-model="scope.row.bonusLevel"></el-input>
						</el-form-item>
					</template>
				</el-table-column>

				<el-table-column label="上线">
					<template slot-scope="scope">
						<el-form-item :prop="`bankData.${scope.$index}.startLevel`"  :rules="tableRules.startLevel">
							<el-input v-model="scope.row.startLevel"></el-input>
						</el-form-item>
					</template>
				</el-table-column>

				<el-table-column label="下线">
					<template slot-scope="scope">
						<el-form-item :prop="`bankData.${scope.$index}.endLevel`"  :rules="tableRules.endLevel">
						<el-input v-model="scope.row.endLevel"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="分成比例">
					<template slot-scope="scope">
						<el-form-item :prop="`bankData.${scope.$index}.ratio`"  :rules="tableRules.ratio">
						<el-input v-model="scope.row.ratio"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column label="首充奖励">
					<template slot-scope="scope">
						<el-form-item :prop="`bankData.${scope.$index}.firstChargeAmount`"  :rules="tableRules.firstChargeAmount">
						<el-input v-model="scope.row.firstChargeAmount"></el-input>
						</el-form-item>
					</template>
				</el-table-column>
			</el-table>
        </el-form>
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next">
      </el-pagination>
      <el-form style="margin-top:20px">
        <el-button type="danger" @click.prevent="submit()">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>

    export default {
        data () {
            return {
                dataList:[],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
			tableForm:{
				bankData:[],
			},
			tableRules:{
				//分销级别
				bonusLevel:[
					{ required: true, message: '分销级别不能为空'},
				],
				//上线
				startLevel:[
					{ required: true, message: '上线不能为空'},
				],
				//下线
				endLevel:[
					{ required: true, message: '下线不能为空'},
				],
				//分成比列
				ratio:[
					{ required: true, message: '分成比列不能为空'},
				],
				//首充奖励
				firstChargeAmount:[
					{ required: true, message: '首充奖励不能为空'},
				],
			},				
				
            }
        },
        activated(){
            this.getDataList()
        },
        methods: {
            getDataList(){
                this.$http({
                    url: this.$http.adornUrl('/sys/maskbonusratio/list'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'pageNo': this.pageIndex,
                        'pageSize': this.pageSize,
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        // this.dataList=data.page.list
						this.tableForm.bankData=data.page.list
                        // console.log(data.page.list)
                        this.totalPage = data.page.totalCount
                    } else {

                    }
                    this.dataListLoading = false
                })
            },
            // 增加行
            addRow () {
                var list = {
                    id:'',
                    bonusLevel:this.bonusLevel,
                    startLevel:this.startLevel,
                    endLevel: this.endLevel,
                    ratio: this.ratio,
                    firstChargeAmount:this.firstChargeAmount
                }
                this.tableForm.bankData.push(list)
            },
            //保存
            submit(){
				this.$refs['tableForm'].validate((valid) => {
				if (valid) {
					this.$http({
						url:this.$http.adornUrl('/sys/maskbonusratio/saves'),
						method:'post',
						data:this.$http.adornData({
							'dataList':this.tableForm.bankData,
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
				}
			  });

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
            // 删除方法
            // 删除选中行
            // delData() {
            //   for (let i = 0; i < this.selectlistRow.length; i++) {
            //     let val = this.selectlistRow
            //     // 获取选中行的索引的方法
            //     // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
            //     // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
            //     val.forEach((val, index) => {
            //       this.tableData.forEach((v, i) => {
            //         if (val.rowNum === v.rowNum) {
            //           // i 为选中的索引
            //           this.tableData.splice(i, 1)
            //         }
            //       })
            //     })
            //   }
            //   // // 删除完数据之后清除勾选框
            //   // this.$refs.tableData.clearSelection()
            // }
        }
    }
</script>

<style>
  .el-input__inner {
    text-align: center;
  }
</style>
