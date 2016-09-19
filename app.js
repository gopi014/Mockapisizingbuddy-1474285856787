var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

app.set('superSecret', config.secret); // secret variable
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.post('/api/auth/token', function (req, res) {
	var header=req.headers;
	console.log(JSON.stringify(req.body));
	res.json({isauthenticated:true,accessToken :"se43" ,  refreshToken : "dsdew" ,  issuedAt : "25aug",expiresAfter : "1474130125000" ,  userName : "jismisimon",  userRole : "developer",properties : {defaultTimeout :"900"},clientSupport : { state : "supported/deprecated/withdrawn" , message :"Success" , upgradeUrl :"" },serverSupport : {   state :"active" ,sucmessage :"Serverup",errmessage:"Server Down" }});
});
app.put('/api/auth/token', function (req, res) {
	res.json({accessToken :"se43" ,  refreshToken : "dsdew" ,  issuedAt : "25aug",expiresAfter : "1474436698000" });
});
//3. API to get Sizing Categories
app.get('/api/categories',function(req,res){
	res.send('{ "brands" : [{ "brandId" : "Power8" , "brand" : "Power8" , "operatingSystems" : [{ "osId" : "linux" , "os" : "Linux" , "solutions" : [{ "solutionId" : "HANA DB" , "solution" : "HANA DB"} , { "solutionId" : "HANA DB & App Server" , "solution" : "HANA DB & App Server"} ]} , {"osId" : "linux2" , "os" : "Linux2" , "solutions" : [{ "solutionId" : "HANA DB2" , "solution" : "HANA DB2"} , { "solutionId" : "HANA DB & App Server2" , "solution" : "HANA DB & App Server2"} ]} ]} , {"brandId" : "testBrand" , "brand" : "testBrand" , "operatingSystems" : [{ "osId" : "testBrandlinux" , "os" : "testBrandLinux" , "solutions" : [{ "solutionId" : "testBrandHANA DB" , "solution" : "testBrandHANA DB"} , { "solutionId" : "testBrandHANA DB & App Server" , "solution" : "testBrandHANA DB & App Server"} ]} , {"osId" : "testBrandlinux2" , "os" : "testBrandLinux2" , "solutions" : [{ "solutionId" : "testBrandHANA DB2" , "solution" : "testBrandHANA DB2"} , { "solutionId" : "testBrandHANA DB & App Server2" , "solution" : "testBrandHANA DB & App Server2"} ]}]}]}');
}); 
app.get('/login',function(req,res){
	res.send("inside login");
});
app.get('/api/teams',function(req,res){
	res.send({teams : [{
			teamId :  1 ,
			team :  "Team A" ,
      teamOwner :  "gopinathrk@in.ibm.com" ,
			members:["jissimon@in.ibm.com","rinjfran@in.ibm.com","anamboot@in.ibm.com"]

		},
		{
			teamId :  2 ,
			team :  "Team B" ,
      teamOwner :  "jissimon@in.ibm.com" ,
			members:["gopinathrk@in.ibm.com","rinjfran@in.ibm.com","anamboot@in.ibm.com"]
		},
		{
			teamId :  3 ,
			team :  "Team C" ,
      teamOwner :  "rinjfran@in.ibm.com" ,
			members:["gopinathrk@in.ibm.com","jissimon@in.ibm.com","anamboot@in.ibm.com","supsanga@in.ibm.com"]
		}
	]});
});
app.post('/api/teams',function(req,res){
	console.log(req.body.locale);
	res.send({teams : [{
			teamId :  1 ,
			team :  "Team A" ,
      teamOwner :  "gopinathrk@in.ibm.com" ,
			members:["jissimon@in.ibm.com","rinjfran@in.ibm.com","anamboot@in.ibm.com"]

		},
		{
			teamId :  2 ,
			team :  "Team B" ,
      teamOwner :  "jissimon@in.ibm.com" ,
			members:["gopinathrk@in.ibm.com","rinjfran@in.ibm.com","anamboot@in.ibm.com"]
		},
		{
			teamId :  3 ,
			team :  "Team C" ,
      teamOwner :  "rinjfran@in.ibm.com" ,
			members:["gopinathrk@in.ibm.com","jissimon@in.ibm.com","anamboot@in.ibm.com","supsanga@in.ibm.com"]
		},
		{
			teamId :  4 ,
			team :  "Team D" ,
      teamOwner :  "supsanga@in.ibm.com" ,
			members:["gopinathrk@in.ibm.com","jissimon@in.ibm.com","anamboot@in.ibm.com"]
		}
	]});
});
app.delete('/api/teams/:teamId',function(req,res){
	res.send({teams : [	{
			teamId :  2 ,
			team :  "Team B" ,
			teamOwner :  "jissimon@in.ibm.com" ,
			members:["gopinathrk@in.ibm.com","rinjfran@in.ibm.com","anamboot@in.ibm.com"]
		},
		{
			teamId :  3 ,
			team :  "Team C" ,
			teamOwner :  "rinjfran@in.ibm.com" ,
			members:["gopinathrk@in.ibm.com","jissimon@in.ibm.com","anamboot@in.ibm.com","supsanga@in.ibm.com"]
		},
		{
			teamId :  4 ,
			team :  "Team D" ,
			teamOwner :  "gopinathrk@in.ibm.com" ,
			members:["supsanga@in.ibm.com","jissimon@in.ibm.com","anamboot@in.ibm.com"]
		}
	]});
});
app.delete('/api/teams/:teamId/members/:memberId',function(req,res){
	res.send({teamId :  1,
	team :  "TEAM A" ,
	members:["supsanga@in.ibm.com","jissimon@in.ibm.com","anamboot@in.ibm.com"]
});
});
app.post('/api/teams/:teamId/members',function(req,res){
	res.send({teamId :  1,
	team :  "TEAM A" ,
	members:["gopinathrk@in.ibm.com","supsanga@in.ibm.com","jissimon@in.ibm.com","anamboot@in.ibm.com"]
});
});
app.listen(port);
console.log('app is listening to http://localhost:' + port);
