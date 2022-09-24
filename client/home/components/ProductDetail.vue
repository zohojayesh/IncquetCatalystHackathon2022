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
                <span class="blue-grey--text">
                    //v2.convertapi.com/convert/heic/to/jpg?Secret=< YOUR SECRET HERE > 
                </span> </p>
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
                    <v-btn class="blue-grey--text" text link absolute right><v-icon> mdi-content-copy </v-icon></v-btn>
                <pre>{
content-type:"application-json"
}</pre>
            </div>
        </div>


        <v-divider></v-divider>
        <v-card-subtitle> Body </v-card-subtitle>
        
            <div class="code-snippetWrapper">
                <div class="code-snippetArea">
                    <v-btn class="blue-grey--text" text link absolute right><v-icon> mdi-content-copy </v-icon></v-btn>
                <pre>{
content-type:"application-json"
}</pre>
                </div>
            </div>
            
        </v-card>
    </div>
</template>

<script>
module.exports = {
    props:['product'],
}
</script>

<style>

</style>