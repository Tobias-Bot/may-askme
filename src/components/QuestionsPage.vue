<template>
  <div>
    <v-card>
      <v-toolbar color="#FDF5E6" style="padding-top: 5px;">
        <v-text-field
          flat
          hide-details
          label="Найти вопрос"
          placeholder="Я знаю, о чем ты хочешь поговорить"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          clearable
          dense
          color="white"
          @input="(e) => searchQuestions(e)"
        ></v-text-field>

        <template v-slot:extension>
          <v-tabs v-model="tabs" grow show-arrows>
            <v-tab
              v-for="topic in topics"
              :key="topic.title"
              @click="topicQuestions(topic.title)"
            >
              <span style="font-size: 12px;">{{ topic.title }}</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item v-for="topic in topics" :key="topic.title">
          <v-card
            flat
            tile
            color="#F0EAD6"
            :style="
              `display: block; max-height: ${pageHeight}px; overflow-y: auto; padding: 1px 0px 15px 0px;`
            "
          >
            <v-card-text v-show="topic.description" style="font-size: 13px;">{{
              topic.description
            }}</v-card-text>
            <div v-show="!quests.length" class="hintText">
              Ничего не нашлось 🥱
            </div>
            <QuestCard
              v-for="(quest, i) in quests"
              :key="i"
              :question="{ index: i, data: quest }"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
// import bridge from "@vkontakte/vk-bridge";
// import chroma from "chroma-js";

import topics from "../data/topics";
import questions from "../data/questions/all";

import QuestCard from "./QuestCard.vue";

export default {
  name: "QuestionPage",
  components: {
    QuestCard,
  },
  data: () => ({
    colorTheme: "#F0EAD6",
    tabs: null,
    pageHeight: 0,
    currentTab: "все вопросы",
    searchText: "",

    topics,
    quests: questions,
  }),
  mounted() {
    this.pageHeight = document.documentElement.scrollHeight - 130 - 159;
  },
  methods: {
    searchQuestions(text) {
      this.searchText = text;

      if (text && text !== " ") {
        let query = this.quests.filter((q) => q.text.includes(text));

        this.quests = query;
      } else {
        this.quests = questions;

        this.topicQuestions(this.currentTab);
      }
    },
    topicQuestions(topic) {
      if (topic !== "все вопросы") {
        let query = questions.filter((q) => q.topics.includes(topic));
        this.quests = query;
      } else {
        this.quests = questions;
      }

      this.currentTab = topic;

      if (this.searchText && this.searchText !== " ")
        this.searchQuestions(this.searchText);
    },
  },
};
</script>
