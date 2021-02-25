<template>
  <div>
    <p>我是首页</p>
  </div>
</template>

<script>
//导入token.js文件
import { getToken } from "@/utils/token";
export default {
  created() {
    let token = getToken();
    if (!token) {
      this.$message.error("未登录,即将跳转到登录页");
      this.$router.push("/login");
    }
  },
};
</script>

<style>
</style>