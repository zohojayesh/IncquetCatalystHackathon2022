const catalyst = require('zcatalyst-sdk-node');

module.exports = (context, basicIO) => {

	const catalystApp = catalyst.initialize(context);
	let datastore = catalystApp.datastore();

	let product_id = basicIO.getArgument("product_id");
	let subscription_id = basicIO.getArgument("subscription_id");
	let log = basicIO.getArgument("log");

	//Get Segment instance with segment ID (If no ID is given, Default segment is used)
	//Create a JSON object with the rows to be inserted
  let rowData = 
    { 
        Product: product_id,
        Subscription: subscription_id,
        Status: log.status,
		Meta:log.meta
    };

    //Use the table meta object to insert the row which returns a promise
    let table = datastore.table('Logs');
    let insertPromise = table.insertRow(rowData);
    insertPromise.then((row) => {
		console.log('log inserted',row);
	}).catch(e=>{
		console.log('log insersion error',e);
	});
}