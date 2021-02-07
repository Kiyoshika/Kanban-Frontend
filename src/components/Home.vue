<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  mounted() {
      if (this.$store.getters.getUsername === '') {
        this.$router.push("/login")
      } else if (this.$store.getters.getUsername !== '') {
        this.$router.push("/projectManager");
    }
  },
};
</script>

<style scoped>
</style>