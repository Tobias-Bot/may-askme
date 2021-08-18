<template>
  <v-app>
    <v-app-bar app :height="this.toolbarHeight" :color="this.colorTheme">
      <v-toolbar-title
        ><span class="logoTitle">Мαú</span
        ><span class="appTitle">аскми</span></v-toolbar-title
      >
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-card :height="this.mainScreenHeight">
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat class="tab">
                <v-card-text>Hello1</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat class="tab">
                <v-card-text>Hello2</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat class="tab">
                <v-card-text>Hello3</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-container>
    </v-main>

    <v-footer app :height="this.footerHeight">
      <v-tabs
        v-model="tab"
        :background-color="this.colorTheme"
        slider-color="#B8B3A4"
        color="#B8B3A4"
        grow
        centered
        style="border-radius: 8px; box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4);"
      >
        <v-tab>Hello1</v-tab>
        <v-tab>Hello2</v-tab>
        <v-tab>Hello3</v-tab>
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
    footerHeight: "70",
    mainScreenHeight: "0",
    tab: null,
  }),

  mounted() {
    let colorVals = chroma.random();

    this.color = `rgba(${colorVals[0]}, ${colorVals[1]}, ${colorVals[2]}, 0.5)`;

    const screenHeight = document.documentElement.scrollHeight;

    this.mainScreenHeight =
      screenHeight - this.toolbarHeight - this.footerHeight;

    console.log(this.mainScreenHeight);
  },
};
</script>
