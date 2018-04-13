<template>
  <v-alert error dismissible @input="onClose">
asdasd
  </v-alert>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>

