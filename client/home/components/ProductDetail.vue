<template>
    <div>
    <v-card elevation="2" class="code-snippets">
        <v-card-title>
            {{product.name}}
            <v-btn :disabled="!!subscription_id" :loading="subscribeLoading" @click="subscribe()" :class="{'green--text':!!subscription_id,'red--text':!subscription_id}" text link absolute right>
                <v-icon v-if="subscription_id">mdi-check-all</v-icon>
                {{subscription_id?'Subscribed':'Subscribe'}}
            </v-btn>
        </v-card-title>
        <v-card-text class="pb-2">
            {{product.long_description}}
        </v-card-text>

        <v-tabs
            v-if="prod_apis.length>1"
            v-model="tab"
            class="proj_detail_tab deep-purple acsent-4"
            center-active >
            <v-tab v-for="(api,i) in prod_apis" :key="`${i}-header`"
            :href="`#tab-${i}`"
            >{{api.api_name}}</v-tab>
        </v-tabs>
        
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(api,i) in prod_apis" :key="i" :value="`tab-${i}`">
                <Apidetail :api="product" :subscription_id="subscription_id" />
            </v-tab-item>
        </v-tabs-items>
    </v-card>
    </div>
</template>

<script>
module.exports = {
    props:['product','subscription_id'],
    components:{'Apidetail':httpVueLoader('./APIDetail.vue')},
    data(){
        return{
            subscribeLoading:false,
            tab:'tab-0'
        }
    },
    methods:{
        subscribe(){
            
            this.subscribeLoading = true;
            let user = this.$root.user;
            //
            var details = [{"user_id": user.user_id, "product_id": this.product.id,'product_name':this.product.name}];
            var datastore = catalyst.table;
            var table = datastore.tableId('Subscription'); //Provide the table ID or table name to insert the rows in
            table.addRow(details)
            .then((response) => {
                // this.subscription_id = response.content[0].ROWID;
                // console.log(response.content,'sub id',this.subscription_id);
                this.$root.getSubs();
            }).catch((err) => {
                console.log(err);
            }).finally(()=>{
                this.subscribeLoading = false;
            });
        }
    },
    computed:{
        all_apis(){
            return this.$root.api_list;
        },
        prod_apis(){
            return this.all_apis.filter(api=>api.product_id==this.product.id);
        }
    }
}
</script>

<style scoped>
.green--text{
    color:#008000a8 !important;
}
</style>