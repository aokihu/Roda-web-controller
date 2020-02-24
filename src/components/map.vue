<template>
  <div class="fit bg-teal-1">
    <div class="fit row justify-center items-center">
      <el-amap
        class="fit"
        :vid="'amap-vue'"
        :zoom="zoom"
        :center="center">
        <el-amap-marker :position="center"/>
      </el-amap>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import * as GPSTransform from 'src/libs/gps-transfrom';
import { mdiMap } from '@quasar/extras/mdi-v4';

export default {
  data() {
    return {
      zoom: 20,
      center: [0, 0],
    };
  },
  methods: {
    changeRobotPosition(pos) {
      const { longitude, latitude } = pos;
      const { lat, lng } = GPSTransform.wgs2gcj(latitude, longitude);
      this.center = [lng + 0.0002, lat + 0.0001];
    },
  },
  created() {
    this.icon = mdiMap;

    // 监听GPS信号
    this.$bus.on('gps_change', (pos) => {
      this.changeRobotPosition(pos);
    });
  },
};
</script>
