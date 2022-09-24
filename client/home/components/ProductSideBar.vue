<template>
        <v-card
            flat
            >
                <v-navigation-drawer
                    floating
                    permanent
                >
                    <v-list
                    dense
                    rounded
                    >
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="prod-catogary-title"> PRODUCTS </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        v-for="(item,i) in product_list"
                        :key="i"
                        link
                        :to="`/products/${item.id}`"
                    >
                        <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                </v-navigation-drawer>
            </v-card>
  
</template>

<script>
module.exports= {
  props:['product_list'],
  data () {
      return {
        // items: [
        //   {id:1, title: 'CSV to JSON', icon: 'mdi-cloud-braces' },
        //   {id:2, title: 'Phone Call', icon: 'mdi-phone-outline' },
        //   {id:3, title: 'Google Drive', icon: 'mdi-google-drive' },
        //   {id:4, title: 'URL Shortner', icon: 'mdi-link-variant' },
        // ],
      }
    }

}
</script>

<style>

</style>