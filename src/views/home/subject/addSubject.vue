<template>
  <div class="addSuject">
    <!-- visible.sync="设置弹框显示与消失" -->
    <el-dialog :visible.sync="isShow" width="600px">
      <div slot="title">
        <div class="title">{{mode==='add'?'新增学科':'编辑学科'}}</div>
      </div>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary" @click="submitClick">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入封装好的接口
import { addSubjectApi, editSubjectApi } from "@/api/index";
export default {
  //当前面板模式
  //当前数据源
  props: ["mode", "formData"],
  data() {
    return {
      isShow: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
      },
    };
  },
  watch: {
    mode(val) {
      //新增模式
      if (val === "add") {
        this.form = {
          rid: "",
          name: "",
          short_name: "",
          intro: "",
          remark: "",
        };
      } else {
        //编辑模式
        //使用深拷贝将formData赋值给form
        this.form = JSON.parse(JSON.stringify(this.formData));
      }
    },
  },
  methods: {
    submitClick() {
      this.$refs.form.validate((result) => {
        if (result) {
          if (this.mode === "add") {
            addSubjectApi(this.form).then(() => {
              this.$message.success("新增成功");
              //重置表单数据
              this.$refs.form.resetFields();
              this.isShow = false;
              // this.$parent.search();
              this.$emit("getData");
            });
          } else {
            editSubjectApi(this.form).then(() => {
              this.$message.success("修改成功");
              this.isShow = false;
              this.$emit("getData");
            });
          }
        }
      });
    },
  },
};
</script>

<style lang='less'>
.addSuject {
  .title {
    line-height: 53px;
    text-align: center;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fefefe;
    background: linear-gradient(90deg, #01c6fa, #1493fa);
  }
  .footer {
    text-align: center;
  }
  .el-dialog__header {
    padding: 0;
  }
}
</style>