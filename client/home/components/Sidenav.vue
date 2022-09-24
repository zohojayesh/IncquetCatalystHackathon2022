<template>
 <v-navigation-drawer
    v-model="drawer"
      absolute
      temporary
      left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title> Jane Smith </v-list-item-title>
            <v-list-item-subtitle> Logged In </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item to="/">
          <v-list-item-icon> <v-icon>mdi-home-city</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Home </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/products">
          <v-list-item-icon> <v-icon>mdi-cart</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Products </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item to="/subscriptions">
          <v-list-item-icon> <v-icon>mdi-wunderlist</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Subscriptions </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item to="/logs">
          <v-list-item-icon> <v-icon>mdi-format-float-right</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Logs </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item>
          <v-list-item-icon>
            <v-icon> mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item class="mt-3">
            <v-btn
            rounded
            color="deep-purple"
            dark
            block
            >
            Logout
            </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
module.exports= {
  props:['drawer'],
    data () {
      return {
        
      }
    },
}
</script>

<style>

</style>