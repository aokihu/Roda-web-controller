export default {
  mounted() {
    // 发起P2P请求
    this.$bus.on('p2p_connect', () => {
      const video = document.querySelector('#montior');
      this.$peerCreate(video);
      this.$store.commit('system/addSuccessLog', 'P2P Connect...');
      this.$socket.emit('prepare_call', { fromId: this.peerId, destId: this.destId });
    });
  },
};
