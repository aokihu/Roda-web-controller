export default {
  methods: {
    p2pstart() {
      const video = document.querySelector('#montior');
      this.$peerConnect(video);
      this.$store.commit('system/addSuccessLog', 'P2P start');
    },
  },
  created() {
    const { $store } = this;
    const $this = this;
    // ------------监听总线消息--------------

    // 更新设备的行动数据
    this.$bus.on('motion_update', (data) => {
      this.$peerSendCommand('motion_update', data);
    });

    // P2P消息处理方法定义
    const P2PHandler = {
      p2p_gps_change(payload) {
        $store.commit('robot/setGps', payload);
        $this.$bus.emit('gps_change', payload);
      },
    };

    // 接收到P2P数据
    this.$bus.on('p2p_recv_data', (data) => {
      const cmd = JSON.parse(data);
      const { type, payload } = cmd;
      const func = P2PHandler[type];
      if (func) func(payload);
    });
  },
};
