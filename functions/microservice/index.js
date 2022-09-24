"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const shortid = require('shortid');
const app = express();
app.use(express.json());

app.post("/cache", (req, res) => {

    const catalystApp = catalyst.initialize(req);

	const requestQuery = req.query;

	//Get Segment instance with segment ID (If no ID is given, Default segment is used)
	let segment = catalystApp.cache().segment();
	//Insert Cache using put by passing the key-value pair.
	let cachePromise = segment.put(requestQuery.name, requestQuery.value, requestQuery.expiry);

	cachePromise
		.then((cache) => {
			console.log("\nInserted Cache : " + JSON.stringify(cache));
			res.status(200).json(cache);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

});

app.post("/datastore", (req, res) => {

    let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	const requestBody = req.body;

	//Get table meta object without details.
	let table = catalystApp.datastore().table('SampleTable');

	//Use Table Meta Object to insert the row which returns a promise
	let insertPromise = table.insertRow({
		Name: requestBody.name,
		Age: requestBody.age,
		SearchIndexedColumn: requestBody.id
	});

	insertPromise
		.then((row) => {
			console.log("\nInserted Row : " + JSON.stringify(row));
			res.status(200).json(row);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
});

app.get("/Anshu",(req,res)=>{
	res.status(200).send("Hey I am Anshuman Yadav");
})

app.post("/URL_Shortner",(req,res)=>{
	let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});
	const requestBody = req.body;
	const baseUrl="https://incquet.com/to"
	let urlCode = shortid.generate();
    let shortUrl = baseUrl + "?c=" + urlCode;
	let table = catalystApp.datastore().table('URL_Shortner');
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
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send(err);
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

module.exports = app;
