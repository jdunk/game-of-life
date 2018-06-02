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
                min="30"
                max="2000"
                step="5"
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
                min="30"
                max="2000"
                step="5"
            >
            </v-slider>
        </v-card-text>
    </v-card>
    <v-card
        flat
        class="top-border"
    >
        <v-card-text>
            <div class="body-2">Simulation speed:&nbsp;&nbsp;<span class="green--text"><strong>{{ simulationSpeed }}</strong></span></div>

            <v-layout>
                <v-icon>flight_takeoff</v-icon>

                <v-slider
                    class="py-0 ml-3"
                    v-model="simulationSpeed"
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
            gridHeight: 50,
            gridWidth: 100,
            simulationSpeed: 1,
        };
    },
    methods: {
        initGrid() {
            console.log('settingspanel created');
        }
    },
    created() {
        this.initGrid();
    },
};

</script>

<style lang="scss" scoped>

.top-border {
    border-top: 1px solid #eee;
}

</style>
