<template>
  <div>
    <h1> This is Product Detail </h1> 
    <v-row>
        <v-col md="3" lg="3" sm="12">
            <v-card
                flat
                height="100vh"
            >
                <v-card
                elevation="3"
                
                >
                <v-navigation-drawer
                    floating
                    permanent
                    height="100vh"
                >
                    <v-list
                    dense
                    rounded
                    >
                    <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        :to="`/productDetail/${item.id}`"
                    >
                        <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                </v-card>
            </v-card>

        </v-col>
        <v-col md="9" lg="9" sm="12">
            code panel
        </v-col>
    </v-row>
  </div>
</template>

<script>
module.exports= {
  data () {
      return {
        items: [
          {id:1, title: 'CSV to JSON', icon: 'mdi-cloud-braces' },
          {id:2, title: 'Phone Call', icon: 'mdi-phone-outline' },
          {id:3, title: 'Google Drive', icon: 'mdi-google-drive' },
          {id:4, title: 'URL Shortner', icon: 'mdi-link-variant' },
        ],
      }
    },
}
</script>

<style>

</style>