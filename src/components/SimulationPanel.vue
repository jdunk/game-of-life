<template>
<div class="simulation-panel ml-5 mt-4">
    <v-layout align-center>
        <v-btn
            flat
            class="ma-0 small"
            @click.stop="startSimulation"
            :disabled="playDisabled"
        >
            <v-icon class="pa-0">play_arrow</v-icon>
        </v-btn>
        <v-btn
            flat
            class="ma-0 small"
            @click.stop="stopSimulation"
            :disabled="pauseDisabled"
        >
            <v-icon class="pa-0">pause</v-icon>
        </v-btn>
        <v-btn
            small
            flat
            class="ma-0 small"
            @click.stop="resetSimulation"
            :disabled="resetDisabled"
        >
            <v-icon>replay</v-icon>
        </v-btn>
        <v-flex class="ml-3 mr-2 cyan darken-3 white--text elevation-4">
            <div class="iteration-label grey darken-3">
                Iteration
            </div>
            <div class="iteration-num">
                {{ iterationNum }}
            </div>
        </v-flex>

    </v-layout>
</div>
</template>

<script>

export default {
    name: 'Simulation-panel',
    computed: {
        iterationNum() {
            return this.$store.state.sim.iterationNum;
        },
        playDisabled() {
            return this.$store.state.sim.isRunning;
        },
        pauseDisabled() {
            return !this.$store.state.sim.isRunning;
        },
        resetDisabled() {
            return !this.$store.state.sim.iterationNum;
        },
    },
    methods: {
        startSimulation() {
            this.$store.commit('enableRunningState');
            this.runNextIteration();
        },
        stopSimulation() {
            this.$store.commit('disableRunningState');
        },
        resetSimulation() {
            this.$store.commit('resetIterationNum');
        },
        runNextIteration() {
            if (!this.$store.state.sim.isRunning) {
                return;
            }

            this.$store.commit('updateCellData', this.getNextIterationCellData(this.$store.state.cellData));
            this.$store.commit('incrementIterationNum');

            setTimeout(this.runNextIteration, this.$store.state.sim.speedBumpMilliseconds);
        },
        getNextIterationCellData(currCellData) {
            let nextCellData = currCellData.slice(0);

            /* Game rules implemented here! */

            currCellData.forEach((row, x) => {
                nextCellData[x] = row.slice(0);

                row.forEach((val, y) => {
                    let numNeighbors = 0,
                        prevX = x - 1,
                        nextX = x + 1,
                        prevY = y - 1,
                        nextY = y + 1;

                    // Check North neighbors
                    if (currCellData[prevX]) {
                        numNeighbors +=
                            (currCellData[prevX][prevY] || 0) +
                            currCellData[prevX][y] +
                            (currCellData[prevX][nextY] || 0);
                    }

                    // Check West neighbor
                    if (y >= 0 && row[prevY]) {
                        numNeighbors++;
                    }

                    // Check East neighbor
                    if (y < row.length && row[nextY]) {
                        numNeighbors++;
                    }

                    // Check South neighbors
                    if (currCellData[nextX]) {
                        numNeighbors +=
                            (currCellData[nextX][prevY] || 0) +
                            currCellData[nextX][y] +
                            (currCellData[nextX][nextY] || 0);
                    }

                    if (numNeighbors > 3) {
                        // Overpopulated
                        nextCellData[x][y] = 0;
                    }
                    else if (numNeighbors === 3) {
                        // Goldilocks Zone
                        nextCellData[x][y] = 1;
                    }
                    // 2 === Enough to survive, but not enough to breed. No state change.
                    else if (numNeighbors < 2) {
                        // Underpopulated
                        nextCellData[x][y] = 0;
                    }
                });
            });

            return nextCellData;
        },
    },
};

</script>

<style lang="scss">

.simulation-panel {

    margin-bottom: 15px;
    padding-bottom: 15px;

    .btn.small {
        min-width: 30px;
        height: 30px;

        .btn__content {
            padding-left: 0;
            padding-right: 0;
        }
    }
    .iteration-label {
        font-size: 12px;
        padding: 0px 8px;
        margin: 2px 2px 1px 2px;
    }
    .iteration-num {
        text-align: center;
        font-size: 20px;
        line-height: 1.3em;
        padding-bottom: 3px;
    }
}

</style>
