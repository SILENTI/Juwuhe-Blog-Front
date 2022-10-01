<template>
  <div class="main">
    <el-form :model="form" label-width="auto">

      <!--文章标题-->
      <el-form-item label="文章标题">
        <el-input v-model="form.articleTitle"/>
      </el-form-item>

      <!--文章封面描述-->
      <div class="cover-abstract">
        <!--文章封面-->
        <el-form-item label="封面摘要">
          <div style="display: flex; width: 432px; height: 100px;">
            <div style="margin-right: 10px; display: flex; align-items: center">
              <el-upload
                  v-if="form.articleImg === ''"
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
              >
                <img v-if="form.articleImg != ''" :src="imageUrl" class="avatar"/>
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
              </el-upload>
            </div>

            <div style="width: 100%; height: 100px;">
              <!--文章摘要-->
              <el-input
                  v-model="form.articleDescription"
                  :autosize="false"
                  type="textarea"
                  placeholder="Please input"
                  resize='none'
                  :rows="4"
              />
            </div>
          </div>
        </el-form-item>

      </div>

      <!--文章分類-->
      <el-form-item label="文章分类">
        <el-tree-select v-model="value" :data="data" :render-after-expand="false"/>
      </el-form-item>


      <!--文章標簽-->
      <el-form-item label="文章标签">
      </el-form-item>

      <!--提交按钮-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {ref} from 'vue'
import {Delete, Download, Plus, ZoomIn} from '@element-plus/icons-vue'

export default {
  articleTitle: "ArticleInFo",
  components: {Delete, Download, Plus, ZoomIn},
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        articleTitle: '',
        articleDescription: '',
        classify: '',
        label: [],
        img: '',
        articleImg: '',
      },
    }
  },
  methods: {
    onSubmit(v) {
      console.log("提交表单")
    },
  }
}

</script>

<style lang="scss" scoped>

.main {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;


}

.avatar-uploader .avatar {
  width: 150px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 160px;
  height: 94px;
  text-align: center;
}

</style>
