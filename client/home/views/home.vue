<template>
    <div class="heading">
        <!-- <h1>this will be the home page</h1>  -->
        <div id="business-automation">
            <div class="container">
                <v-row>
                    <v-col md="5" sm="12"> </v-col>
                    <v-col md="7" sm="12">
                        <v-row>
                            <v-col md="4" sm="4">
                                <v-card
                                    color="#1F7087"
                                    style=" background: linear-gradient(270deg, #288099 0%, #186176 100%) 0% 0% no-repeat padding-box padding-box transparent"
                                    dark
                                >
                                   
                                    <v-row class="ma-0">
                                    <v-col md="6">
                                        <v-card-title class="text-h5 pa-1">
                                            <v-icon large>mdi-wunderlist</v-icon>
                                        </v-card-title>
                                    </v-col>
                                    <v-col md="6">
                                        <v-card-title class="text-h5 pa-1">
                                            1232
                                        </v-card-title>
                                    </v-col>
                                </v-row>

                                    <v-card-subtitle class="py-2"> My Subscriptions</v-card-subtitle>

                                    <v-card-actions>
                                    <v-btn text small>
                                        Explore
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <v-col md="4" sm="4">
                                <v-card
                                    color="#385F73"
                                    style="    background:  linear-gradient(270deg, #385f73 0%, #274c5f 100%) 0% 0% no-repeat padding-box padding-box transparent"
                                    dark
                                >
                                    <v-row class="ma-0">
                                        <v-col md="6">
                                            <v-card-title class="text-h5 pa-1">
                                                <v-icon large> mdi-cash </v-icon>
                                            </v-card-title>
                                        </v-col>
                                        <v-col md="6">
                                            <v-card-title class="text-h5 pa-1">
                                                1232
                                            </v-card-title>
                                        </v-col>
                                    </v-row>
                                    <v-card-subtitle class="py-2"> Credits Consume </v-card-subtitle>
                                    
                                    <v-card-actions>
                                    <v-btn text small>
                                        Explore
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                             <v-col md="4" sm="4">
                                <v-card
                                    style=" background:linear-gradient(270deg, #2B459C 0%, #121F63 100%) 0% 0% no-repeat padding-box;"
                                    dark
                                >
                                <v-row class="ma-0">
                                    <v-col md="6">
                                        <v-card-title class="text-h5 pa-1">
                                            <v-icon large>mdi-cash-multiple</v-icon>
                                        </v-card-title>
                                    </v-col>
                                    <v-col md="6">
                                        <v-card-title class="text-h5 pa-1">
                                            1232
                                        </v-card-title>
                                    </v-col>
                                </v-row>
                                    <v-card-subtitle class="py-2"> Credits Available</v-card-subtitle>
                                    <v-card-actions>
                                    <v-btn text small>
                                        Explore
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                        <img class="serv-apiIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031801/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Api_2x_i8ziui.png" >
                        <img class="serv-exclaimIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664031790/Incquet%20website/New%20Website%20Design%20/Icon-Bg-Exclaim_2x_wnjdag.png">
                        <img class="serv-creatorIllus" src="https://res.cloudinary.com/incquet-solution/image/upload/v1664109540/Incquet%20website/New%20Website%20Design%20/Icon-Bg-ZohoC_2x_tj3gdn.png">

                        <v-row class="mt-3">
                            <v-col>
                                <v-card>
                                    <v-card-title>
                                    Recent Logs
                                    <v-spacer></v-spacer>
                                   
                                    </v-card-title>
                                    <v-data-table
                                    :headers="headers"
                                    :items="desserts"
                                    :sort-by="['calories', 'fat']"
                                    hide-default-footer
                                    ></v-data-table>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col> <!-- col-7 -->
                </v-row>
            </div>
        </div>  <!-- business-automation -->
    </div>
</template>
<script>
module.exports={

  data(){
    return {
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
}
</script>

<style>

</style>