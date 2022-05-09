<template>
  <v-container>
    <div class="row justify-content-center">
      <div
        class="col-12 col-sm-12 col-md-6 col-lg-5"
        style="text-align: center"
      >
        <cropped-image
          url="https://w.namu.la/s/ab7aa0327878acd8e8349a10621b36f65dbca2f98c843e1e0dd766b0d73e15c1308495788cdeafbd50eba8f9cecbe0aa175edf5e1547d54ace5dffae37ac7b42322ab913cb7d8b3b1e7b76158bebe0dcd29b2015d170ad5e9675b6f809139a099d97c0ba3387e4de9c1992b0f3f24b94"
          :show-cropped="true"
        />
      </div>
    </div>

    <div class="row justify-content-center">
      <div
        class="col-12 col-sm-12 col-md-6 col-lg-5"
        style="text-align: center"
      >
        <div class="btn-margin">
          <v-btn variant="outlined">바보걸</v-btn>
        </div>
        <div class="btn-margin">
          <v-btn variant="outlined">이 멋진 세계에 축복을!</v-btn>
        </div>
        <div class="btn-margin">
          <v-btn variant="outlined">은혼</v-btn>
        </div>
        <div class="btn-margin">
          <v-btn variant="outlined">원피스(만화)</v-btn>
        </div>
        <div class="btn-margin">
          <v-btn variant="outlined">플라스틱 메모리즈</v-btn>
        </div>
        <div class="btn-margin">
          <v-btn variant="outlined">너의 이름은.</v-btn>
        </div>
        <div class="btn-margin">
          <v-btn variant="outlined">날씨의 아이</v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CroppedImage from "../components/CroppedImage.vue";

export default defineComponent({
  name: "QuestionView",

  data() {
    return {
      pixel: window.devicePixelRatio,
      justify: ["start", "center", "end", "space-around", "space-between"],
    };
  },

  components: {
    CroppedImage,
  },
});
</script>

<style scoped>
.btn-margin {
  margin: 5px;
  display: inline-block;
}
</style>
