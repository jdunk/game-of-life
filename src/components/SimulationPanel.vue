<template>
<div class="simulation-panel">
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
        <v-flex class="ml-3 mr-2 grey lighten-2 elevation-2">
            <div class="iteration-label grey lighten-3">
                Iteration
            </div>
            <div class="iteration-num">
                {{ iterationNum }}
            </div>
        </v-flex>
        <v-btn
            small
            flat
            dark
            class="red lighten-1"
            @click.stop="resetSimulation"
            :disabled="resetDisabled"
        >
            Reset
        </v-btn>

    </v-layout>
</div>
</template>

<script>

export default {
    name: 'Simulation-panel',
    props: {
        iterationNum: {
            type: Number,
            default: 0,
        },
        isRunning: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        playDisabled() {
            return this.isRunning;
        },
        pauseDisabled() {
            return !this.isRunning;
        },
        resetDisabled() {
            return !this.iterationNum;
        },
    },
    methods: {
        startSimulation() {
            this.isRunning = true;
        },
        stopSimulation() {
            this.isRunning = false;
        },
        resetSimulation() {
            this.iterationNum = 0;
        },
    },
};

</script>

<style lang="scss">

.simulation-panel {

    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;

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
        margin: 2px 2px 3px 2px;
    }
    .iteration-num {
        text-align: center;
        font-size: 20px;
        line-height: 1.3em;
        padding-bottom: 3px;
    }
}
</style>
