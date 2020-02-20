export default {
  settings: {
    peerId: 'RoBot-C-1',
    destId: 'RoBot-Car-1',
    type: 'controller',
  },
  p2p: {
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
