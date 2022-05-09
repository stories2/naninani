<template>
  <v-container>
    <v-row class="text-center" style="margin-top: 15px">
      <v-col cols="12">
        <cropped-image
          url="https://mblogthumb-phinf.pstatic.net/MjAxOTA2MTlfMjM5/MDAxNTYwOTM4NDg1MTE4._vxA1MpWbmakA8l6lMfcKf1Za5Q5KMd3gtQfV8yShwog.wyYIRhZBSdmMOUbEbFMf2uaNXxOltizEZWtbrslgiasg.JPEG.mria0352/kimi-no-na-wa-mitsuha-miyamizu-taki-tachibana-clouds-stairs-cityscape.jpg?type=w800"
        />
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12" style="color: white"> pixel ratio {{ pixel }}</v-col>
    </v-row>
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
    };
  },

  components: {
    CroppedImage,
  },
});
</script>
