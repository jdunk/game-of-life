<template>
<v-app>

    <TopNav/>
    <v-content>
      <GameView/>
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
};

</script>
