<template>
  <div style="margin-bottom: 20px;">
    <v-card flat color="#FDF5E6" style="margin: 10px; border-radius: 10px;">
      <v-card-title
        class="text"
        style="font-size: 17px;"
        @click="sheet = !sheet"
        >{{ this.question.data.text }}</v-card-title
      >
      <v-row class="mr-1 pb-2 pt-1" align="center" justify="end">
        <v-icon class="cardMiniBtn" @click="sheet = !sheet"
          >mdi-information-variant</v-icon
        >
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
      </v-row>
    </v-card>
    <div class="text-center">
      <v-bottom-sheet v-model="sheet">
        <v-sheet
          class="text-center"
          style="overflow-x: auto;"
          :height="sheetHeight"
          color="#FDF5E6"
        >
          <v-btn class="mt-2" text color="blue" @click="sheet = !sheet">
            <v-icon>mdi-close</v-icon>
          </v-btn>
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
          <b>Сложность</b>
          <v-progress-linear
            color="#7DB2F3"
            class="progressBar"
            buffer-value="0"
            :value="question.data.lvl"
            stream
            rounded
            height="6"
          ></v-progress-linear>
          <br />
          <b>Глубина</b>
          <v-progress-linear
            color="#A0BFF3"
            class="progressBar"
            buffer-value="0"
            :value="question.data.depth"
            stream
            rounded
            height="6"
          ></v-progress-linear>
          <br />
          <b>Близость</b>
          <v-progress-linear
            color="#C7BFF3"
            class="progressBar"
            buffer-value="0"
            :value="question.data.closeness"
            stream
            rounded
            height="6"
          ></v-progress-linear>
          <br />
          <b>Эмоции</b>
          <v-progress-linear
            color="#E1B2F3"
            class="progressBar"
            buffer-value="0"
            :value="question.data.emotions"
            stream
            rounded
            height="6"
          ></v-progress-linear>
          <br />
          <br />
          <v-chip
            class="ma-1"
            v-for="tag in questionTags"
            :key="tag"
            small
            outlined
            >{{ tag }}</v-chip
          >
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
// import bridge from "@vkontakte/vk-bridge";
// import chroma from "chroma-js";

import CreateListModal from "./CreateListModal";

export default {
  name: "QuestCard",
  components: {
    CreateListModal,
  },
  props: ["question"],
  data() {
    return {
      dialog: false,
      sheet: false,
      sheetHeight: 0,

      questionTags: [],
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
  },
};
</script>
