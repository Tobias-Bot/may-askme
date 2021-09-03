<template>
  <div>
    <v-card>
      <v-toolbar color="#FDF5E6" style="padding-top: 5px;">
        <v-row dense>
          <v-col cols="8">
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
          <v-col cols="2">
            <v-dialog v-model="dialogFilterSwitch" scrollable persistent>
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
                    @click="dialogFilterSwitch = false"
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
          <v-col cols="2">
            <v-dialog v-model="dialogAddSwitch" scrollable>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="0"
                  color="#FDF5E6"
                  block
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon color="#717171">mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card color="#FDF5E6">
                <v-card-title>Предложить вопрос</v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  style="text-align: center; padding: 20px; font-weight: 500;"
                >
                  Ты можешь предложить свой вопрос через «предложить новость»
                  или личные сообщения Май . К вопросу также можно добавить
                  небольшое пояснение. После одобрения администрацией мы добавим
                  его в общий каталог
                  <br />
                  <br />
                  <v-btn color="#59564F" text>
                    <a
                      href="https://vk.com/warmay"
                      style="text-decoration: none;"
                      >Предложить</a
                    >
                  </v-btn>
                  <br />
                  <br />
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogAddSwitch = false"
                  >
                    <v-icon>mdi-close</v-icon>
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
            v-scroll.self="onScroll"
            ref="ListPage"
            flat
            tile
            color="#F0EAD6"
            :style="
              `display: block; max-height: ${pageHeight}px; overflow-y: auto; padding: 1px 0px 15px 0px;`
            "
          >
            <v-card-text
              v-show="topic.description"
              style="font-size: 13px; line-height: 1.5;"
              >{{ topic.description }}</v-card-text
            >
            <div v-show="!quests.length" class="hintText">
              Ничего не нашлось 😴
            </div>
            <QuestCard
              v-for="(quest, i) in quests.filter(
                (q, j) => j < questCountFilter
              )"
              :key="i"
              :question="{ index: i, data: quest }"
            />

            <div
              v-show="loadQuests && questCountFilter <= quests.length"
              style="width: 100%; text-align: center; opacity: 0.7; font-size: 14px;"
            >
              <br />

              секундочку..

              <br />
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

import topics from "../data/topics";
import questions from "../data/questions/all";
import questProps from "../data/questProps";

import QuestCard from "./QuestCard.vue";

const viewQuestCount = 6;

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
      dialogFilterSwitch: false,
      dialogAddSwitch: false,

      questCountFilter: viewQuestCount,
      prevQuestsFilter: 0,
      loadQuests: true,

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
  updated() {
    this.loadQuests = true;
  },
  methods: {
    searchQuestions(text) {
      this.searchText = text;
      this.questCountFilter = viewQuestCount;

      if (text && text !== " ") {
        new Promise((resolve) =>
          resolve(this.quests.filter((q) => q.text.includes(text)))
        ).then((res) => (this.quests = res));
      } else {
        this.quests = questions;

        this.topicQuestions(this.currentTab);
      }
    },
    topicQuestions(topic) {
      if (topic !== "все вопросы") {
        new Promise((resolve) =>
          resolve(questions.filter((q) => q.topics.includes(topic)))
        ).then((query) => {
          this.quests = query;
        });
      } else {
        this.quests = questions;
      }

      this.currentTab = topic;
      this.questCountFilter = viewQuestCount;

      // if (this.propsAreChanged) {
      //   this.resetFilterProps();
      // }

      if (this.searchText && this.searchText !== " ")
        new Promise((resolve) =>
          resolve(this.searchQuestions(this.searchText))
        );
    },
    setFilterProps(val, propName) {
      this.filterProps[propName] = val;

      new Promise((resolve) =>
        resolve(this.searchQuestions(this.searchText))
      ).then(() => {
        new Promise((resolve) =>
          resolve(this.quests.filter((q) => q[propName] >= val))
        ).then((res) => {
          this.quests = res;
        });
      });

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

      new Promise((resolve) => resolve(this.searchQuestions(this.searchText)));
    },
    onScroll(e) {
      let viewHeight = this.$refs.ListPage[0].$refs.link.scrollHeight;

      // console.log(e.target.scrollTop * 100 / viewHeight);

      if (
        (e.target.scrollTop * 100) / viewHeight >= 25 &&
        this.questCountFilter <= questions.length &&
        this.loadQuests
      ) {
        this.loadQuests = false;
        this.questCountFilter += this.questCountFilter;
        this.prevQuestsFilter = e.target.scrollTop;

        // console.log("new cards are loaded");
      }
    },
  },
};
</script>
