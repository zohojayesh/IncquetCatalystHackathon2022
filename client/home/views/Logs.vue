<template>
  <v-container>
    <div class="heading"> <h1> My Logs </h1> </div>
    <v-card>
      <v-card-title>
        
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Logs"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="logs"
        :search="search"
        :sort-by="['Subscription', 'subscription_id']"
        hide-default-footer
      ></v-data-table>
    </v-card>
    <img class="serv-apiIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031801/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Api_2x_i8ziui.png" >
      <img class="serv-exclaimIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031778/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Js_2x_nd547u.png">
      <img class="serv-creatorIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664109540/Incquet%20website/New%20Website%20Design%20/Icon-Bg-ZohoC_2x_tj3gdn.png">
  </v-container>
</template>

<script>
module.exports= {
  data(){
    return {
        loading: false,
        search: '',
        headers: [
          {
            text: 'User',
            align: 'start',
            sortable: false,
            value: 'user_id',
          },
          { text: 'Subscription', value: 'subscription_id' },
          { text: 'Product', value: 'product_id' },
          { text: 'Meta', value: 'meta' },
          { text: 'Status', value: 'status' },
          { text: 'Added Date', value: 'CREATEDTIME' },
        ],
        log_list: [],
      }
    },
     methods:{
      fetchLogs(hasNext = true, next_token = undefined){
        if (!hasNext) {
            return;
        } 
        this.loading = true;
        var datastore = catalyst.table;
        var table = datastore.tableId('Logs');
        table
        .getPagedRows({ next_token, max_rows: 100 })
        .then(resp => {
                console.log('logList : ', resp.content);
                this.log_list = resp.content;
                this.$root.log_list = this.log_list;
                return this.fetchLogs(resp.more_records, resp.next_token);
            })
            .catch((err) => {
                console.log(err.toString());
            }).finally(()=>{
              this.loading=false;
            });
      },
     
    },
    computed:{
      logs(){
        return this.$root.logs;
      }
    },
    created(){
      this.loading = true;
      this.$root.getLogs()
      .finally(()=>{this.loading=false});
    },
}
</script>

<style>

</style>