export default {
  data() {
    return {
      fromId: '',
      oldKeys: { x: 0, y: 0 },
      keys: { x: 0, y: 0 },
      motionMode: null, // 设备运动模式
    };
  },
  computed: {
    peerId() { return this.$store.state.system.settings.peerId; },
    destId() { return this.$store.state.system.settings.destId; },
    type() { return this.$store.state.system.settings.type; },
  },
  mounted() {
    this.$store.commit('system/addLog', 'Data ready');
    this.$store.commit('system/addLog', `ID: ${this.peerId}`);
    this.$store.commit('system/addLog', `Target ID: ${this.destId}`);
  },
};
