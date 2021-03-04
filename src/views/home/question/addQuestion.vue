<template>
  <div class="addQuestion">
    <template>
      <el-dialog class="addSubject" :visible.sync="isShow" :fullscreen="true">
        <div slot="title" class="title">新增题库测试</div>
        <!-- 表单内容 -->
        <div class="content">
          <el-form :model="form">
            <el-form-item label="学科" placeholder="请选择学科">
              <el-select v-model="form.subject">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in subjectList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="阶段" placeholder="请选择阶段">
              <el-select v-model="form.step">
                <el-option label="初级" value="1"></el-option>
                <el-option label="中级" value="2"></el-option>
                <el-option label="高级" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业" placeholder="请选择企业">
              <el-select v-model="form.enterprise">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in BusinessList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市" placeholder="请选择城市">
              <el-cascader
                v-model="form.city"
                :options="options"
                class="cascader"
              ></el-cascader>
            </el-form-item>
            <!-- label 相当于是value   -->
            <!-- 双标签内部的值 看到的文本 -->
            <el-form-item label="题型">
              <el-radio-group v-model="form.type">
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
                <el-radio :label="3">简答</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="难度">
              <el-radio-group v-model="form.diffculty">
                <el-radio :label="1">简单</el-radio>
                <el-radio :label="2">一般</el-radio>
                <el-radio :label="3">困难</el-radio>
              </el-radio-group>
            </el-form-item>
            <hr class="line" />
            <el-form-item label="试题标题" class="questionTitel">
              <quillEditor v-model="form.title"></quillEditor>
            </el-form-item>
            <el-form-item
              :label="{ '1': '单选', '2': '多选', '3': '简答' }[form.type]"
              class="questionTitel"
            >
              <!-- 使用子组件 -->
              <allSelect :form="form"></allSelect>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button @click="comfirm" type="primary">确定</el-button>
        </div>
        {{ form.select_options }}
        {{ form.single_select_answer }}
        {{ form.multiple_select_answer }}
      </el-dialog>
    </template>
  </div>
</template>
<script>
//导入学科和企业信息接口
import { getSubjectDataApi, getBusinessDataApi } from '@/api/index.js'
// regionData`是省市区三级联动数据（不带“全部”选项）
import { regionData } from 'element-china-area-data'
//引入富文本编辑器
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//导入子组件
import allSelect from './allSelect'
export default {
  data () {
    return {
      isShow: false,
      form: {
        subject: '',
        step: '',
        enterprise: '',
        city: [], //城市
        type: 1, //题型
        diffculty: 1, //难易度
        title: '', //标题
        // 选项，介绍，图片介绍
        single_select_answer: '', //单选答案
        multiple_select_answer: [], //多选答案
        select_options: [
          {
            label: 'A',
            text: 'A选项',
            image: ''
          },
          {
            label: 'B',
            text: 'B选项',
            image: ''
          },
          {
            label: 'C',
            text: 'C选项',
            image: ''
          },
          {
            label: 'D',
            text: 'D选项',
            image: ''
          }
        ]
      },
      subjectList: '', //学科列表
      BusinessList: '', //企业列表
      //   省市区数据
      options: regionData
    }
  },
  created () {
    //得到学科下拉选项
    this.getSubject()
    //得到企业下拉选项
    this.getBusiness()
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
    comfirm () {}
  },
  //注册子组件
  components: {
    quillEditor,
    allSelect
  }
}
</script>
<style lang="less">
.addQuestion {
  .title {
    background-color: #06b5fa;
    color: white;
    line-height: 50px;
    padding-left: 10px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .footer {
    text-align: center;
  }
  .el-dialog__body {
    margin-top: 30px;
    padding: 0 350px;
  }
  .el-select {
    width: 360px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }
  .line {
    margin-bottom: 30px;
  }
  .questionTitel {
    .el-form-item__label {
      float: none;
    }
  }
  .cascader {
    width: 360px;
  }
}
</style>
