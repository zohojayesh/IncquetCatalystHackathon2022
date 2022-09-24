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
        <v-card-text>
            <p class="monospace-text">
                POST 
                <span class="blue-grey--text" ref="body_code_ref">
                    //v2.convertapi.com/convert/heic/to/jpg?Secret=&lt; YOUR SECRET HERE &gt;
                </span> 
            </p>
            <p class="monospace-text">
                <span class="indigo--text"> 
                    Content-Type:</span> application/json</p>
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
                <pre ref="header_code_ref">{{product.header_json}}</pre>
            </div>
        </div>


        <v-divider></v-divider>
        <v-card-subtitle> Body </v-card-subtitle>
        
            <div class="code-snippetWrapper">
                <div class="code-snippetArea">
                    
                    <v-btn  :loading="selectedElement=='body' && loading" @click="copyCode('body')" 
                            :class="{'green--text lighten-2':selectedElement=='body' && !loading,'blue-grey--text':selectedElement!='body'}" text link absolute right><v-icon> {{selectedElement=='body'?'mdi-checkbox-multiple-marked-outline':'mdi-content-copy'}} </v-icon>
                    </v-btn>

                    <pre ref='body_code_ref'>{{product.body_json}}</pre>

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
    }
}
</script>

<style>

</style>