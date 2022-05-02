<template>
  <div class="attr-setting" :class="show ? 'active' : ''">
    <IconSvg class="btn" name="shuangjiantou" @click="handleDradwer" />
    <div class="tabs">
      <div class="tabs-header">
        <div
          v-for="item in tabs"
          :key="item.name"
          class="item"
          :class="tabctive === item.name ? 'active' : ''"
          @click="tabClick(item.name)">
          <IconSvg :name="item.icon" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconSvg from '@/components/icon-svg/index.vue'
export default defineComponent({
  name: 'AttrSetting',
  components: { IconSvg },
  setup() {
    const show = ref(false)
    const handleDradwer = (): void => {
      show.value = !show.value
    }
    const tabctive = ref('setting')
    const tabs = [
      {
        label: '配置',
        name: 'setting',
        icon: 'canshushezhi'
      },
      {
        label: '数据',
        name: 'data',
        icon: 'relation-analysis-full'
      },
      {
        label: '参数',
        name: 'params',
        icon: 'navicon-zdcs'
      }
    ]
    const tabClick = (name: string): void => {
      tabctive.value = name
    }
    return {
      show,
      handleDradwer,
      tabs,
      tabctive,
      tabClick
    }
  }
})
</script>

<style lang="postcss" scoped>
.attr-setting {
  position: absolute;
  right: 0;
  height: 100%;
  width: 0;
  background: #24282e;
  transition: all 0.3s ease-in-out;
  z-index: 100;
  &.active {
    width: 340px;
  }
  svg.btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -32px;
    fill: #fff;
    padding: 6px;
    background: #24282e;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 12px 0;
    &:hover {
      fill: var(--color-primary);
    }
  }
  .tabs {
    position: relative;
    &-header {
      position: relative;
      display: flex;
      align-items: center;
      height: 40px;
      background: #27343e;
      .item {
        flex: 1;
        line-height: 40px;
        color: #bcc9d4;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        &.active {
          color: #409eff;
          border-bottom: 1px solid #409eff;
        }
      }
      .cicada__icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }
  }
}
</style>
