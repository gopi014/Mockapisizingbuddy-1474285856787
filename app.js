var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var today ;
var loginstamp;
var refreshstamp;

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
//var config = require('./config'); // get our config file

//app.set('superSecret', config.secret); // secret variable
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(fileUpload());

app.post('/api/auth/token', function (req, res) {
	today = new Date();
	loginstamp=today.setHours(today.getHours() + 1);
	refreshstamp=today.setHours(today.getHours() + 24);
	var header=req.headers;
	console.log(JSON.stringify(req.body));
	res.json({isauthenticated:true,accessToken :"se43" ,  refreshToken : "dsdew" ,  issuedAt : "25aug",expiresAfter : loginstamp,  userName : "jismisimon",  userRole : "IBMers",properties : {defaultTimeout :"900"},clientSupport : { state : "supported/deprecated/withdrawn" , message :"Success" , upgradeUrl :"" },serverSupport : {   state :"active" ,sucmessage :"Serverup",errmessage:"Server Down" }});
});
app.put('/api/auth/token', function (req, res) {
	res.json({accessToken :"se43" ,  refreshToken : "dsdew" ,  issuedAt : "25aug",expiresAfter : refreshstamp});
});
//3. API to get Sizing Categories
app.get('/api/categories',function(req,res){
	res.send('{ "brands" : [{ "brandId" : "Power8" , "brand" : "Power8" , "operatingSystems" : [{ "osId" : "linux" , "os" : "Linux" , "solutions" : [{ "solutionId" : "HANA DB" , "solution" : "HANA DB"} , { "solutionId" : "HANA DB & App Server" , "solution" : "HANA DB & App Server"} ]} , {"osId" : "linux2" , "os" : "Linux2" , "solutions" : [{ "solutionId" : "HANA DB2" , "solution" : "HANA DB2"} , { "solutionId" : "HANA DB & App Server2" , "solution" : "HANA DB & App Server2"} ]} ]} , {"brandId" : "testBrand" , "brand" : "testBrand" , "operatingSystems" : [{ "osId" : "testBrandlinux" , "os" : "testBrandLinux" , "solutions" : [{ "solutionId" : "testBrandHANA DB" , "solution" : "testBrandHANA DB"} , { "solutionId" : "testBrandHANA DB & App Server" , "solution" : "testBrandHANA DB & App Server"} ]} , {"osId" : "testBrandlinux2" , "os" : "testBrandLinux2" , "solutions" : [{ "solutionId" : "testBrandHANA DB2" , "solution" : "testBrandHANA DB2"} , { "solutionId" : "testBrandHANA DB & App Server2" , "solution" : "testBrandHANA DB & App Server2"} ]}]}]}');
});
app.get('/login',function(req,res){
	res.send("inside login");
});
app.delete('/api/teams/:teamId/sizings/:sizingId',function(req,res){
	res.send('{"teamId" :1,"sizingId":"1244"}');
});
app.post('/api/teams/:teamId/sizings',function(req,res){
	res.send('{"teamId" :3,"sizingId":"1244"}');
});
//8.API to Create/Confirm sizing for HANA DB
app.post('/api/hana/db/sizings',function(req,res){

	console.log(req.files);
	if(!req.files){
		res.send('{"sizingIdDisplay" : "SB-123456" , "sizingId" : "123456" , "sizingVersion" : "01" , "message" : "SB-123456 is successfully created. An email has been sent to rinjfran@in.ibm.com"}');

	}else{
		var sampleFile=req.files.refFile;
		sampleFile.mv('C:/SizingBuddy/server/uploads/'+req.files.refFile.name, function(err) {
					if (err) {
							res.status(500).send(err);
					}
					else {
						res.send('{"sizingIdDisplay" : "SB-123456" , "sizingId" : "123456" , "sizingVersion" : "01" , "message" : "SB-123456 is successfully created. An email has been sent to rinjfran@in.ibm.com"}');

						}
			});
	}

	});

//13.API to Create / Confirm sizing for HANA DB + App Server
app.post('/api/hana/dbapps/sizings',function(req,res){
	res.send('{"sizingIdDisplay" : "SB-123456" , "sizingId" : "123456" , "sizingVersion" : "01" , "message" : "SB-123456 is successfully created. An email has been sent to rinjfran@in.ibm.com"}');
});

//9.API to Update sizing for HANA DB (new version)
app.put('/api/hana/db/sizings/:sizingId',function(req,res){
	res.send('{"sizingIdDisplay" : "SB-123456" , "sizingId" : "123456" , "sizingVersion" : "01" , "message" : "SB-123456 is successfully updated. An email has been sent to rinjfran@in.ibm.com"}');
});

//14.API to Update sizing for HANA DB + App Server
app.put('/api/hana/dbapps/sizings/:sizingId',function(req,res){
	res.send('{"sizingIdDisplay" : "SB-123456" , "sizingId" : "123456" , "sizingVersion" : "01" , "message" : "SB-123456 is successfully updated. An email has been sent to rinjfran@in.ibm.com"}');
});
app.get('/api/teams',function(req,res){
	console.log(req.body);
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
//4. API to get Sizing Properties
app.get('/api/hana/properties',function(req,res){
	res.send('{ "hanaProps" : { "minMemory" : 5 , "maxMemory" : 20 , "minSaps" :  "01" , "maxSaps" :  "1000" , "storageFactor" : "2" , "hanaReleases" : ["SPS11"], "sapReleases" : ["6.7"]} , "industries" : [ "Communications" ], "countries" : [{ "countryCode" : "IN" , "country" : "INDIA" }]}');
});
//5.API to search HANA DB Sizings
app.get('/api/hana/db/sizings',function(req,res){
	res.send({
	"totalCount" :  40,
	"items" : [{
			"sizingHeader" : {
				"sizingIdDisplay" :  "SB-32131-01",
				"sizingId" :  "32131" ,
				"sizingVersion" :  "01" ,
				"sizingTimestamp" :  "2015-03-25T12:00:00",
				"sizingType" :  "new" ,
				"countryCode" :  "IN" ,
				"industry" :  "Communications" ,
				"brandId" :  "Power8" ,
				"osId" :  "Linux" ,
				"solutionId" :  "Hana DB" ,
				"growthFactor" : {
					"pct" :  1 ,
					"years" :  "2016"
				},
				"disk" : {
					"diskSpace" :  100 ,
					"backupGenerations" :  2
				},
				"ha" : {
					"optimization" :  "Cost Optimized" ,
					"diskPct" :  2
				},
				"dr" : {
					"optimization" :  "Cost Optimized" ,
					"diskPct" :  1
				}
			},
			"sizingRequest" : {
				"hanaRelease" :  1 ,
				"hanaMemory" :  100
			},
			"nonProd" : {
				"envs" : [{
						"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
						"hanaMemoryPct" :  200 ,
						"hosting" :  "HA" , //HA, DR, STAND-ALONE
						"stressEnvFlag" :  "Y" //Y/N
					}
				],
				"diskPct" :  3
			}
		},
		{
				"sizingHeader" : {
					"sizingIdDisplay" :  "SB-32131-02",
					"sizingId" :  "32131" ,
					"sizingVersion" :  "01" ,
					"sizingTimestamp" :  "2015-03-25T12:00:00",
					"sizingType" :  "new" ,
					"countryCode" :  "IN" ,
					"industry" :  "Communications" ,
					"brandId" :  "Power8" ,
					"osId" :  "Linux" ,
					"solutionId" :  "Hana DB" ,
					"growthFactor" : {
						"pct" :  1 ,
						"years" :  "2016"
					},
					"disk" : {
						"diskSpace" :  100 ,
						"backupGenerations" :  2
					},
					"ha" : {
						"optimization" :  "Cost Optimized" ,
						"diskPct" :  2
					},
					"dr" : {
						"optimization" :  "Cost Optimized" ,
						"diskPct" :  1
					}
				},
				"sizingRequest" : {
					"hanaRelease" :  1 ,
					"hanaMemory" :  100
				},
				"nonProd" : {
					"envs" : [{
							"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
							"hanaMemoryPct" :  200 ,
							"hosting" :  "HA" , //HA, DR, STAND-ALONE
							"stressEnvFlag" :  "Y" //Y/N
						}
					],
					"diskPct" :  3
				}
			},
			{
					"sizingHeader" : {
						"sizingIdDisplay" :  "SB-32131-03",
						"sizingId" :  "32131" ,
						"sizingVersion" :  "01" ,
						"sizingTimestamp" :  "2015-03-25T12:00:00",
						"sizingType" :  "new" ,
						"countryCode" :  "IN" ,
						"industry" :  "Communications" ,
						"brandId" :  "Power8" ,
						"osId" :  "Linux" ,
						"solutionId" :  "Hana DB" ,
						"growthFactor" : {
							"pct" :  1 ,
							"years" :  "2016"
						},
						"disk" : {
							"diskSpace" :  100 ,
							"backupGenerations" :  2
						},
						"ha" : {
							"optimization" :  "Cost Optimized" ,
							"diskPct" :  2
						},
						"dr" : {
							"optimization" :  "Cost Optimized" ,
							"diskPct" :  1
						}
					},
					"sizingRequest" : {
						"hanaRelease" :  1 ,
						"hanaMemory" :  100
					},
					"nonProd" : {
						"envs" : [{
								"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
								"hanaMemoryPct" :  200 ,
								"hosting" :  "HA" , //HA, DR, STAND-ALONE
								"stressEnvFlag" :  "Y" //Y/N
							}
						],
						"diskPct" :  3
					}
				},
				{
						"sizingHeader" : {
							"sizingIdDisplay" :  "SB-32131-04",
							"sizingId" :  "32131" ,
							"sizingVersion" :  "01" ,
							"sizingTimestamp" :  "2015-03-25T12:00:00",
							"sizingType" :  "new" ,
							"countryCode" :  "IN" ,
							"industry" :  "Communications" ,
							"brandId" :  "Power8" ,
							"osId" :  "Linux" ,
							"solutionId" :  "Hana DB" ,
							"growthFactor" : {
								"pct" :  1 ,
								"years" :  "2016"
							},
							"disk" : {
								"diskSpace" :  100 ,
								"backupGenerations" :  2
							},
							"ha" : {
								"optimization" :  "Cost Optimized" ,
								"diskPct" :  2
							},
							"dr" : {
								"optimization" :  "Cost Optimized" ,
								"diskPct" :  1
							}
						},
						"sizingRequest" : {
							"hanaRelease" :  1 ,
							"hanaMemory" :  100
						},
						"nonProd" : {
							"envs" : [{
									"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
									"hanaMemoryPct" :  200 ,
									"hosting" :  "HA" , //HA, DR, STAND-ALONE
									"stressEnvFlag" :  "Y" //Y/N
								}
							],
							"diskPct" :  3
						}
					},
					{
							"sizingHeader" : {
								"sizingIdDisplay" :  "SB-32131-05",
								"sizingId" :  "32131" ,
								"sizingVersion" :  "01" ,
								"sizingTimestamp" :  "2015-03-25T12:00:00",
								"sizingType" :  "new" ,
								"countryCode" :  "IN" ,
								"industry" :  "Communications" ,
								"brandId" :  "Power8" ,
								"osId" :  "Linux" ,
								"solutionId" :  "Hana DB" ,
								"growthFactor" : {
									"pct" :  1 ,
									"years" :  "2016"
								},
								"disk" : {
									"diskSpace" :  100 ,
									"backupGenerations" :  2
								},
								"ha" : {
									"optimization" :  "Cost Optimized" ,
									"diskPct" :  2
								},
								"dr" : {
									"optimization" :  "Cost Optimized" ,
									"diskPct" :  1
								}
							},
							"sizingRequest" : {
								"hanaRelease" :  1 ,
								"hanaMemory" :  100
							},
							"nonProd" : {
								"envs" : [{
										"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
										"hanaMemoryPct" :  200 ,
										"hosting" :  "HA" , //HA, DR, STAND-ALONE
										"stressEnvFlag" :  "Y" //Y/N
									}
								],
								"diskPct" :  3
							}
						},
						{
								"sizingHeader" : {
									"sizingIdDisplay" :  "SB-32131-06",
									"sizingId" :  "32131" ,
									"sizingVersion" :  "01" ,
									"sizingTimestamp" :  "2015-03-25T12:00:00",
									"sizingType" :  "new" ,
									"countryCode" :  "IN" ,
									"industry" :  "Communications" ,
									"brandId" :  "Power8" ,
									"osId" :  "Linux" ,
									"solutionId" :  "Hana DB" ,
									"growthFactor" : {
										"pct" :  1 ,
										"years" :  "2016"
									},
									"disk" : {
										"diskSpace" :  100 ,
										"backupGenerations" :  2
									},
									"ha" : {
										"optimization" :  "Cost Optimized" ,
										"diskPct" :  2
									},
									"dr" : {
										"optimization" :  "Cost Optimized" ,
										"diskPct" :  1
									}
								},
								"sizingRequest" : {
									"hanaRelease" :  1 ,
									"hanaMemory" :  100
								},
								"nonProd" : {
									"envs" : [{
											"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
											"hanaMemoryPct" :  200 ,
											"hosting" :  "HA" , //HA, DR, STAND-ALONE
											"stressEnvFlag" :  "Y" //Y/N
										}
									],
									"diskPct" :  3
								}
							},
							{
									"sizingHeader" : {
										"sizingIdDisplay" :  "SB-32131-07",
										"sizingId" :  "32131" ,
										"sizingVersion" :  "01" ,
										"sizingTimestamp" :  "2015-03-25T12:00:00",
										"sizingType" :  "new" ,
										"countryCode" :  "IN" ,
										"industry" :  "Communications" ,
										"brandId" :  "Power8" ,
										"osId" :  "Linux" ,
										"solutionId" :  "Hana DB" ,
										"growthFactor" : {
											"pct" :  1 ,
											"years" :  "2016"
										},
										"disk" : {
											"diskSpace" :  100 ,
											"backupGenerations" :  2
										},
										"ha" : {
											"optimization" :  "Cost Optimized" ,
											"diskPct" :  2
										},
										"dr" : {
											"optimization" :  "Cost Optimized" ,
											"diskPct" :  1
										}
									},
									"sizingRequest" : {
										"hanaRelease" :  1 ,
										"hanaMemory" :  100
									},
									"nonProd" : {
										"envs" : [{
												"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
												"hanaMemoryPct" :  200 ,
												"hosting" :  "HA" , //HA, DR, STAND-ALONE
												"stressEnvFlag" :  "Y" //Y/N
											}
										],
										"diskPct" :  3
									}
								},
								{
										"sizingHeader" : {
											"sizingIdDisplay" :  "SB-32131-08",
											"sizingId" :  "32131" ,
											"sizingVersion" :  "01" ,
											"sizingTimestamp" :  "2015-03-25T12:00:00",
											"sizingType" :  "new" ,
											"countryCode" :  "IN" ,
											"industry" :  "Communications" ,
											"brandId" :  "Power8" ,
											"osId" :  "Linux" ,
											"solutionId" :  "Hana DB" ,
											"growthFactor" : {
												"pct" :  1 ,
												"years" :  "2016"
											},
											"disk" : {
												"diskSpace" :  100 ,
												"backupGenerations" :  2
											},
											"ha" : {
												"optimization" :  "Cost Optimized" ,
												"diskPct" :  2
											},
											"dr" : {
												"optimization" :  "Cost Optimized" ,
												"diskPct" :  1
											}
										},
										"sizingRequest" : {
											"hanaRelease" :  1 ,
											"hanaMemory" :  100
										},
										"nonProd" : {
											"envs" : [{
													"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
													"hanaMemoryPct" :  200 ,
													"hosting" :  "HA" , //HA, DR, STAND-ALONE
													"stressEnvFlag" :  "Y" //Y/N
												}
											],
											"diskPct" :  3
										}
									},
									{
											"sizingHeader" : {
												"sizingIdDisplay" :  "SB-32131-09",
												"sizingId" :  "32131" ,
												"sizingVersion" :  "01" ,
												"sizingTimestamp" :  "2015-03-25T12:00:00",
												"sizingType" :  "new" ,
												"countryCode" :  "IN" ,
												"industry" :  "Communications" ,
												"brandId" :  "Power8" ,
												"osId" :  "Linux" ,
												"solutionId" :  "Hana DB" ,
												"growthFactor" : {
													"pct" :  1 ,
													"years" :  "2016"
												},
												"disk" : {
													"diskSpace" :  100 ,
													"backupGenerations" :  2
												},
												"ha" : {
													"optimization" :  "Cost Optimized" ,
													"diskPct" :  2
												},
												"dr" : {
													"optimization" :  "Cost Optimized" ,
													"diskPct" :  1
												}
											},
											"sizingRequest" : {
												"hanaRelease" :  1 ,
												"hanaMemory" :  100
											},
											"nonProd" : {
												"envs" : [{
														"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
														"hanaMemoryPct" :  200 ,
														"hosting" :  "HA" , //HA, DR, STAND-ALONE
														"stressEnvFlag" :  "Y" //Y/N
													}
												],
												"diskPct" :  3
											}
										},
										{
												"sizingHeader" : {
													"sizingIdDisplay" :  "SB-32131-10",
													"sizingId" :  "32131" ,
													"sizingVersion" :  "01" ,
													"sizingTimestamp" :  "2015-03-25T12:00:00",
													"sizingType" :  "new" ,
													"countryCode" :  "IN" ,
													"industry" :  "Communications" ,
													"brandId" :  "Power8" ,
													"osId" :  "Linux" ,
													"solutionId" :  "Hana DB" ,
													"growthFactor" : {
														"pct" :  1 ,
														"years" :  "2016"
													},
													"disk" : {
														"diskSpace" :  100 ,
														"backupGenerations" :  2
													},
													"ha" : {
														"optimization" :  "Cost Optimized" ,
														"diskPct" :  2
													},
													"dr" : {
														"optimization" :  "Cost Optimized" ,
														"diskPct" :  1
													}
												},
												"sizingRequest" : {
													"hanaRelease" :  1 ,
													"hanaMemory" :  100
												},
												"nonProd" : {
													"envs" : [{
															"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
															"hanaMemoryPct" :  200 ,
															"hosting" :  "HA" , //HA, DR, STAND-ALONE
															"stressEnvFlag" :  "Y" //Y/N
														}
													],
													"diskPct" :  3
												}
											}

	]
});
});
//10.API to search HANA DB AND APP SERVER Sizings
app.get('/api/hana/dbapps/sizings',function(req,res){
	res.send({
	"totalCount" :  40,
	"items" : [{
			"sizingHeader" : {
				"sizingIdDisplay" :  "SB-32131-01",
				"sizingId" :  "32131" ,
				"sizingVersion" :  "01" ,
				"sizingTimestamp" :  "2015-03-25T12:00:00",
				"sizingType" :  "new" ,
				"countryCode" :  "IN" ,
				"industry" :  "Communications" ,
				"brandId" :  "1" ,
				"osId" :  "1" ,
				"solutionId" :  "Hana DB" ,
				"growthFactor" : {
					"pct" :  1 ,
					"years" :  "2016"
				},
				"disk" : {
					"diskSpace" :  100 ,
					"backupGenerations" :  2
				},
				"ha" : {
					"optimization" :  "Cost Optimized" ,
					"diskPct" :  2
				},
				"dr" : {
					"optimization" :  "Cost Optimized" ,
					"diskPct" :  1
				}
			},
			"sizingRequest" : {
				"hanaRelease" :  1 ,
				"hanaMemory" :  100,
				"sapRelease" :  "6.7",
				"appSaps" :  1000 ,
				"tier" :  "2 tier"
			},
			"nonProd" : {
				"envs" : [{
						"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
						"hanaMemoryPct" :  200 ,
						"hosting" :  "HA" , //HA, DR, STAND-ALONE
						"stressEnvFlag" :  "Y" //Y/N
					}
				],
				"diskPct" :  3
			}
		},
		{
				"sizingHeader" : {
					"sizingIdDisplay" :  "SB-32131-02",
					"sizingId" :  "32131" ,
					"sizingVersion" :  "01" ,
					"sizingTimestamp" :  "2015-03-25T12:00:00",
					"sizingType" :  "new" ,
					"countryCode" :  "IN" ,
					"industry" :  "Communications" ,
					"brandId" :  "1" ,
					"osId" :  "1" ,
					"solutionId" :  "Hana DB" ,
					"growthFactor" : {
						"pct" :  1 ,
						"years" :  "2016"
					},
					"disk" : {
						"diskSpace" :  100 ,
						"backupGenerations" :  2
					},
					"ha" : {
						"optimization" :  "Cost Optimized" ,
						"diskPct" :  2
					},
					"dr" : {
						"optimization" :  "Cost Optimized" ,
						"diskPct" :  1
					}
				},
				"sizingRequest" : {
					"hanaRelease" :  1 ,
					"hanaMemory" :  100,
					"sapRelease" :  "6.7",
				"appSaps" :  1000 ,
				"tier" :  "2 tier"
				},
				"nonProd" : {
					"envs" : [{
							"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
							"hanaMemoryPct" :  200 ,
							"hosting" :  "HA" , //HA, DR, STAND-ALONE
							"stressEnvFlag" :  "Y" //Y/N
						}
					],
					"diskPct" :  3
				}
			},
			{
					"sizingHeader" : {
						"sizingIdDisplay" :  "SB-32131-03",
						"sizingId" :  "32131" ,
						"sizingVersion" :  "01" ,
						"sizingTimestamp" :  "2015-03-25T12:00:00",
						"sizingType" :  "new" ,
						"countryCode" :  "IN" ,
						"industry" :  "Communications" ,
						"brandId" :  "1" ,
						"osId" :  "1" ,
						"solutionId" :  "Hana DB" ,
						"growthFactor" : {
							"pct" :  1 ,
							"years" :  "2016"
						},
						"disk" : {
							"diskSpace" :  100 ,
							"backupGenerations" :  2
						},
						"ha" : {
							"optimization" :  "Cost Optimized" ,
							"diskPct" :  2
						},
						"dr" : {
							"optimization" :  "Cost Optimized" ,
							"diskPct" :  1
						}
					},
					"sizingRequest" : {
						"hanaRelease" :  1 ,
						"hanaMemory" :  100,
						"sapRelease" :  "6.7",
				"appSaps" :  1000 ,
				"tier" :  "2 tier"
					},
					"nonProd" : {
						"envs" : [{
								"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
								"hanaMemoryPct" :  200 ,
								"hosting" :  "HA" , //HA, DR, STAND-ALONE
								"stressEnvFlag" :  "Y" //Y/N
							}
						],
						"diskPct" :  3
					}
				},
				{
						"sizingHeader" : {
							"sizingIdDisplay" :  "SB-32131-04",
							"sizingId" :  "32131" ,
							"sizingVersion" :  "01" ,
							"sizingTimestamp" :  "2015-03-25T12:00:00",
							"sizingType" :  "new" ,
							"countryCode" :  "IN" ,
							"industry" :  "Communications" ,
							"brandId" :  "1" ,
							"osId" :  "1" ,
							"solutionId" :  "Hana DB" ,
							"growthFactor" : {
								"pct" :  1 ,
								"years" :  "2016"
							},
							"disk" : {
								"diskSpace" :  100 ,
								"backupGenerations" :  2
							},
							"ha" : {
								"optimization" :  "Cost Optimized" ,
								"diskPct" :  2
							},
							"dr" : {
								"optimization" :  "Cost Optimized" ,
								"diskPct" :  1
							}
						},
						"sizingRequest" : {
							"hanaRelease" :  1 ,
							"hanaMemory" :  100,
							"sapRelease" :  "6.7",
				"appSaps" :  1000 ,
				"tier" :  "2 tier"
						},
						"nonProd" : {
							"envs" : [{
									"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
									"hanaMemoryPct" :  200 ,
									"hosting" :  "HA" , //HA, DR, STAND-ALONE
									"stressEnvFlag" :  "Y" //Y/N
								}
							],
							"diskPct" :  3
						}
					},
					{
							"sizingHeader" : {
								"sizingIdDisplay" :  "SB-32131-05",
								"sizingId" :  "32131" ,
								"sizingVersion" :  "01" ,
								"sizingTimestamp" :  "2015-03-25T12:00:00",
								"sizingType" :  "new" ,
								"countryCode" :  "IN" ,
								"industry" :  "Communications" ,
								"brandId" :  "1" ,
								"osId" :  "1" ,
								"solutionId" :  "Hana DB" ,
								"growthFactor" : {
									"pct" :  1 ,
									"years" :  "2016"
								},
								"disk" : {
									"diskSpace" :  100 ,
									"backupGenerations" :  2
								},
								"ha" : {
									"optimization" :  "Cost Optimized" ,
									"diskPct" :  2
								},
								"dr" : {
									"optimization" :  "Cost Optimized" ,
									"diskPct" :  1
								}
							},
							"sizingRequest" : {
								"hanaRelease" :  1 ,
								"hanaMemory" :  100,
								"sapRelease" :  "6.7",
				"appSaps" :  1000 ,
				"tier" :  "2 tier"
							},
							"nonProd" : {
								"envs" : [{
										"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
										"hanaMemoryPct" :  200 ,
										"hosting" :  "HA" , //HA, DR, STAND-ALONE
										"stressEnvFlag" :  "Y" //Y/N
									}
								],
								"diskPct" :  3
							}
						},
						{
								"sizingHeader" : {
									"sizingIdDisplay" :  "SB-32131-06",
									"sizingId" :  "32131" ,
									"sizingVersion" :  "01" ,
									"sizingTimestamp" :  "2015-03-25T12:00:00",
									"sizingType" :  "new" ,
									"countryCode" :  "IN" ,
									"industry" :  "Communications" ,
									"brandId" :  "1" ,
									"osId" :  "1" ,
									"solutionId" :  "Hana DB" ,
									"growthFactor" : {
										"pct" :  1 ,
										"years" :  "2016"
									},
									"disk" : {
										"diskSpace" :  100 ,
										"backupGenerations" :  2
									},
									"ha" : {
										"optimization" :  "Cost Optimized" ,
										"diskPct" :  2
									},
									"dr" : {
										"optimization" :  "Cost Optimized" ,
										"diskPct" :  1
									}
								},
								"sizingRequest" : {
									"hanaRelease" :  1 ,
									"hanaMemory" :  100,
									"sapRelease" :  "6.7",
				"appSaps" :  1000 ,
				"tier" :  "2 tier"
								},
								"nonProd" : {
									"envs" : [{
											"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
											"hanaMemoryPct" :  200 ,
											"hosting" :  "HA" , //HA, DR, STAND-ALONE
											"stressEnvFlag" :  "Y" //Y/N
										}
									],
									"diskPct" :  3
								}
							},
							{
									"sizingHeader" : {
										"sizingIdDisplay" :  "SB-32131-07",
										"sizingId" :  "32131" ,
										"sizingVersion" :  "01" ,
										"sizingTimestamp" :  "2015-03-25T12:00:00",
										"sizingType" :  "new" ,
										"countryCode" :  "IN" ,
										"industry" :  "Communications" ,
										"brandId" :  "1" ,
										"osId" :  "1" ,
										"solutionId" :  "Hana DB" ,
										"growthFactor" : {
											"pct" :  1 ,
											"years" :  "2016"
										},
										"disk" : {
											"diskSpace" :  100 ,
											"backupGenerations" :  2
										},
										"ha" : {
											"optimization" :  "Cost Optimized" ,
											"diskPct" :  2
										},
										"dr" : {
											"optimization" :  "Cost Optimized" ,
											"diskPct" :  1
										}
									},
									"sizingRequest" : {
										"hanaRelease" :  1 ,
										"hanaMemory" :  100,
										"sapRelease" :  "6.7",
				"appSaps" :  1000 ,
				"tier" :  "2 tier"
									},
									"nonProd" : {
										"envs" : [{
												"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
												"hanaMemoryPct" :  200 ,
												"hosting" :  "HA" , //HA, DR, STAND-ALONE
												"stressEnvFlag" :  "Y" //Y/N
											}
										],
										"diskPct" :  3
									}
								},
								{
										"sizingHeader" : {
											"sizingIdDisplay" :  "SB-32131-08",
											"sizingId" :  "32131" ,
											"sizingVersion" :  "01" ,
											"sizingTimestamp" :  "2015-03-25T12:00:00",
											"sizingType" :  "new" ,
											"countryCode" :  "IN" ,
											"industry" :  "Communications" ,
											"brandId" :  "1" ,
											"osId" :  "1" ,
											"solutionId" :  "Hana DB" ,
											"growthFactor" : {
												"pct" :  1 ,
												"years" :  "2016"
											},
											"disk" : {
												"diskSpace" :  100 ,
												"backupGenerations" :  2
											},
											"ha" : {
												"optimization" :  "Cost Optimized" ,
												"diskPct" :  2
											},
											"dr" : {
												"optimization" :  "Cost Optimized" ,
												"diskPct" :  1
											}
										},
										"sizingRequest" : {
											"hanaRelease" :  1 ,
											"hanaMemory" :  100,
											"sapRelease" :  "6.7",
											"appSaps" :  1000 ,
											"tier" :  "2 tier"
										},
										"nonProd" : {
											"envs" : [{
													"envId" :  "DEV" , //DEV, TEST, SANDBOX, PREPROD
													"hanaMemoryPct" :  200 ,
													"hosting" :  "HA" , //HA, DR, STAND-ALONE
													"stressEnvFlag" :  "Y" //Y/N
												}
											],
											"diskPct" :  3
										}
									}
								]
							});
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
	members:["gopinathrk@in.ibm.com","jissimon@in.ibm.com","supsanga@in.ibm.com","anamboot@in.ibm.com"]
});
});
app.post('/api/links',function(req,res){
	res.send({"sizingIdDisplay" :  "SB-1234-01" ,
	"sizingId" :  "1234" ,
	"sizingVersion" :  1 ,
	"document" : {
		"status" :  "GENERATED" , //REQUESTED, GENERATED, FAILED
		"linkId" :  1 , //Available if an active link is found
		"expiresAt" :  "23 Aug 2016"//Available if link is active
	}


});
});
app.put('/api/links/:linkId',function(req,res){
	res.send({"sizingIdDisplay" :  "SB-1234-01" ,
	"sizingId" :  "1244" ,
	"sizingVersion" :  1 ,
	"document" : {
		"status" :  "GENERATED" , //REQUESTED, GENERATED, FAILED
		"linkId" :  2 , //Available if an active link is found
		"expiresAt" :  "23 Aug 2016"//Available if link is active
	}


});
});
app.get('/api/sizings',function(req,res){
	res.send({
	"totalCount" :  "10" ,
	"items" : [{
			"sizingIdDisplay" :  "SB-123-01" , //Id+Version
			"sizingId" :  "1244" ,
			"sizingVersion" :  "1" ,
			"sizingTimestamp" :  "2015-03-25T12:00:00" ,
		"sizedBy" :  "gopinathrk@in.ibm.com" ,
			"sizingType" :  "NEW" ,
			"countryCode" :  "IN" ,
			"industry" :  "Communications" ,
			"brandId" :  "power8" ,
			"brand" :  "power8" ,
			"osId" :  "1" ,
			"os" :  "linux" ,
			"solutionId" :  "HANA DB" ,
			"solution" :  "HANA DB" ,
			"document" : {
				"status" :  "GENERATED" , //REQUESTED, GENERATED, FAILED
				"linkId" :  1 //Available if active link exists
			},
			"teams" : [{
					"teamId" :  1 ,
					"team" :  "Team A"
				},
				{
						"teamId" :  2 ,
						"team" :  "Team B"
					}
			]
		},{
				"sizingIdDisplay" :  "SB-1234-01" , //Id+Version
				"sizingId" :  "1234" ,
				"sizingVersion" :  "1" ,
				"sizingTimestamp" :  "2015-03-25T12:00:00" ,
			"sizedBy" :  "jissimon@in.ibm.com" ,
				"sizingType" :  "NEW" ,
				"countryCode" :  "IN" ,
				"industry" :  "Communications" ,
				"brandId" :  "power8" ,
				"brand" :  "power8" ,
				"osId" :  "1" ,
				"os" :  "linux" ,
				"solutionId" :  "HANA DB & App Server" ,
				"solution" :  "HANA DB & App Server" ,
				"document" : {
					"status" :  "GENERATED" , //REQUESTED, GENERATED, FAILED
					"linkId" : ""  //Available if active link exists
				},
				"teams" : [{
						"teamId" :  1 ,
						"team" :  "Team A"
					},
					{
							"teamId" :  2 ,
							"team" :  "Team B"
						}
				]
			}
	]
});
});
app.get('/api/hana/db/sizings/:sizingId/:sizingVersion',function(req,res){
	res.send({
	sizingHeader : {
		"sizingIdDisplay" :  "SB-1234-01" , //Id+Version
		"sizingId" :  "1234" ,
		"sizingVersion" :  "1" ,
		"sizingTimestamp" :  "2015-03-25T12:00:00" ,
		"sizingType" :  "NEW" ,
		"countryCode" :  "IN" ,
		"industry" :  "Communications" ,
		"brandId" :  "Power8" ,
		"osId" :  "Linux" ,
		"solutionId" :  "HANADB"  ,
		"growthFactor" : {
			"pct" :  "10" ,
			"years" :"3"
		},
		"disk" : {
			"diskSpace" :  200 ,
			"backupGenerations" :  3
		},
		"ha" : {
			"optimization" :  "Cost Optimized" ,
			"diskPct" :  2
		},
		"dr" : {
			"optimization" :  "Cost Optimized" ,
			"diskPct" :  1
		}
	},
	"sizingRequest" : {
		"hanaRelease" :  "SPS11" ,
		"hanaMemory" :  1000
	},
	"nonProd" : {
		"envs" : [{
				"envId" :  "TEST" , //DEV, TEST, SANDBOX, PREPROD
				"hanaMemoryPct" :  60 ,
				"hosting" :  "HA" ,
				"stressEnvFlag" :  "Y" //Y/N
			}
		],
		"diskPct" :  300
	},
	"sizingResults" : [{
			"siteId" :  "HA" , //PROD, HA, DR, STAND-ALONE
			"modelId" :  "HA" ,
			"cpu" :  2 ,
			"cores" :  2 ,
			"memory" :  300 ,
			"storage" : {
				"ssd" :  2 ,
				"hdd" :  2
			},
			"ethPort" :  4 ,
			"sanPort" :  4 ,
			"scaling" :  "text" ,
			"breakup" : [{
					"envId" :  "HA" ,
					"components" : [{
							"componentId" :  "123" ,
							"component" :  "text" ,
							"lpar" :  "0.12" ,
							"cores" :  "0.34" ,
							"memory" :  "200"
						}
					]
				}
			]
		}
	]
})
});
app.get('/api/hana/dbapps/sizings/:sizingId/:sizingVersion',function(req,res){
	res.send({
	sizingHeader : {
		"sizingIdDisplay" :  "SB-1234-01" , //Id+Version
		"sizingId" :  "1234" ,
		"sizingVersion" :  "1" ,
		"sizingTimestamp" :  "2015-03-25T12:00:00" ,
		"sizingType" :  "NEW" ,
		"countryCode" :  "IN" ,
		"industry" :  "Communications" ,
		"brandId" :  "Power8" ,
		"osId" :  "Linux" ,
		"solutionId" :  "HANADB"  ,
		"growthFactor" : {
			"pct" :  "20" ,
			"years" :  "3"
		},
		"disk" : {
			"diskSpace" :  200 ,
			"backupGenerations" :  3
		},
		"ha" : {
			"optimization" :  "Cost Optimized" ,
			"diskPct" :  2
		},
		"dr" : {
			"optimization" :  "Performance Optimized" ,
			"diskPct" :  1
		}
	},
	"sizingRequest" : {
		"hanaRelease" :  "SPS11" ,
		"hanaMemory" :  200,
		"sapRelease" :"6.7",
		"appSaps":1001,
		"tier":"2 tier"
	},
	"nonProd" : {
		"envs" : [{
				"envId" :  "TEST" , //DEV, TEST, SANDBOX, PREPROD
				"hanaMemoryPct" :  60 ,
				"appSapsPc":40,
				"hosting" :  "HA" ,
				"stressEnvFlag" :  "Y" //Y/N
			}
		],
		"diskPct" :  300
	},
	"sizingResults" : [{
			"name":"Production Primary Server",
			"siteId" :  "HA" , //PROD, HA, DR, STAND-ALONE
			"modelId" :  "HA" ,
			"cpu" :  2 ,
			"cores" :  2 ,
			"memory" :  300 ,
			"storage" : {
				"ssd" :  2 ,
				"hdd" :  2
			},
			"ethPort" :  4 ,
			"sanPort" :  4 ,
			"scaling" :  "text" ,
			"breakup" : [{
					"name": "Prod Primary Server Configuration - Breakup",
					"envId" :  "HA" ,
					"components" : [{
							"componentId" :  "123" ,
							"component" :  "text" ,
							"lpar" :  "0.12" ,
							"cores" :  "0.34" ,
							"memory" :  "200"
						}
					]
				}
			]
		}
	]
})
});
app.get('/api/hana/db/sizing',function(req,res){
	res.send({
	  sizingResults : [{
	siteId :  "HA", //PROD, HA, DR, STAND-ALONE
	sizingChoices : [{
		modelId :  "67890",
		modelDisplay : "E489-01OIL",
		cpu : "90",
		cores :"20" ,
		memory :"100" ,
			storage : {
				ssd :  2 ,
				hdd :  2
				},
				ethPort :  "50" ,
				sanPort :  "20" ,
				scaling :  "Scale up" ,
					breakup : [{
						envId : "Test" ,
						components : [{
						componentId : "12345",
						component :  "sample",
						lpar :  0.23,
						cores :  0.45 ,
						memory :  250
							}
						]
					}
				]
			}
		]
	  },
		{
	siteId :  "PROD", //PROD, HA, DR, STAND-ALONE
	sizingChoices : [{
		modelId :  "67890",
		modelDisplay : "E489-01OIT",
		cpu : "90",
		cores :"20" ,
		memory :"100" ,
			storage : {
				ssd : 2 ,
				hdd :  2
				},
				ethPort :  "50" ,
				sanPort :  "20" ,
				scaling :  "Scale up" ,
					breakup : [{
						envId : "Test" ,
						components : [{
						componentId : "12345",
						component :  "sample",
						lpar :  0.23,
						cores :  0.45 ,
						memory :  250
							}
						]
					}
				]
			}
		]
	  },
{
	siteId :  "DR", //PROD, HA, DR, STAND-ALONE
	sizingChoices : [{
		modelId :  "67890",
		modelDisplay : "E489-01OIJ",
		cpu : "90",
		cores :"20" ,
		memory :"100" ,
			storage : {
				ssd :  2 ,
				hdd :  2
				},
				ethPort :  "50" ,
				sanPort :  "20" ,
				scaling :  "Scale up" ,
					breakup : [{
						envId : "Test" ,
						components : [{
						componentId : "12345",
						component :  "sample",
						lpar :  0.23,
						cores :  0.45 ,
						memory :  250
							}
						]
					}
				]
			}
		]
	  },
{
	siteId :  "STAND-ALONE", //PROD, HA, DR, STAND-ALONE
	sizingChoices : [{
		modelId :  "67890",
		modelDisplay : "E489-01OIG",
		cpu : "90",
		cores :"20" ,
		memory :"100" ,
			storage : {
				ssd :  2 ,
				hdd :  2
				},
				ethPort :  "50" ,
				sanPort :  "20" ,
				scaling :  "Scale up" ,
					breakup : [{
						envId : "Test" ,
						components : [{
						componentId : "12345",
						component :  "sample",
						lpar :  0.23,
						cores :  0.45 ,
						memory :  250
							}
						]
					}
				]
			}
		]
	  }
	 ]


	})
});
app.listen(port);
console.log('app is listening to http://localhost:' + port);
