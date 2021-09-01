<template>
  <div>
    <v-card-text style="font-size: 18px; line-height: 1.6;">
      Если ты сейчас читаешь это, то знай, что человек, который сейчас сидит
      рядом с тобой, очень любит тебя, и ты ему очень дорога! <br /><br /><br />
      Очень ♥
    </v-card-text>

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
