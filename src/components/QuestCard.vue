<template>
  <div style="margin-bottom: 20px;">
    <v-card flat color="#FDF5E6" style="margin: 10px; border-radius: 10px;">
      <v-card-title class="text" style="font-size: 17px;" @click="sheet = !sheet">{{
        this.question.data.text
      }}</v-card-title>
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
          <v-dialog v-model="dialog" scrollable max-width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="cardMiniBtn" v-bind="attrs" v-on="on"
                >mdi-playlist-plus</v-icon
              >
            </template>

            <v-card color="#FDF5E6">
              <v-card-title>Добавить в список</v-card-title>
              <v-divider></v-divider>
              <v-card-text
                style="text-align: center; padding: 30px; font-weight: 500;"
              >
                <div v-show="!isListCreating">
                  <div v-show="!savedLists.length">
                    <div>Ты не создал ни одного списка. Как ты мог! 😔</div>
                  </div>
                  <br />
                  <v-btn color="#59564F" text @click="isListCreating = true">
                    Создать список
                  </v-btn>
                  <br />
                  <br />
                  <div v-show="savedLists.length">
                    <v-checkbox
                      v-for="list in savedLists"
                      :key="list.name"
                      :input-value="list.quests.includes(question.index)"
                      :label="list.name"
                      dense
                      @change="
                        (e) => {
                          setCardList(e, list.name);
                        }
                      "
                    ></v-checkbox>
                  </div>
                </div>
                <div v-show="isListCreating">
                  <v-text-field
                    label="Название списка"
                    :rules="listCreatingRules"
                    hide-details="auto"
                    clearable
                    placeholder="..."
                    @input="(e) => checkInput(e)"
                  ></v-text-field>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  v-show="!isListCreating"
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <div v-show="isListCreating">
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="isListCreating = false"
                  >
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-btn
                    v-show="isInputCorrect"
                    color="blue darken-1"
                    text
                    @click="createNewList"
                  >
                    Создать список
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
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

export default {
  name: "QuestCard",
  components: {},
  props: ["question"],
  data: () => ({
    listTitle: "",
    isListCreating: false,
    isInputCorrect: false,
    listCreatingRules: [
      (value) => !!value || "Придумай название для списка вопросов",
    ],

    dialog: false,
    sheet: false,
    sheetHeight: 0,

    questionTags: [],
  }),
  mounted() {
    this.sheetHeight = document.documentElement.scrollHeight;
    this.questionTags = this.question.data.topics.split(",");

    this.listCreatingRules.push((value) => {
      return (
        !~this.savedLists.findIndex((list) => list.name === value) ||
        "Такой список у тебя уже есть"
      );
    });
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
    checkInput(text) {
      this.listCreatingRules.forEach((rule) => {
        if (rule(text) !== true) {
          this.isInputCorrect = false;
          return;
        } else {
          this.isInputCorrect = true;
          this.listTitle = text;
        }
      });
    },
    setCardList(val, title) {
      let lists = this.savedLists;
      let quest = this.question.index;

      let i = lists.findIndex((list) => title === list.name);

      if (val) {
        lists[i].quests.unshift(quest);
      } else {
        lists[i].quests.splice(
          lists[i].quests.findIndex((id) => id === quest),
          1
        );
      }

      this.$store.commit("setLists", lists);
    },
    createNewList() {
      this.$store.commit("createList", this.listTitle);
      this.isListCreating = false;
    },
  },
};
</script>
