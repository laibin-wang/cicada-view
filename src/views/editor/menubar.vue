<template>
  <div class="menubar">
    <div class="menubar_anticon">
      <div class="menubar-item" :class="currentMenu===item.name?'active':''" v-for="item in bars" :key="item.name" @click="menuClick(item.name)">
        <IconSvg :name="item.icon" />
      </div>
    </div>
    <div class="menubar_components">
      module
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconSvg from '@/components/icon-svg/index.vue'

export default defineComponent({
  name: 'Menubar',
  components: { IconSvg },
  setup () {
    const bars = [{
      name: 'layer',
      lable: '图层',
      icon: 'tuceng'
    }, {
      name: 'charts',
      lable: '图表',
      icon: 'tubiaoxinxi_huaban'
    }, {
      name: 'table',
      lable: '表格',
      icon: 'jurassic_edit-table'
    }, {
      name: 'text',
      lable: '文本',
      icon: 'WenBen'
    }, {
      name: 'image',
      lable: '图片',
      icon: 'tupian'
    }]

    const currentMenu = ref('layer')

    const menuClick = (name: string):void => {
      currentMenu.value = name
    }

    return {
      bars,
      currentMenu,
      menuClick
    }
  }
})
</script>


<style lang="postcss" scoped>
.menubar {
  display: flex;
  z-index: 3;
  &_anticon {
    width: 40px;
    background-color: #141414;
    .menubar-item{
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      .cicada__icon{
        height: 16px;
        width: 16px;
      }
      &.active,
      &:hover{
        background-color: #24282e;
        border-radius: 15px 0 0 15px;
      }
    }
  }
  &_components {
    width: 160px;
    background-color: #24282e;
  }
}
</style>
