<template>
  <q-scroll-area class="fit">
    <q-list dense>
      <template v-for="log of logs">
        <q-item :key="`log-${log.index}`" active :active-class="logColor(log.type)">
          <q-item-section avatar>
            <q-icon :name="logIcon(log.type)" />
          </q-item-section>
          <q-item-section>{{log.content}}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { mdiMessageArrowRight, mdiMessageArrowLeft } from '@quasar/extras/mdi-v4';

export default {
  computed: {
    logs() { return this.$store.state.system.datastream.list; },
  },
  methods: {
    logColor(type) {
      switch (type) {
        case 1:
          return 'text-blue-6';
        case 0:
        default:
          return 'text-orange-7';
      }
    },
    logIcon(type) {
      switch (type) {
        case 0:
        default:
          return this.sendIcon;
        case 1:
          return this.recvIcon;
      }
    },
  },
  created() {
    this.recvIcon = mdiMessageArrowRight;
    this.sendIcon = mdiMessageArrowLeft;
  },
};
</script>
