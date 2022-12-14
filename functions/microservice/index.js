"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const shortid = require('shortid');
const getCSV = require('get-csv');
const handler = require('./handler');

const CSV2JSON_ID = 1;
const URL_SHORTNER_ID = 2;

const app = express();
app.use(express.json());

app.post("/URL_Shortner",async (req,res)=>{
	let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});
	let sub_id = req.query.subscription_id;
	let check = await handler.checkSub(catalystApp,sub_id,URL_SHORTNER_ID);

	if(check.status=='failure'){
		res.status(200).json(check);
		return;
	}

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
		let resp = {...row,"status":"success"};
		console.log("\nInserted Row : " + JSON.stringify(resp));
		res.status(200).json(resp);
		log.status = 'success';
		log.meta = JSON.stringify(row);
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send(err);
		log.status = 'failure';
		log.meta = JSON.stringify(err);
	}).finally(()=>{
		createLog(datastore,URL_SHORTNER_ID,sub_id,check.user_id,log)
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

app.post("/csv2json",async (req,res)=>{
	let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	let sub_id = req.query.subscription_id;
	let check = await handler.checkSub(catalystApp,sub_id||0,CSV2JSON_ID);

	if(check.status=='failure'){
		res.status(200).json(check);
		return;
	}

	const csv_url = req.body.csv_url;
	const csv_header = req.body.header;
    console.log('received csv_url : ',csv_url);
	var log= {};
	log.meta ={'csv_url':csv_url};

	if(!csv_url){
		log.status = 'failure';
	    res.send({"status":'failure',"error":'no url passed'});
		return;
	}

    getCSV(csv_url,{headers: csv_header})
    .then(rows => {
        res.send({"status":'success',"data":rows});
		log.status = 'success';
		log.meta.message = `${rows.length} rows fetched`;
    }).catch(e => {
        res.send({"status":'failure',"error":e});
		log.status = 'failure';
		log.meta.error = e;
        console.log('error :',e);
    }).finally(()=>{
		console.log('log object : ',log);
		let datastore = catalystApp.datastore();
		createLog(datastore,CSV2JSON_ID,sub_id,check.user_id,log);
	});
})


function createLog(datastore,product_id,subscription_id,user_id,log){
	//Create Configuration for function Execution

	let rowData = 
    {
        product_id: product_id,
        subscription_id: subscription_id,
        status: log.status,
		user_id:user_id,
		meta:log.meta
    };

	let table = datastore.table('Logs');
    table.insertRow(rowData).then((row) => {
		console.log('log inserted',row);
	}).catch(e=>{
		console.log('log insersion error',e);
	});
}

app.post("/test", async (req,res) => {

	let sub_id = req.query.subscription_id;
	var app = catalyst.initialize(req);
	let resp = await handler.checkSub(app,sub_id,CSV2JSON_ID);
	console.log('resp from /test',resp);
	res.status(200).send(resp);

});




module.exports = app;
