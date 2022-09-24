<template>
    <div>
    <v-card elevation="2" class="code-snippets">
        <v-card-title>
            {{product.name}}
            <v-btn class="red--text" text link absolute right>Subscribe</v-btn>
        </v-card-title>
        <v-card-subtitle class="pt-2 pb-2">
            {{product.short_description}}
        </v-card-subtitle>
        <v-card-text class="pb-2">
            {{product.long_description}}
        </v-card-text>

        <v-tabs
            class="proj_detail_tab"
            center-active >
            <v-tab>One</v-tab>
            <v-tab>Two</v-tab>
            <v-tab>Three</v-tab>
        </v-tabs>
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
                            <span class="blue-grey--text" ref="endpoint_code_ref">
                                //v2.convertapi.com/convert/heic/to/jpg?Secret=&lt; YOUR SECRET HERE &gt;
                            </span> 
                        </p>
                    </v-col>
                    <v-col md="1" class="text-center">
                    <v-btn :loading="selectedElement=='endpoint' && loading" @click="copyCode('endpoint')" 
                    :class="{'green--text lighten-2':selectedElement=='endpoint' && !loading,'blue-grey--text':selectedElement!='endpoint'}" 
                        text small link absolute right>
                        <v-icon> 
                            {{selectedElement=='endpoint'?'mdi-checkbox-multiple-marked-outline':'mdi-content-copy'}} 
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
                    <v-btn :loading="selectedElement=='header' && loading" @click="copyCode('header')" 
                    :class="{'green--text lighten-2':selectedElement=='header' && !loading,'blue-grey--text':selectedElement!='header'}" text link absolute right>
                        <v-icon> {{selectedElement=='header'?'mdi-checkbox-multiple-marked-outline':'mdi-content-copy'}} </v-icon>
                    </v-btn>
                <pre  ref="header_code_ref">{{product.header_json | formatjson}} </pre>
            </div>
        </div>


        <v-divider></v-divider>
        <v-card-subtitle> Body </v-card-subtitle>
        
            <div class="code-snippetWrapper">
                <div class="code-snippetArea">

                    <v-btn  :loading="selectedElement=='body' && loading" @click="copyCode('body')" 
                            :class="{'green--text lighten-2':selectedElement=='body' && !loading,'blue-grey--text':selectedElement!='body'}" text link absolute right><v-icon> {{selectedElement=='body'?'mdi-checkbox-multiple-marked-outline':'mdi-content-copy'}} </v-icon>
                    </v-btn>

                    <pre  ref='body_code_ref'>{{product.body_json | formatjson}} </pre>

                </div>
            </div>
            
        </v-card>
    </div>
</template>

<script>
module.exports = {
    props:['product'],
    data(){
        return{
            selectedElement :null,
            loading:false,
            
        }
    },
    methods:{
        copyCode(element){
            this.loading=true;
            this.selectedElement=element;
            var code = this.$refs[element+'_code_ref'].innerHTML;
            const clipboardData =  window.clipboardData ||  navigator.clipboard;
            clipboardData.writeText(code);            
            setTimeout(()=>{this.loading=false;},1000);
        }
    },
    filters:{
        formatjson(v){
            return JSON.stringify(JSON.parse(v), null, 2);
        }
    }
}
</script>

<style>

</style>