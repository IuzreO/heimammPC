<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header">
          <div class="left">
            <i class="el-icon-s-fold" v-if="collapse" @click="collapse=!collapse"></i>
            <i class="el-icon-s-unfold" v-else @click="collapse=!collapse"></i>
            <span>
              <img class="logo" src="../../assets/Homelogo.png" alt />
            </span>
            <span class="word">黑马面面</span>
          </div>
          <div class="right" v-if="userInfo.avatar">
            <span>
              <img class="headPic" :src="baseUrl+'/'+userInfo.avatar" alt />
            </span>
            <span class="hello">{{userInfo.username}},您好</span>
            <el-button @click="logout" size="mini" type="primary">退出</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <!-- collapse 导航是否折叠 -->
          <el-menu class="el-menu-vertical-demo" :collapse="collapse" :router="true">
            <el-menu-item index="/home/chart">
              <!-- 图标 -->
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/home/userList">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/home/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/home/business">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/home/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//导入token.js文件
import { getToken, removeToken } from "@/utils/token.js";
//导入封装好的接口文件
import { getUserInfoApi, logoutApi } from "@/api/index.js";
export default {
  data() {
    return {
      userInfo: {},
      baseUrl: process.env.VUE_APP_BASEURL,
      collapse: false,
    };
  },
  created() {
    let token = getToken();
    if (!token) {
      this.$message.error("未登录,即将跳转到登录页");
      this.$router.push("/login");
    }
    getUserInfoApi().then((res) => {
      console.log(res);
      this.userInfo = res.data;
      this.$store.state.userInfo = this.userInfo;
    });
  },
  methods: {
    logout() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用logoutApi接口
          logoutApi().then(() => {
            //删除token
            removeToken();
            this.$message.success("退出成功");
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang='less'>
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      color: #333;
      line-height: 60px;
    }

    .el-aside {
      color: #333;
    }

    .el-main {
      background-color: #e8e9ec;
      color: #333;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    .el-icon-s-fold,
    .el-icon-s-unfold {
      font-size: 24px;
    }
    .logo {
      width: 33px;
      height: 28px;
      margin: 0 10px;
    }
    .word {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #49a1ff;
    }
  }
  .right {
    display: flex;
    align-items: baseline;
    .headPic {
      height: 43px;
      width: 43px;
      border-radius: 50%;
      margin: 0 10px;
      vertical-align: middle;
    }
    .hello {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #636363;
      margin: 0 15px 0 10px;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>