<template>
  <q-scroll-area class="fit bg-grey-1">
    <div class="absolute-top-right">
      <q-chip color="teal-6" text-color="white" dense square label="LOG" />
    </div>
    <q-list dense>
      <template v-for="log of logs">
        <q-item :key="`log-${log.index}`" active :active-class="logColor(log.type)">
          <q-item-section>{{log.content}}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
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
