const routes = [        

    { name:'home',path: '/', component: httpVueLoader('./views/Home.vue'),meta: { requiresAuth: true}},
    { name:'products',path: '/products', component: httpVueLoader('./views/Products.vue'),meta: { requiresAuth: true } },
    { name:'product_details',path: '/products/:id', component: httpVueLoader('./views/ProductDetailPage.vue'),meta: { requiresAuth: true },props: true },
    { name:'subscriptions',path: '/subscriptions', component: httpVueLoader('./views/Subscriptions.vue'),meta: { requiresAuth: true } },
    { name:'logs',path: '/logs', component: httpVueLoader('./views/Logs.vue'),meta: { requiresAuth: true } },
    { name:'default',path: '*', component: httpVueLoader('./views/Home.vue'),meta: { requiresAuth: true}}

  ];

const router = new VueRouter({
    mode:'history',
    base:'/app/home/',
    routes // short for `routes: routes`
});

try{
    let resp = await catalyst.auth.isUserAuthenticated();
    window.loginUser = resp.content;
}catch(e){
    window.loginUser = null;
}

console.log('main.js',window.loginUser);
try{

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !window.loginUser){
        // catalyst.auth.isUserAuthenticated()
        // .then(()=>next())
        // .catch(()=>document.location.href = "../index.html");
        document.location.href = "../index.html";
    }else{
        next();
    }
});

}catch(e){
    console.log('error in route guard',e);
}

Vue.use(Pinia.PiniaVuePlugin);
// YOUR JAVASCRIPT CODE FOR INDEX.HTML GOES HERE

var app = new Vue({
    router,
    el: '#vue_app',
    vuetify: new Vuetify(),
    pinia: Pinia.createPinia(),
    components:{'App':httpVueLoader('./App.vue')},
    computed: {
        ...Pinia.mapState(useCounterStore, ['value','product_list','subscription_list','loaded','user'])
    },
    methods: {
        ...Pinia.mapActions(useCounterStore, ['increment','fetchProducts','getProdsV2','getSubs','getUser'])
    },
    created(){
        console.log("vue app initialised");
        this.getUser()
        .then(()=>{
            this.getSubs();
        });
        this.getProdsV2();
    }
});