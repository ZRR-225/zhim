<!-- 修改礼物 -->
<template>
  <el-dialog
    title='修改'
    :close-on-click-modal="false"
    :visible.sync="visible">
   <el-form :model="dataForm" ref="dataForm" :rules="dataRule" label-width="100px"  @keyup.enter.native="dataFormSubmit()">
     <el-form-item label="礼物ID" prop="id">
        <el-input v-model='dataForm.id' :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="礼物名称" prop="giftName">
        <el-input v-model="dataForm.giftName"></el-input>
      </el-form-item>
      <el-form-item label="礼物类型" prop="giftType">
        <el-radio-group v-model="dataForm.giftType">
          <el-radio  v-for="(giftType, index) in dataForm.statusList3" :label="index" :key="index">{{giftType}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="礼物图片" prop="giftImg">
		 <el-upload
		  action="https://up.qiniup.com"
		  :data="uptoken"
		  :limit='1'
		  list-type="picture"
		  :before-upload="beforeAvatarUpload"
		  :on-remove="handleRemove"
		  :file-list="fileList1">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传一张图片</div>
		</el-upload>
      </el-form-item>
      <el-form-item label="礼物展示图片" prop="giftShowImg">
		 <el-upload
		  action="https://up.qiniup.com"
		  :data="uptoken"
		  :limit='1'
		  list-type="picture"
		  header="application/octet-stream"
		  :before-upload="beforeAvatarUpload1"
		  :on-remove="handleRemove"
		  :file-list="fileList2">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传一张图片</div>
		</el-upload>
      </el-form-item>
      <el-form-item label="礼物暗色图片" prop="giftDarkImg">
		 <el-upload
		  action="https://up.qiniup.com"
		  :data="uptoken"
		  :limit='1'
		  list-type="picture"
		  header="application/octet-stream"
		  :before-upload="beforeAvatarUpload2"
		  :on-remove="handleRemove"
		  :file-list="fileList3">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传一张图片</div>
		</el-upload>
      </el-form-item>
      <el-form-item label="人民币价值" prop="giftRmbValue">
        <el-input v-model="dataForm.giftRmbValue"></el-input>
      </el-form-item>
      <el-form-item label="经验值" prop="empiricalValue">
        <el-input v-model="dataForm.empiricalValue"></el-input>
      </el-form-item>
      <el-form-item label="萌力值" prop="charmValue">
        <el-input v-model="dataForm.charmValue"></el-input>
      </el-form-item>
      <el-form-item label="金币价值" prop="giftCoinValue">
        <el-input v-model="dataForm.giftCoinValue"></el-input>
      </el-form-item>
      <el-form-item label="铃铛" prop="giftDiamondValue">
        <el-input v-model="dataForm.giftDiamondValue"></el-input>
      </el-form-item>
      <el-form-item label="动画" prop="isAnimation">
        <el-radio-group v-model="dataForm.isAnimation">
          <el-radio  v-for="(isAnimation, index) in dataForm.statusList1" :label="index" :key="index">{{isAnimation}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="连刷" prop="isEvenBrush">
        <el-radio-group v-model="dataForm.isEvenBrush">
          <el-radio  v-for="(isEvenBrush, index) in dataForm.statusList2" :label="index" :key="index">{{isEvenBrush}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否展示" prop="isShow">
        <el-radio-group v-model="dataForm.isShow">
          <el-radio  v-for="(isShow, index) in dataForm.statusList4" :label="index" :key="index">{{isShow}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
       <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
		inject:['reload'],
    data() {
      return {
        visible: false,
		pageIndex:1,
		pageSize:10,
		totalPage:0,
		uptoken: {
			token: '',
			key: ""
		},
        dataForm: {
            id:'',
            giftName:'',
			giftRmbValue:'',
			giftType:0,
			giftImg:'',
			giftShowImg:'',
			empiricalValue:'',
			charmValue:'',
			giftCoinValue:'',
			giftDiamondValue:'',
			isAnimation:0,
			isEvenBrush:0,
			isShow:0,
			statusList1:['非动画','动画'],
			statusList2:['非连刷','连刷'],
			statusList3:['猫粮','铃铛'],
			statusList4:['否','是'],
        },
        dataRule: {
          id: [
            { required: true, message: '礼物Id不能为空', trigger: 'blur' },
          ],
		  giftName:[
			  {required: true, message: '礼物名称不能为空', trigger: 'blur' },
		  ],
		  giftType:[
			  {required: true, message: '礼物类型不能为空', trigger: 'blur' }
		  ],
		  giftRmbValue:[
			  {required: true, message: '人民币价值不能为空', trigger: 'blur' }
		  ],
        },
		fileList1: [
			{name: '',
			
			 url:''},
		],
		fileList2: [
			{name: '',
			 url: ''},
		],
		fileList3: [
			{name: '',
			 url: ''},
		]
		};
    },
    methods: {
			init (id) {
				this.visible = true;
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields()
					this.$http({
					  url: this.$http.adornUrl('/sys/gift/allgift'),
					  method: 'get',
					  params: this.$http.adornParams({
						'pageNo': this.pageIndex,
						'pageSize': this.pageSize, 
						'id':id
					  })
					}).then(({data}) => {
					  if (data && data.code === 0) {
						  this.dataForm.id=data.data.list[0].id
							this.dataForm.giftName=data.data.list[0].giftName
							this.dataForm.giftType=data.data.list[0].giftType
							this.dataForm.giftRmbValue=data.data.list[0].giftRmbValue
							this.dataForm.empiricalValue=data.data.list[0].empiricalValue
							this.dataForm.charmValue=data.data.list[0].charmValue
							this.dataForm.giftCoinValue=data.data.list[0].giftCoinValue
							this.dataForm.giftDiamondValue=data.data.list[0].giftDiamondValue
							this.dataForm.isAnimation=data.data.list[0].isAnimation
							this.dataForm.isEvenBrush=data.data.list[0].isEvenBrush
							this.dataForm.isShow=data.data.list[0].isShow
							this.dataForm.giftImg=data.data.list[0].giftImg
							this.dataForm.giftShowImg=data.data.list[0].giftImg
							this.fileList1[0].name=data.data.list[0].giftImg
							this.fileList2[0].name=data.data.list[0].giftShowImg
							this.fileList3[0].name=data.data.list[0].giftDarkImg
							this.fileList1[0].url='http://zhimiaoimg.sc-msr.com/'+data.data.list[0].giftImg
							this.fileList2[0].url='http://zhimiaoimg.sc-msr.com/'+data.data.list[0].giftShowImg
							this.fileList3[0].url='http://zhimiaoimg.sc-msr.com/'+data.data.list[0].giftDarkImg
					  } else {
						// this.dataList = []
						// this.totalPage = 0
					  }
					  this.dataListLoading = false
					})
					
					this.$http({
					  url: this.$http.adornUrl('/sys/qiniupicture/gettoken'),
					  method: 'get',
					}).then(({data}) => {
					  if (data && data.code === 0) {
						this.uptoken.token= data.data.token
					  }
					})
				})
			},
	    beforeAvatarUpload(file) {
			this.uptoken.key = file.name;
			this.dataForm.giftImg=file.name;
			this.fileList1[0].name=file.name
			console.log(this.dataForm.giftImg)
		},
	    beforeAvatarUpload1(file) {
			console.log(file)
			this.uptoken.key = file.name;
			this.dataForm.giftShowImg=file.name;
			this.fileList2[0].name=file.name
			console.log(this.dataForm.giftShowImg)
		},
		beforeAvatarUpload2(file) {
			console.log(file)
			this.uptoken.key = file.name;
			this.dataForm.giftDarkImg=file.name;
			this.fileList3[0].name=file.name
			console.log(this.dataForm.giftDarkImg)
		},
		  handleRemove(file, fileList) {
			console.log(file, fileList);
		  },
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
			if (valid) {
			  this.$http({
				url: this.$http.adornUrl('/sys/gift/updategift'),
				method: 'post',
				data: this.$http.adornData({
					'id':this.dataForm.id,
					'giftName':this.dataForm.giftName,
					'giftRmbValue':this.dataForm.giftRmbValue,
					'giftType':this.dataForm.giftType,
					'empiricalValue':this.dataForm.empiricalValue,
					'charmValue':this.dataForm.charmValue,
					'giftCoinValue':this.dataForm.giftCoinValue,
					'giftDiamondValue':this.dataForm.giftDiamondValue,
					'isAnimation':this.dataForm.isAnimation,
					'isEvenBrush':this.dataForm.isEvenBrush,
					'giftShowImg':this.dataForm.giftShowImg,
					'giftImg':this.dataForm.giftImg,
					'giftDarkImg':this.dataForm.giftDarkImg,
					'isShow':this.dataForm.isShow,
				})
			  }).then(({data}) => {
				if (data && data.code === 0) {
				  this.$message({
					message:data.msg,
					type: 'success',
					duration: 1500,
					onClose: () => {
					  this.visible = false
						this.reload();
					  this.$emit('refreshDataList')
					}
				  })
				} else {
				  this.$message.error(data.msg)
				}
			  })
			}
        });
      },
    }
  }
</script>
