<template>
  <v-dialog v-model="dialogSwitch" scrollable max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-icon class="cardMiniBtn" v-bind="attrs" v-on="on"
        >mdi-playlist-plus</v-icon
      >
    </template>

    <v-card color="#FDF5E6">
      <v-card-title>Добавить в список</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="text-align: center; padding: 30px; font-weight: 500;">
        <div v-show="!isListCreating">
          <div v-show="!savedLists.length">
            <div>Ты не создал ни одного списка</div>
            <div>😔</div>
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
            :value="listTitle"
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
          @click="dialogSwitch = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div v-show="isListCreating">
          <v-btn
            color="blue darken-1"
            text
            @click="
              () => {
                isListCreating = false;
                isInputCorrect = false;
              }
            "
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
</template>

<script>
export default {
  name: "CreateListModal",
  props: ["dialog", "question"],
  components: {},
  data() {
    return {
      listTitle: "",
      isListCreating: false,
      isInputCorrect: false,
      dialogSwitch: this.dialog,

      listCreatingRules: [
        (value) => !!value || "Придумай название для списка вопросов",
      ],
    };
  },
  mounted() {
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
  },
  methods: {
    checkInput(text) {
      this.listCreatingRules.forEach((rule) => {
        if (!text || typeof rule(text) === "string") {
          this.isInputCorrect = false;
          return;
        } else {
          this.isInputCorrect = true;
          this.listTitle = text;
        }
      });
    },
    createNewList() {
      this.$store.commit("createList", this.listTitle);
      this.isInputCorrect = false;
      this.isListCreating = false;
      this.listTitle = "";
    },
  },
};
</script>
