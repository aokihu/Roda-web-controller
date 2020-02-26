<template>
<panel class="fit" label="REMOTE MONTIOR" overlayer>
  <div class="fit bg-blue-grey-1">
    <!-- 待机画面 -->
    <div v-show="!isVideoPlaying" class="fit row items-center">
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
</panel>
</template>

<script>
import Panel from './panel';

export default {
  components: { Panel },
  computed: {
    isP2PConnected() { return this.$store.state.system.p2p.isConnected; },
    isVideoPlaying() { return this.$store.state.system.mediastream.video.playing; },
  },
  methods: {
    startDeviceCamera() {
      // this.$peerSendCommand('start_video', null);
      const { peerId: fromId, destId } = this.$store.state.system.settings;
      this.$socket.emit('prepare_call', { fromId, destId, type: 'media' });
    },
  },
};
</script>
