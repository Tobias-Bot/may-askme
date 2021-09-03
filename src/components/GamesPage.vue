<template>
  <div style="padding: 10px;">
    <GameCard v-for="(game, i) in games" :key="i" :game="game" />
  </div>
</template>

<script>
import GameCard from "./GameCard.vue";

import games from "../data/games";

export default {
  name: "GamesPage",
  components: {
    GameCard,
  },
  data() {
    return {
      reveal: false,

      games,
    };
  },
  methods: {},
};
</script>
