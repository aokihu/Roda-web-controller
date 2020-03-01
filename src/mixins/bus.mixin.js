export default {
  mounted() {
    // 发起P2P请求
    this.$bus.on('p2p_connect', ({ type }) => {
      switch (type) {
        case 'data':
        default:
          this.$peerCreate();
          this.$store.commit('system/addSuccessLog', 'P2P[Data] Connect...');
          break;
        case 'media':
          // eslint-disable-next-line no-case-declarations
          const video = document.querySelector('#montior');
          this.$mediaStreamPeerCreate(video);
          this.$store.commit('system/addSuccessLog', 'P2P[Media] Connect...');
          break;
      }
    });

    // 处理预备拨号
    this.$bus.on('prepare_call', () => {
      const { peerId, destId } = this.$store.state.system.settings;
      this.$socket.emit('prepare_call', { fromId: peerId, destId, type: 'data' });
    });

    // 断开P2P连接
    this.$bus.on('hang_up', () => {
      this.$peer.destroy();
    });


    // 处理目标终端设备上线消息
    this.$bus.on('target_device_online', () => {
      this.$store.commit('system/p2pOnline');
    });

    // 处理目标终端设备下线消息
    this.$bus.on('target_device_offline', () => {
      this.$store.commit('system/p2pOffline');
    });
  },
};
