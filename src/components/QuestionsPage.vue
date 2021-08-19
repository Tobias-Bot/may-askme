<template>
  <div>
    <v-card>
      <v-toolbar color="#FDF5E6" style="padding-top: 10px;">
        <v-text-field
          style="margin-bottom: 10px;"
          flat
          hide-details
          label="Найти вопрос"
          placeholder="Я знаю, о чем ты хочешь поговорить"
          prepend-inner-icon="mdi-magnify"
          solo-inverted
          clearable
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
          <v-card flat tile color="#F0EAD6" style="padding: 1px 0px 20px 0px;">
            <v-card-text v-show="topic.description" style="font-size: 13px;">{{
              topic.description
            }}</v-card-text>
            <QuestCard />
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

import QuestCard from "./QuestCard.vue";

export default {
  name: "Main",
  components: {
    QuestCard,
  },
  data: () => ({
    colorTheme: "#F0EAD6",
    tabs: null,

    topics,
  }),
  methods: {},
};
</script>
