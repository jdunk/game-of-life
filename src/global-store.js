import Vue from 'vue';
import Vuex from 'vuex';

let store;

export default function () {
    if (!store) {
        store = new Vuex.Store({
            state: {
                sim: {
                    isRunning: false,
                    iterationNum: 0,
                    speed: 1,
                },
                grid: {
                    height: 50,
                    width: 80,
                },
                cellData: [
                    [
                        0, 1, 1, 0,
                    ],
                    [
                        0, 1, 0, 1,
                    ],
                    [
                        1, 1, 0, 0,
                    ],
                ],
            },
            mutations: {
                enableRunningState: state => state.sim.isRunning = true,
                disableRunningState: state => state.sim.isRunning = false,
                incrementIterationNum: state => state.sim.iterationNum++,
                resetIterationNum: state => state.sim.iterationNum = 0,
                updateGridHeight(state, newHeight) {
                    state.grid.height = newHeight;
                },
                updateGridWidth(state, newWidth) {
                    state.grid.width = newWidth;
                },
                updateSimSpeed(state, newSpeed) {
                    state.sim.speed = newSpeed;
                },
                updateGridDimensions(state) {
                    state.cellData.length = state.grid.height;

                    for (let i = 0; i < state.cellData.length; i++) {
                        let currRow = state.cellData[i],
                            oldLength;

                        if (!currRow) {
                            currRow = Array(state.grid.width).fill(0);
                        }
                        else {
                            oldLength = currRow.length;
                            currRow.length = state.grid.width;

                            if (oldLength < currRow.length) {
                                currRow.fill(0, oldLength);
                            }
                        }

                        Vue.set(state.cellData, i, currRow);
                    }
                },
                runNextIteration(state) {
                    Vue.set(state.cellData[0], 0, !state.cellData[0][0]);
                    Vue.set(state.cellData[2], 0, !state.cellData[2][0]);
                },
            },
        });
    }

    return store;
}
