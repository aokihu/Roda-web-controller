import Client from 'socket.io-client';

const options = {
  // forceNew: true,
  path: '/io',
  transports: ['websocket'],
  autoConnect: false,
};

export default ({ Vue }) => {
  const client = new Client('wss://roda.appbox.top', options);
  Vue.prototype.$socket = client;
};
