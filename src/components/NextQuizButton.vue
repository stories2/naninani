<template>
  <div class="row justify-content-end">
    <div class="col-12" style="text-align: end">
      <v-btn variant="text"
        >다음 문제
        <v-icon style="margin-left: 15px">mdi-arrow-right-circle</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NextQuizButton",
});
</script>
