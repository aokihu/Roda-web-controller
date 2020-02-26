<style lang="scss">
.log-item {
  display: flex;
  user-select: none;
  font-size: 12px;
  padding: 2px 12px;
  cursor: default;
  overflow: hidden;

  .timestamp {
    width: 20%;
    min-width: 60px;
    color: $grey-6;
  }

  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
<template>
  <panel class="fit" label="LOG">
  <q-scroll-area class="fit">
    <template v-for="log of logs">
      <div :key="`log-${log.index}`"
           class="log-item">
           <span class="timestamp">[{{log.time}}]</span>
           <span class="content" :class='logColor(log.type)'>{{log.content}}</span>
       </div>
    </template>
  </q-scroll-area>
  </panel>
</template>

<script>
import Panel from './panel';

export default {
  components: { Panel },
  computed: {
    logs() { return this.$store.state.system.log.list; },
  },
  methods: {
    logColor(type) {
      switch (type) {
        case 1:
          return 'text-green-8';
        case 2:
          return 'text-red-7';
        case 3:
          return 'text-orange-6';
        case 0:
        default:
          return 'text-grey-5';
      }
    },
  },
};
</script>
