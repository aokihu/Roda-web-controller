export default {
  settings: {
    peerId: 'PEER_ID',
    destId: 'RoBot-Car-1',
    type: 'controller',
  },
  p2p: {
    isOnline: false, // 目标是否已经上线，将会通过服务器来获取这个数据
    isConnected: false,
  },
  server: { // 服务器状态
    isConnected: false,
  },
  mediastream: {
    video: { playing: false },
  },
  log: {
    index: 0,
    list: [],
  },
  datastream: { // 数据流日志
    index: 0,
    list: [],
  },
};
