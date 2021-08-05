<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-overlay :value="isLoading">
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-form ref="form" v-model="form" class="pa-4 mt-6">
      <v-text-field
        v-model="email"
        :rules="[rules.required]"
        filled
        label="Email"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.required]"
        filled
        counter="6"
        label="Password"
        type="password"
        style="min-height: 96px"
      ></v-text-field>
    </v-form>
    <v-alert v-if="errorMsg" border="top" color="red" class="ml-5 mr-5">
      {{ errorMsg }}
    </v-alert>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="$refs.form.reset()">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        color="primary"
        :loading="isLoading"
        depressed
        @click="signInWithEmailAndPassword"
        >Sign In</v-btn
      >
      <v-btn 
        :disabled="!form"
        depressed
        @click="signUpWithEmailAndPassword"
        router-link to="/sign-up"
      >Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
export default {
  data: () => ({
    email: "",
    password: "",
    errorMsg: "",
    form: false,
    isLoading: false,
    rules: {
      required: (v) => !!v || "This field is required",
    },
  }),
  methods: {
    async signInWithEmailAndPassword() {
      this.isLoading = true;
      try {
        const authRes = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email.toLowerCase(), this.password);

        const dbUser = await db.collection('users').doc(authRes.user.uid).get();

        const userData = dbUser.data();
        this.$store.dispatch('user/setUserData', {
            id: dbUser.id,
            name: userData.name,
            email: userData.email,
            partnerId: userData.partnerId || '',
            movieApiPage: userData.movueApiPage || 1
        });

        this.$router.replace({ name: "Home" });
      } catch (error) {
        this.errorMsg = "An unexpected error has occurred!";
        if (error.message) {
          this.errorMsg = error.message;
        }
      }
      this.isLoading = false;
    },
  },
};
</script>