<template>
  <v-app>
    <v-app-bar app :height="this.toolbarHeight" :color="this.colorTheme">
      <v-toolbar-title
        ><span class="logoTitle">Мαú</span
        ><span class="appTitle">аск</span></v-toolbar-title
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
                <v-card-text>Hello1</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="#FDF5E6" :height="this.mainScreenHeight">
                <v-card-text>Hello2</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="#FDF5E6" :height="this.mainScreenHeight">
                <v-card-text>Hello3</v-card-text>
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
        slider-color="#FDFDFD"
        color="black"
        grow
        icons-and-text
        slider-size="4"
        style="border-radius: 3px; box-shadow: 0px 3px 3px rgb(0 0 0 / 35%)"
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
import chroma from "chroma-js";

export default {
  name: "Main",

  data: () => ({
    colorTheme: "#F0EAD6",
    toolbarHeight: "55",
    footerHeight: "130",
    mainScreenHeight: "0",
    tab: null,
  }),

  mounted() {
    let colorVals = chroma.random();

    this.color = `rgba(${colorVals[0]}, ${colorVals[1]}, ${colorVals[2]}, 0.5)`;

    const screenHeight = document.documentElement.scrollHeight;

    this.mainScreenHeight =
      screenHeight - this.toolbarHeight - this.footerHeight + 2;

    console.log(this.mainScreenHeight);
  },
};
</script>
