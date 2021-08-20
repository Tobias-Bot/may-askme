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
        ></v-text-field>

        <template v-slot:extension>
          <v-tabs v-model="tabs" grow show-arrows>
            <v-tab v-for="topic in topics" :key="topic.title">
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
            :style="`display: block; max-height: ${pageHeight}px; overflow-y: auto; padding: 1px 0px 15px 0px;`"
          >
            <v-card-text v-show="topic.description" style="font-size: 13px;">{{
              topic.description
            }}</v-card-text>
            <QuestCard v-for="quest in questions" :key="quest.id" :question="quest" />
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
  name: "Main",
  components: {
    QuestCard,
  },
  data: () => ({
    colorTheme: "#F0EAD6",
    tabs: null,

    pageHeight: 0,

    topics,
    questions,
  }),
  mounted() {
    this.pageHeight = document.documentElement.scrollHeight - 130 - 159;
  },
  methods: {},
};
</script>
