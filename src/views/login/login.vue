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
      <el-form ref="form" :model="form">
        <!-- 用户电话号码 -->
        <el-form-item class="loginPhone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.code"></el-input>
            </el-col>
            <el-col :span="8">
              <img :src="baseUrl+'/captcha?type=login'" alt class="code" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>
          <span class="agreement">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </span>
        </el-form-item>
        <!-- 登录按钮-->
        <el-form-item>
          <el-button class="enter" type="primary">登录</el-button>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="register" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片区域 -->
    <div class="right">
      <img class="img" src="@/assets/login_banner_ele@2x.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        key: "",
      },
      baseUrl: "http://127.0.0.1/heimamm/public",
      checked: false,
    };
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