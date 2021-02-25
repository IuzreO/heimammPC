<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header">
          <div class="left">
            <i class="el-icon-s-fold"></i>
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
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//导入token.js文件
import { getToken, removeToken } from "@/utils/token.js";
//导入封装好的接口稳健
import { getUserInfo, logoutApi } from "@/api/index.js";
export default {
  data() {
    return {
      userInfo: {},
      baseUrl: process.env.VUE_APP_BASEURL,
    };
  },
  created() {
    let token = getToken();
    if (!token) {
      this.$message.error("未登录,即将跳转到登录页");
      this.$router.push("/login");
    }
    getUserInfo().then((res) => {
      console.log(res);
      this.userInfo = res.data;
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
          logoutApi();
          //删除token
          removeToken();
          this.$router.push("/login");
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
    .el-icon-s-fold {
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
}
</style>