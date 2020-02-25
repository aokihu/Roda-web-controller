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
  },
};
