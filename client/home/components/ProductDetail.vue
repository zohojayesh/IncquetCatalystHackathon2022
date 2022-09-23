<template>

    <div>
        <v-card outlined class="mb-5">
            <v-row>
                <v-col md="2">
                    <v-card-title class="text-h5 font-weight-regular blue-grey lighten-4 white--text">
                        <v-icon>
                            mdi-link-variant
                        </v-icon>
                    </v-card-title>
                </v-col>
                <v-col md="8">
                    <v-card-text class="text-h4 p-0">
                        asdfka asf asfasf
                    </v-card-text>
                </v-col>
                <v-col md="2">
                    <v-card-title class="text-h5 font-weight-regular blue-grey lighten-4 white--text">
                        <v-icon>
                            mdi-copy
                        </v-icon>
                    </v-card-title>
                </v-col>
                
                    
                    
            </v-row>
        </v-card>

    <v-card elevation="2" class="code-snippets">
        <v-card-title>
            {{product.name}}
            <v-btn class="red--text" text link absolute right>Subscribe</v-btn>
        </v-card-title>
        <v-card-subtitle>
            {{product.short_description}}
        </v-card-subtitle>
        <v-card-text>
            {{product.long_description}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-subtitle> Header </v-card-subtitle>
            <div class="code-snippetWrapper">
                <pre>
{
content-type:"application-json"
}
                </pre>
            </div>

        <v-divider></v-divider>
        <v-card-subtitle> Body </v-card-subtitle>
            <div class="code-snippetWrapper">
                <pre>
    <code>{
    content-type:"application-json"
    }</code>
                </pre>
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