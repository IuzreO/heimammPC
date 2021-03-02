<template>
  <div class="subject">
    <el-card class="box-card">
      <el-form ref="form" :model="form" :rules="rules" :inline="true">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid" class="input"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name" class="input"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username" class="input"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="add">+新增学科</el-button>
      </el-form>
    </el-card>
    <!-- el-table：表格的根元素 -->
    <!-- 属性： -->
    <!-- data: 当前表格的数据源-->
    <!-- el-table-column：表格中的列 -->
    <!-- 属性： -->
    <!--
              labe: 列标题
              width: 列宽
              prop：当前列显示的是数据源中的哪个属性
    -->
    <el-card class="box-table">
      <el-table :data="subjectList">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="学科编号" prop="rid"></el-table-column>
        <el-table-column label="学科名称" prop="name"></el-table-column>
        <el-table-column label="简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column label="创建日期" prop="create_time" width="200px"></el-table-column>
        <el-table-column label="状态">
          <!-- 自定义列 -->
          <!--  slot-scope="scope" -->
          <!-- 书写自定义内容 scope： 就是当前行对应的数据源 -->
          <template slot-scope="scope">{{scope.row.status==0?'禁用':"启用"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="text" @click="editSubject(scope.row)">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row)"
              style="margin:0 10px"
              type="text"
            >{{scope.row.status==0?'启用':"禁用"}}</el-button>
            <el-button type="text" @click="delSubject(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能实现 -->
      <!-- el-pagination：分页器 -->
      <!-- 属性：
                current-page： 当前页（选中的分页）
                page-sizes：页容量（数组）
                page-size：选中的页容量
                layout：分页器的布局
                    total, sizes, prev, pager, next, jumper
                total：数据的总条数
            事件：
                size-change：
                    当页容量发生改变时会触发
                current-change
                    当当前页发生发变时会触发
      -->
      <el-pagination
        class="mypagintaion"
        @current-change="currentChange"
        @size-change="sizeChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 使用子组件 -->
    <addSubject ref="add" @getData="getSubjectData" :mode="mode" :formData="formData"></addSubject>
  </div>
</template>

<script>
//导入接口调用的Api
import {
  getSubjectDataApi,
  changeStatusApi,
  delSubjectApi,
} from "@/api/index.js";
//导入子组件
import addSubject from "./addSubject";
export default {
  data() {
    return {
      form: {
        rid: "",
        name: "",
        username: "",
        status: "",
      },
      rules: {},
      //学科列表数据
      subjectList: [],
      // 当前页
      currentPage: 1,
      // 页容量集合
      pagesizes: [1, 2, 3, 4],
      // 页容量
      pagesize: 2,
      // 总条数
      total: 0,
      //当前面板模式
      mode: "",
      //当前数据源
      formData: "",
    };
  },
  created() {
    // getSubjectDataApi({
    //   page: this.currentPage, //请求的页码
    //   limit: this.pagesize, //页容量
    // }).then((res) => {
    //   //保存学科列表
    //   this.subjectList = res.data.items;
    //   //保存数据的总条数
    //   this.total = res.data.pagination.total;
    //   console.log(res.data);
    // });
    //发送请求到服务器得到最新的数据
    this.getSubjectData();
  },
  methods: {
    //打开新增面板
    add() {
      this.mode = "add";
      this.$refs.add.isShow = true;
    },
    //编辑功能实现
    editSubject(row) {
      this.mode = "edit" + Date.now();
      this.formData = row;
      this.$refs.add.isShow = true;
    },
    //删除功能实现
    delSubject(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delSubjectApi(row.id).then(() => {
            //判断是否只有一条信息,如果是则页数减一
            if (this.subjectList.length === 1) {
              this.currentPage = -1;
            }
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getSubjectData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //实现状态切换功能
    changeStatus(row) {
      changeStatusApi({
        id: row.id,
      }).then(() => {
        this.$message.success("修改状态成功");
        //刷新数据
        this.getSubjectData();
      });
    },
    //实现搜索功能
    search() {
      //当前页面改为1
      this.currentPage = 1;
      //请求数据
      this.getSubjectData();
    },
    reset() {
      //清空表单
      this.$refs.form.resetFields();
      //返回到第一页
      //   this.currentPage = 1;
      //   //请求数据
      //   this.getSubjectData();
      this.search();
    },
    currentChange(val) {
      //将改变后的当前页赋值给 currentPage
      this.currentPage = val;
      //重新发送请求到服务器得到最新的数据
      this.getSubjectData();
    },
    sizeChange(val) {
      //将改变后的页容量赋值给 pagesize
      this.pagesize = val;
      //重新发送请求到服务器得到最新的数据
      this.getSubjectData();
    },
    // 封装一个请求学科列表的方法
    getSubjectData() {
      getSubjectDataApi({
        page: this.currentPage, //请求的页码
        limit: this.pagesize, //页容量
        ...this.form, //传入form表单里的数据
      }).then((res) => {
        //保存学科列表
        this.subjectList = res.data.items;
        //保存数据的总条数
        this.total = res.data.pagination.total;
        // console.log(res.data);
      });
    },
  },
  //注册子组件
  components: { addSubject },
};
</script>

<style lang='less'>
.subject {
  .box-card {
    background: #ffffff;
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    border-radius: 4px;
    .input {
      width: 100px;
    }
  }
  .box-table {
    margin-top: 22px;
  }
  .mypagintaion {
    text-align: center;
    margin-top: 20px;
  }
}
</style>