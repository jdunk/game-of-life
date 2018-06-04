import gridSamples from './grid-samples';

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default {
    initSavedGridsFromLocalStorage(store) {
        store.commit('updateSavedGrids', JSON.parse(localStorage.getItem('savedGrids')) || []);
    },
    saveGridsToLocalStorage(store) {
        localStorage.setItem('savedGrids', JSON.stringify(store.state.savedGrids));
    },
    loadLastStartedCellData(store) {
        store.commit('updateCellData', store.state.lastStartedCellData);
    },
    loadLastSavedGrid(store) {
        let lastGrid = this.getLastSavedGrid(store);

        if (!lastGrid) {
            let defaultGrid = gridSamples.find(x => x.name === 'Jared was here!');

            if (defaultGrid) {
                store.commit('updateCellData', JSON.parse(JSON.stringify(defaultGrid.cellData)));
            }

            return;
        }

        store.commit('updateCellData', lastGrid.cellData);
    },
    generateEmptyGridCellData(store) {
        return Array(store.state.grid.height).fill('').map(() => Array(store.state.grid.width).fill(0));
    },
    clearGrid(store) {
        store.commit('updateCellData', this.generateEmptyGridCellData(store));
        store.commit('resetIterationNum');
    },
    getLastSavedGrid(store) {
        if (!store.state.savedGrids || !store.state.savedGrids.length) {
            return;
        }

        return store.state.savedGrids[store.state.savedGrids.length - 1];
    },
    getLastSavedGridString(store) {
        let lastGrid = this.getLastSavedGrid(store);

        if (!lastGrid || !lastGrid.cellData) {
            return;
        }

        return JSON.stringify(lastGrid.cellData);
    },
    formatDateTime(isoString) {
        let d = new Date(isoString),
            month = months[d.getMonth()],
            dayNum = d.getDate(),
            hr = d.getHours(),
            min = d.getMinutes(),
            ampm = 'am';

        if (min < 10) {
            min = `0${min}`;
        }

        if (hr > 12) {
            hr -= 12;
            ampm = 'pm';
        }

        return `${month} ${dayNum} ${hr}:${min}${ampm}`;
    },
};
