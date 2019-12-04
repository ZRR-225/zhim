<template>
  <div class="tableDate">
        <el-form :model="tableForm" ref="tableForm">
        <el-table
            class="bankTable" 
            :data="tableForm.bankData" 
            border>

            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="分销级别">
                <template slot-scope="scope">
                    <el-form-item :prop="`bankData.${scope.$index}.bonusLevel`"  :rules="tableRules.bonusLevel">
                    <el-input v-model="scope.row.bonusLevel"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>

            <el-table-column prop="KHHDS" label="上线">
                <template slot-scope="scope">
                    <el-form-item :prop="`bankData.${scope.$index}.startLevel`"  :rules="tableRules.startLevel">
                        <el-input v-model="scope.row.KHHDS"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>

            <el-table-column prop="BANKN" label="银行账号">
                <template slot-scope="scope">
                    <el-form-item>
                    <el-input v-model="scope.row.BANKN"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>
        </el-table>
		<el-button @click="submit()">保存</el-button>
        </el-form>
		
  </div>
</template>

<script>

  export default {
     data() {
    return {
                pageIndex: 1,
                pageSize: 10,
        tableForm:{
            bankData:[
                            {
                                BANKA:'',
                                KHHSF:'',
                                KHHDS:'',
                                BANKN:'',
                                KOINH:'',
                            },
							{                         
							    BANKA:'1',
							    KHHSF:'2',
							    KHHDS:'3',
							    BANKN:'1',
							    KOINH:'1',
							}
                        ],
        },
                tableRules:{
            //银行所在省
            bonusLevel:[
                { required: true, message: '分销级别'},
            ],
            //银行所在市
            KHHDS:[
                { required: true, message: '请输入银行所在省'},
            ]
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
                        this.tableForm.bankData=data.page.list
                        // console.log(data.page.list)
                        this.totalPage = data.page.totalCount
                    } else {

                    }
                    this.dataListLoading = false
                })
            },
		submit() {
			// console.log('baocun')
				this.$refs['tableForm'].validate((valid) => {
				if (valid) {
					console.log('baocun')
				}
			  });
		}
	},
  }
</script>

<style>
</style>
