<template>
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
        <v-card flat >
          <v-card-text v-show="topic.description" style="font-size: 13px;">{{
            topic.description
          }}</v-card-text>

          <v-card color="#FDF5E6" rounded hover style="margin: 10px;">
            <v-card-title style="font-size: 19px;">Hello1</v-card-title>
            <v-card-subtitle style="font-size: 13px;">Hello</v-card-subtitle>
          </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
// import bridge from "@vkontakte/vk-bridge";
// import chroma from "chroma-js";

import topics from "../data/topics";

export default {
  name: "Main",

  data: () => ({
    colorTheme: "#F0EAD6",
    tabs: null,

    topics,
  }),

  mounted() {},
};
</script>
