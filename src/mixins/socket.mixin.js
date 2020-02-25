export default {
  mounted() {
    // ------------- Socket 连接事件 --------------------------
    this.$socket.on('connect', () => {
      this.$store.commit('system/addSuccessLog', 'Socket connected');
      this.$store.commit('system/serverConnected');
      this.$socket.emit('register', { id: this.peerId, type: this.type, renew: true });
    });

    this.$socket.on('disconnect', () => {
      this.$store.commit('system/addFailLog', 'Socket disconnect');
      this.$store.commit('system/serverDisconnected');
    });

    this.$socket.on('reconnecting', (attemptNumber) => {
      this.$store.commit('system/addLog', `Socket reconnecting... (${attemptNumber})`);
    });

    this.$socket.on('reconnect', (attemptNumber) => {
      this.$store.commit('system/addSuccessLog', `Socket reconnected (${attemptNumber})`);
    });

    // -------------------------------------------------------

    this.$socket.on('register_success', () => {
      this.$store.commit('system/addSuccessLog', 'Register success');
      // 向目标设备发送准备呼叫的消息

      // 👇这部分操作将会改成用户手动连接
      // this.$socket.emit('prepare_call', { fromId: this.peerId, destId: this.destId });
    });

    this.$socket.on('register_fail', () => {
      this.$store.commit('system/addFailLog', 'Register fail');
    });

    this.$socket.on('answer', (data) => {
      this.$store.commit('system/addLog', 'Receive answer signal');
      const { fromId, payload, type } = data;
      this.fromId = fromId;

      switch (type) {
        case 'data':
        default:
          // 数据P2P
          this.$peer.signal(JSON.parse(payload));
          break;
        case 'media':
          // 流媒体P2P
          this.$mediaStreamPeer.signal(JSON.parse(payload));
          break;
      }
    });

    // 设备端等待呼叫回应
    this.$socket.on('call_ready', (data) => {
      const { fromId, type } = data;
      this.$store.commit('system/addSuccessLog', `Call Ready (DestId:${fromId})`);
      this.$bus.emit('p2p_connect', { type });
    });

    this.$socket.connect();
    this.$store.commit('system/addLog', 'Socket connecting...');
  },

};
