<template>
  <v-app>
      <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  mounted() {
      console.log(document.cookie);
    if (document.cookie === "LoginCookie=false") {
      this.$router.push("/login");
    } else if (document.cookie === "LoginCookie=true") {
      this.$router.push("/projectManager");
    }
  },
};
</script>

<style scoped>
</style>