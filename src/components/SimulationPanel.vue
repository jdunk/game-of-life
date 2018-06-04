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
        <v-flex class="ml-3 mr-3 cyan darken-3 white--text elevation-4">
            <div class="iteration-label grey darken-3">
                Generation
            </div>
            <div class="iteration-num">
                {{ iterationNum }}
            </div>
        </v-flex>

        <v-menu
            v-model="showCopyDialog"
            bottom-center
            offset-y
        >
            <v-btn
                slot="activator"
                small
                flat
                class="ml-0 mr-2 small"
                @click="populateCellDataJSON"
                :disabled="copyCellDataDisabled"
            >
                <v-tooltip bottom>
                    <v-icon slot="activator">content_copy</v-icon>
                    <span>
                    Get JSON
                    </span>
                </v-tooltip>
            </v-btn>
            <v-card color="grey lighten-4" flat>
                <v-card-text>
                    <div>
                        Here is the JSON-data for the grid cells:
                    </div>
                </v-card-text>
                <v-text-field
                    dark
                    autofocus
                    hide-details
                    full-width
                    single-line
                    multi-line
                    ref="currCellDataJSON"
                    v-model="currCellDataJSON"
                    class="grey darken-3"
                />
            </v-card>
        </v-menu>

        <v-btn
            small
            flat
            class="ml-0 mr-2 small"
            @click.stop="clearGrid"
            :disabled="clearDisabled"
        >
            <v-tooltip bottom>
                <v-icon slot="activator">delete_forever</v-icon>
                Clear Grid
            </v-tooltip>
        </v-btn>

        <SavedGridLoader/>

    </v-layout>
</div>
</template>

<script>

import cf from '../CommonFunctions';
import SavedGridLoader from './SavedGridLoader';

export default {
    name: 'Simulation-panel',
    components: {
        SavedGridLoader,
    },
    data() {
        return {
            currCellDataJSON: '',
            showCopyDialog: false,
        };
    },
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
        copyCellDataDisabled() {
            return this.$store.state.sim.isRunning;
        },
        clearDisabled() {
            return this.$store.state.sim.isRunning;
        },
    },
    watch: {
        showCopyDialog(newValue) {
            if (!newValue) {
                return;
            }

            // this.$nextTick() isn't enough ¯\_(ツ)_/¯
            setTimeout(() => {
                this.$refs.currCellDataJSON.$refs.input.select();
            }, 120);
        },
    },
    methods: {
        getNumLiveCells(cellData) {
            let count = cellData.reduce((runningTotal, row) =>
                runningTotal + row.reduce((rt2, currVal) => rt2 + currVal, 0)
            , 0);

            return count;
        },
        populateCellDataJSON() {
            this.currCellDataJSON = JSON.stringify(this.$store.state.cellData);
        },
        saveCurrentGrid() {
            if (this.iterationNum !== 0 || this.$store.state.grid.isFreshlyLoaded) {
                return;
            }

            if (cf.getLastSavedGridString(this.$store) === JSON.stringify(this.$store.state.cellData)) {
                return;
            }

            // Grid has been modified since last save. Save new version.

            let savedGrids = JSON.parse(localStorage.getItem('savedGrids')) || [],
                numLiveCells = this.getNumLiveCells(this.$store.state.cellData);

            // Don't save empty grids
            if (!numLiveCells) {
                return;
            }

            savedGrids.push({
                cellData: this.$store.state.cellData,
                height: this.$store.state.cellData.length,
                width: this.$store.state.cellData[0].length,
                numLiveCells,
                savedAt: new Date(),
            });

            localStorage.setItem('savedGrids', JSON.stringify(savedGrids));
            this.$store.commit('updateSavedGrids', savedGrids);
        },
        clearGrid() {
            cf.clearGrid(this.$store);
        },
        startSimulation() {
            this.saveCurrentGrid();
            this.$store.commit('saveLastStartedCellData');
            this.$store.commit('enableRunningState');
            this.$store.commit('setFreshlyLoaded', false);
            this.runNextIteration();
        },
        stopSimulation() {
            this.$store.commit('disableRunningState');
        },
        resetSimulation() {
            cf.loadLastStartedCellData(this.$store);
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
    created() {
        cf.initSavedGridsFromLocalStorage(this.$store);
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
