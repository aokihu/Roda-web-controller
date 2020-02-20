import SimplePeer from 'simple-peer';

export default ({ Vue, store }) => {
  const { $socket, $bus } = Vue.prototype;

  function peerCreate(videoRef) {
    const { destId, peerId } = store.state.system.settings;
    const peer = new SimplePeer({
      // initiator: true,
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
        payload: JSON.stringify(data),
      });
    });

    peer.on('connect', () => {
      store.commit('system/addSuccessLog', 'P2P connected');
      store.commit('system/addSendData', 'hello');
      store.commit('system/p2pConnected');
      peer.send('hello');
    });

    peer.on('error', (err) => {
      store.commit('system/addFailLog', 'P2P error');
      store.commit('system/addFailLog', err);
      store.commit('system/p2pDisconnected');
    });


    peer.on('data', (data) => {
      store.commit('system/addRecvData', data);
      $bus.emit('p2p_recv_data', data);
    });

    peer.on('stream', (stream) => {
      store.commit('system/addSuccessLog', 'Stream open');
      videoRef.srcObject = stream;
      videoRef.play();
      store.commit('system/videoPlay');
    });

    Vue.prototype.$peer = peer;
    return peer;
  }

  Vue.prototype.$peerCreate = peerCreate;

  Vue.prototype.$peerSendCommand = (type, payload) => {
    const { $peer } = Vue.prototype;
    const cmd = { type, payload };
    const { isConnected } = store.state.system.p2p;
    if ($peer && isConnected) {
      $peer.send(JSON.stringify(cmd));
      store.commit('system/addSendData', `type: ${type}, payload: ${JSON.stringify(payload)}`);
    }
  };
};
