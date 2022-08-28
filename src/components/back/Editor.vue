<template>

  <div class="editor-main">
    <md-editor-v3 class="editor" v-model="editor.text"/>
  </div>

</template>

<script>

export default {
  name: 'editor',
  data() {
    return {
      editor:{
        //编辑的内容
        text: '',
        //编辑器的主题
        theme: 'light',
      },
    };
  }
};
</script>

<style lang="scss" scoped>

  .editor-main{
    width: 100%;
    height: 100%;

    .editor{
      width: 100%;
      height: 100%;
    }
  }

</style>
