export function
add(state, gamepad) {
  const { index } = gamepad;

  if (!(index in state)) {
    state.gamepads[index] = gamepad;
    state.count += 1;
  }
}

export function
remove(state, gamepad) {
  delete state.gamepads[gamepad.index];
  state.count -= 1;
}

export function setMotionX(state, x) { state.motion.x = x; }
export function setMotionY(state, y) { state.motion.y = y; }
export function keyboardDown(state, keyName) { state.keyboard[`key${keyName.toUpperCase()}`] = true; }
export function keyboardUp(state, keyName) { state.keyboard[`key${keyName.toUpperCase()}`] = false; }
