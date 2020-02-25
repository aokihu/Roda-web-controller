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
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (key === 'w' && !keyboard.keyW) { this.keys.y += 1; }
        if (key === 'a' && !keyboard.keyA) { this.keys.x -= 1; }
        if (key === 's' && !keyboard.keyS) { this.keys.y -= 1; }
        if (key === 'd' && !keyboard.keyD) { this.keys.x += 1; }
        if (key === ' ' && keyboard.keySPACE) { /** */ }
        if (key !== ' ') { this.$store.commit('gamepad/keyboardDown', key); } else {
          this.$store.commit('gamepad/keyboardDown', 'space');
        }
      }
    },
    onKeyup(e) {
      const { key } = e;
      if (['w', 'a', 's', 'd', ' '].includes(key)) {
        if (key === 'w') { this.keys.y -= 1; }
        if (key === 'a') { this.keys.x += 1; }
        if (key === 's') { this.keys.y += 1; }
        if (key === 'd') { this.keys.x -= 1; }

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
      if (this.oldKeys.x !== this.keys.x || this.oldKeys.y !== this.keys.y) {
        this.$store.commit('gamepad/setMotionX', this.keys.x);
        this.$store.commit('gamepad/setMotionY', this.keys.y);
        this.$bus.emit('motion_update', { x: this.keys.x, y: this.keys.y });
      }
      this.oldKeys = { ...this.keys };
    }, 300);

    // 当按键按下的时候启动计时器用于发送重复的行动数据，防止远程机器人进入刹车状态
    // 当远程机器人在1.5秒内没有接收到新的行动数据则会自动停止
    // 因此这里将定时器的间隔设置成750ms
    this.keyboardSendTimer = setInterval(() => {
      const { x, y } = this.oldKeys;
      const { keydownCount } = this.$store.state.gamepad.keyboard;
      if (keydownCount > 0) { this.$bus.emit('motion_update', { x, y }); }
    }, 750);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('keyup', this.onKeyup);
    clearInterval(this.keyboardCheckTimer);
  },
};
