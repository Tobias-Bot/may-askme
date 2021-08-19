<template>
  <div>
    <v-card flat color="#FDF5E6" style="margin: 10px; border-radius: 10px;">
      <v-card-title style="font-size: 19px;">Hello1</v-card-title>
      <v-card-subtitle style="font-size: 13px;">Hello</v-card-subtitle>
      <!-- <v-alert
        v-show="!isLiked"
        icon="mdi-heart"
        elevation="1"
        dense
        text
        transition="scale-transition"
        >Добавлен в избранное</v-alert
      > -->
      <v-row v-if="!isLiked" class="mr-3 pb-2" align="center" justify="end">
        <v-icon
          style="padding: 5px; border-radius: 100px; box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);"
          @click="likeCard"
        >
          mdi-heart-outline
        </v-icon>
      </v-row>
      <v-row v-else class="mr-3 pb-2" align="center" justify="end">
        <v-dialog v-model="dialog" scrollable max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              style="padding: 5px; border-radius: 100px; box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4); margin-right: 10px;"
              v-bind="attrs"
              v-on="on"
              >mdi-playlist-plus</v-icon
            >
          </template>

          <v-card color="#FDF5E6">
            <v-card-title>Добавить в список</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="text-align: center; padding: 50px;">
              <div v-show="!isListCreating">
                <div>Ты не создал ни одного списка. Как ты мог!..</div>
                <div>😔</div>
                <br />
                <v-btn color="#59564F" text @click="isListCreating = true">
                  Создать список
                </v-btn>
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
                <v-btn v-show="isInputCorrect" color="blue darken-1" text>
                  Создать список
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-icon
          style="padding: 5px; border-radius: 100px; box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);"
          @click="dislikeCard"
        >
          mdi-heart
        </v-icon>
      </v-row>
    </v-card>
  </div>
</template>

<script>
// import bridge from "@vkontakte/vk-bridge";
// import chroma from "chroma-js";

export default {
  name: "QuestCard",
  components: {},
  data: () => ({
    isLiked: false,

    isListCreating: false,
    isInputCorrect: false,
    listCreatingRules: [
      (value) => !!value || "Придумай название для списка вопросов",
    ],

    dialog: false,
  }),
  methods: {
    likeCard() {
      this.isLiked = true;
    },
    dislikeCard() {
      this.isLiked = false;
    },
    saveToLocalStorage() {},
    checkInput(e) {
      this.listCreatingRules.forEach((rule) => {
        console.log(rule(e));
        if (rule(e) !== true) {
          this.isInputCorrect = false;
          return;
        } else {
          this.isInputCorrect = true;
        }
      });
    },
  },
};
</script>
