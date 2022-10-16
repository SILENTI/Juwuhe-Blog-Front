<template>

  <Transition>
    <Animation v-if="isShow"/>
  </Transition>

  <div v-show="!isShow" class="main">

    <!--分类信息-->
    <div class="column">
      <el-tree
          v-if="this.classifyList.length > 0"
          :data="this.classifyList"
          node-key="classifyId"
          :props="{ children: 'childrenClassify',label: 'classifyName'}"
          default-expand-all
          @node-drop="handleDrop"
          draggable
      >
        <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ data.classifyName }}</span>
            <span>

              <el-popover placement="left" trigger="click">
                <template #reference>
                  <el-button size="small" plain type="primary"> 添 加 </el-button>
                </template>
                <el-input v-model="inputClassifyValue" size="small" @keyup.enter="addClassify(node)" clearable
                          placeholder="Please input"/>
              </el-popover>

              <el-popconfirm
                  confirm-button-text="确认"
                  cancel-button-text="取消  "
                  icon-color="red"
                  title="确认删除该分类?"
                  @confirm="removeClassify(node, data)"
              >
                <template #reference>
                  <el-button size="small" plain type="danger"> 删 除 </el-button>
                </template>
              </el-popconfirm>
            </span>
          </span>
        </template>
      </el-tree>

      <el-empty v-else description="description"/>
    </div>

    <!--标签信息-->
    <div class="column">

      <div v-if="this.labelList.length > 0">
        <!--标签信息展示-->
        <el-button-group v-for="(label, index) in labelList" style="margin: 10px;">
          <el-button
              size="small"
              :key="label.labelId"
              :type="this.randomNumType()"
          >{{ label.labelName }}
          </el-button>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon-color="red"
              title="确认要删除该标签?"
              @confirm="removeLabel(label,index)"
              width="170px"
          >
            <template #reference>
              <el-button size="small">
                <el-icon>
                  <delete/>
                </el-icon>
              </el-button>
            </template>
          </el-popconfirm>
        </el-button-group>

        <!--标签信息输入-->
        <el-input
            class="input-new-tag"
            v-if="labelInput"
            v-model="inputLabelValue"
            ref="saveTagInput"
            @keyup.enter.native="handleInputConfirm"
        />

        <!--添加标签-->
        <el-tag v-else style="margin: 10px 10px;  font-size: 14px; font-weight: bold;" @click="showLabelInput">+ New Tag
        </el-tag>
      </div>

      <!--空状态-->
      <el-empty v-else description="description"/>

    </div>

  </div>

</template>

<script>
import {addLabel, queryAllLabel, removeLabel} from "@/api/label";
import {Delete} from '@element-plus/icons-vue'
import {ElNotification} from 'element-plus'
import {addClassify, queryAllClassify, removeClassify, updateClassify} from "@/api/classify";
import Animation from "@/components/shared/Animation.vue";
import {createApp} from "vue";

export default {
  name: "ClassifyLabel",
  components: {
    Delete, Animation
  },
  data() {
    return {
      classifyList: [],
      labelList: [],
      inputClassifyValue: '',
      labelType: ['primary', 'success', 'info', 'warning', 'danger'],
      labelInput: false,
      inputLabelValue: '',
      isShow: true
    };
  },
  /**钩子*/
  created() {
    //加载文章分类信息
    this.queryAllClassify();

    //加载所有文章标签
    this.getLabelList();

    setTimeout(() => {
      // 方法区
      this.isShow = false
    }, 1000);
  },
  methods: {
    /**文章分类相关*/

    //加载分类信息
    queryAllClassify() {
      queryAllClassify().then(res => {
        console.log('============ 分类信息 =============')
        if (res.success) {
          this.classifyList = res.data;
        } else {
          console.log(res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    //添加节点
    addClassify(node) {
      addClassify({
        'parentClassifyId': node.data.classifyId,
        'classifyName': this.inputClassifyValue
      }).then(res => {
        console.log(res)
        if (res.success) {
          this.Notification('success', res.message);
          this.queryAllClassify();
        } else {
          this.Notification('error', res.message);
        }
      }).catch(error => {

      })

    },

    //删除节点
    removeClassify(node, data) {
      console.log('总节点：', data)
      let classifyIdList = []
      this.getRemoveClassifyIdList(data, classifyIdList)

      //发送请求
      removeClassify(classifyIdList).then(res =>{
        if (res.success){
          this.Notification('success', res.message)
          this.queryAllClassify();
        }else {
          this.Notification('error', res.message)
        }
      }).catch(error =>{
        this.Notification('error', error.message)
      })
    },

    //获取删除节点旗下的ID集合
    getRemoveClassifyIdList(node, array) {
      array.push(node.classifyId);
      if (node.childrenClassify === null || node.childrenClassify.length === 0) {
        return array;
      }
      for (const nodeElement of node.childrenClassify) {
        this.getRemoveClassifyIdList(nodeElement, array)
      }
    },

    //节点拖动
    handleDrop(draggingNode, dropNode, dropType, ev) {

      let newParentClassifyId = null;
      let oldParentClassifyId = draggingNode.data.parentClassifyId;

      let classify = draggingNode.data;
      classify.childrenClassify = null;

      if (dropType == 'after' || dropType == 'before') {
        classify.parentClassifyId = dropNode.data.parentClassifyId;
      } else {
        classify.parentClassifyId = dropNode.data.classifyId;
      }

      if (oldParentClassifyId == newParentClassifyId) {
        console.log('无需修改')
        return;
      }

      //更新分类信息
      updateClassify(classify).then(res => {
        console.log(res)
        if (res.success) {
          ElNotification({
            title: 'Success',
            message: res.message,
            type: 'success',
          })
        } else {
          ElNotification({
            title: 'Error',
            message: res.message,
            type: 'error',
          })
        }

        //刷新
        this.queryAllClassify();

      }).catch(error => {
        console.log(error)
      })

      console.log(classifyId, '=====', newParentClassifyId)
    },

    /**文章标签相关*/
    //展示输入框
    showLabelInput() {
      this.labelInput = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    //添加文章标签
    handleInputConfirm() {
      //发送请求添加标签信息
      addLabel({labelName: this.inputLabelValue,}).then(res => {
        if (res.success) {
          //添加标签
          this.labelList.push(res.data)
        } else {
          console.log(res.message)
        }
      }).catch(error => {
        console.log(error)
      })
      this.labelInput = false;
      this.inputLabelValue = '';
    },

    //文章标签删除
    removeLabel(label, index) {
      //发送请求
      removeLabel(label).then(res => {
        if (res.success) {
          this.labelList.splice(index, 1)
        } else {
          console.log(res.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    //加载文章标签
    getLabelList() {
      queryAllLabel().then(res => {
        console.log(res)
        if (res.success) {
          this.labelList = res.data
        } else {
          console.log('========== 加载文章标签失败 ==========')
        }
      }).catch(error => {
        console.log(error)
      })
    },

    /**工具函数*/
    randomNumType() {
      const num = Math.floor(Math.random() * (4 - 0 + 1)) + 0
      return this.labelType.at(num)
    },
    Notification(type, message) {
      ElNotification({
        title: type,
        message: message,
        type: type,
      })
    },
  }
}
</script>

<style lang="scss" scoped>

.main {

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-evenly;

  .column {
    width: 550px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}


</style>
