<template>
<div>
    <v-menu
        v-model="showMenu"
        bottom
        offset-y
    >
        <v-btn
            slot="activator"
            small
            flat
            class="ma-0 small"
            @click.stop="showMenu = !showMenu"
            @mouseover="showMenu = true"
        >
            <v-icon>folder_open</v-icon>
        </v-btn>
        <v-list>
            <v-menu open-on-hover offset-x class="d-block" v-if="savedGrids.length">
                <v-list-tile @click="" slot="activator">
                    <v-list-tile-title>Autosaved</v-list-tile-title>
                    <v-list-tile-action class="justify-end">
                        <v-icon>play_arrow</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list>
                    <div v-for="(savedGrid, i) in savedGrids" :key="i">
                        <v-list-tile @click.stop="loadGrid(savedGrid.cellData)">
                            <v-list-tile-title class="body-1">{{ savedGrid.numLiveCells }} cells
                            </v-list-tile-title>
                            <div class="caption">
                                {{ formatDateTime(savedGrid.savedAt) }}
                            </div>
                            <v-list-tile-action
                                class="justify-end"
                            >
                                <v-icon
                                    class="elevation-1"
                                    @click.stop="removeSavedGrid(i)"
                                >
                                    delete
                                </v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-divider v-if="i < savedGrids.length-1"/>
                    </div>
                </v-list>
            </v-menu>
            <v-divider v-if="savedGrids.length"/>
            <v-list-tile v-for="(gs, i) in gridSamples" :key="i" @click.stop="loadGrid(gs.cellData)">
                <v-list-tile-title>{{ gs.name }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</div>
</template>

<script>

import cf from '../CommonFunctions';
import gridSamples from '../grid-samples';

export default {
    name: 'saved-grid-loader',
    data() {
        return {
            showMenu: false,
        };
    },
    computed: {
        savedGrids() {
            return this.$store.state.savedGrids.slice(0).reverse();
        },
        gridSamples() {
            return gridSamples;
        },
    },
    methods: {
        loadGrid(cellData) {
            this.$store.commit('updateCellData', JSON.parse(JSON.stringify(cellData)));
            this.$store.commit('setFreshlyLoaded', true);
            this.$store.commit('resetIterationNum');
            this.showMenu = false;
        },
        removeSavedGrid(idx) {
            // idx is item in reversed array, so subtract it from the highest index to unreverse it
            this.$store.commit('removeSavedGrid', this.savedGrids.length - 1 - idx);
            cf.saveGridsToLocalStorage(this.$store);
        },
        formatDateTime(isoString) {
            return cf.formatDateTime(isoString);
        },
    },
};

</script>

<style lang="scss" scoped>

</style>
