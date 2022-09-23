<template>
  <div>
    <h1> This is Product Detail </h1> 
    <v-row>
        <v-col md="3" lg="3" sm="12">
          <product-sidebar></product-sidebar>
        </v-col>
        <v-col md="9" lg="9" sm="12">
          <product-detail :product="this_prod || {}"></product-detail>
        </v-col>
    </v-row>
  </div>
</template>

<script>
module.exports= {
  props:['id'],
  components:{
    'product-sidebar':httpVueLoader('../../components/ProductSideBar.vue'),
    'product-detail':httpVueLoader('../../components/ProductDetail.vue'),
  },
  data () {
      return {
        items : [
          {id:1,name:'CSV to JSON', short_description:'convert csv to json',long_description:' lorem ipsum lorem ipsum lorem ipsum',icon: 'mdi-cloud-braces'},
          {id:2,name:'Phone Call', short_description:'calling',long_description:' lorem ipsum lorem ipsum lorem ipsum',icon: 'mdi-phone-outline'},
          {id:3,name:'Google Drive', short_description:' drive ',long_description:' lorem ipsum lorem ipsum lorem ipsum',icon: 'mdi-google-drive'},
          {id:4,name:'URL Shortner', short_description:'shortner',long_description:' lorem ipsum lorem ipsum lorem ipsum',icon: 'mdi-link-variant'},
        ]        
      }
    },
  methods:{
    init(){
      console.log('prams',this.$route.params);
      this.product_id = this.$route.params.id;
      console.log('this prod',this.this_prod);
    }
  },
  computed:{
    this_prod(){
      return this.items.filter(item => {
         return item.id== this.product_id
      })[0]
    },
    product_id(){
      return this.$route.params.id;
    }
  },
  created(){
    console.log('created, prop',this.product_id);
  },
}
</script>

<style>

</style>