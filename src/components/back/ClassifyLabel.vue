<template>

  <div class="main">

    <!--分类信息-->
    <div class="column">
      <el-tree
          :data="this.classify  "
          node-key="id"
          default-expand-all
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
      >
        <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
            <span>

              <el-popover placement="left">
                <template #reference>
                  <el-button size="small" link plain type="primary"> 添 加 </el-button>
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

export default {
  name: "ClassifyLabel",
  components: {
    Delete
  },
  data() {
    return {
      classify: [
        {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
              id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
      labelList: [],
      inputClassifyValue: '',
      labelType: ['primary', 'success', 'info', 'warning', 'danger'],
      labelInput: false,
      inputLabelValue: '',
    };
  },
  /**钩子*/
  created() {
    //加载所有文章标签
    this.getLabelList();
  },
  methods: {
    /**文章分类相关*/

    //添加节点
    addClassify(node) {
      console.log('添加节点')
      console.log(node.data)
      console.log(this.inputClassifyValue)
    },

    //删除节点
    removeClassify(node, data) {
      console.log('删除节点')
      console.log(node)
      console.log(data)
    },

    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    },

    /**文章标签相关*/
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

    confirmEvent() {
      console.log('===================== 提示删除 ============================')
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
    }
  }
}
</script>

<style lang="scss" scoped>

.main {

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
