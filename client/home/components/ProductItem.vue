<template>
  <div>
    <!--  card -->
            <v-card
              class="mx-auto"
              max-width="344"
            >
              <v-img
                :src="`./assets/${product.id}.png`"
                height="200px"
              ></v-img>

              <v-card-title>
                {{product.name}}
              </v-card-title>

              <v-card-subtitle>
                {{product.short_description}}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="orange lighten-2"
                  text
                  link
                  :to="`/products/${product.id}`"
                >
                  Explore
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                  icon
                  @click="show = !show"
                >
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>
                        {{product.long_description}}
                    </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          <!--  card -->
  </div>
</template>

<script>
module.exports= {
    props:['product'],
    data(){
        return{
            show: false,

        }
    }
}
</script>

<style>

</style>