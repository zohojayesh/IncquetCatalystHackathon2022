const useCounterStore = Pinia.defineStore('counter', {
    state() {
      return {
        value: 0,
        product_list:[],
      }
    },
    actions: {
      increment(state) {
        this.value++
      },
      fetchProducts(){
        var datastore = catalyst.table;
        var table = datastore.tableId('Products');
    
        console.log('datastore',datastore);
        table 
            .getPagedRows({ next_token:null, max_rows: 100 }) //Define the maximum rows to be fetched in a single page and pass it along with nextToken
            .then(resp => {
                console.log('rows : ', resp.content); //Fetch the rows from the table
                this.product_list = resp.content;
            })
            .catch((err) => {
                console.log(err.toString());
            });        
      }
    }
  })


  // module.exports={useCounterStore}