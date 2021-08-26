<template>
  <div>
    <v-card>
      <v-toolbar color="#FDF5E6" style="padding-top: 5px;">
        <v-row dense>
          <v-col cols="9">
            <v-text-field
              hide-details
              label="Найти вопрос"
              placeholder="Я знаю, о чем ты хочешь поговорить"
              prepend-inner-icon="mdi-magnify"
              solo-inverted
              clearable
              dense
              :value="searchText"
              color="white"
              @input="(e) => searchQuestions(e)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-dialog v-model="dialogSwitch" scrollable>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="#FDF5E6" block v-bind="attrs" v-on="on"
                  ><v-icon v-show="!propsAreChanged" color="#717171"
                    >mdi-filter-variant</v-icon
                  >
                  <v-icon v-show="propsAreChanged" color="black"
                    >mdi-filter-variant-minus</v-icon
                  >
                </v-btn>
              </template>
              <v-card color="#FDF5E6">
                <v-card-title>Фильтр</v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  style="text-align: center; padding: 20px; font-weight: 500;"
                >
                  <div
                    v-for="prop in questProps"
                    :key="prop.name"
                    style="text-align: left"
                  >
                    <b>{{ prop.name }} ({{ filterProps[prop.propName] }})</b>
                    <v-slider
                      dense
                      :hint="prop.hint"
                      max="100"
                      min="0"
                      step="5"
                      :value="filterProps[prop.propName]"
                      persistent-hint
                      @change="(value) => setFilterProps(value, prop.propName)"
                    ></v-slider>
                    <br />
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogSwitch = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn
                    v-show="propsAreChanged"
                    color="blue darken-1"
                    text
                    @click="resetFilterProps"
                  >
                    сбросить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
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
              Ничего не нашлось 😴
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
import questProps from "../data/questProps";

import QuestCard from "./QuestCard.vue";

export default {
  name: "QuestionPage",
  components: {
    QuestCard,
  },
  data() {
    return {
      colorTheme: "#F0EAD6",
      tabs: null,
      pageHeight: 0,
      currentTab: "все вопросы",
      searchText: "",
      dialogSwitch: false,

      filterProps: {
        lvl: 0,
        depth: 0,
        closeness: 0,
        emotions: 0,
      },
      propsAreChanged: false,

      topics,
      quests: questions,
      questProps,
    };
  },
  mounted() {
    this.pageHeight = document.documentElement.scrollHeight - 110 - 159;
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

      // if (this.propsAreChanged) {
      //   this.resetFilterProps();
      // }

      if (this.searchText && this.searchText !== " ")
        this.searchQuestions(this.searchText);
    },
    setFilterProps(val, propName) {
      this.filterProps[propName] = val;

      this.searchQuestions(this.searchText);

      this.quests = this.quests.filter((q) => q[propName] >= val);

      this.propsAreChanged = true;
    },
    resetFilterProps() {
      this.propsAreChanged = false;

      let filterProps = {
        lvl: 0,
        depth: 0,
        closeness: 0,
        emotions: 0,
      };

      this.filterProps = filterProps;

      this.searchQuestions(this.searchText);
    },
  },
};
</script>
