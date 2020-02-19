<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>RoBot <q-chip size="sm">{{peerId}}</q-chip></q-toolbar-title>
        <div>
          <q-btn label="Connect" outline />
        </div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import DataMixin from 'src/mixins/data.mixin';
import SocketMixin from 'src/mixins/socket.mixin';
import PeerMixin from 'src/mixins/peer.mixin';
import Keyboard from 'src/mixins/keyboard.mixin';

export default {
  name: 'MainLayout',
  mixins: [DataMixin, SocketMixin, PeerMixin, Keyboard],
};
</script>
