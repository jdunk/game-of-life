<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <LifeGrid></LifeGrid>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>

import LifeGrid from './LifeGrid';

export default {
    data() {
        return {
        };
    },
    name: 'GameView',
    components: {
        LifeGrid,
    },
};

</script>

<style scoped>
</style>
