"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');
const handler = require('./handler');

const app = express();
app.use(express.json());
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);
const voice = 'Polly.Aditi'; //Aditi,Ivy
const language = 'en-IN'; //en-US
const PHONECALL_ID = 3;
app.post("/make-call", async (req, res) => {

    const catalystApp = catalyst.initialize(req);
	let sub_id = req.query.subscription_id;
	let check = await handler.checkSub(catalystApp,sub_id,PHONECALL_ID);
	let log={};

	if(check.status=='failure'){
		res.status(200).json(check);
		return;
	}

	//Get Segment instance with segment ID (If no ID is given, Default segment is used) , 	    <Dial>+919960968129</Dial>
	const phone1 = req.body.p1.phone || '+918668462855';
	const phone2 = req.body.p2.phone || '+918806119545';
	const name1 = req.body.p1.name || 'person 1';
	const name2 = req.body.p2.name || 'person 2';

	const twml = `
	<Response>
		<Say voice="${voice}" language="${language}">Hey ${name1} !, Aur kya bolte bhai log, Inquet Solutions me aapka swagat hai</Say>
		<Say voice="${voice}" language="${language}">please wait while we connect you to ${name2}</Say>
		<Dial>${phone2}</Dial>
		<Say voice="${voice}" language="${language}">Thank you for contacting Inquet Solutions, have a great day, by.</Say>
	</Response>
	`;
	console.log('param received',req.body,'phone1,phone2',phone1,phone2);
	//url: 'https://demo.twilio.com/docs/voice.xml',
	client.calls
		  .create({
			 twiml : twml,
			 to: phone1,
			 from: '+16405003549'
		   })
		  .then((call) =>{ 
			console.log(call.sid);
			res.status(200).json(call);
			log.status = 'success';
			log.meta = call;
		}).catch((error)=>{
			res.status(200).json(error);
			log.status = 'failure';
			log.meta = error;
		}).finally(()=>{
			let datastore = catalystApp.datastore();
			createLog(datastore,PHONECALL_ID,sub_id,check.user_id,log);
		});
});
app.post("/end-call", (req, res) => {
	// {status: 'completed'}
	let call_id = req.body.call_id;
	if(call_id){
		client.calls(call_id)
		.update({twiml: `<Response><Say voice='${voice}' language='${language}'>Ending the call, Thankyou.</Say><Hangup/></Response>`})
		.then((call) => {
			console.log(call.to)
			res.status(200).json(call);
		}).catch((error)=>{
			res.status(200).json(error);
		});
	}
});

app.all("/", (req,res) => {
	res.status(200).send("I am Live and Ready.");

});

function createLog(datastore,product_id,subscription_id,user_id,log){

	let rowData = 
    {
        product_id: product_id,
        subscription_id: subscription_id,
        status: log.status,
		user_id:user_id,
		meta:log.meta
    };

    let table = datastore.table('Logs');
    let insertPromise = table.insertRow(rowData);
    insertPromise.then((row) => {
		console.log('log inserted',row);
	}).catch(e=>{
		console.log('log insersion error',e);
	});
}

module.exports = app;
