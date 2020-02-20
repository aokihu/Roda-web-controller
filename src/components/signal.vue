<template>
  <div>
    <!-- P2P -->
    <q-chip square label="TARGET" size="sm" :icon="p2pSignalIcon"
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
    serverSignalIcon() {
      const { isConnected } = this.$store.state.system.server;
      return isConnected ? this.signalConnect : this.signalDsiconnect;
    },
    serverSignalBgColor() {
      const { isConnected } = this.$store.state.system.server;
      return isConnected ? 'green-6' : 'grey-4';
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
      const { isConnected } = this.$store.state.system.p2p;
      return isConnected ? 'green-6' : 'grey-4';
    },
    p2pSignalTextColor() {
      const { isConnected } = this.$store.state.system.p2p;
      return isConnected ? 'white' : 'grey-9';
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
