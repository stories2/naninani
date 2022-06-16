<template>
  <div
    class="grid-item"
    style="
      background-image: url('https://user-images.githubusercontent.com/16532326/130327902-48d51b56-53d7-42ac-aafc-862a26374ee6.png');
    "
  >
    <b-row class="grid-descript">
      <b-col>
        <b-row class="grid-text">
          <b-col>ホロライブバタバーの名前を合わせる</b-col>
        </b-row>
        <b-row>
          <b-col><v-icon>mdi-thumb-up</v-icon> 0 </b-col>
          <b-col> <v-icon>mdi-comment-text</v-icon> 0 </b-col>
        </b-row>
        <b-row class="grid-date">
          <b-col>2022-06-16</b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuizGridItem",
});
</script>

<style scoped>
.grid-item {
  width: 300px;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: white;
  border-radius: 15px;
  color: black;
  text-align: center;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}

.grid-descript {
  bottom: 0;
  width: 100%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  padding-bottom: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: bold;
}

.grid-text {
  height: 36px;
  padding: 2px 0;
}

.grid-date {
  text-align: right;
  margin-top: 5px;
  font-size: 7px;
}
</style>
