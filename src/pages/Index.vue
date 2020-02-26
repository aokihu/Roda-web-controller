<style lang="scss">
.app-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 6px;

  .remote-montior{
    grid-column: 2/4;
    grid-row: 1/3;
  }

  .local-montior {
    grid-column:  1 / 2;
    grid-row: 1/2;
  }

  .log {
    grid-column: 1/2;
    grid-row:3/4;
  }

  .datastream {
    grid-column: 4 / 5;
    grid-row: 3 / 4;
  }

  .panel {
    grid-column: rr4;
    grid-row: 3/4;
  }

  .map{
    grid-column: 4 / 5;
    grid-row: 2 / 3 ;
  }

  .gamepad {
    grid-column: 1 /2 ;
    grid-row: 2 / 3;
  }

  .status {
    grid-column: 4 / 5;
    grid-row: 1/2;
  }

  .chat {
    grid-column: 2 / 4;
    grid-row: 3 / 4;
  }
};
</style>

<template>
  <q-page class="full app-grid q-pa-xs">
    <div class="remote-montior"><montior /></div>
    <div class="log"><log-panel /></div>
    <div class="datastream"><datastream-panel /></div>
    <div class="map"><map-box /></div>
    <div class="gamepad"><gamepad /></div>
    <div class="status"><status /></div>
    <div class="local-montior"><local-montior /></div>
    <div class="chat"><chat /></div>
  </q-page>
</template>

<script>
import LogPanel from 'src/components/logPanel';
import DatastreamPanel from 'src/components/datastreamPanel';
import Montior from 'src/components/montior';
import Gamepad from 'src/components/gamepad';
import MapBox from 'src/components/map';
import Status from 'src/components/status';
import LocalMontior from 'src/components/local';
import Chat from 'src/components/chat';

export default {
  name: 'PageIndex',
  components: {
    Montior,
    LogPanel,
    DatastreamPanel,
    Gamepad,
    MapBox,
    Status,
    LocalMontior,
    Chat,
  },
  data() {
    return {
      videoRef: null,
    };
  },
};
</script>
