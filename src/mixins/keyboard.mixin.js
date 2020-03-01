// 处理键盘按键事件
export default {
  data() {
    return {
      keyboardSendTimer: null, // 键盘按下计时器，当按下按键的时候将会启动计时器定时发送控制指令
    };
  },
  methods: {
    onKeydown(e) {
      const { key } = e;
      const { keyboard } = this.$store.state.gamepad;
      const { x, y } = this.$store.state.gamepad.motion;
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (key === 'w' && !keyboard.keyW) { this.$store.commit('gamepad/setMotionY', y + 1); }
        if (key === 'a' && !keyboard.keyA) { this.$store.commit('gamepad/setMotionX', x - 1); }
        if (key === 's' && !keyboard.keyS) { this.$store.commit('gamepad/setMotionY', y - 1); }
        if (key === 'd' && !keyboard.keyD) { this.$store.commit('gamepad/setMotionX', x + 1); }
        if (key === ' ' && keyboard.keySPACE) { /** */ }
        if (key !== ' ') { this.$store.commit('gamepad/keyboardDown', key); } else {
          this.$store.commit('gamepad/keyboardDown', 'space');
        }
      }
    },
    onKeyup(e) {
      const { key } = e;
      const { x, y } = this.$store.state.gamepad.motion;
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        if (key === 'w') { this.$store.commit('gamepad/setMotionY', y - 1); }
        if (key === 'a') { this.$store.commit('gamepad/setMotionX', x + 1); }
        if (key === 's') { this.$store.commit('gamepad/setMotionY', y + 1); }
        if (key === 'd') { this.$store.commit('gamepad/setMotionX', x - 1); }
        if (key !== ' ') { this.$store.commit('gamepad/keyboardUp', key); } else { this.$store.commit('gamepad/keyboardUp', 'space'); }
      }
    },
  },
  created() {
    // 监听按键按下
    window.addEventListener('keydown', this.onKeydown);
    // 监听按键释放
    window.addEventListener('keyup', this.onKeyup);

    // 定时300ms处理接受的字符
    this.keyboardCheckTimer = setInterval(() => {
      const { x, y } = this.$store.state.gamepad.motion;
      const { x: oldX, y: oldY } = this.$store.state.gamepad.oldMotion;
      if (oldX !== x || oldY !== y) {
        this.$bus.emit('motion_update', { x: this.keys.x, y: this.keys.y });
        this.oldKeys = { ...this.keys };
        this.$store.commit('gamepad/setOldMotion', { x, y });
      }
    }, 100);

    // 当按键按下的时候启动计时器用于发送重复的行动数据，防止远程机器人进入刹车状态
    // 当远程机器人在1.5秒内没有接收到新的行动数据则会自动停止
    // 因此这里将定时器的间隔设置成750ms
    this.keyboardSendTimer = setInterval(() => {
      const { x, y } = this.$store.state.gamepad.oldMotion;
      const {
        keyA, keyS, keyD, keyW, keySPACE,
      } = this.$store.state.gamepad.keyboard;
      if (keyA || keyS || keyD || keyW || keySPACE) { this.$bus.emit('motion_update', { x, y }); }
    }, 600);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('keyup', this.onKeyup);
    clearInterval(this.keyboardCheckTimer);
  },
};
