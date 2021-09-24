<template>
  <v-app>
    <v-app-bar app :height="this.toolbarHeight" color="#FDF5E6" elevation="0">
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

        <v-dialog v-model="dialogNotifySwitch" scrollable persistent>
          <v-card color="#FDF5E6">
            <v-card-title>Ой..</v-card-title>
            <v-divider></v-divider>
            <v-card-text
              style="text-align: center; padding: 20px; font-weight: 500; font-size: 14px;"
            >
              <br />
              Для дальнейшей работы приложения необходимо разрешить доступ к
              сообществам. Это необходимо для того, чтобы Май смог
              идентифицировать тебя
              <br />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="getUserData">
                Разрешить
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

        <v-dialog v-model="dialogVkDonut" scrollable persistent>
          <v-card color="#FDF5E6">
            <v-card-title>Упс..</v-card-title>
            <v-divider></v-divider>
            <v-card-text
              style="text-align: center; padding: 20px; font-weight: 500; font-size: 14px;"
            >
              Доступ к этому приложению ограничен 😔
              <br />
              <br />
              Это приложение доступно только тем, кто оформил подписку на vk
              donut в Май.
              <br />
              <br />
              <div style="text-align: left;">
                <b>В подписку входит:</b>
                <br />
                * Консультации с психологами в отдельном чате;<br />
                * Доступ ко всем приложениям Мая, среди которых: каталог с
                вопросами на все случаи жизни (Май-аскМи), приложение с тестами,
                которые помогут лучше узнать себя (Май-тесты) и каталог с
                упражнениями и практиками (Май-хауТу)<br />
                * Ранний доступ к новым публикациям Май!
                <br />
                <br />
                Стоимость подписки составляет всего 100 рублей. Если ты ценишь
                наш труд, подписывайся и пользуйся тем, что мы для тебя создали!
                Иначе, зачем это все... Мы помогаем тебе, ты поддерживаешь нас.
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text>
                Оформить подписку
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

import QuestionsPage from "./QuestionsPage.vue";
import FavoritesPage from "./FavoritesPage.vue";
import GamesPage from "./GamesPage.vue";

const group_id = 160404048;

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
      dialogNotifySwitch: false,
      dialogVkDonut: false,

      userId: 0,

      show: false,
    };
  },
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

    if (this.userId == 184707643)
      setTimeout(() => {
        this.dialogLove = true;
      }, 10000);

    this.getInitialProps();
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

      this.userId = objParams.vk_user_id;
      let platform = objParams.vk_platform;

      if (platform === "mobile_iphone") {
        this.toolbarHeight = 70;
      }

      this.getUserData();
    },
    getUserData() {
      bridge
        .send("VKWebAppGetAuthToken", {
          app_id: 7929268,
          scope: "groups",
        })
        .then((r) => {
          this.dialogNotifySwitch = false;

          console.log("Hello");

          let token = r.access_token;

          bridge
            .send("VKWebAppCallAPIMethod", {
              method: "groups.isMember",
              request_id: "info",
              params: {
                user_id: this.userId,
                group_id,
                v: "5.131",
                access_token: token,
              },
            })
            .then((res) => {
              let isMember = res.response;
              if (!isMember && !this.dialogVkDonut) {
                setTimeout(() => {
                  this.dialogSwitch = true;
                }, 20000);
              }
            });

          bridge
            .send("VKWebAppCallAPIMethod", {
              method: "donut.isDon",
              request_id: "info",
              params: {
                owner_id: group_id,
                v: "5.131",
                access_token: token,
              },
            })
            .then((r) => {
              if (!r.response) {
                setTimeout(() => {
                  this.dialogVkDonut = true;
                }, 6000);
              }
            });
        })
        .catch((e) => {
          if (e.error_data.error_code == 4) {
            this.dialogNotifySwitch = true;
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
