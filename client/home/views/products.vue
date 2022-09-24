<template>
  <div>
    <div class="heading"> <h1> All products </h1> </div>
    <v-row>
      <v-col cols="12" md="6" xl="3" lg="3" sm="12" v-for="(prod,i) in prod_list" :key="i" >
        <product-item :product="prod"></product-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  module.exports= {
    components:{
      'product-item':httpVueLoader('../components/ProductItem.vue')
    },
    data(){
      return{
        prod_list : [
          {id:1,name:'CSV to JSON', short_description:'convert csv to json',long_description:' lorem ipsum lorem ipsum lorem ipsum'},
          {id:2,name:'Phone Call', short_description:'calling',long_description:' lorem ipsum lorem ipsum lorem ipsum'},
          {id:3,name:'Google Drive', short_description:' drive ',long_description:' lorem ipsum lorem ipsum lorem ipsum'},
          {id:4,name:'URL Shortner', short_description:'shortner',long_description:' lorem ipsum lorem ipsum lorem ipsum'},
        ]
      }
    }
  }
</script>

<style>

</style>