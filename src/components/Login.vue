<template>
  <div id="loginPage">
    <v-app>

      <h1>Example Login</h1>
      <h4>
        WARNING: This is a toy login form and is not secure; use dummy accounts
        pls.
      </h4>
      <v-container>
        <v-row>
          <v-col offset-md="3" md="6">
            <v-card color="grey lighten-5">
              <v-row>
                <v-col offset-md="3" md="6">
                  <v-form ref="form" v-model="loginFormValid" validation>
                      <p v-if="userExists">That username already exists!</p>
                      <p v-if="loginFail">Your username and/or password is invalid.</p>
                    <v-text-field
                      filled
                      label="Username"
                      v-model="username"
                      :rules="[rules.required, rules.requiredUsername]"
                    ></v-text-field>

                    <v-text-field
                      filled
                      label="Password"
                      v-model="password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="showPass ? 'text' : 'password'"
                      @click:append="showPass = !showPass"
                    ></v-text-field>

                    <v-text-field
                      filled
                      v-if="isNewUser"
                      label="Confirm Password"
                      v-model="confirmPassword"
                      :append-icon="showConfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showConfirmPass ? 'text' : 'password'"
                      :rules="[rules.match, rules.required]"
                      @click:append="showConfirmPass = !showConfirmPass"
                    ></v-text-field>
                  </v-form>
                </v-col>
              </v-row>

              <v-row>
                <v-col offset-md="4" md="2">
                  <v-btn :disabled="!loginFormValid" rounded color="primary" @click="attemptLogin"
                    >Login</v-btn
                  >
                </v-col>

                <v-col md="2">
                  <v-btn
                    rounded
                    color="light-green darken-2"
                    :disabled="isNewUser"
                    style="color: white"
                    @click="isNewUser = true"
                    >Create User</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {

  data() {
    return {
      showPass: false,
      showConfirmPass: false,
      isNewUser: false,
      loginFormValid: false,
      userExists: false,
      loginFail: false,
      username: "",
      password: "",
      confirmPassword: "",
      rules: {
        required: (value) => !!value || "Required.",
        requiredUsername: (value) =>
          value.length >= 4 || "Minimum of four characters.",
        min: (v) => v.length >= 8 || "Minimum of eight characters.",
        match: (value) => value === this.password || "Passwords must match.",
      },

      isLoggedIn: false,
    };
  },

  methods: {
      attemptLogin: function() {
          let userObject = {
              "username": this.username,
              "password": this.password
          };

          if (!this.isNewUser) {
              // API call to validate user
              this.$http({
                method: "post",
                url: "http://localhost:2020/users/login",
                headers: {
                "Content-Type": "application/json",
                },
                // passing current username as "authentication" for the request
                data: userObject
            }).then(response => {
                if (response.data) { // if successful
                    this.isLoggedIn = true;
                    this.loginFail = false;
                    document.cookie = "LoginCookie=true";
                    this.$username = this.username;
                    this.$router.push('/projectManager');
                } else {
                    this.loginFail = true;
                    this.userExists = false; // in case it was already displayed
                }
            });

          } else {
              // API call to create new user
              this.$http({
                method: "post",
                url: "http://localhost:2020/users/createUser",
                headers: {
                "Content-Type": "application/json",
                },
                // passing current username as "authentication" for the request
                data: userObject
            }).then(response => {
                if (response.data) { // if successful
                    this.isLoggedIn = true;
                    this.userExists = false;
                    document.cookie = "LoginCookie=true";
                    this.$router.push('/projectManager');
                } else {
                    this.userExists = true;
                    this.loginFail = false; // in case it was already displayed
                }
            });
          }
      }
  }
};
</script>

<style scoped>
h4, p {
  color: red;
}
</style>