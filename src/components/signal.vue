<template>
  <div>
    <!-- P2P -->
    <q-chip square
            :label="targetId" size="sm" :icon="p2pSignalIcon"
            :color="p2pSignalBgColor"
            :text-color="p2pSignalTextColor" />
    <!-- 服务器连接状态 -->
    <q-chip square label="SERVER" size="sm" :icon="serverSignalIcon"
            :color="serverSignalBgColor"
            :text-color="serverSignalTextColor" />
  </div>
</template>

<script>
import {
  mdiNetworkStrengthOff, mdiNetworkStrength4, mdiLanDisconnect, mdiLanConnect,
} from '@quasar/extras/mdi-v4';
// 信号指示器
export default {
  computed: {
    targetId() { return this.$store.state.system.settings.destId; },
    serverSignalIcon() {
      const { isConnected } = this.$store.state.system.server;
      return isConnected ? this.signalConnect : this.signalDsiconnect;
    },
    serverSignalBgColor() {
      const { isConnected } = this.$store.state.system.server;
      if (isConnected) { return 'green-6'; }
      return 'grey-4';
    },
    serverSignalTextColor() {
      const { isConnected } = this.$store.state.system.server;
      return isConnected ? 'white' : 'grey-9';
    },
    p2pSignalIcon() {
      const { isConnected } = this.$store.state.system.p2p;
      return isConnected ? this.p2pConnect : this.p2pDisconnect;
    },
    p2pSignalBgColor() {
      const { isConnected, isOnline } = this.$store.state.system.p2p;
      if (isConnected) return 'green-6';
      if (isOnline) return 'blue-5';
      return 'grey-4';
    },
    p2pSignalTextColor() {
      const { isConnected, isOnline } = this.$store.state.system.p2p;
      return isConnected || isOnline ? 'white' : 'grey-9';
    },
  },
  created() {
    this.signalDsiconnect = mdiNetworkStrengthOff;
    this.signalConnect = mdiNetworkStrength4;
    this.p2pConnect = mdiLanConnect;
    this.p2pDisconnect = mdiLanDisconnect;
  },
};
</script>
