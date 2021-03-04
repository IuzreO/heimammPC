<template>
  <div>
    <!-- 顶部区域 -->
    <el-card class="top">
      <el-form :model="form" inline ref="form" :rules="rules">
        <el-form-item label="学科" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择学科">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in subjectList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select v-model="form.enterprise" placeholder="请选择企业">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in BusinessList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-select v-model="form.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="diffculty">
          <el-select v-model="form.diffculty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="username">
          <el-select
            v-model="form.username"
            placeholder="请选择作者"
          ></el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="create_date">
          <el-date-picker
            style="width:217px"
            v-model="form.create_date"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input class="title" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" class="el-icon-plus" @click="add"
            >新增试题</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 底部区域 -->
    <div class="bottom">
      <el-card>
        <!-- data数据源 -->
        <el-table :data="questionList" border>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column
            label="题目"
            prop="title"
            width="200px"
          ></el-table-column>
          <el-table-column label="学科&阶段">
            <template slot-scope="scope">
              {{ scope.row.subject_name }}
              {{ { 1: '初级', 2: '中级', 3: '高级' }[scope.row.step] }}
              <!-- {{scope.row.subject_name}},{{scope.row.step==1?'初级':scope.row.step==2?'中级':'高级'}} -->
            </template>
          </el-table-column>
          <el-table-column label="题型">
            <template slot-scope="scope">{{
              { 1: '单选', 2: '多选', 3: '简答' }[scope.row.type]
            }}</template>
          </el-table-column>
          <el-table-column
            label="企业"
            prop="enterprise_name"
          ></el-table-column>
          <el-table-column label="创建者" prop="username"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{
              { 0: '禁用', 1: '启用' }[scope.row.status]
            }}</template>
          </el-table-column>
          <el-table-column label="访问量" prop="reads"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link type="primary">编辑</el-link>
              <el-link
                type="primary"
                @click="changeStatus(scope.row)"
                style="margin:0 5px"
                >{{ scope.row.status == 0 ? '启用' : '禁用' }}</el-link
              >
              <el-link type="primary">删除</el-link>
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
    </div>
    <!-- 使用子组件 -->
    <addQuestion ref="addQuestion"></addQuestion>
  </div>
</template>
<script>
//导入学科和企业信息接口
import {
  getSubjectDataApi,
  getBusinessDataApi,
  getQuestionDataApi,
  editQuestionStatusApi
} from '@/api/index.js'
//导入addQuestion子组件
import addQuestion from './addQuestion'
export default {
  data () {
    return {
      form: {
        subject: '', //学科
        step: '', //阶段
        enterprise: '', //企业
        type: '', //题型
        diffculty: '', //难度
        username: '', //作者
        status: '', //状态,
        create_date: '', //日期
        title: '' //标题
      },
      subjectList: [], //学科列表
      BusinessList: [], //企业列表
      questionList: [], //题库列表
      rules: {}, //表单验证
      // 当前页
      currentPage: 1,
      // 页容量集合
      pagesizes: [1, 2, 3, 4],
      // 页容量
      pagesize: 2,
      // 总条数
      total: 0
    }
  },
  created () {
    //得到学科下拉选项
    this.getSubject()
    //得到企业下拉选项
    this.getBusiness()
    //得到题库列表数据
    this.getQuestionData()
  },
  methods: {
    getSubject () {
      //获取学科列表下拉框中的数据
      getSubjectDataApi({}).then(res => {
        this.subjectList = res.data.items
      })
    },
    getBusiness () {
      //获取企业列表下拉框中的数据
      getBusinessDataApi({}).then(res => {
        this.BusinessList = res.data.items
      })
    },
    getQuestionData () {
      //获取题库列表数据
      getQuestionDataApi({
        page: this.currentPage, //请求的页码
        limit: this.pagesize, //页容量
        ...this.form
      }).then(res => {
        this.questionList = res.data.items
        //console.log(this.questionList);
        //保存数据的总条数
        this.total = res.data.pagination.total
      })
    },
    //  当当前页发生发变时会触发
    currentChange (val) {
      //将改变后的当前页赋值给 currentPage
      this.currentPage = val
      //重新发送请求到服务器得到最新的数据
      this.getQuestionData()
    },
    // 当页容量发生改变时会触发
    sizeChange (val) {
      //将改变后的页容量赋值给 pagesize
      this.pagesize = val
      //重新发送请求到服务器得到最新的数据
      this.getQuestionData()
    },
    //实现搜索功能
    search () {
      //设置当前页为第一页
      this.currentPage = 1
      //调用获取题库数据函数
      this.getQuestionData()
    },
    //实现清除功能
    reset () {
      this.$refs.form.resetFields()
      // 刷新数据
      this.getQuestionData()
    },
    //实现状态切换功能
    changeStatus (row) {
      editQuestionStatusApi({
        id: row.id
      }).then(res => {
        if (res.code == 200) {
          this.$message.success('修改状态成功')
          // 刷新数据
          this.getQuestionData()
        } else {
          this.$message.error('修改状态失败')
        }
      })
    },
    //新增题库点击事件
    add () {
      this.$refs.addQuestion.isShow = true
    }
  },
  //注册子组件
  components: {
    addQuestion
  }
}
</script>

<style lang="less">
.top {
  .title {
    width: 400px;
  }
}
.bottom {
  margin-top: 20px;
  .mypagintaion {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
