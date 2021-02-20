<template>
  <div>
    <!-- 路由出口 -->
    <p>我是主页</p>
    <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
    <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
    <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>

<style>
</style>