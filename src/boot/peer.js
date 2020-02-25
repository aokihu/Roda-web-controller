import SimplePeer from 'simple-peer';

export default ({ Vue, store }) => {
  const { $socket, $bus } = Vue.prototype;

  // 创建数据流P2P
  function peerCreate() {
    const HandTimer = null;

    // 确保Peer对象的唯一性
    if (Vue.prototype.$peer) {
      Vue.prototype.$peer.destroy();
    }

    const { destId, peerId } = store.state.system.settings;
    const peer = new SimplePeer({
      initiator: true,
      channelName: 'data-channel',
      config: {
        iceServers: [
          {
            urls: ['stun:stun.appbox.top', 'turn:turn.appbox.top'],
            username: 'aokihu',
            credential: 'abcd1234',
          },
        ],
      },
    });

    peer.on('signal', (data) => {
      store.commit('system/addLog', 'Receive peer signal');
      $socket.emit('call', {
        fromId: peerId,
        destId,
        type: 'data',
        payload: JSON.stringify(data),
      });
    });

    peer.on('connect', () => {
      store.commit('system/addSuccessLog', 'P2P connected');
      store.commit('system/addSendData', 'hello');
      store.commit('system/p2pConnected');
      // HandTimer = setInterval(() => { Vue.prototype.$peerSendCommand('hand', null); }, 100);
    });

    peer.on('error', (err) => {
      store.commit('system/addFailLog', 'P2P error');
      store.commit('system/addFailLog', err);
      store.commit('system/p2pDisconnected');
      clearInterval(HandTimer);
    });

    peer.on('data', (data) => {
      store.commit('system/addRecvData', data);
      $bus.emit('p2p_recv_data', data);
    });

    Vue.prototype.$peer = peer;
    return peer;
  }

  // 创建媒体流P2P
  function mediaStreamPeerCreate(videoRef) {
    // 确保Peer对象的唯一性
    if (Vue.prototype.$mediaStreamPeer) {
      Vue.prototype.$mediaStreamPeer.destroy();
    }

    const { destId, peerId } = store.state.system.settings;
    const mpeer = new SimplePeer({
      initiator: true,
      channelName: 'media-channel',
      config: {
        iceServers: [
          {
            urls: ['stun:stun.appbox.top', 'turn:turn.appbox.top'],
            username: 'aokihu',
            credential: 'abcd1234',
          },
        ],
      },
    });

    mpeer.on('signal', (data) => {
      store.commit('system/addLog', 'Receive media stream peer signal');
      $socket.emit('call', {
        fromId: peerId,
        destId,
        type: 'media',
        payload: JSON.stringify(data),
      });
    });

    mpeer.on('connect', () => {
      store.commit('system/addSuccessLog', 'Media Stream P2P connected');
      store.commit('system/p2pConnected');
    });

    mpeer.on('error', (err) => {
      store.commit('system/addFailLog', 'Media Stream P2P error');
      store.commit('system/addFailLog', err);
      store.commit('system/p2pDisconnected');
    });

    mpeer.on('stream', (stream) => {
      store.commit('system/addSuccessLog', 'Media Stream open');
      videoRef.srcObject = stream;
      videoRef.play();
      store.commit('system/videoPlay');
    });

    Vue.prototype.$mediaStreamPeer = mpeer;
    return mpeer;
  }

  Vue.prototype.$peerCreate = peerCreate;
  Vue.prototype.$mediaStreamPeerCreate = mediaStreamPeerCreate;

  Vue.prototype.$peerSendCommand = (type, payload) => {
    const { $peer } = Vue.prototype;
    const cmd = payload ? { type, payload } : { type };
    const { isConnected } = store.state.system.p2p;
    if ($peer && isConnected) {
      $peer.send(JSON.stringify(cmd));
      store.commit('system/addSendData', `type: ${type}, payload: ${JSON.stringify(payload)}`);
    }
  };
};
