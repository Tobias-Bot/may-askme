<template>
  <div>
    <v-card>
      <v-toolbar color="#FDF5E6" style="padding-top: 5px;">
        <v-text-field
          flat
          hide-details
          label="Поиск в избранном"
          placeholder="Давай найдем твой любимый!"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          clearable
          dense
          color="white"
          @input="(e) => searchQuestions(e)"
        ></v-text-field>

        <template v-slot:extension>
          <v-tabs v-model="tabs" grow show-arrows>
            <v-tab>
              <span style="font-size: 12px;">все</span>
            </v-tab>
            <v-tab>
              <span style="font-size: 12px;">списки</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <v-card
            flat
            tile
            color="#F0EAD6"
            :style="
              `display: block; max-height: ${pageHeight}px; overflow-y: auto; padding: 1px 0px 15px 0px;`
            "
          >
            <QuestCard
              v-for="quest in savedCards"
              :key="quest"
              :question="{ index: quest, data: quests[quest] }"
            />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card
            flat
            tile
            color="#F0EAD6"
            :style="
              `display: block; max-height: ${pageHeight}px; overflow-y: auto; padding: 1px 0px 15px 0px;`
            "
          >
            // компонент списка
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
// import bridge from "@vkontakte/vk-bridge";
// import chroma from "chroma-js";

import QuestCard from "./QuestCard.vue";
import questions from "../data/questions/all";

export default {
  name: "FavoritesPage",
  components: {
    QuestCard,
  },
  data: () => ({
    pageHeight: 0,
    tabs: null,

    quests: questions,
  }),
  mounted() {
    this.pageHeight = document.documentElement.scrollHeight - 130 - 159;
  },
  computed: {
    savedCards() {
      return this.$store.getters.getCards;
    },
    savedLists() {
      return this.$store.getters.getLists;
    },
  },
  methods: {
    searchQuestions(text) {
      let query = [];

      let cards = this.quests.filter((q, index) => {
        for (let id = 0; id < this.savedCards.length; id++) {
          if (index === id) {
            return true;
          }
        }
      });

      console.log(cards);

      if (text && text !== " ") {
        query = cards.map((q) => q.text.includes(text));
      }

      return query;
    },
  },
};
</script>
