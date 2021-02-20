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
        <span class="register">用户登录</span>
      </div>
    </div>
    <!-- 右侧图片区域 -->
    <div class="right">
      <img class="img" src="@/assets/login_banner_ele@2x.png" alt />
    </div>
  </div>
</template>

<script>
export default {};
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
      .register {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: #0c0c0c;
      }
      span {
        margin-right: 15px;
      }
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