<template>
  <menu-content-style>
    <template v-slot:menu> menu </template>
    <template v-slot:content> content </template>
  </menu-content-style>
</template>

<script lang="ts">
import MenuContentStyle from "@/components/MenuContentStyle.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { MenuContentStyle },
  name: "EditorView",
});
</script>

<style scoped></style>
