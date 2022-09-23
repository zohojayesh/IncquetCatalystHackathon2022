const routes = [        

    { name:'home',path: '/', component: httpVueLoader('./views/Home.vue')},
    { name:'products',path: '/products', component: httpVueLoader('./views/Products.vue'),meta: { requiresAuth: true } },
    { name:'product_details',path: '/products/:id', component: httpVueLoader('./views/ProductDetailPage.vue'),meta: { requiresAuth: true },props: true },
    { name:'subscriptions',path: '/subscriptions', component: httpVueLoader('./views/Subscriptions.vue'),meta: { requiresAuth: true } },
    { name:'logs',path: '/logs', component: httpVueLoader('./views/Logs.vue'),meta: { requiresAuth: true } }

  ];
const router = new VueRouter({
    mode:'history',
    base:'/app/home/',
    routes // short for `routes: routes`
});

// var userLoggedIn = false;
// catalyst.auth.isUserAuthenticated().then(result => {
//     console.log('result',result);
//     document.getElementById('result').innerHTML= JSON.stringify(result);
// }).catch(err => {
//     console.log('error ',err);
//     console.log('You are not logged in. Please log in to continue. Redirecting you to the login page..');

// });


// router.beforeEach(async (to, from, next) => {
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     if (requiresAuth && !await catalyst.auth.isUserAuthenticated()){
//         next('../index.html');
//     }else{
//         next();
//     }
// });


// Vue.use(Pinia.PiniaVuePlugin);
// YOUR JAVASCRIPT CODE FOR INDEX.HTML GOES HERE

var app = new Vue({
    router,
    el: '#vue_app',
    vuetify: new Vuetify(),
    // pinia: Pinia.createPinia(),
    components:{'App':httpVueLoader('./App.vue')},
    created:function(){
        console.log("vue app initialised");
    },
    // computed: {
    //     ...Pinia.mapState(useCounterStore, ['value','product_list'])
    // },
    // methods: {
    //     ...Pinia.mapActions(useCounterStore, ['increment','fetchProducts'])
    // },
    created(){
        // console.log('store value',this.value);
    }    
});