const catalyst = require('zcatalyst-sdk-node');

module.exports = (context, basicIO) => {

	const catalystApp = catalyst.initialize(context);

	let user_id = basicIO.getArgument("user_id");
	let product_id = basicIO.getArgument("product_id");

	//Get a Single Table's details using table ID
	let datastore = catalystApp.datastore();
    let table = datastore.table('11176000000065812');
 	let rowData = {  user_id: user_id, product_id: product_id};
    
    table
	.insertRow(rowData)
	.then((row) => {
            console.log("row inserted",row);
			context.log("subscription resp : " + row);
			basicIO.write(JSON.stringify(row));
			context.close();
        }).catch((e)=>{
			context.log("subscription error : " + e);
			basicIO.write("error: "+err.toString());
			context.close();
		});
}