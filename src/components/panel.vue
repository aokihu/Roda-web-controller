<style lang="scss">
.my-panel {
  display: flex;
  flex-direction: column;
  // border: 1px solid $grey-3;
  background-color: $grey-1;
  overflow: hidden;

  .label > span {
    display: inline-block;
    background-color: $grey-3;
    padding: 3px 16px;
    color: $grey-3;
    margin-bottom: 3px;
    font-size: 12px;
  }

  .slot {
    flex:1
  }
}
</style>

<template>
  <div class="my-panel"
    :class="panelOverlayerClass"
    :style="{borderColor:brandColor, backgroundColor:backgroundColor}">
    <div class="label" :class="labelOverlayerClass" style="z-index: 1">
      <span :style={backgroundColor:brandColor}>{{label}}</span>
    </div>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { colors } from 'quasar';

const { changeAlpha } = colors;

export default {
  props: {
    label: { type: String, default: 'Label' },
    color: { default: '#90a4ae' },
    overlayer: { type: Boolean, default: false },
  },
  computed: {
    brandColor() {
      return this.color;
    },
    backgroundColor() {
      return changeAlpha(this.color, 0.05);
    },
    panelOverlayerClass() {
      return this.overlayer ? 'relative-position' : null;
    },
    labelOverlayerClass() {
      return this.overlayer ? 'absolute-top-left' : null;
    },
  },
};
</script>
