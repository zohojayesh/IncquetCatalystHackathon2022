<template>
  <v-container>
      <div class="heading"><h1> My Subscription </h1> </div>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="subscription_list"
      class="elevation-1"
      hide-default-footer
    >
    <template v-slot:item.actions="{ item }">
      <v-btn
        color="primary"
        dark
        class="my-2"
        v-bind="attrs"
        @click="viewLogItem(item)"
        >
        <v-icon
          small
          class="mr-2"
        >
        mdi-information-variant
      </v-icon> 
        View Logs
    </v-btn>
    </template>
    </v-data-table>
      <img class="serv-apiIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031801/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Api_2x_i8ziui.png" >
      <img class="serv-exclaimIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031790/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Exclaim_2x_wnjdag.png">
      <img class="serv-creatorIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664109540/Incquet%20website/New%20Website%20Design%20/Icon-Bg-ZohoC_2x_tj3gdn.png">
  </v-container>
</template>

<script>
module.exports= {
  data () {
      return {
        loading: false,
        headers: [
          {
            text: 'Product Subscribed',
            align: 'start',
            sortable: false,
            value: 'product_name',
          },
          { text: 'API Consumed', value: 'consumption' },
          { text: 'Added Date', value: 'CREATEDTIME' },
          { text: 'Actions', value: 'actions', sortable: false },

        ],
        subscription_list: [],

      }
    },
    methods:{
      fetchSubscriptions(hasNext = true, next_token = undefined){
        if (!hasNext) {
            return;
        } 
        this.loading = true;
        var datastore = catalyst.table;
        var table = datastore.tableId('Subscription');
        table
        .getPagedRows({ next_token, max_rows: 100 })
        .then(resp => {
                console.log('subscriptionList : ', resp.content);
                this.subscription_list = resp.content;
                this.$root.subscription_list = this.subscription_list;
                return this.fetchSubscriptions(resp.more_records, resp.next_token);
            })
            .catch((err) => {
                console.log(err.toString());
            }).finally(()=>{
              this.loading=false;
            });
      },
      viewLogItem(item) {
        // this.editedIndex = this.subscription_list.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        this.$router.push({path:'/logs'});
        
      },

    },
    created(){
      this.fetchSubscriptions();
    },
}
</script>

<style>

</style>