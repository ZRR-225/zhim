<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户姓名" prop="userName">
      <el-input v-model="dataForm.userName" placeholder="用户姓名"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="dataForm.nickName" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="电话"></el-input>
    </el-form-item>
    <el-form-item label="0未知1男性2女性" prop="sex">
      <el-input v-model="dataForm.sex" placeholder="0未知1男性2女性"></el-input>
    </el-form-item>
    <el-form-item label="用户头像图片的 URL。URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。" prop="avatarUrl">
      <el-input v-model="dataForm.avatarUrl" placeholder="用户头像图片的 URL。URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。"></el-input>
    </el-form-item>
    <el-form-item label="用户所在国家" prop="country">
      <el-input v-model="dataForm.country" placeholder="用户所在国家"></el-input>
    </el-form-item>
    <el-form-item label="用户所在省份" prop="province">
      <el-input v-model="dataForm.province" placeholder="用户所在省份"></el-input>
    </el-form-item>
    <el-form-item label="用户所在城市" prop="city">
      <el-input v-model="dataForm.city" placeholder="用户所在城市"></el-input>
    </el-form-item>
    <el-form-item label="显示 country，province，city 所用的语en	英文	zh_CN	简体中文	zh_TW	繁体中文" prop="language">
      <el-input v-model="dataForm.language" placeholder="显示 country，province，city 所用的语言en	英文	zh_CN	简体中文	zh_TW	繁体中文"></el-input>
    </el-form-item>
    <el-form-item label="0/1 不可用/可用" prop="status">
      <el-input v-model="dataForm.status" placeholder="0/1 不可用/可用"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="0/1 不是禁用/禁用" prop="isDisable">
      <el-input v-model="dataForm.isDisable" placeholder="0/1 不是禁用/禁用"></el-input>
    </el-form-item>
    <el-form-item label="来源，0微信小程序，1支付宝小程序" prop="source">
      <el-input v-model="dataForm.source" placeholder="来源，0微信小程序，1支付宝小程序"></el-input>
    </el-form-item>
    <el-form-item label="微信唯一标识" prop="openId">
      <el-input v-model="dataForm.openId" placeholder="微信唯一标识"></el-input>
    </el-form-item>
    <el-form-item label="是否免密   0/1 无免密/免密" prop="isPassword">
      <el-input v-model="dataForm.isPassword" placeholder="是否免密   0/1 无免密/免密"></el-input>
    </el-form-item>
    <el-form-item label="" prop="verificationCode">
      <el-input v-model="dataForm.verificationCode" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="验证码过期时间" prop="verificationTime">
      <el-input v-model="dataForm.verificationTime" placeholder="验证码过期时间"></el-input>
    </el-form-item>
    <el-form-item label="模板消息form_id" prop="formId">
      <el-input v-model="dataForm.formId" placeholder="模板消息form_id"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          userId: 0,
          userName: '',
          nickName: '',
          mobile: '',
          sex: '',
          avatarUrl: '',
          country: '',
          province: '',
          city: '',
          language: '',
          status: '',
          createTime: '',
          updateTime: '',
          isDisable: '',
          source: '',
          openId: '',
          isPassword: '',
          verificationCode: '',
          verificationTime: '',
          formId: '',
          remark: ''
        },
        dataRule: {
          userName: [
            { required: true, message: '用户姓名不能为空', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '电话不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '0未知1男性2女性不能为空', trigger: 'blur' }
          ],
          avatarUrl: [
            { required: true, message: '用户头像图片的 URL。URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。不能为空', trigger: 'blur' }
          ],
          country: [
            { required: true, message: '用户所在国家不能为空', trigger: 'blur' }
          ],
          province: [
            { required: true, message: '用户所在省份不能为空', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '用户所在城市不能为空', trigger: 'blur' }
          ],
          language: [
            // eslint-disable-next-line no-tabs
            { required: true, message: '显示 country，province，city 所用的语言en	英文zh_CN	简体中文zh_TW	繁体中文不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0/1 不可用/可用不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          isDisable: [
            { required: true, message: '0/1 不是禁用/禁用不能为空', trigger: 'blur' }
          ],
          source: [
            { required: true, message: '来源，0微信小程序，1支付宝小程序不能为空', trigger: 'blur' }
          ],
          openId: [
            { required: true, message: '微信唯一标识不能为空', trigger: 'blur' }
          ],
          isPassword: [
            { required: true, message: '是否免密   0/1 无免密/免密不能为空', trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          verificationTime: [
            { required: true, message: '验证码过期时间不能为空', trigger: 'blur' }
          ],
          formId: [
            { required: true, message: '模板消息form_id不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.userId) {
            this.$http({
              url: this.$http.adornUrl(`/sys/sguser/info/${this.dataForm.userId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userName = data.sguser.userName
                this.dataForm.nickName = data.sguser.nickName
                this.dataForm.mobile = data.sguser.mobile
                this.dataForm.sex = data.sguser.sex
                this.dataForm.avatarUrl = data.sguser.avatarUrl
                this.dataForm.country = data.sguser.country
                this.dataForm.province = data.sguser.province
                this.dataForm.city = data.sguser.city
                this.dataForm.language = data.sguser.language
                this.dataForm.status = data.sguser.status
                this.dataForm.createTime = data.sguser.createTime
                this.dataForm.updateTime = data.sguser.updateTime
                this.dataForm.isDisable = data.sguser.isDisable
                this.dataForm.source = data.sguser.source
                this.dataForm.openId = data.sguser.openId
                this.dataForm.isPassword = data.sguser.isPassword
                this.dataForm.verificationCode = data.sguser.verificationCode
                this.dataForm.verificationTime = data.sguser.verificationTime
                this.dataForm.formId = data.sguser.formId
                this.dataForm.remark = data.sguser.remark
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/sguser/${!this.dataForm.userId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId || undefined,
                'userName': this.dataForm.userName,
                'nickName': this.dataForm.nickName,
                'mobile': this.dataForm.mobile,
                'sex': this.dataForm.sex,
                'avatarUrl': this.dataForm.avatarUrl,
                'country': this.dataForm.country,
                'province': this.dataForm.province,
                'city': this.dataForm.city,
                'language': this.dataForm.language,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime,
                'isDisable': this.dataForm.isDisable,
                'source': this.dataForm.source,
                'openId': this.dataForm.openId,
                'isPassword': this.dataForm.isPassword,
                'verificationCode': this.dataForm.verificationCode,
                'verificationTime': this.dataForm.verificationTime,
                'formId': this.dataForm.formId,
                'remark': this.dataForm.remark
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
