<template>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-12 col-md-6 col-lg-5" style="text-align: center">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnswerButtons",
});
</script>

<style scoped>
.btn-margin {
  margin: 5px;
  display: inline-block;
}
</style>
