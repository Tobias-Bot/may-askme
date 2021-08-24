<template>
  <div style="margin-bottom: 20px;">
    <v-card flat color="#FDF5E6" style="margin: 10px; border-radius: 10px;">
      <v-card-title class="text" style="font-size: 17px;">{{
        this.data.name
      }}</v-card-title>
      <v-card-subtitle
        >Вопросов в списке: {{ this.data.quests.length }}</v-card-subtitle
      >
      <v-row class="mr-1 pb-2 pt-1" align="center" justify="end">
        <v-icon class="cardMiniBtn" @click="sheet = !sheet"
          >mdi-trash-can-outline</v-icon
        >
        <v-icon class="cardBtn">
          mdi-format-list-bulleted-square
        </v-icon>
      </v-row>
    </v-card>

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
        <div class="textAlert">Ты правда хочешь удалить этот список? 😯</div>
        <v-row class="pt-2" align="center">
          <v-col>
            <v-btn outlined rounded elevation="24" @click="deleteList"
              >Да</v-btn
            >
          </v-col>
          <v-col>
            <v-btn outlined rounded elevation="24" @click="sheet = !sheet"
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
// import bridge from "@vkontakte/vk-bridge";
// import chroma from "chroma-js";

export default {
  name: "ListCard",
  props: ["data"],
  components: {},
  data: () => ({
    alert: true,
    sheet: false,
    sheetSwitcher: false,
    sheetHeight: 0,
  }),
  mounted() {
    this.sheetHeight = document.documentElement.scrollHeight - 200;
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

        lists.forEach((list, i) => {
          list.quests = list.quests.filter((id) => !delQuests.includes(id));
        });
      } else {
        lists.splice(index, 1);
      }

      this.$store.commit("setCards", cards);
      this.$store.commit("setLists", lists);
    },
  },
};
</script>
