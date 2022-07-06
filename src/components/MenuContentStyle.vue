<template>
  <b-container>
    <b-row>
      <b-col cols="12" lg="3" xl="2">
        <slot name="menu"></slot>
      </b-col>
      <b-col>
        <slot name="content"></slot>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuContentStyle",
});
</script>

<style scoped></style>
