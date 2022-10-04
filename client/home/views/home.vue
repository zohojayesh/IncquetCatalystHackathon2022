<template>
    <div class="heading">
        <!-- <h1>this will be the home page</h1>  -->
        <div id="business-automation">
            <div class="container">
                <v-row>
                    <v-col md="5" sm="12"> </v-col>
                    <v-col md="7" sm="12">
                        <v-row>
                            <v-col md="4" sm="4">
                                <v-card
                                    color="#1F7087"
                                    style=" background: linear-gradient(270deg, #288099 0%, #186176 100%) 0% 0% no-repeat padding-box padding-box transparent"
                                    dark
                                >
                                   
                                    <v-row class="ma-0">
                                    <v-col md="6">
                                        <v-card-title class="text-h5 pa-1">
                                            <v-icon large>mdi-check-all</v-icon>
                                        </v-card-title>
                                    </v-col>
                                    <v-col md="6">
                                        <v-card-title class="text-h5 pa-1 float-right">
                                            {{logCounts.success}}
                                        </v-card-title>
                                    </v-col>
                                </v-row>

                                    <v-card-subtitle class="py-2"> Successfull API Calls</v-card-subtitle>

                                    <v-card-actions>
                                    <v-btn text small link to='/logs'>
                                        Explore
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col md="4" sm="4">
                                <v-card
                                    color="#385F73"
                                    style="    background:  linear-gradient(270deg, #385f73 0%, #274c5f 100%) 0% 0% no-repeat padding-box padding-box transparent"
                                    dark
                                >
                                    <v-row class="ma-0">
                                        <v-col md="6">
                                            <v-card-title class="text-h5 pa-1">
                                                <v-icon large> mdi-alert-circle-outline </v-icon>
                                            </v-card-title>
                                        </v-col>
                                        <v-col md="6">
                                            <v-card-title class="text-h5 pa-1 float-right">
                                                {{logCounts.failure}}
                                            </v-card-title>
                                        </v-col>
                                    </v-row>
                                    <v-card-subtitle class="py-2"> Failed API Calls </v-card-subtitle>
                                    
                                    <v-card-actions>
                                    <v-btn text small link to='/logs'>
                                        Explore
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                             <v-col md="4" sm="4">
                                <v-card
                                    style=" background:linear-gradient(270deg, #2B459C 0%, #121F63 100%) 0% 0% no-repeat padding-box;"
                                    dark
                                >
                                <v-row class="ma-0">
                                    <v-col md="6">
                                        <v-card-title class="text-h5 pa-1">
                                            <v-icon large>mdi-youtube-subscription</v-icon>
                                        </v-card-title>
                                    </v-col>
                                    <v-col md="6">
                                        <v-card-title class="text-h5 pa-1 float-right">
                                            {{subscribed}}
                                        </v-card-title>
                                    </v-col>
                                </v-row>
                                    <v-card-subtitle class="py-2"> Products Subscribed</v-card-subtitle>
                                    <v-card-actions>
                                    <v-btn text small link to='/subscriptions'>
                                        Explore
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                        <img class="serv-apiIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031801/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Api_2x_i8ziui.png" >
                        <img class="serv-exclaimIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031790/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Exclaim_2x_wnjdag.png">
                        <img class="serv-creatorIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664109540/Incquet%20website/New%20Website%20Design%20/Icon-Bg-ZohoC_2x_tj3gdn.png">

                        <v-row class="mt-3">
                            <v-col>
                                <v-card>
                                    <v-card-title>
                                        Recent Logs
                                        <v-spacer></v-spacer>
                                    </v-card-title>
                                    <!-- <v-card-text>
                                        {{user}}
                                    </v-card-text> -->
                                    <v-data-table
                                    :loading="loading"
                                    :headers="headers"
                                    :items="logs.slice(0,5)"
                                    hide-default-footer
                                    ></v-data-table>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col> <!-- col-7 -->
                </v-row>
            </div>
        </div>  
    </div>
</template>
<script>module.exports= {
  data(){
    return {
        loading: false,
        search: '',
        headers: [
          { text: 'Added Date', value: 'CREATEDTIME' },
          { text: 'Product ID', value: 'product_id' },
          { text: 'Status', value: 'status' },
          { text: 'Subscription', value: 'subscription_id' }
        ],
        log_list: [],
      }
    },
     methods:{
      fetchLogs(hasNext = true, next_token = undefined){
        // if (!hasNext) {
        //     return;
        // } 
        this.loading = true;
        var datastore = catalyst.table;
        var table = datastore.tableId('Logs');
        table
        .getPagedRows({ next_token, max_rows: 5 })
        .then(resp => {
                console.log('logList : ', resp.content);
                this.log_list = resp.content;
                this.$root.log_list = this.log_list;
                return resp.content;
                // return this.fetchLogs(resp.more_records, resp.next_token);
            })
            .catch((err) => {
                console.log(err.toString());
            }).finally(()=>{
              this.loading=false;
            });
      },
     
    },
    computed:{
        productList(){
            return this.$root.product_list;
        },
        user(){
            return this.$root.user;
        },
        logs(){
            return this.$root.logs;
        },
        logCounts(){
            s=0;f=0;
            this.logs.forEach(log => {
                if(log.status=='success') s++;
                else f++;
            });
            return {'success':s,'failure':f}
        },
        subscribed(){
            return this.$root.subscription_list.length;
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