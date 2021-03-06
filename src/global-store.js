import Vue from 'vue';

export default {
    state: {
        sim: {
            isRunning: false,
            iterationNum: 0,
            speed: 8,
            speedBumpMilliseconds: 97,
        },
        grid: {
            height: 60,
            width: 80,
            isFreshlyLoaded: false,
        },
        cellData: [],
        savedGrids: [],
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
            state.sim.speedBumpMilliseconds = Math.max(
                Math.round(1000 * (1 - (Math.log(newSpeed) / Math.log(10)))),
                0,
            );
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
        toggleCell(state, coords) {
            Vue.set(state.cellData[coords.x], coords.y, !state.cellData[coords.x][coords.y] ? 1 : 0);
        },
        updateCellData(state, cellData) {
            state.cellData = cellData;
            state.grid.height = cellData.length;
            state.grid.width = cellData[0].length;
        },
        saveLastStartedCellData(state) {
            state.lastStartedCellData = state.cellData;
        },
        updateSavedGrids(state, savedGrids) {
            state.savedGrids = savedGrids;
        },
        removeSavedGrid(state, idx) {
            state.savedGrids.splice(idx, 1);
        },
        setFreshlyLoaded(state, ifl) {
            state.grid.isFreshlyLoaded = ifl;
        },
    },
};
