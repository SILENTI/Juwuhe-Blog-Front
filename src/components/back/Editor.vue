<template>
  <!--文本编辑器-->
  <div class="editor-main">
    <md-editor-v3
        v-model="articleContent" style="height: 100%;"
        @on-html-changed="onHtmlChanged"
        @on-upload-img="onUploadImg"
        @on-save=" dialogVisible = true; getAllClassify(); getAllLabel(); "/>
  </div>

  <!--保存提示内容-->
  <el-dialog
      v-model="dialogVisible"
      title="详细内容"
      width="550px"
      align-center
      center
  >
    <el-form :model="articleForm" label-width="auto">

      <!--文章标题-->
      <el-form-item label="文章标题">
        <el-input v-model="articleForm.articleTitle"/>
      </el-form-item>

      <!--文章摘要-->
      <el-form-item label="文章摘要">
        <el-input
            v-model="articleForm.articleDescription"
            :rows="3"
            type="textarea"
            placeholder="Please input"
            show-word-limit
            maxlength="50"
        />
      </el-form-item>

      <!--文章分類標簽-->
      <el-form-item label="文章分类">
        <el-tree-select
            :props="{  children: 'childrenClassify',label: 'classifyName'}"
            ref="treeRef"
            v-model="classifyName"
            :data="classifyData"
            node-key="classifyName"
            check-strictly
            :render-after-expand="false"
            show-checkbox
            style="width: 100%;"
            @check-change="getCheckedNodes"
        />
      </el-form-item>

      <!--文章标签-->
      <el-form-item label="文章标签">
        <el-select
            v-model="articleForm.labelList"
            multiple
            style="width: 100%"
        >
          <el-option
              v-for="item in options"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
          />
        </el-select>
      </el-form-item>

      <!--文章封面-->
      <el-form-item label="文章封面">
        <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            :limit="1"
            :http-request="uploadFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            style="width: 430px"
        >
          <el-button type="primary" size="small">上传图片</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <!--提交按钮-->
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false; onSave();">确认</el-button>
        <el-button @click="dialogVisible = false;">取消</el-button>
      </span>
    </template>
  </el-dialog>


</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import type {UploadProps, UploadUserFile} from 'element-plus'
import {ElNotification, ElTree} from 'element-plus'
import MdEditorV3 from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import axios from "axios";
import {useRouter} from "vue-router";
import {htmlToText} from "html-to-text";
import {saveArticle, saveEditArticle} from "/src/api/article.js";
import {Notification} from "/src/utils/elUtils.js";

/**工具函数类*/
const router = useRouter();

/**生命周期函数*/
onMounted(() => {
  getArticleUpdateInfo();
})

/**编辑器相关*/
//文章内容
const articleContent = ref('');

//判断是否是编辑保存
const changeArticleJudge = ref(false);

//文章相关信息
let articleForm = reactive({
  articleId: '',
  articleTitle: '',
  articleDescription: '',
  articleImg: '',
  articleContent: '',
  classifyId: 0,
  labelList: []
})

//文章编辑信息
const getArticleUpdateInfo = () => {

  if (router.currentRoute.value.params.article != undefined && router.currentRoute.value.params.article != null) {

    //编辑文章信息判断
    changeArticleJudge.value = true;

    //传递的文章信息
    let article = JSON.parse(<string>router.currentRoute.value.params.article);

    console.log('article', article)

    articleContent.value = htmlToText(article.articleContent);
    articleForm.articleId = article.articleId;
    articleForm.articleTitle = article.articleTitle;
    articleForm.articleContent = article.articleContent;
    articleForm.articleDescription = article.articleDescription;
    articleForm.articleImg = article.articleImg;

    //文章的分类信息和标签信息
    if (article.classifyVO != null) {
      articleForm.classifyId = article.classifyVO.classifyId;
      classifyName.value = article.classifyVO.classifyName;
    }

    if (article.labelVOList != null) {
      for (const labelListElement of article.labelVOList) {
        articleForm.labelList.push(labelListElement.labelId)
      }
    }
  }
}

//获取HTMl代码
const onHtmlChanged = (h) => {
  articleForm.articleContent = h;
}

//图片上传
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('image', file);
          form.append('token', '15c427d6abd4741a0aa90e27e45e65c4')
          axios
              .post('https://images.juwuhe.top/api/index.php', form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then((res) => rev(res))
              .catch((error) => rej(error));
        });
      })
  );
  callback(res.map((item) => item.data.url));
};

//保存文章
const onSave = () => {

  //判断文章保存还是文章修改
  if (changeArticleJudge) {
    console.log("=== 编辑事件 ===");
    saveEditArticle(articleForm).then(res => {
      if (res.success) {
        Notification("success", "保存成功");
      } else {
        Notification("error", "保存失败");
      }
    }).catch(error => {
      Notification("error", error.message);
    })
  } else {
    console.log("=== 保存事件 ===");
    axios({
      method: "post",
      url: '/api/article/save',
      data: articleForm
    }).then((response) => {
      console.log(response)
      if (response.data.success) {
        ElNotification({
          articleTitle: 'Success',
          message: response.data.message,
          type: 'success'
        })
      } else {
        ElNotification({
          articleTitle: 'Error',
          message: response.data.message,
          type: 'error',
        })
      }
    }).catch((error) => {
      ElNotification({
        articleTitle: 'Error',
        message: error.message,
        type: 'error',
      })
    })
  }
}

/**对话框-判断值*/
const dialogVisible = ref(false)

/**文章分类*/
//选中的分类节点名称
const classifyName = ref('');
//展示的数据
const classifyData = ref([]);
const treeRef = ref<InstanceType<typeof ElTree>>()
//获取分类信息
const getAllClassify = () => {
  console.log('====== 查询所有分类 =====')
  axios({
    method: 'post',
    url: '/api/classify/queryAll',
  }).then((res) => {
    console.log(res)
    if (res.data.success) {
      console.log(res.data.message)
      classifyData.value = res.data.data
      console.log(classifyData.value)
    } else {
      console.log(res.data.message)
    }
  }).catch((error) => {
    console.log(error)
  })
}
//获取Node节点
const getCheckedNodes = () => {
  treeRef.value!.getCheckedNodes(false, false).forEach(x => {
    articleForm.classifyId = x.classifyId;
  })
}

/**文章标签*/
//标签数组
const options = ref([])
//获取数据库中-所有的标签信息
const getAllLabel = () => {
  console.log('====== 查询所有标签 =====')
  axios({
    method: 'post',
    url: '/api/label/queryAll',
  }).then((res) => {
    console.log(res)
    if (res.data.success) {
      //操作成功！！！
      options.value = res.data.data
    } else {
      console.log(res.message)
    }
  }).catch((error) => {
    console.log(error)
  })
}

/**封面文件上传*/
//图片列表
const fileList = ref<UploadUserFile[]>([])
//图片上传
const uploadFile = (params) => {
  console.log('================ 文件上传 ================')
  const file = params.file;
  // 通过 FormData 对象上传文件
  const formData = new FormData();
  formData.append("image", file);
  formData.append('token', '15c427d6abd4741a0aa90e27e45e65c4');
  axios({
    method: 'post',
    url: 'https://images.juwuhe.top/api/index.php',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    if (res.data.result) {
      //将url复制到缩略图
      articleForm.articleImg = res.data.url;
      //消息提示
      ElNotification({
        articleTitle: 'Success',
        message: '上传成功',
        type: 'success'
      })
    } else {
      ElNotification({
        articleTitle: 'Error',
        message: '上传失败',
        type: 'error',
      })
      fileList.value.pop();
    }
    console.log(res)
  }).catch((error) => {
    ElNotification({
      articleTitle: 'Error',
      message: '上传失败',
      type: 'error',
    })
    fileList.value.pop();
    console.log(error)
  });

}
//移除上传图片
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
//图片预览
const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}


</script>

<style lang="scss" scoped>

.editor-main {
  width: 100%;
  height: 100%;
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
