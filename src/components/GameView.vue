<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <LifeGrid
            :is-editable="gridIsEditable"
        />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>

import LifeGrid from './LifeGrid';

export default {
    name: 'GameView',
    components: {
        LifeGrid,
    },
    data() {
        return {
        };
    },
    computed: {
        gridIsEditable() {
            return !this.$store.state.sim.iterationNum && !this.$store.state.sim.isRunning;
        },
    },
};

</script>

<style scoped>
</style>
