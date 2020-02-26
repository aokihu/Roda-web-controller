<style lang="scss">
.message-log-item {
  display: flex;
  font-size: 12px;
  padding: 2px 12px;
  overflow: hidden;

  .icon {
    width: 20px;
  }

  .content {
    flex:1;
  }

  .timestamp {
    width: 20%;
    min-width: 60px;
    color: $grey-6;
  }
}
</style>

<template>
  <panel class="fit" label="MESSAGE">
  <q-scroll-area class="fit">
    <template v-for="log of logs">
      <div :key="`log-${log.index}`" class="message-log-item">
        <span class="timestamp">[{{log.time}}]</span>
        <span :class="logColor(log.type)" class="icon">
          <q-icon :name="logIcon(log.type)" size="16px" />
        </span>
        <span :class="logColor(log.type)" class="content">{{log.content}}</span>
      </div>
    </template>
  </q-scroll-area>
  </panel>
</template>

<script>
import { mdiMessageArrowRight, mdiMessageArrowLeft } from '@quasar/extras/mdi-v4';
import Panel from './panel';

export default {
  components: { Panel },
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
