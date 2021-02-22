<template>
  <div class="register">
    <!-- 弹框 -->
    <el-dialog :visible.sync="isShowDialog" :show-close="false">
      <el-form>
        <el-form-item label="头像" label-width="60px">
          <el-upload
            class="avatar-uploader"
            name="image"
            :action="baseUrl+'/uploads'"
            :show-file-list="false"
            :on-success="success"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 使用 title 插槽 -->
      <div slot="title">
        <div class="userTitle">用户注册</div>
      </div>
      <!-- 添加底部的结构 -->
      <!-- slot：插槽 -->
      <div slot="footer" class="footer">
        <el-button @click="isShowDialog=false">取消</el-button>
        <el-button @click="isShowDialog=false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDialog: false,
      //上传图片地址
      imageUrl: "",
      baseUrl: "http://127.0.0.1/heimamm/public",
    };
  },
  methods: {
    //图片上传成功时执行的逻辑
    success(res) {
      console.log("上传成功");
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
    },
    //图片上传成功前执行的逻辑
    beforeUpload(file) {
      console.log("准备上传");
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 jpeg/png/gif 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang='less'>
.register {
  .userTitle {
    text-align: center;
    height: 53px;
    line-height: 53px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fefefe;
    background: linear-gradient(90deg, #01c6fa, #1493fa);
  }
  .el-dialog__header {
    padding: 0;
  }
  .footer {
    text-align: center;
  }
  .avatar-uploader {
    text-align: center;
  }
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>