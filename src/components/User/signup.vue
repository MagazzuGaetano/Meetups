<template>
   <v-contaier>
      <v-layout>
          <v-flex xs12 sm6 offset-sm3>
              <v-card class="mt-5 mb-5">
                  <v-card-text>
                      <v-container>
                          <form @submit.prevent="onSignup">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field 
                                    name="email"
                                    label="Mail"
                                    id="email"
                                    v-model="email"
                                    type="email"
                                    prepend-icon="email"
                                    required
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field 
                                    name="password"
                                    label="Password"
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    required
                                    hint="At least 8 characters"
                                    min="8"
                                    :append-icon="visibility ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (visibility = !visibility)"
                                    :type="visibility ? 'text' : 'Password'"
                                    prepend-icon="lock"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field 
                                    name="confirmPassword"
                                    label="ConfirmPassword"
                                    id="confirmPassword"
                                    v-model="confirmPassword"
                                    type="password"
                                    prepend-icon="vpn_key"
                                    :rules="[comparePasswords]"></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex sx12>
                                    <center><v-btn success class="mb-4" type="Submit">Sign up</v-btn></center>
                                </v-flex>
                            </v-layout>
                             <v-layout row>
                                <v-flex sx12>
                                    <center><a href="./login">Are you Already Register? Access Now</a></center>
                                </v-flex>
                            </v-layout>
                          </form>
                      </v-container>
                  </v-card-text>
              </v-card>
          </v-flex>
      </v-layout>
   </v-contaier>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      visibility: false
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'passwords do not match' : ''
    },
    user () {
      return this.$strore.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    }
  }
}
</script>

<style scoped>

</style>
