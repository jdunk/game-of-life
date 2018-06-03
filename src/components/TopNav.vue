<template>
<div>
    <SettingsPanel :show="showSettings"/>
    <v-toolbar
        app
    >
        <v-toolbar-side-icon @click.stop="showSettings = !showSettings"></v-toolbar-side-icon>
        <v-toolbar-title>Conway's Game of Life</v-toolbar-title>
        <SimulationPanel/>
    </v-toolbar>
</div>
</template>

<script>

import SettingsPanel from './SettingsPanel';
import SimulationPanel from './SimulationPanel';

export default {
    name: 'Top-nav',
    data() {
        return {
            showSettings: false,
        };
    },
    components: {
        SettingsPanel,
        SimulationPanel,
    },
};

</script>

<style lang="scss" scoped>

</style>
