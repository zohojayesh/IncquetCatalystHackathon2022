<template>
  <v-container>
    <div class="heading"> <h1> All products </h1> </div>
    <v-row>
      <v-col cols="12" lg="12"
        v-if="product_list.length==0" style="text-align:center;">
          <v-progress-circular
            :size="75"
            color="primary"
            indeterminate
          ></v-progress-circular>
      </v-col>
      
      <v-col cols="12" md="6" xl="3" lg="3" sm="12" v-else  v-for="(prod,i) in product_list" :key="i" >
        <product-item :product="prod"></product-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  module.exports= {
    components:{
      'product-item':httpVueLoader('../components/ProductItem.vue')
    },
    data(){
      return{
        product_list:[],
        loading:false
      }
    },
    methods:{
      fetchProducts(hasNext = true, next_token = undefined){
        if (!hasNext) {
            return;
        } 
        this.loading = true;
        var datastore = catalyst.table;
        var table = datastore.tableId('Products');
        table
        .getPagedRows({ next_token, max_rows: 100 })
        .then(resp => {
                console.log('productList : ', resp.content);
                this.product_list = resp.content;
                this.$root.product_list = this.product_list;
                return this.fetchProducts(resp.more_records, resp.next_token);
            })
            .catch((err) => {
                console.log(err.toString());
            }).finally(()=>{
              this.loading=false;
            });
      }

    },
    created(){
      this.fetchProducts();
    }
  }
</script>

<style>

</style>