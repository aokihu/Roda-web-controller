<template>
  <div class="fit">
    <!-- 待机画面 -->
    <div v-show="!isVideoPlaying" class="fit row items-center justify-center">
      <div class="col">
        <q-img src="statics/robot.svg" style="width:100%" />
       </div>

      <div class="col row justify-center">
        <q-btn
          label="Open Camera"
          color="primary"
          icon="mdi-video"
          :disable="!isP2PConnected"
          @click="startDeviceCamera()" />
      </div>
    </div>

    <!-- 远程摄像机画面 -->
    <video id="montior" class="full-width" v-show="isVideoPlaying" />
  </div>
</template>

<script>
export default {
  computed: {
    isP2PConnected() { return this.$store.state.system.p2p.isConnected; },
    isVideoPlaying() { return this.$store.state.system.mediastream.video.playing; },
  },
  methods: {
    startDeviceCamera() { this.$peerSendCommand('start_video', null); },
  },
};
</script>
