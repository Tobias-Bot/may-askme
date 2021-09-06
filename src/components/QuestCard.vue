<template>
  <div style="margin-bottom: 20px;">
    <v-card flat color="#FDF5E6" style="margin: 10px;">
      <v-alert
        dense
        elevation="24"
        color="#FFF9ED"
        style="position: absolute; width: 100%; top: 3px;"
        icon="mdi-content-copy"
        :value="copyTextMes"
        transition="scale-transition"
      >
        Текст вопроса скопирован!
      </v-alert>
      <v-card-title
        class="text"
        style="font-size: 16px; line-height: 1.5;"
        @click="copyQuestText"
        >{{ question.data.text }}</v-card-title
      >
      <v-row class="mr-1 pb-2 pt-1" align="center" justify="end">
        <v-icon class="cardMiniBtn" @click="sheet = true"
          >mdi-information-variant</v-icon
        >
        <div v-if="!listView">
          <div v-if="!this.isLike">
            <v-icon class="cardBtn" @click="likeCard">
              mdi-heart-outline
            </v-icon>
          </div>
          <div v-else>
            <CreateListModal :dialog.sync="dialog" :question="this.question" />
            <v-icon class="cardBtn" @click="dislikeCard">
              mdi-heart
            </v-icon>
          </div>
        </div>
      </v-row>
    </v-card>
    <div class="text-center">
      <v-bottom-sheet v-model="sheet">
        <v-sheet class="text-center" color="#FDF5E6">
          <v-btn class="mt-2" text color="blue" @click="sheet = !sheet">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <div
            :style="
              `max-height: ${sheetHeight}px; overflow-y: auto; padding: 0px 10px 20px 10px;`
            "
          >
            <div class="mt-2">
              {{ question.data.text }}
            </div>
            <div
              v-if="question.data.ps"
              class="py-1"
              style="font-size: 13px; font-weight: 500; opacity: 0.6;"
            >
              {{ question.data.ps }}
            </div>
            <br />
            <div v-for="prop in questProps" :key="prop.name">
              <b>{{ prop.name }}</b>
              <div style="font-size: 12px;">{{ prop.hint }}</div>
              <v-progress-linear
                :color="prop.color"
                class="progressBar"
                buffer-value="0"
                :value="question.data[prop.propName]"
                stream
                rounded
                height="6"
              ></v-progress-linear>
              <br />
            </div>
            <br />
            <v-chip
              class="ma-1"
              v-for="tag in questionTags"
              :key="tag"
              small
              outlined
              >{{ tag }}</v-chip
            >
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import bridge from "@vkontakte/vk-bridge";

import questProps from "../data/questProps";

import CreateListModal from "./CreateListModal";

export default {
  name: "QuestCard",
  components: {
    CreateListModal,
  },
  props: ["question", "listView", "list"],
  data() {
    return {
      dialog: false,
      sheet: false,
      sheetHeight: 0,

      copyTextMes: false,

      questionTags: [],
      questProps,
    };
  },
  mounted() {
    this.sheetHeight = document.documentElement.scrollHeight;
    this.questionTags = this.question.data.topics.split(",");
  },
  computed: {
    savedCards() {
      return this.$store.getters.getCards;
    },
    savedLists() {
      return this.$store.getters.getLists;
    },
    isLike() {
      let storeCards = this.savedCards;

      if (
        storeCards &&
        ~storeCards.findIndex((c) => c === this.question.index)
      ) {
        return true;
      }

      return false;
    },
  },
  methods: {
    likeCard() {
      let storeCards = this.savedCards;

      if (!storeCards) {
        storeCards = [];
      }

      storeCards.push(this.question.index);

      this.$store.commit("setCards", storeCards);

      this.isLiked = true;
    },
    dislikeCard() {
      let cards = this.savedCards;
      let lists = this.savedLists;
      let qId = this.question.index;

      cards.splice(
        cards.findIndex((c) => qId === c),
        1
      );

      lists.forEach((list) => {
        let i = list.quests.findIndex((q) => qId === q);

        if (~i) {
          list.quests.splice(i, 1);
        }
      });

      this.$store.commit("setCards", cards);
      this.$store.commit("setLists", lists);

      this.isLiked = false;
    },
    deleteQuestFromList(title) {
      let lists = this.savedLists;
      let quest = this.question.index;

      let i = lists.findIndex((list) => title === list.name);

      lists[i].quests.splice(
        lists[i].quests.findIndex((id) => id === quest),
        1
      );

      this.$store.commit("setLists", lists);
    },
    copyQuestText() {
      bridge.send("VKWebAppCopyText", { text: this.question.data.text });

      this.copyTextMes = true;

      setTimeout(() => {
        this.copyTextMes = false;
      }, 1000);
    },
  },
};
</script>
