<template>
    <v-card elevation="2" >
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
        <pre>
            {
                content-type:"application-json"
            }
        </pre>

        <v-divider></v-divider>
        <v-card-subtitle> Body </v-card-subtitle>
        <pre>
            {
                content-type:"application-json"
            }
        </pre>
    </v-card>
</template>

<script>
module.exports = {
    props:['product'],
}
</script>

<style>

</style>