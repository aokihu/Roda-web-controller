<template>
  <div>
    <!-- P2P -->
    <q-chip square size="sm" :outline="p2pSignalOutline"
            :label="targetId" :icon="p2pSignalIcon"
            :color="p2pSignalBgColor"
            :text-color="p2pSignalTextColor" />
    <!-- 服务器连接状态 -->
    <q-chip square label="SERVER" size="sm" :icon="serverSignalIcon"
            :color="serverSignalBgColor"
            :text-color="serverSignalTextColor" />
    <q-btn label="Connect" size="sm" color="cyan-6" unelevated
          v-if="!isP2PConnected"
          :disable="connectBtnDisable"
          @click="connect" />
    <q-btn label="Disconnect" size="sm" color="pink-7" unelevated
          v-if="isP2PConnected"
          @click="disconnect" />
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
      if (isOnline) return 'light-green-2';
      return 'grey-4';
    },
    p2pSignalOutline() {
      const { isConnected, isOnline } = this.$store.state.system.p2p;
      if (!isConnected && isOnline) return true;
      return false;
    },
    p2pSignalTextColor() {
      const { isConnected, isOnline } = this.$store.state.system.p2p;
      return isConnected || isOnline ? 'white' : 'grey-9';
    },
    isP2PConnected() { return this.$store.state.system.p2p.isConnected; },
    connectBtnDisable() {
      const { isConnected, isOnline } = this.$store.state.system.p2p;
      return isConnected ? true : !isOnline;
    },
  },
  methods: {
    // P2P连接
    connect() {
      this.$bus.emit('prepare_call');
    },
    // P2P断开连接
    disconnect() {
      this.$bus.emit('hang_up');
      this.$store.commit('system/p2pDisconnected');
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
