<template>
  <div class="fit bg-teal-1">
    <div class="fit row justify-center items-center">
      <q-icon :name="icon" size="128px" color="teal-2" />
    </div>
  </div>
</template>

<script>
import { mdiMap } from '@quasar/extras/mdi-v4';

export default {
  created() {
    this.icon = mdiMap;
  },
};
</script>
