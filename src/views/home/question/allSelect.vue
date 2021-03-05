<template>
  <div class="allSelect">
    <!-- 单选 -->
    <div v-if="form.type == 1">
      <el-row
        class="row"
        v-for="(item, index) in form.select_options"
        :key="index"
      >
        <el-col :span="16" :offset="2">
          <el-radio
            :label="item.label"
            v-model="form.single_select_answer"
            @change="radioChange"
          >
            {{ item.label }}
            <el-input v-model="item.text"></el-input>
          </el-radio>
        </el-col>
        <el-col :span="6">
          <!-- 使用子组件 -->
          <uploadImage :item="item"></uploadImage>
        </el-col>
      </el-row>
    </div>
    <!-- 多选 -->
    <div v-if="form.type == 2">
      <el-row
        class="row"
        v-for="(item, index) in form.select_options"
        :key="index"
      >
        <el-col :span="16" :offset="2">
          <el-checkbox
            :label="item.label"
            v-model="form.multiple_select_answer"
          >
            {{ item.label }}
            <el-input v-model="item.text"></el-input>
          </el-checkbox>
        </el-col>
        <el-col :span="6">
          <!-- 使用子组件 -->
          <uploadImage :item="item"></uploadImage>
        </el-col>
      </el-row>
    </div>
    <!-- 简答 -->
    <div v-if="form.type == 3">
      <p>
        <el-input
          v-model="form.short_answer"
          type="textarea"
          rows="5"
          placeholder
        ></el-input>
      </p>
    </div>
  </div>
</template>
<script>
//导入图片上传子组件
import uploadImage from './uploadImage'
export default {
  //新增的整个对象
  props: ['form'],
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    radioChange () {
      this.$emit('validateForm', 'single_select_answer')
    }
  },
  //注册子组件
  components: {
    uploadImage
  }
}
</script>

<style lang="less">
.allSelect {
  .row {
    display: flex;
    align-items: center;
    input.el-input__inner {
      width: 330px;
      margin-left: 10px;
    }
  }
}
</style>
