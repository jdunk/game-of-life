<template>
<v-app>

    <TopNav/>
    <v-content>
      <GameView
          :sim-data="simData"
          :grid-data="gridData"
      />
    </v-content>
    <v-footer app class="pl-2">
      <span>by <a href="https://jaredduncan.com/" target="_blank">Jared Duncan</a>, June 2018</span>
    </v-footer>
  </v-app>
</template>

<script>

import TopNav from './components/TopNav';
import GameView from './components/GameView';

export default {
    name: 'App',
    components: {
        TopNav,
        GameView,
    },
    data() {
        return {
            simData: {
                iterationNum: 0,
                isRunning: false,
            },
            gridData: {
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
        };
    },
    methods: {

    },
    created() {
        console.log('app comp created');
    },
};

</script>
