"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
var request=require('request');
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
app.post("/createFile",async(req,res)=>{

   var count=0;
	const CLIENT_ID = req.body.CLIENT_ID;
    const CLIENT_SECRET = req.body.CLIENT_SECRET;
    const REDIRECT_URI = req.body.REDIRECT_URI;
    const REFRESH_TOKEN = req.body.REFRESH_TOKEN;
	//console.log(REFRESH_TOKEN);
    const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});
   const folderId=req.body.folderId;
	const name=req.body.name;
	const mimeType=req.body.mimeType;
	try {
        var fileMetadata={
			'name':name,
			'mimeType':mimeType,
			parents:[folderId]
		};
		//var fl=request('https://res.cloudinary.com/dxvexmheq/raw/upload/v1664107652/addresses_hsynsb.csv').pipe(fs.createWriteStream('sample'+(count+1)+'.csv'))
        var media = {            
            mimeType:'text/csv',
            body: fs.createReadStream('sample1.csv')
        };
        await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        }, function (err, file) {
            if (err) {
                // Handle error
                console.error(err);
				res.status(404).send(err);
            } else {
				res.status(200).send(file.data.id)
                console.log('File Id: ', file.data.id);
            }
        });
    } catch (error) {
		res.status(501).send("Out of try block");
        console.log(error.message);
    }
	
})
app.all("/", (req,res) => {

	res.status(200).send("I am Live and Ready.");

});

module.exports = app;
