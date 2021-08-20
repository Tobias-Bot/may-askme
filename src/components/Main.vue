<template>
  <v-app>
    <v-app-bar
      app
      :height="this.toolbarHeight"
      :color="this.colorTheme"
      style="box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);"
    >
      <v-toolbar-title
        ><span class="logoTitle">Мαú</span
        ><span class="appTitle">аскМи</span></v-toolbar-title
      >
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-card>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat color="#FDF5E6" :height="this.mainScreenHeight">
                <QuestionsPage />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="#FDF5E6" :height="this.mainScreenHeight">
                <v-card-text style="font-size: 18px; line-height: 1.6;"
                  >Если ты сейчас читаешь это, то знай, что человек, который
                  сейчас сидит рядом с тобой, очень любит тебя, и ты ему очень
                  дорога! ♥</v-card-text
                >
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="#FDF5E6" :height="this.mainScreenHeight">
                <v-card-text>Hello!</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-container>
    </v-main>

    <v-footer app :height="this.footerHeight" color="#FDF5E6">
      <v-tabs
        v-model="tab"
        :background-color="this.colorTheme"
        slider-color="#FDF5E6"
        color="black"
        grow
        icons-and-text
        slider-size="4"
        style="border-radius: 3px; box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);"
      >
        <v-tab>
          <div class="tagTitle">Вопросы</div>
          <v-icon>mdi-frequently-asked-questions</v-icon>
        </v-tab>
        <v-tab>
          <div class="tagTitle">Создать</div>
          <v-icon>mdi-pencil</v-icon>
        </v-tab>
        <v-tab>
          <div class="tagTitle">Избранное</div>
          <v-icon>mdi-heart</v-icon>
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-app>
</template>

<script>
// import bridge from "@vkontakte/vk-bridge";
// import chroma from "chroma-js";

import QuestionsPage from "./QuestionsPage.vue";

export default {
  name: "Main",
  components: {
    QuestionsPage,
  },
  data: () => ({
    colorTheme: "#F0EAD6",
    toolbarHeight: "55",
    footerHeight: "130",
    mainScreenHeight: "0",
    tab: null,

    show: false,
  }),
  created() {
    let savedCards = JSON.parse(localStorage.getItem("savedCards"));
    let savedLists = JSON.parse(localStorage.getItem("savedLists"));

    if (savedCards) this.$store.commit("setCards", savedCards);
    if (savedLists) this.$store.commit("setLists", savedLists);
  },
  mounted() {
    const screenHeight = document.documentElement.scrollHeight;

    this.mainScreenHeight =
      screenHeight - this.toolbarHeight - this.footerHeight;
  },
};
</script>
