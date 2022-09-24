"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const shortid = require('shortid');
const app = express();
app.use(express.json());

app.post("/URL_Shortner",(req,res)=>{
	let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});
	const requestBody = req.body;
	const baseUrl="https://incquet.com/to"
	let urlCode = shortid.generate();
    let shortUrl = baseUrl + "?c=" + urlCode;
	let datastore = catalystApp.datastore();
	let table = datastore.table('URL_Shortner');
	let log={};
	//
	let insertPromise = table.insertRow({
		long_url: requestBody.long_url,
		code: urlCode,
		shortUrl:shortUrl,
		SearchIndexedColumn: requestBody.id
	});
	insertPromise
	.then((row) => {
		console.log("\nInserted Row : " + JSON.stringify(row));
		res.status(200).json(row);
		log.status = 'status';
		log.meta = JSON.stringify(row);
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send(err);
		log.status = 'failure';
		log.meta = JSON.stringify(err);
	}).finally(()=>{
		createLog(datastore,1,2,log)
	});


})

app.post("/getCode",(req,res)=>{
	
	const searchData=req.body.code+"";
	var catalystapp = catalyst.initialize(req);
	console.log('req received',JSON.stringify(req.body));

	console.log(searchData);
	let config = {
        search: `${searchData}`,
        search_table_columns: {
            "URL_Shortner": ["code","long_url"]
		}
    };
	console.log('search config',config);
	try {
		let search = catalystapp.search();  
		let searchPromise = search.executeSearchQuery(config);
		searchPromise.then(searchResult => {
			console.log('searchResult',searchResult);

			if(searchResult && searchResult.URL_Shortner){
				res.status(200).json({status:"success","long_url":searchResult.URL_Shortner[0].long_url,"code":searchData});
			}else{
				res.status(404).json({status:"failure","message":"Invalid code"});
			}
	    });
	  } catch (error) {
		console.error(error);
		return res.status(500).json({ status:"failure",message: "Some error has occurred" });
	 }
})


app.post("/getCodeV2",(req,res)=>{
	
	const searchData=req.body.code+"";
	var catalystapp = catalyst.initialize(req);
	let zcql = catalystapp.zcql();
	let query = `SELECT * FROM URL_Shortner where code = '${searchData}'`;
	try {
		let zcqlPromise = zcql.executeZCQLQuery(query);
		zcqlPromise.then(queryResult => {
			  console.log('queryResult',queryResult);
			//  res.status(200).json({'queryResult':queryResult});

			if(queryResult.length > 0){
				res.status(200).json({status:"success","long_url":queryResult[0].URL_Shortner.long_url,"code":searchData});
			}else{
				res.status(404).json({status:"failure","message":"Invalid code"});
			}

		});	

	  } catch (error) {
		console.error(error);
		return res.status(500).json({ status:"failure",message: "Some error has occurred" });
	 }
})


app.all("/", (req,res) => {

	res.status(200).send("I am Live and Ready.");

});

function createLog(datastore,product_id,subscription_id,log){
	//Create Configuration for function Execution

	let rowData = 
    { 
        product_id: product_id,
        subscription_id: subscription_id,
        Status: log.status,
		Meta:log.meta
    };
	console.log('logInserPayload',rowData);
    //Use the table meta object to insert the row which returns a promise
    let table = datastore.table('Logs');
    let insertPromise = table.insertRow(rowData);
    insertPromise.then((row) => {
		console.log('log inserted',row);
	}).catch(e=>{
		console.log('log insersion error',e);
	});
}

module.exports = app;
