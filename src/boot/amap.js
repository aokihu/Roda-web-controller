import VueAMap from 'vue-amap';

export default ({ Vue }) => {
  Vue.use(VueAMap);
  VueAMap.initAMapApiLoader({
    key: '71ed5d4db0af899e6bee8e9f37fb0582',
    plugin: ['AMap.Autocomplete',
      'AMap.PlaceSearch',
      'AMap.Scale',
      'AMap.OverView',
      'AMap.ToolBar',
      'AMap.MapType',
      'AMap.PolyEditor',
      'AMap.CircleEditor'],
    v: '1.4.4',
  });
};
