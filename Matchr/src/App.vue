<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";

export default {
  name: "App",

  components: {
    AppBar,
  },

  data: () => ({
    //
  }),
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },
};
</script>
