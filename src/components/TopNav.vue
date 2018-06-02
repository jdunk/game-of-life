<template>
<div>
    <SettingsPanel :show="showSettings"/>
    <v-toolbar
        app
    >
        <v-toolbar-side-icon @click.stop="showSettings = !showSettings"></v-toolbar-side-icon>
        <v-toolbar-title>Conway's Game of Life</v-toolbar-title>
        <v-spacer></v-spacer>

    </v-toolbar>
</div>
</template>

<script>

import SettingsPanel from './SettingsPanel';

export default {
    name: 'Top-nav',
    data() {
        return {
            showSettings: false,
        };
    },
    components: {
        SettingsPanel,
    },
};

</script>

<style lang="scss" scoped>

</style>
