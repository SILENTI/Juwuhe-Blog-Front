<template>
  <div class="gallery-main" @mousewheel="handleWheelEvent">

    <el-card class="image-card" style="display: flex; align-items: center; justify-content: center;" >
      <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <el-icon  style="font-size: 3.5em">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-card>


    <el-card class="image-card" v-for="(img,index) in imgList">
      <el-image
          class="image"
          :key="img"
          :src="img"
          :preview-src-list="imgList"
          :initial-index="index"
          fit="cover"
          lazy
      />
    </el-card>
  </div>
</template>

<script>
import {Plus} from '@element-plus/icons-vue'

export default {
  name: "Gallery",
  components: {Plus},
  data() {
    return {
      imgList: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        'https://w.wallhaven.cc/full/e7/wallhaven-e7dlqo.jpg',
        'https://w.wallhaven.cc/full/gp/wallhaven-gpz2g7.jpg', 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        'https://w.wallhaven.cc/full/e7/wallhaven-e7dlqo.jpg', 'https://w.wallhaven.cc/full/gp/wallhaven-gpz2g7.jpg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        'https://w.wallhaven.cc/full/e7/wallhaven-e7dlqo.jpg', 'https://w.wallhaven.cc/full/gp/wallhaven-gpz2g7.jpg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        'https://w.wallhaven.cc/full/e7/wallhaven-e7dlqo.jpg', 'https://w.wallhaven.cc/full/gp/wallhaven-gpz2g7.jpg',
      ]
    }
  }, methods: {
    handleWheelEvent(e) {
      // 滚动轴【鼠标】横向滚动
      let tabsContainer = document.querySelector(".gallery-main");
      tabsContainer.addEventListener("wheel", (event) => {
        event.preventDefault();
        tabsContainer.scrollLeft += event.deltaY;
      });

    },
  }

}
</script>

<style lang="scss" scoped>

.gallery-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  align-items: flex-start;
  overflow: scroll;
}

.image-card {
  width: 230px;
  height: 200px;
  margin: 5px 10px;
}

.image {
  width: 100%;
  height: 100%;
}

.image-upload {
  width: 230px;
  height: 200px;
  margin: 5px 10px;
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-card-border-radius);
}


</style>
