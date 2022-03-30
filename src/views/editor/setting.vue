<template>
  <div class="setting" :class="show ? 'active' : ''">
    <IconSvg class="btn" name="shuangjiantou" @click="handleDradwer" />
    <div class="content">
      <div class="tab-head">
        <template v-for="item in tabs" :key="item.id">
          <div :class="tabInx === item.id ? 'active' : ''" @click="tabClick(item.id)">
            <IconSvg :name="item.icon" />
            <span>{{ item.label }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconSvg from '@/components/icon-svg/index.vue'

export default defineComponent({
  name: 'Editor',
  components: { IconSvg },
  setup() {
    const show = ref(false)
    const tabInx = ref(1)
    const tabs = [
      {
        id: 1,
        label: '配置',
        icon: 'canshushezhi'
      },
      {
        id: 2,
        label: '数据',
        icon: 'relation-analysis-full'
      },
      {
        id: 3,
        label: '参数',
        icon: 'navicon-zdcs'
      }
    ]

    const handleDradwer = (): void => {
      show.value = !show.value
    }

    const tabClick = (inx: number): void => {
      tabInx.value = inx
    }

    return {
      show,
      tabInx,
      tabs,
      handleDradwer,
      tabClick
    }
  }
})
</script>

<style lang="postcss" scoped>
.setting {
  position: relative;
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
  .content {
    position: relative;
  }
  .tab-head {
    display: flex;
    height: 40px;
    color: #fff;
    background-color: #141414;
    font-size: 12px;
    & > div {
      flex: 1 1;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid transparent;
      cursor: pointer;
    }
    .active {
      color: var(--color-primary);
      border-bottom-color: var(--color-primary);
      .cicada__icon {
        fill: var(--color-primary);
      }
    }
    .cicada__icon {
      width: 17px;
      height: 17px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>
