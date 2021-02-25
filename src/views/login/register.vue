<template>
  <div class="register">
    <!-- 弹框 -->
    <el-dialog :visible.sync="isShowDialog" :show-close="false" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="70px">
        <!-- 头像上传 -->
        <el-form-item label="头像" prop="avatar">
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
        <!-- 昵称 -->
        <el-form-item class="nickName" prop="username" label="昵称">
          <el-input placeholder prefix-icon v-model="form.username"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item class="email" prop="email" label="邮箱">
          <el-input placeholder prefix-icon v-model="form.email"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item class="phone" prop="phone" label="手机">
          <el-input placeholder prefix-icon v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="password" prop="password" label="密码">
          <el-input placeholder prefix-icon v-model="form.password" show-password></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item prop="code" label="图形码">
          <el-row>
            <el-col :span="15">
              <el-input placeholder prefix-icon v-model="form.code"></el-input>
            </el-col>
            <el-col :span="8" :offset="1">
              <img :src="baseUrl+codeUrl" @click="codeClick" alt class="code" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="rcode" label="验证码">
          <el-row>
            <el-col :span="15">
              <el-input placeholder prefix-icon v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-button
                class="codeBtn"
                @click="userCodeClick"
                :disabled="totalTime!=60"
                v-if="totalTime==60"
              >获取用户验证码</el-button>
              <el-button class="codeBtn" @click="userCodeClick" :disabled="totalTime!=60" v-else>
                <span>重新获取时间剩余:{{totalTime}}S</span>
              </el-button>
            </el-col>
          </el-row>
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
        <el-button @click="comfirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import myAxios from "@/utils/request.js";
//导入封装好的网络请求API
import { getRcode, registerApi } from "@/api/index.js";
export default {
  //导入自己封装的axios文件
  data() {
    return {
      isShowDialog: false,
      //上传图片地址
      imageUrl: "",
      baseUrl: process.env.VUE_APP_BASEURL,
      codeUrl: "/captcha?type=sendsms&t=",
      totalTime: 60, //倒计时时间
      timer: "",
      form: {
        username: "",
        email: "",
        phone: "13111111111",
        password: "",
        code: "", //图形验证码
        rcode: "", //短信验证码
        avatar: "", //头像
      },
      rules: {
        username: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("请输入正确的邮箱格式"));
              }
            },
            trigger: "change",
          },
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("请输入正确的手机格式"));
              }
            },
            trigger: "change",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              const reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("密码强度不足"));
              }
            },
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "图形验证码不能为空", trigger: "blur" },
        ],
        rcode: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        avatar: [{ required: true, message: "图片不能为空", trigger: "blur" }],
      },
    };
  },
  watch: {
    isShowDialog(newVal) {
      if (!newVal) {
        this.$refs.form.resetFields();
        this.imageUrl = "";
      }
    },
  },

  methods: {
    //图片上传成功时执行的逻辑
    success(res) {
      console.log("上传成功");
      this.imageUrl = this.baseUrl + "/" + res.data.file_path;
      //将图片地址赋值给avatar
      this.form.avatar = res.data.file_path;
      //局部验证
      this.$refs.form.validateField(["avatar"]);
      console.log(this.form.avatar);
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
    //确认点击事件
    comfirm() {
      //得到form对象
      this.$refs.form.validate((valid) => {
        if (valid) {
          registerApi(this.form).then((res) => {
            console.log(res);
            this.$message.success("注册成功");
            //关闭遮罩层
            this.isShowDialog = false;
          });
        } else {
          this.$message.error("注册失败");
        }
      });
    },
    //点击更改图形验证码
    codeClick() {
      //每次点击更换图片,重新设置验证码的地址，为了避免浏览器缓存，需要在后面跟上随机值或时间戳
      this.codeUrl = "/captcha?type=sendsms&t=" + Date.now();
    },
    //发送验证码点击事件
    userCodeClick() {
      //定义一个变量,表示手机号和图形码是否输入成功
      let num = 0;
      //定义定时器常量名
      // 点击事件在调用接口获取验证码前需要先验证手机号与图形码是否已成功填写，可利用表单元素局部定义方式来自定义验证
      this.$refs.form.validateField(["phone", "code"], (error) => {
        //这后面的error如果没返回错误。也就是返回错误为空，说明验证成功
        window.console.log(error);
        if (error == "") {
          num++;
        }
      });
      if (num == 2) {
        this.timer = setInterval(() => {
          this.totalTime--;
          if (this.totalTime <= 0) {
            clearInterval(this.timer);
            this.totalTime = 60;
          }
        }, 100);
        // myAxios({
        //   url: "/sendsms",
        //   method: "post",
        //   //传递cookie给后端
        //   withCredentials: true,
        //   data: {
        //     code: this.form.code,
        //     phone: this.form.phone,
        //   },
        // })

        getRcode({
          code: this.form.code,
          phone: this.form.phone,
        })
          .then((res) => {
            //成功回调
            // window.console.log(res);
            this.$message.success("短信验证码为" + res.data.captcha + "");
          })
          .catch((err) => {
            // 改变验证码图片
            this.codeUrl = "/captcha?type=sendsms&t=" + Date.now();
            window.console.log(err);
          });
      }
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
  .code {
    width: 100%;
  }
  .codeBtn {
    width: 100%;
    height: 39px;
  }
}
</style>