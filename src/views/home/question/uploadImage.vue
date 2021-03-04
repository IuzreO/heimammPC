<template>
  <div class="uploadImage">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      //图片上传后的路径
      imageUrl: '',
      //基地址
      baseUrl: process.env.VUE_APP_BASEURL,
      //上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + '/question/upload'
    }
  },
  methods: {
    uploadSuccess (res) {
      this.imageUrl = this.baseUrl + '/' + res.data.url
      this.item.image = res.data.url
    },
    beforeAvatarUpload (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/image/gif 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less">
.uploadImage {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 162px;
    height: 162px;
    line-height: 162px;
    text-align: center;
  }
  .avatar {
    width: 162px;
    height: 162px;
    display: block;
  }
}
</style>
