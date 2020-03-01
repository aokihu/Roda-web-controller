<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-3">
    <q-header>
      <q-toolbar class="row">
        <img src="~/assets/roda-logo.svg"  style="height:30px"/>
        <q-chip size="sm">0.2.5</q-chip>
        <div class="col" />
        <div class="row">

          <signal />
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
};
</script>
