<template>
  <div class="login">
    <!-- 左侧登录区域 -->
    <div class="left">
      <div class="title">
        <span>
          <img src="@/assets/矢量智能对象 拷贝 9@2x.png" alt />
        </span>
        <span class="heima">黑马面面</span>
        <span class="bar"></span>
        <span class="userLogin">用户登录</span>
      </div>
      <!-- element表单 -->
      <el-form ref="form" :model="form" :rules="rules">
        <!-- 用户电话号码 -->
        <el-form-item class="loginPhone" prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.code"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="codeUrl" alt class="code" @click="codeClick" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked"></el-checkbox>
          <span class="agreement">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </span>
        </el-form-item>
        <!-- 登录按钮-->
        <el-form-item>
          <el-button @click="submit" class="enter" type="primary">登录</el-button>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button @click="signIn" class="register" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片区域 -->
    <div class="right">
      <img class="img" src="@/assets/login_banner_ele@2x.png" alt />
    </div>
    <!-- 使用子组件 -->
    <register ref="signIn"></register>
  </div>
</template>

<script>
//导入子组件
import register from "./register";
//导入登录的api方法
import { loginApi } from "@/api/index.js";
//导入封装好的token.js文件
import { saveToken, getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      form: {
        phone: "13188888888",
        password: "Aa8888!",
        code: "",
        checked: true, // 协议状态
      },
      baseUrl: process.env.VUE_APP_BASEURL,
      codeUrl: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 表单验证的规则
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: "手机号不符合要求",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],
        checked: [
          {
            validator: (rule, value, callback) => {
              //value为true才能通过验证
              if (value) {
                callback();
              } else {
                callback("请先阅读并同意条款协议");
              }
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  // 生命周期钩子函数
  created() {
    let token = getToken();
    //判断token是否已经存在
    if (token) {
      //跳转到首页
      this.$message.info("已登录,即将跳转到首页");
      this.$router.push("/index");
    }
  },
  methods: {
    //点击登录时需要进行自动验证
    submit() {
      //优先判断用户是否勾选了协议
      // if (!this.form.checked) {
      //   this.$message.error("请先阅读并同意条款协议");
      //   return;
      // }
      //得到form对象
      this.$refs.form.validate((valid) => {
        if (valid) {
          loginApi({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code,
          }).then((res) => {
            // 登录成功
            // 提示用户登录成功
            this.$message.success("登录成功");
            // 跳转到首页
            this.$router.push("/index");
            // 将登录成功后返回的 token，保存本地（localstorage）
            saveToken(res.data.token);
          });
        } else {
          this.$message.error("登录失败");
          this.codeUrl = "/captcha?type=login&t=" + Date.now();
        }
      });
    },
    signIn() {
      this.$refs.signIn.isShowDialog = true;
    },
    codeClick() {
      this.codeUrl = this.baseUrl + "/captcha?type=login&t=" + Date.now();
    },
  },

  //注册组件
  components: {
    register,
  },
};
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    box-sizing: border-box;
    width: 478px;
    height: 550px;
    padding: 48px 42px;
    background: #f5f5f5;
    .title {
      display: flex;
      align-items: center;
      img {
        height: 22px;
        width: 17px;
        vertical-align: middle;
      }
      .heima {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #0c0c0c;
      }
      .bar {
        display: inline-block;
        width: 1px;
        height: 28px;
        background: #c7c7c7;
      }
      .userLogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #0c0c0c;
      }
      span {
        margin-right: 15px;
      }
    }
    .loginPhone {
      margin-top: 31px;
    }
    .code {
      height: 40px;
      width: 100%;
    }
    .agreement {
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #999999;
    }
    .enter,
    .register {
      width: 394px;
      height: 40px;
      background: #1493fa;
      border-radius: 4px;
    }
  }
  .right {
    width: 633px;
    height: 435px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>