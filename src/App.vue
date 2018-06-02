<template>
  <v-app>
    <v-toolbar
      app
    >
      <v-toolbar-side-icon @click.stop=""></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <GameView/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>by <a href="https://jaredduncan.com/" target="_blank">Jared Duncan</a></span>
    </v-footer>
  </v-app>
</template>

<script>
import GameView from './components/GameView';

export default {
  data() {
    return {
      title: 'Conway\'s Game of Life',
    };
  },
  name: 'App',
  components: {
    GameView,
  },
};
</script>
