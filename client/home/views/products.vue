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
    <img class="serv-apiIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031801/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Api_2x_i8ziui.png">
    <img class="serv-jsIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031778/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Js_2x_nd547u.png">
      <img class="serv-exclaimIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031790/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Exclaim_2x_wnjdag.png">
      <img class="serv-creatorIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664109540/Incquet%20website/New%20Website%20Design%20/Icon-Bg-ZohoC_2x_tj3gdn.png">
  </v-container>
</template>

<script>
  module.exports= {
    components:{
      'product-item':httpVueLoader('../components/ProductItem.vue')
    },
    data(){
      return{
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
                return this.fetchProducts(resp.more_records, resp.next_token);
            })
            .catch((err) => {
                console.log(err.toString());
            }).finally(()=>{
              this.loading=false;
            });
      }
  
    },
    computed:{
      product_list(){
        return this.$root.product_list;
      }
    },
    created(){
      // this.fetchProducts();
    }
  }
</script>

<style>

</style>