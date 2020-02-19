export default {
  mounted() {
    // ------------- Socket 连接事件 --------------------------
    this.$socket.on('connect', () => {
      this.$store.commit('system/addSuccessLog', 'Socket connected');
      this.$socket.emit('register', { id: this.peerId, type: this.type, renew: true });
    });

    this.$socket.on('disconnect', () => {
      this.$store.commit('system/addFailLog', 'Socket disconnect');
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
      this.$socket.emit('prepare_call', { fromId: this.peerId, destId: this.destId });
      this.$store.commit('system/addSuccessLog', `Prepare call to (${this.destId})`);
    });

    this.$socket.on('register_fail', () => {
      this.$store.commit('system/addFailLog', 'Register fail');
    });

    this.$socket.on('answer', (data) => {
      this.$store.commit('system/addLog', 'Receive answer signal');
      const { fromId, payload } = data;
      this.fromId = fromId;
      this.$peer.signal(JSON.parse(payload));
    });

    // 设备端等待呼叫回应
    this.$socket.on('call_ready', (data) => {
      const { fromId } = data;
      this.$store.commit('system/addSuccessLog', `Call Ready (DestId:${fromId})`);
    });

    this.$socket.connect();
    this.$store.commit('system/addLog', 'Socket connecting...');
  },

};
