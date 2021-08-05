<template>
  <div>
    <v-app-bar app color dark>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        v-if="userId"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <h2>Matchr</h2>
      </div>
      <v-spacer></v-spacer>
      <v-btn v-if="userId" @click="logoutUser" text>Logout</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group active-class="primary">
          <v-list-item to="/home">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/matches">
            <v-list-item-title>Matches</v-list-item-title>
          </v-list-item>
          <v-list-item to="/add-partner">
            <v-list-item-title>Add Partner</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    async logoutUser() {
      await firebase.auth().signOut();
      this.$store.dispatch("user/clearUserData");
      this.$router.replace("/");
    },
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },
};
</script>