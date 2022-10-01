const useCounterStore = Pinia.defineStore('counter', {
    state() {
      return {
        value: 0,
        product_list:[],
        subscription_list:[],
        loaded:false,
        user:null,
        logs:[],
        api_list:[]
      }
    },
    actions: {
      increment(state) {
        this.value++
      },
      runQuery(query,key){
        let zcql = catalyst.ZCatalystQL;
        return zcql.executeQuery(query).
        then(queryResult => {
              // console.log('queryResult',queryResult);
              if(queryResult.status==200){
                let l = [];
                queryResult.content
                .forEach(resp=>{
                  l.push(resp[key]);
                });
                return l;
              }else{
                return [];
              }
        })
      },
      fetchProducts(){

        let zcql = catalyst.ZCatalystQL;
        let query = 'SELECT * FROM Products';

        //Execute the query by passing it
        zcql.executeQuery(query).
        then(queryResult => {
              console.log('queryResult',queryResult);
              if(queryResult.status==200){
                queryResult.content
                .forEach(resp=>{
                  this.product_list.push(resp.Products);
                })
              }
        })
        .catch((err) => {
            console.log(err.toString());
        }).finally(()=>{
          this.loaded=true;
        });
        // this.product_list=[{'a':'b'},{'c':'d'}];
      },
      getProdsV2(){
        this.runQuery('SELECT * FROM Products','Products')
        .then(data=>{
          this.product_list = data;
          this.loaded = true;
        }).catch(e=>{
          console.log('error getProdsV2',e);
        })
      },
      getSubs(){
        if(!this.user) return;
        this.runQuery(`SELECT * FROM Subscription where user_id=${this.user.user_id}`,'Subscription')
        .then(data=>{

          this.subscription_list = data;
          this.loaded = true;
          
        }).catch(e=>{
          console.log('error getSubs',e);
        })

      },
      getUser(){
        //Get the details of the current user
        var userManagement = catalyst.userManagement;
        return userManagement.getCurrentProjectUser()
        .then((response) => {
            console.log(response.content);
            this.user =response.content;
            this.loaded = true;
            return this.user;
        })
        .catch((err) => {
            console.log('err in getUser',err);
            return err;
        });

      },
      getLogs(sub_id){
        if(!this.user) return;
        
        let query = `SELECT * FROM Logs where user_id=${this.user.user_id}` + (sub_id?` and subscription_id=${sub_id}`:'');
        return this.runQuery(query,'Logs')
        .then(data=>{
          this.logs = data;          
          return this.logs;
        }).catch(e=>{
          console.log('error getLogs',e);
          return e;
        })

      },
      getAPIs(){

        this.runQuery(`SELECT * FROM APIs`,'APIs')
        .then(data=>{
          this.api_list = data;
        }).catch(e=>{
          console.log('error getAPI',e);
        })
      }
    }
  })