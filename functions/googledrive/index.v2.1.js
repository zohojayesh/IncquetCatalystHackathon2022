"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
// const bodyParser = require('body-parser');
const { google } = require('googleapis');
// const path = require('path');
const fs = require('fs');
// var request=require('request');
const app = express();
const multer = require('multer');
const upload = multer();
app.use(express.json());


app.post('/post_file/', upload.any(), (req, res) => {
    console.log('POST /post_file/');
    console.log('Files: ', req.files);
	
    fs.writeFile(req.files[0].originalname, req.files[0].buffer, (err) => {
        if (err) {
            console.log('Error: ', err);
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send("File Name :"+req.files[0].originalname);
        }
    });
});


app.post("/createFile",upload.any(),async(req,res)=>{
    
 	const CLIENT_ID = req.body.CLIENT_ID;
    const CLIENT_SECRET = req.body.CLIENT_SECRET;
    const REDIRECT_URI = req.body.REDIRECT_URI;
    const REFRESH_TOKEN = req.body.REFRESH_TOKEN;
	//console.log(REFRESH_TOKEN);
	fs.writeFile(req.files[0].originalname, req.files[0].buffer, (err) => {
        if (err) {
            console.log('Error: ', err);
           // res.status(500).send('An error occurred: ' + err.message);
        } else {
			console.log("file created Succesfully");
           // res.status(200).send("File Name :"+req.files[0].originalname);
        }
    });
	const fileName=req.files[0].originalname;
	//console.log(fileName)
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
            body: fs.createReadStream(fileName)
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