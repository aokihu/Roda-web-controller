
/**
 * 为了方便vuex管理，特别创建一个手柄的对象
 * 用于保存手柄的数据
 */
// eslint-disable-next-line no-unused-vars
function initGampadStoreObject(gamepad) {

}

// Gamepad
export default ({ store }) => {
  // 暂时只支持

  // 监听手柄连接事件
  window.addEventListener('gamepadconnected', (e) => {
    store.commit('gamepad/add', e.gamepad);
  });
  // 监听手柄断开事件
  window.addEventListener('gamepaddisconnected', (e) => {
    store.commit('gamepad/remove', e.gamepad);
  });
};
