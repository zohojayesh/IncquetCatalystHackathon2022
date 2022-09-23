<template>
  <v-app-bar app
    color="deep-purple accent-4"
    dark
    dense
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title style="width:200px">Incquet Solutions</v-toolbar-title>


    
    
    <v-tabs right>
      <v-tab to="/" > <v-icon>mdi-home</v-icon> &nbsp; Home</v-tab>
      <v-tab to="/products"><v-icon>mdi-cart</v-icon> &nbsp; Products</v-tab>
      <v-tab to="/subscriptions"><v-icon>mdi-wunderlist</v-icon> &nbsp; Subscriptions</v-tab>
      <v-tab to="/logs"><v-icon>mdi-format-float-right</v-icon> &nbsp; Logs</v-tab>
    </v-tabs>


  </v-app-bar>
</template>

<script>
module.exports= {

}
</script>

<style>

</style>