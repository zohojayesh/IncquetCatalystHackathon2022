<template>
<div v-if="api">
        <v-divider></v-divider>
        <v-card-subtitle> Endpoint </v-card-subtitle>
        <v-card-text>
            <div class="api-wrapperBox">
                <v-row class="text-center ma-0">
                    <v-col md="1" class="text-center blue-grey lighten-2">
                        <p class="monospace-text ma-0">
                            POST 
                        </p>
                    </v-col>
                    <v-col md="10" class="text-left">
                        <p class="monospace-text ma-0">
                            <span class="blue-grey--text" :ref="`endpoint_${api.ROWID}_code_ref`">
                                {{api.endpoint}}?<span class="indigo--text">subscription_id={{subscription_id?subscription_id:'&lt; your subscription id here &gt;'}}</span>
                                <!-- //v2.convertapi.com/convert/heic/to/jpg?Secret=&lt; YOUR SECRET HERE &gt; -->
                            </span> 
                        </p>
                    </v-col>
                    <v-col md="1" class="text-center">
                    <v-btn :loading="selectedElement==`endpoint_${api.ROWID}` && loading" @click="copyCode('endpoint',)" 
                    :class="{'green--text lighten-2':selectedElement==`endpoint_${api.ROWID}` && !loading,'blue-grey--text':selectedElement!='endpoint'}" 
                        text small link absolute right>
                        <v-icon> 
                            {{selectedElement==`endpoint_${api.ROWID}`?'mdi-checkbox-multiple-marked-outline':'mdi-content-copy'}} 
                        </v-icon>
                    </v-btn>
                    </v-col>
              
                
            </v-row>
            </div>
        </v-card-text>



        <v-divider></v-divider>

        <v-card-subtitle> Header </v-card-subtitle>
            <!-- <v-card-text>
                <p class="monospace-text">
                    POST https://v2.convertapi.com/convert/heic/to/jpg?Secret=<YOUR SECRET HERE > </p>
                <p class="monospace-text">Content-Type: application/json</p>
            </v-card-text> -->
            <div class="code-snippetWrapper">
                <div class="code-snippetArea">
                    <v-btn :loading="selectedElement==`header_${api.ROWID}` && loading" @click="copyCode('header')" 
                    :class="{'green--text lighten-2':selectedElement==`header_${api.ROWID}` && !loading,'blue-grey--text':selectedElement!='header'}" text link absolute right>
                        <v-icon> {{selectedElement==`header_${api.ROWID}`?'mdi-checkbox-multiple-marked-outline':'mdi-content-copy'}} </v-icon>
                    </v-btn>
                <pre  :ref="`header_${api.ROWID}_code_ref`">{{api.header_json | formatjson}} </pre>
            </div>
        </div>


        <v-divider></v-divider>
        <v-card-subtitle> Body </v-card-subtitle>
        
            <div class="code-snippetWrapper">
                <div class="code-snippetArea">

                    <v-btn  :loading="selectedElement==`body_${api.ROWID}` && loading" @click="copyCode('body')" 
                            :class="{'green--text lighten-2':selectedElement==`body_${api.ROWID}` && !loading,'blue-grey--text':selectedElement!='body'}" text link absolute right><v-icon> {{selectedElement==`body_${api.ROWID}`?'mdi-checkbox-multiple-marked-outline':'mdi-content-copy'}} </v-icon>
                    </v-btn>

                    <pre  :ref="`body_${api.ROWID}_code_ref`">{{api.body_json | formatjson}} </pre>

                </div>
            </div>

</div> 
</template>

<script>
module.exports= {
    name:'APIDetail',
    props:['api','subscription_id'],
    data(){
        return{
            selectedElement :null,
            loading:false,
        }
    },
    filters:{
        formatjson(v){
            return JSON.stringify(JSON.parse(v), null, 2);
        }
    },
    methods:{
        copyCode(element){
            this.loading=true;
            this.selectedElement=`${element}_${this.api.ROWID}`;
            var code = this.$refs[`${this.selectedElement}_code_ref`].innerHTML;
            const clipboardData =  window.clipboardData ||  navigator.clipboard;
            clipboardData.writeText(code);
            setTimeout(()=>{this.loading=false;},500);
        },
    }
}
</script>

<style>

</style>