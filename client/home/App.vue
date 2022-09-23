<template>
  <v-app>
      <nav-bar></nav-bar>
      <!-- Sizes your content based upon application components -->
      <v-main>
        <v-container>
          <!-- Provides the application the proper gutter -->
          <!-- <task-kanban :key="componentKey"></task-kanban> -->
          <router-view></router-view>
          <!-- <h1> App.vue </h1>
          <pre>
            {{user}}
          </pre> -->
          </v-container>
      </v-main>
  </v-app>
</template>
<script>
module.exports = {
    components:{
                // 'task-kanban':httpVueLoader('./views/task_kanban.vue'),
                'nav-bar':httpVueLoader('./components/Nav.vue')
                },
    data(){
      return{
        componentKey:0,
        user:{},
        product_list:[],
      }
    },
    methods: {
      forceRerender() {
        this.componentKey += 1;
      },
      getUser(){
        catalyst.auth.isUserAuthenticated().then(result => {
            console.log('result',result);
            this.user = result.content;
        }).catch(err => {
            console.log('error ',err);
            console.log('You are not logged in. Please log in to continue. Redirecting you to the login page..');
        });
      },
      fetchProducts(hasNext = true, next_token = undefined){
        if (!hasNext) {
            return;
        } 

        var datastore = catalyst.table;
        var table = datastore.tableId('Products');
    
        console.log('datastore',datastore);
        table
        .getPagedRows({ next_token, max_rows: 100 }) //Define the maximum rows to be fetched in a single page and pass it along with nextToken
        .then(resp => {
                console.log('rows : ', resp.content); //Fetch the rows from the table
                this.product_list = resp.content;
                this.$root.product_list = this.product_list;
                return this.fetchProducts(resp.more_records, resp.next_token);
            })
            .catch((err) => {
                console.log(err.toString());
            });        
      }

    },
    mounted() {
            this.$root.$on('reload', () => {
                this.componentKey += 1;
            });

            this.getUser();

            // //
            // this.$root.increment();
            //
            this.fetchProducts();
        }
}
</script>

<style>

</style>