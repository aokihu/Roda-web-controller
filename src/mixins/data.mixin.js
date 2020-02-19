export default {
  data() {
    return {
      peerId: '',
      fromId: '',
      destId: '',
      oldKeys: { x: 0, y: 0 },
      keys: { x: 0, y: 0 },
      motionMode: null, // 设备运动模式
    };
  },
  computed: {
    peerId() { return this.$store.state.system.settings; },
    destId() { return this.$store.state.system.settings; },
    type() { return this.$store.state.system.settings; },
  },
};
