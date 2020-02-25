<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>RoBot <q-chip size="sm">0.2.2</q-chip></q-toolbar-title>
        <div class="row">
          <signal />
          <q-btn label="Connect" size="sm" flat @click="p2pConnect" />
        </div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import BusMixin from 'src/mixins/bus.mixin';
import DataMixin from 'src/mixins/data.mixin';
import SocketMixin from 'src/mixins/socket.mixin';
import PeerMixin from 'src/mixins/peer.mixin';
import Keyboard from 'src/mixins/keyboard.mixin';
import Signal from 'src/components/signal';

export default {
  name: 'MainLayout',
  mixins: [BusMixin, DataMixin, SocketMixin, PeerMixin, Keyboard],
  components: { Signal },
  methods: {
    p2pConnect() {
      this.$socket.emit('prepare_call', { fromId: this.peerId, destId: this.destId, type: 'data' });
    },
  },
};
</script>
