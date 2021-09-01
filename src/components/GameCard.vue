<template>
  <div style="padding: 10px;">
    <v-card class="mx-auto" color="#FFF9ED">
      <v-card-title
        class="text"
        style="font-size: 18px; line-height: 1.6;"
        @click="reveal = !reveal"
      >
        {{ game.title }}
      </v-card-title>

      <v-card-subtitle>
        {{ game.description }}
      </v-card-subtitle>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon @click="reveal = !reveal">
          <v-icon>{{ reveal ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="reveal">
          <v-divider></v-divider>

          <v-card-text>
            {{ game.info }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "GameCard",
  props: ["game"],
  components: {},
  data() {
    return {
      reveal: false,
    };
  },
  methods: {},
};
</script>
