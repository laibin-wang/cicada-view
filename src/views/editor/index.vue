<template>
  <div class="cicada-view-editor">
    <div class="head">
      <div class="head-left">
        <icon-svg></icon-svg>
        <span>Cicada View</span>
      </div>
      <div class="head-middle">
        <span>大屏测试</span>
      </div>
      <div class="head-right"></div>
    </div>
    <div class="main">
      <div class="menu">
        <div class="menu_anticon">anticon</div>
        <div class="menu_components">module</div>
      </div>
      <div class="section-mark">
        <sketch-ruler :isShowReferLine="true" :isShowRuler="true" :startX="-25" :startY="-25" :width="5000" :height="3000"></sketch-ruler>
        <!-- <div class="section-box">
          <div class="screen">aaaa</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SketchRuler from '@/components/sketch-ruler/index'
import IconSvg from '@/components/icon-svg/index.vue'

export default defineComponent({
  name: 'Editor',
  components: { SketchRuler, IconSvg },
  setup() {}
})
</script>

<style lang="postcss" scoped>
.cicada-view-editor{
  position: relative;
  height: 100%;
  width: 100%;
  .head {
    position: relative;
    height: 40px;
    width: 100%;
    &-left{
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      height: 40px;
    }
    .cicada__icon{
      padding: 0 8px;
      width: 1.5em;
      height: 1.5em;
    }
    span{
      color: #fff;
      font-size: 16px;
    }
    &-middle{
      position: relative;
      text-align: center;
      width: 100%;
      line-height: 40px;
      height: 40px;
    }
  }
  .main{
    position: relative;
    width: 100%;
    height: calc(100vh - 40px);
    display: flex;
  }
  .menu{
    display: flex;
    z-index: 3;
    &_anticon{
      width: 40px;
      background-color: #141414;
    }
    &_components{
      width: 160px;
      background-color: #24282e;
    }
  }
  .section-mark{
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>
