<template>
<v-navigation-drawer
    v-model="show"
    app
>
    <v-toolbar flat>
        <v-list>
            <v-list-tile>
                <v-list-tile-title class="title">
                    Settings
                </v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card>
        <v-card-text>
            <div class="body-2">Grid height:&nbsp;&nbsp;<span class="green--text"><strong>{{ gridHeight }}</strong></span></div>
            <v-slider
                class="py-0"
                v-model="gridHeight"
                label="↕"
                thumb-label
                hide-details
                min="5"
                max="100"
                step="5"
                :disabled="gridChangesDisabled"
            >
            </v-slider>
        </v-card-text>
    </v-card>
    <v-card
        flat
        class="top-border"
    >
        <v-card-text>
            <div class="body-2">Grid width:&nbsp;&nbsp;<span class="green--text"><strong>{{ gridWidth }}</strong></span></div>
            <v-slider
                class="py-0"
                v-model="gridWidth"
                label="↔"
                thumb-label
                hide-details
                min="5"
                max="150"
                step="5"
                :disabled="gridChangesDisabled"
            >
            </v-slider>
        </v-card-text>
    </v-card>
    <v-card
        flat
        class="top-border"
    >
        <v-card-text>
            <div class="body-2">Simulation speed:&nbsp;&nbsp;<span class="green--text"><strong>{{ simSpeed }}</strong></span></div>

            <v-layout>
                <v-icon>flight_takeoff</v-icon>

                <v-slider
                    v-model="simSpeed"
                    class="py-0 ml-3"
                    thumb-label
                    hide-details
                    min="1"
                    max="10"
                >
                </v-slider>
            </v-layout>

        </v-card-text>
    </v-card>
</v-navigation-drawer>
</template>

<script>

import _debounce from 'lodash.debounce';

export default {
    name: 'Settings-panel',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
        };
    },
    computed: {
        gridHeight: {
            get() {
                return this.$store.state.grid.height;
            },
            set(newHeight) {
                this.$store.commit('updateGridHeight', newHeight);

                return this.updateGridDimensions();
            },
        },
        gridWidth: {
            get() {
                return this.$store.state.grid.width;
            },
            set(newWidth) {
                this.$store.commit('updateGridWidth', newWidth);

                return this.updateGridDimensions();
            },
        },
        simSpeed: {
            get() {
                return this.$store.state.sim.speed;
            },
            set(newSpeed) {
                if (!newSpeed) {
                    return;
                }

                this.$store.commit('updateSimSpeed', newSpeed);
                localStorage.setItem('simSpeed', newSpeed);
            },
        },
        gridChangesDisabled() {
            return this.$store.state.sim.isRunning;
        },
    },
    methods: {
        updateGridDimensions: _debounce(function updateGridDimensionsNow() {
            this.$store.commit('updateGridDimensions');
        }, 500),
    },
    created() {
        let savedSpeed = localStorage.getItem('simSpeed');

        if (savedSpeed === null) {
            return;
        }

        this.$store.commit('updateSimSpeed', savedSpeed);
    },
};

</script>

<style lang="scss" scoped>

.top-border {
    border-top: 1px solid #eee;
}

</style>
