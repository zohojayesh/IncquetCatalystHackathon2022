<template>
  <v-container>
    <div class="heading"> 
      <h1>
        <v-btn icon @click="goback()"><v-icon>mdi-arrow-left</v-icon></v-btn>
        {{this_prod.short_description}}
      </h1> 
      <!-- <p>sub id : {{sub_id}}</p> -->
      <!-- 
        <pre>
        {{subscription_list}}
      </pre> -->
    </div>
    <v-row>
        <v-col md="3" lg="3" sm="12">
          <product-sidebar :product_list="product_list"></product-sidebar>
        </v-col>
        <v-col md="9" lg="9" sm="12">
          <product-detail :product="this_prod || {}" :subscription_id="sub_id"></product-detail>
        </v-col>
    </v-row>
  </v-container>
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
        product_list:[],
      }
    },
  methods:{
    init(){
      console.log('prams',this.$route.params);
      this.product_id = this.$route.params.id;
      console.log('this prod',this.this_prod);
    },
    goback(){
       this.$router.push({ path: '/products' })
    }
  },
  computed:{
    this_prod(){
      return this.product_list.filter(item => {
         return item.id== this.product_id
      })[0]
    },
    product_id(){
      return this.$route.params.id;
    },
    subscription_list(){
      return this.$root.subscription_list;
    },
    sub_id(){      
      let sub_rec = this.subscription_list.filter(sub => {return sub.product_id== this.product_id})[0];
      return sub_rec?sub_rec.ROWID:null;
    }
  },
  created(){
    this.product_list=this.$root.product_list;
    console.log('this.$root.product_list',this.$root.product_list);
    console.log('this.$root.subscription_list',this.$root.subscription_list);
  },
}
</script>

<style>

</style>