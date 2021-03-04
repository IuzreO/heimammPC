<template>
  <div>
    <p>百分比模版</p>
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="50"
      status="exception"
    ></el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="70"
    ></el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="22"
      :percentage="80"
      status="warning"
    ></el-progress>
    <el-progress
      :text-inside="true"
      :stroke-width="24"
      :percentage="100"
      status="success"
    ></el-progress>
    <p>Element - ui 输入框</p>
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-user"
      v-model="input2"
    ></el-input>
    <p>Element - ui 栅格系统</p>
    <el-row :gutter="10">
      <!-- gutter 栅格间隔 -->
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <p>Element - ui 文字链接</p>
    <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
    <el-link type="primary">主要链接</el-link>
    <el-link type="success">成功链接</el-link>
    <el-link type="warning">警告链接</el-link>
    <el-link type="danger">危险链接</el-link>
    <el-link type="info">信息链接</el-link>
    <p>Element - ui 多选框</p>
    <el-checkbox v-model="checked">备选项</el-checkbox>
    {{ checked }}
    <p>Element - ui 按钮</p>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <el-row>
      <el-button plain disabled>朴素按钮</el-button>
      <el-button type="primary" plain disabled>主要按钮</el-button>
      <el-button type="success" plain disabled>成功按钮</el-button>
      <el-button type="info" plain disabled>信息按钮</el-button>
      <el-button type="warning" plain disabled>警告按钮</el-button>
      <el-button type="danger" plain disabled>危险按钮</el-button>
    </el-row>
    <p>Element - ui 表单</p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input2: '请输入帐号',
      checked: true,
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.formInline.user, this.formInline.region)
    }
  }
}
</script>

<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
