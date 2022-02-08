<template>
  <svg class="cicada__icon" aria-hidden="true">
    <use :xlink:href="`#icon-${iName}`"></use>
  </svg>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'IconSvg',
  props: {
    name: {
      type: String,
      default: 'cicada'
    }
  },
  setup(props) {
    const iName = computed(() => {
      return props.name || 'cicada'
    })

    return {
      iName
    }
  }
})
</script>

<style lang="postcss" scoped>
.cicada__icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
