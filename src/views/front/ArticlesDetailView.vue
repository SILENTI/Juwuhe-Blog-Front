<template>
    <div v-html="this.blog">

    </div>
</template>

<script>
import {marked} from 'marked'

export default {
  name: "ArticlesDetailView",
  data(){
    return{
      blog: ''
    }
  },
  created() {
    this.getBlog()
  },
  methods: { readFile(filePath) {
      // 创建一个新的xhr对象
      let xhr = null
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        // eslint-disable-next-line
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
      const okStatus = document.location.protocol === 'file' ? 0 : 200
      xhr.open('GET', filePath, false)
      xhr.overrideMimeType('text/html;charset=utf-8')
      xhr.send(null)
      return xhr.status === okStatus ? xhr.responseText : null
    },
    getBlog(){
      this.blog = marked(this.readFile("/public/bolg/MySQL 安装配置.md"))
    }
  }
}
</script>

<style scoped>

</style>
