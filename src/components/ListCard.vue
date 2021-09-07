<template>
  <div style="margin-bottom: 20px;">
    <v-card flat color="#FDF5E6" style="margin: 10px;">
      <v-card-title
        class="text"
        style="font-size: 17px;"
        @click="dialogList = true"
        >{{ data.name }}</v-card-title
      >
      <v-card-subtitle v-if="this.data.quests.length"
        >Вопросов в списке: {{ this.data.quests.length }}</v-card-subtitle
      >
      <v-card-subtitle v-else>Пустой</v-card-subtitle>
      <v-row class="mr-1 pb-2 pt-1" align="center" justify="end">
        <v-icon class="cardMiniBtn" @click="sheet = !sheet"
          >mdi-trash-can-outline</v-icon
        >
        <v-dialog v-model="dialogList" scrollable fullscreen>
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="cardBtn" v-bind="attrs" v-on="on">
              mdi-format-list-bulleted-square
            </v-icon>
          </template>
          <v-card color="#F0EAD6">
            <v-card-title style="font-size: 16px;"
              >{{ this.data.name }} ({{
                this.data.quests.length
              }})</v-card-title
            >
            <v-divider></v-divider>
            <div v-show="!isListEditing" style="overflow-y: auto;">
              <v-card-text
                style="text-align: center; padding: 20px; font-weight: 500;"
              >
                <v-btn color="#59564F" text @click="isListEditing = true">
                  Редактировать
                </v-btn>
                <br />
              </v-card-text>
              <div v-if="data.quests.length">
                <QuestCard
                  v-for="quest in data.quests"
                  :key="quest"
                  :list="data"
                  :question="{ index: quest, data: quests[quest] }"
                  :listView="true"
                />
              </div>
              <div v-else>
                <v-card-text class="hintText"
                  >В этом списке нет вопросов 🧐</v-card-text
                >
              </div>
            </div>
            <div
              v-show="isListEditing"
              style="padding: 20px 0; overflow-y: auto;"
            >
              <div v-if="!notInList.length && !savedCards.length">
                <v-card-text class="hintText"
                  >В избранном нет ни одного вопроса для добавления в этот
                  список 🙄</v-card-text
                >
              </div>
              <div v-else>
                <v-row
                  align="center"
                  class="pl-4 pr-4"
                  v-for="quest in savedCards"
                  :key="quest"
                >
                  <v-col cols="2">
                    <v-checkbox
                      :input-value="data.quests.includes(quest)"
                      @change="(e) => setQuestToList(e, quest)"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="10">
                    <span style="font-size: 15px; font-weight: 500;">{{
                      quests[quest].text
                    }}</span>
                  </v-col>
                </v-row>
              </div>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                v-show="!isListEditing"
                color="blue darken-1"
                text
                @click="dialogList = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn
                v-show="isListEditing"
                color="blue darken-1"
                text
                @click="isListEditing = false"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>

    <v-bottom-sheet v-model="sheet">
      <v-sheet
        class="text-center"
        style="overflow-x: auto;"
        :height="sheetHeight"
        color="#FDF5E6"
      >
        <v-btn
          class="mt-2"
          text
          color="blue"
          @click="
            () => {
              sheet = !sheet;
              sheetSwitcher = false;
            }
          "
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="textAlert">Ты правда хочешь удалить этот список? 😯</div>
        <v-row class="pt-2" align="center">
          <v-col>
            <v-btn outlined rounded elevation="24" @click="deleteList"
              >Да</v-btn
            >
          </v-col>
          <v-col>
            <v-btn
              outlined
              rounded
              elevation="24"
              @click="
                () => {
                  sheet = !sheet;
                  sheetSwitcher = false;
                }
              "
              >Нет</v-btn
            >
          </v-col>
        </v-row>
        <br />
        <br />
        <div class="hintText" style="padding-bottom: 0px;">
          Удалить также все сохраненные в этом списке вопросы из избранного и
          других списков
        </div>
        <v-switch
          v-model="sheetSwitcher"
          style="display: inline-block;"
          color="secondary"
          hide-details
        ></v-switch>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import QuestCard from "./QuestCard.vue";

import questions from "../data/questions/all";

export default {
  name: "ListCard",
  props: ["data"],
  components: {
    QuestCard,
  },
  data: () => ({
    alert: true,
    sheet: false,
    sheetSwitcher: false,
    dialogList: false,
    isListEditing: false,
    sheetHeight: 0,

    quests: questions,
  }),
  mounted() {
    this.sheetHeight = document.documentElement.scrollHeight - 200;
  },
  computed: {
    savedCards() {
      return this.$store.getters.getCards;
    },
    savedLists() {
      return this.$store.getters.getLists;
    },
    notInList() {
      return this.savedCards.filter((q) => !this.data.quests.includes(q));
    },
  },
  methods: {
    deleteList() {
      let lists = this.$store.getters.getLists;
      let cards = this.$store.getters.getCards;
      let index = lists.findIndex((list) => list.name === this.data.name);

      if (this.sheetSwitcher) {
        let delQuests = lists[index].quests;

        cards = cards.filter((card) => !delQuests.includes(card));

        lists.splice(index, 1);

        lists.forEach((list) => {
          list.quests = list.quests.filter((id) => !delQuests.includes(id));
        });
      } else {
        lists.splice(index, 1);
      }

      this.$store.commit("setCards", cards);
      this.$store.commit("setLists", lists);

      this.sheetSwitcher = false;
    },
    setQuestToList(value, quest) {
      let list = this.data.quests;
      let lists = this.savedLists;

      if (value) {
        list.unshift(quest);
      } else {
        list.splice(
          list.findIndex((id) => id === quest),
          1
        );
      }

      let index = lists.findIndex((list) => list.name === this.data.name);
      lists[index] = this.data;

      this.$store.commit("setLists", lists);
    },
  },
};
</script>
