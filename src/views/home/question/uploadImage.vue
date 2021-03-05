<template>
  <div class="uploadImage">
    <el-upload
      v-if="mode === 'img'"
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-upload
      v-else
      class="upload-demo"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="uploadSuccess"
    >
      <div class="myVideo">
        <el-button size="small" type="primary">点击上传</el-button>
        <video v-if="imageUrl" :src="imageUrl"></video>
        <div slot="tip" class="el-upload__tip">
          只能上传视频文件
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  //mode:img上传图片,vidio上传视频
  props: {
    item: Object,
    mode: {
      type: String,
      default: 'img'
    }
  },
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
      //判断上传的文件图片还是视频
      if (this.mode === 'img') {
        this.item.image = res.data.url
      } else {
        //视频上传成功后将视频图片传递给父组件
        this.$emit('passvideo', res.data.url)
      }
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
  .myVideo {
    video {
      display: block;
      width: 300px;
    }
  }
}
</style>
