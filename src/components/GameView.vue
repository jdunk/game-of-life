<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <SimulationPanel
            :iteration-num="simData.iterationNum"
            :is-running="simData.isRunning"
        />
        <LifeGrid
            :cell-data="gridData.cellData"
            :is-editable="gridIsEditable"
        />
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>

import SimulationPanel from './SimulationPanel';
import LifeGrid from './LifeGrid';

export default {
    name: 'GameView',
    components: {
        SimulationPanel,
        LifeGrid,
    },
    props: {
        gridData: {
            type: Object,
            required: true,
        },
        simData: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
        };
    },
    computed: {
        gridIsEditable() {
            return !this.simData.iterationNum && !this.simData.isRunning;
        },
    },
};

</script>

<style scoped>
</style>
