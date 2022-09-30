<template>
 <v-navigation-drawer
    v-model="draw"
      absolute
      temporary
      left
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://res.cloudinary.com/incquet-solution/image/upload/v1574328392/default_avatar_m3t9p8.png">
          </v-list-item-avatar>

          <v-list-item-content v-if="user">
            <v-list-item-title> {{user.first_name}} {{user.last_name}} </v-list-item-title>
            <v-list-item-subtitle>{{user.email_id}} </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content v-else>
            <v-list-item-subtitle>loading user ...</v-list-item-subtitle>
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
            :loading="loading"
            @click="logout()"
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
        user:{},
        loading:false
      }
    },
    created(){
        this.getUser();
    },
    methods:{
      logout(){
        this.loading=true;
        //Configure the redirect url after successful logout
        var redirectURL = "/";
        //Use the redirect url and call the method to sign out 
        window.loginUser = null;
        var auth = catalyst.auth;
        auth.signOut(redirectURL);
      },
      getUser(){
        catalyst.auth.isUserAuthenticated().then(result => {
            console.log('result',result);
            this.user = result.content;
        }).catch(err => {
            console.log('error ',err);
            console.log('You are not logged in. Please log in to continue. Redirecting you to the login page..');
        });

    }
    },
    computed:{
      draw:{
        get(){
          return this.drawer
        },
        set(v){
          if(!v) this.$emit('close');
        }
      }
  }
    
}
</script>

<style>

</style>