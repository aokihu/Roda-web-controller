// 处理键盘按键事件
export default {
  methods: {
    onKeydown(e) {
      const { key } = e;
      if (['w', 'a', 's', 'd'].includes(key)) {
        if (key === 'w' && !this.$store.state.gamepad.keyboard.keyW) { this.keys.y += 1; }
        if (key === 'a' && !this.$store.state.gamepad.keyboard.keyA) { this.keys.x -= 1; }
        if (key === 's' && !this.$store.state.gamepad.keyboard.keyS) { this.keys.y -= 1; }
        if (key === 'd' && !this.$store.state.gamepad.keyboard.keyD) { this.keys.x += 1; }
        this.$store.commit('gamepad/keyboardDown', key);
      }
    },
    onKeyup(e) {
      const { key } = e;
      if (['w', 'a', 's', 'd'].includes(key)) {
        this.$store.commit('gamepad/keyboardUp', key);
        if (key === 'w') { this.keys.y -= 1; }
        if (key === 'a') { this.keys.x += 1; }
        if (key === 's') { this.keys.y += 1; }
        if (key === 'd') { this.keys.x -= 1; }
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
        this.$bus.emit('motion_update', { x: this.keys.x, y: this.keys.y });
        this.$store.commit('gamepad/setMotionX', this.keys.x);
        this.$store.commit('gamepad/setMotionY', this.keys.y);
      }

      this.oldKeys.x = this.keys.x;
      this.oldKeys.y = this.keys.y;
    }, 100);
  },
  destroyed() {
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('keyup', this.onKeyup);
    clearInterval(this.keyboardCheckTimer);
  },
};
