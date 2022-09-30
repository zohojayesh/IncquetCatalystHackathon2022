<template>
  <v-app>
      <nav-bar></nav-bar>
      <!-- Sizes your content based upon application components -->
      <v-main>
        
          <!-- Provides the application the proper gutter -->
          <!-- <task-kanban :key="componentKey"></task-kanban> -->
          <router-view></router-view>
          <!-- <h1> App.vue </h1>
          <pre>
            {{user}}
          </pre> -->
          
      </v-main>
  </v-app>
</template>
<script>
module.exports = {
    components:{
                // 'task-kanban':httpVueLoader('./views/task_kanban.vue'),
                'nav-bar':httpVueLoader('./components/Nav.vue')
                },
    data(){
      return{
        componentKey:0,
        product_list:[],
      }
    },
    methods: {
      forceRerender() {
        this.componentKey += 1;
      },
    },
    mounted() {
            this.$root.$on('reload', () => {
                this.componentKey += 1;
            });
        }
}
</script>

<style>

</style>