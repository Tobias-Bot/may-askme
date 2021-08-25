<template>
  <div>
    <v-card>
      <v-toolbar color="#FDF5E6" style="padding-top: 5px;">
        <v-text-field
          flat
          hide-details
          :label="searchInputLabel"
          placeholder="Что будем искать?"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          clearable
          dense
          color="white"
          @input="(text) => searchQuestions(text)"
        ></v-text-field>

        <template v-slot:extension>
          <v-tabs v-model="tabs" grow show-arrows>
            <v-tab @click="setTab('все')">
              <span style="font-size: 12px;">все</span>
            </v-tab>
            <v-tab @click="setTab('списки')">
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
            <div v-if="savedCards.length">
              <QuestCard
                v-for="quest in searchQuests"
                :key="quest"
                :question="{ index: quest, data: quests[quest] }"
              />
            </div>
            <div v-else>
              <v-card-text class="hintText"
                >Нет сохраненных вопросов 😕</v-card-text
              >
            </div>
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
            <CreateListModal :dialog.sync="dialog" />
            <div v-if="savedLists.length">
              <ListCard
                v-for="list in searchLists"
                :key="list.name"
                :data="list"
              />
            </div>
            <div v-else>
              <v-card-text class="hintText"
                >Нет созданных списков 😥</v-card-text
              >
              <br />
            </div>
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
import ListCard from "./ListCard.vue";
import CreateListModal from "./CreateListModal";
import questions from "../data/questions/all";

export default {
  name: "FavoritesPage",
  components: {
    QuestCard,
    ListCard,
    CreateListModal,
  },
  data() {
    return {
      pageHeight: 0,
      tabs: null,
      currentTab: "",
      searchText: "",
      searchInputLabel: "Поиск по вопросам",
      dialog: false,

      quests: questions,
      searchQuests: [],
      searchLists: [],
    };
  },
  mounted() {
    this.pageHeight = document.documentElement.scrollHeight - 130 - 159;

    this.searchQuests = this.savedCards;
    this.searchLists = this.savedLists;
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
      this.searchText = text;

      if (this.searchText && this.searchText !== " ") {
        if (this.currentTab === "все") {
          let query = [];

          for (let i = 0; i < this.savedCards.length; i++) {
            let index = questions.findIndex(
              (q, id) => id === this.savedCards[i]
            );

            if (~index && questions[index].text.includes(this.searchText)) {
              query.push(index);
            }
          }

          this.searchQuests = query;
        } else {
          this.searchInputLabel = "Поиск по спискам";

          let query = this.savedLists.filter((list) =>
            list.name.includes(this.searchText)
          );

          this.searchLists = query;
        }
      } else {
        this.searchQuests = this.savedCards;
        this.searchLists = this.savedLists;
      }
    },
    setTab(topic) {
      this.currentTab = topic;

      if (topic === "все") this.searchInputLabel = "Найти вопрос";
      if (topic === "списки") this.searchInputLabel = "Найти список";

      this.searchQuestions();
    },
  },
};
</script>
