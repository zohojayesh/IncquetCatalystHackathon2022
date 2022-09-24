<template>
<div>
  <side-nav :drawer="drawer"></side-nav>

  <v-app-bar app
    color="deep-purple accent-4"
    dark
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title style="width:350px">
      <img class="mt-1" src="https://res.cloudinary.com/incquet-solution/image/upload/v1580409178/Incquet%20website/zoho_logo_white_kinwcg.png"
       width="75%">
      
      </v-toolbar-title>
    <v-tabs right>
      <v-tab to="/" > <v-icon>mdi-home</v-icon> &nbsp; Home</v-tab>
      <v-tab to="/products"><v-icon>mdi-cart</v-icon> &nbsp; Products</v-tab>
      <v-tab to="/subscriptions"><v-icon>mdi-wunderlist</v-icon> &nbsp; Subscriptions</v-tab>
      <v-tab to="/logs"><v-icon>mdi-format-float-right</v-icon> &nbsp; Logs</v-tab>
    </v-tabs>


  </v-app-bar>

</div>

</template>

<script>
module.exports= {
  data(){
    return{
      drawer:false
    }
  },
  components:{
      'side-nav':httpVueLoader('./Sidenav.vue')
    },
}
</script>

<style>

</style>