<style lang="scss">
.app-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 16px;

  .montior{
    grid-column: 2/3;
    grid-row: 1/3;
  }

  .console {
    grid-column: 3/4;
    grid-row: 1/2;
  }

  .datastream {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }

  .panel {
    grid-column: 1/4;
    grid-row: 3/4;
    background: lightseagreen
  }

  .map{
    grid-column: 1 / 2;
    grid-row: 1 / 2 ;
    background: lightgreen
  }

  .gamepad {
    grid-column: 1 /2 ;
    grid-row: 2 /3;
  }
};
</style>

<template>
  <q-page class="full app-grid">

    <div class="montior"><montior /></div>
    <div class="console">
      <log-panel />
    </div>
    <div class="datastream"><datastream-panel /></div>
    <div class="panel">panel</div>
    <div class="map"><map-box /></div>
    <div class="gamepad"><gamepad /></div>
  </q-page>
</template>

<script>
import LogPanel from 'src/components/logPanel';
import DatastreamPanel from 'src/components/datastreamPanel';
import Montior from 'src/components/montior';
import Gamepad from 'src/components/gamepad';
import MapBox from 'src/components/map';

export default {
  name: 'PageIndex',
  components: {
    Montior, LogPanel, DatastreamPanel, Gamepad, MapBox,
  },
  data() {
    return {
      videoRef: null,
    };
  },
};
</script>
