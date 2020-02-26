<style lang="scss">
.keyboard6{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 12px;

  .keyW{
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }

  .keyA{
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }

  .keyS{
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  .keyD{
    grid-row: 2 / 3;
    grid-column: 3 / 4;
  }
  .keySpace {
    grid-row: 3/4;
    grid-column: 1/4;
  }
}
</style>

<template>
  <panel class="fit" label="CONTROLLER">
  <div class="fit relative-position">
    <div class="absolute-top-right">
      <q-icon :name="iconNavigation"
              size="48px"
              class="q-ma-xs"
              :color="directionColor"
              :style="directionRotation"
              style="transition: all 150ms ease-out" />
    </div>
    <div v-if="!isConnected" class="fit row justify-center items-center relative-position">
      <q-icon :name="icon" color="blue-3" size="64px" class="absolute-top-left q-ma-xs" />
      <div class="keyboard6">
      <q-btn size="lg"
             label="W" push :color="colorW" class="keyW" :class="{'q-btn--active':activeW}" />
      <q-btn size="lg"
             label="A" push :color="colorA" class="keyA" :class="{'q-btn--active':activeA}" />
      <q-btn size="lg"
             label="S" push :color="colorS" class="keyS" :class="{'q-btn--active':activeS}" />
      <q-btn size="lg"
             label="D" push :color="colorD" class="keyD" :class="{'q-btn--active':activeD}" />
      <q-btn size="lg"
             label="SPACE" push :color="colorSPACE"
             class="keySpace" :class="{'q-btn--active':activeSPACE}" />
      </div>
    </div>
  </div>
  </panel>
</template>

<script>
import {
  mdiKeyboard, mdiNavigation,
} from '@quasar/extras/mdi-v4';
import Panel from './panel';

export default {
  components: { Panel },
  computed: {
    isConnected() { return this.$store.state.gamepad.count > 0; },
    activeW() { return this.$store.state.gamepad.keyboard.keyW; },
    activeS() { return this.$store.state.gamepad.keyboard.keyS; },
    activeA() { return this.$store.state.gamepad.keyboard.keyA; },
    activeD() { return this.$store.state.gamepad.keyboard.keyD; },
    activeSPACE() { return this.$store.state.gamepad.keyboard.keySPACE; },
    colorW() { return this.activeW ? 'pink-8' : 'blue-7'; },
    colorA() { return this.activeA ? 'pink-8' : 'blue-7'; },
    colorS() { return this.activeS ? 'pink-8' : 'blue-7'; },
    colorD() { return this.activeD ? 'pink-8' : 'blue-7'; },
    colorSPACE() { return this.activeSPACE ? 'pink-8' : 'blue-7'; },
    directionRotation() {
      const { x, y } = this.$store.state.gamepad.motion;
      if (y === 0 && x === 1) return 'transform: rotate(90deg)';
      if (y === 0 && x === -1) return 'transform: rotate(-90deg)';
      if (y === 1 && x === 1) return 'transform: rotate(45deg)';
      if (y === 1 && x === -1) return 'transform: rotate(-45deg)';
      if (y === -1 && x === 0) return 'transform: rotateX(180deg)';
      if (y === -1 && x === 1) return 'transform: rotate(135deg)';
      if (y === -1 && x === -1) return 'transform: rotate(-135deg)';
      return null;
    },
    directionColor() {
      const { x, y } = this.$store.state.gamepad.motion;
      return x === 0 && y === 0 ? 'blue-3' : 'blue-6';
    },
  },
  created() {
    this.icon = mdiKeyboard;
    this.iconNavigation = mdiNavigation;
  },
};
</script>
