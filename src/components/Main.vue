<template>
  <v-app>
    <v-app-bar
      app
      :height="this.toolbarHeight"
      :color="this.colorTheme"
      style="box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.3);"
    >
      <v-toolbar-title>
        <a href="https://vk.com/warmay" hidden ref="linkRef"></a
        ><span class="logoTitle" @click="goToMay">Мαú</span
        ><span class="appTitle">аскМи</span></v-toolbar-title
      >
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-dialog v-model="dialogSwitch" scrollable>
          <v-card color="#FDF5E6">
            <v-card-title>Привет!</v-card-title>
            <v-divider></v-divider>
            <v-card-text
              style="text-align: center; padding: 20px; font-weight: 500; font-size: 14px;"
            >
              Мы заметили, что ты не подписан на Май 😔
              <br />
              <br />
              Пожалуйста, поддержи нас подпиской на сообщество, ведь то, что
              делает Май, все это для тебя. Присоединяйся к нашей семье, чтобы
              учиться лучше разбираться в себе и других!
              <br />
              <br />
              ♥
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogSwitch = !dialogSwitch"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn color="blue darken-1" text @click="subscribeOnGroup">
                Подписаться
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogLove" scrollable persistent>
          <v-card color="#FDF5E6">
            <v-card-title>Важное уведомление!</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="font-size: 18px; line-height: 1.6;">
              <br />
              <br />
              Если ты сейчас читаешь это, то знай, что человек, который сейчас
              сидит рядом с тобой, очень любит тебя, и ты ему очень дорога! ♥
              <br /><br />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogLove = !dialogLove"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat color="#FDF5E6" :height="this.mainScreenHeight">
                <QuestionsPage />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card
                flat
                color="#FDF5E6"
                :height="this.mainScreenHeight"
                style="overflow-y: auto;"
              >
                <GamesPage />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat color="#FDF5E6" :height="this.mainScreenHeight">
                <FavoritesPage />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-container>
    </v-main>

    <v-footer
      app
      :height="this.footerHeight"
      color="#FDF5E6"
      style="padding: 0px 16px"
    >
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
          <div class="tagTitle">Поиграем?</div>
          <v-icon>mdi-account-group</v-icon>
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
import bridge from "@vkontakte/vk-bridge";
import qs from "querystring";
// import chroma from "chroma-js";

import QuestionsPage from "./QuestionsPage.vue";
import FavoritesPage from "./FavoritesPage.vue";
import GamesPage from "./GamesPage.vue";

const group_id = 160404048;
const token =
  "7ba81f6850cf874fc5ba50ecad50cb0d38ab5bcd4cbc9e6d054bbe276f52c1dfa0b8e7722648d20cc12b9";

export default {
  name: "Main",
  components: {
    QuestionsPage,
    FavoritesPage,
    GamesPage,
  },
  data() {
    return {
      colorTheme: "#F0EAD6",
      toolbarHeight: 55,
      footerHeight: 110,
      mainScreenHeight: 0,
      tab: null,
      dialogSwitch: false,
      dialogLove: false,

      show: false,
    };
  },
  created() {
    let savedCards = JSON.parse(localStorage.getItem("savedCards"));
    let savedLists = JSON.parse(localStorage.getItem("savedLists"));

    if (savedCards) this.$store.commit("setCards", savedCards);
    if (savedLists) this.$store.commit("setLists", savedLists);

    this.getInitialProps();
  },
  mounted() {
    const screenHeight = document.documentElement.scrollHeight;

    this.mainScreenHeight =
      screenHeight - this.toolbarHeight - this.footerHeight;

    // setTimeout(() => {
    //   this.dialogLove = true;
    // }, 10000);
  },
  methods: {
    subscribeModal() {
      bridge.send("VKWebAppGetUserInfo");
    },
    subscribeOnGroup() {
      bridge.send("VKWebAppJoinGroup", { group_id }).then(() => {
        this.dialogSwitch = false;
      });
    },
    getInitialProps() {
      const str = window.location.search.slice(1);
      const objParams = qs.parse(str);

      let user_id = objParams.vk_user_id;
      let platform = objParams.vk_platform;

      if (platform === "mobile_iphone") {
        console.log(objParams);
      }

      bridge
        .send("VKWebAppCallAPIMethod", {
          method: "groups.isMember",
          request_id: "info",
          params: {
            user_id,
            group_id,
            v: "5.131",
            access_token: token,
          },
        })
        .then((res) => {
          let isMember = res.response;

          if (!isMember) {
            setTimeout(() => {
              this.dialogSwitch = true;
            }, 12500);
          }
        });
    },
    goToMay() {
      //bridge.send("VKWebAppClose", { status: "success", payload: {} });
      this.$refs.linkRef.click();
    },
  },
};
</script>
