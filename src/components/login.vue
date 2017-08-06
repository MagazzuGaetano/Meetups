<template>
      <v-container>
        <center>
           <v-card class="card">
              <v-card-text>
                <br>
                <h6>Access Now To your Personal Profile</h6>
                 <br>
                 <div class="form">
                   <v-text-field
                      name="uid"
                      label="Enter your username"
                      single-line
                      prepend-icon="person"
                      ></v-text-field>
                   <v-text-field
                      name="pwd"
                      single-line
                      label="Enter your password"
                      hint="At least 8 characters"
                      min="8"
                      :append-icon="visibility ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (visibility = !visibility)"
                      :type="visibility ? 'text' : 'Password'"
                      prepend-icon="lock"></v-text-field>
                 </div>
                 <v-btn success dark>Login</v-btn>
                 <br>
                 <br>
                 <v-btn primary dark>
                    <v-icon fa class="v-icon">facebook</v-icon>
                    Login With Facebook
                 </v-btn>
                 <v-btn error dark>
                    <v-icon fa class="v-icon">google</v-icon>
                    Login With Google
                 </v-btn>
                 <br>
                 <br>
                 <a href="#">Forgot Password?</a>
                 <br>
                 <a href="./signup">Don't have an Account yet? Create one Now</a>
                 <br>
              </v-card-text>
           </v-card>
       </center>
      </v-container>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      visibility: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {

}

.form {
  padding-left: 15px;
  padding-right: 15px;
}

.v-icon{
  margin-left:5px;
}

@media screen and (min-width: 1000px) {
  .card {
    width: 60%;
  }
}

@media screen and (max-width: 1000px) {
  .card {
      width: 80%;
  }
}

.card{
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
