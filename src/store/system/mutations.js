function insertLog(state, content, type) {
  const { log: { index } } = state;
  const now = new Date();
  const time = `${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds().toString().padStart(3, '0')}`;
  const log = {
    index, content, type, time,
  };
  state.log.index = index + 1;

  if (state.log.list.length > 50) { state.log.list.pop(); }

  state.log.list.unshift(log);
}

export function addLog(state, payload) { insertLog(state, payload, 0); }
export function addSuccessLog(state, payload) { insertLog(state, payload, 1); }
export function addFailLog(state, payload) { insertLog(state, payload, 2); }
export function addWarnLog(state, payload) { insertLog(state, payload, 3); }

function insertData(state, content, type) {
  const { datastream: { index } } = state;
  const now = new Date();
  const time = `${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds().toString().padStart(3, '0')}`;
  const item = {
    index, content, type, time,
  };
  state.datastream.index = index + 1;
  if (state.datastream.list.length > 30) { state.datastream.list.pop(); }
  state.datastream.list.unshift(item);
}

export function addSendData(state, payload) { insertData(state, payload, 0); }
export function addRecvData(state, payload) { insertData(state, payload, 1); }

// Server
export function serverConnected(state) { state.server.isConnected = true; }
export function serverDisconnected(state) { state.server.isConnected = false; }

// P2P
export function p2pConnected(state) { state.p2p.isConnected = true; }
export function p2pDisconnected(state) { state.p2p.isConnected = false; }

// mediastream
export function videoPlay(state) { state.mediastream.video.playing = true; }
export function videoStop(state) { state.mediastream.video.playing = false; }
