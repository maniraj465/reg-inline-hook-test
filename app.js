const express = require('express');
const {v4:uuid} = require('uuid');

const app = express();


app.use(express.json());

app.post('/v1-registration-inline-hook', (req, res) => {
    req.on('data', function (data) {
        requestBody += data;
        var userJsonData = JSON.parse(requestBody);
        console.log(userJsonData);
    
      });
      console.log(req.body);
console.log('---------------------------------------------');
      console.log(JSON.stringify(req.body));

      let response = {
        "commands":[
           {
              "type":"com.okta.user.profile.update",
              "value":{
                 "firstName": req.body.data.userProfile.firstName,
                "lastName": req.body.data.userProfile.lastName,
                "email": req.body.data.userProfile.email,
                "countryCode": req.body.data.userProfile.countryCode,	    
                "hpeProfileID": uuid()
              }
           },
        ]
     }
    res.send(response);
});


app.post('/v1-password-inline-hook', (req, res) => {
    req.on('data', function (data) {
        requestBody += data;
        var userJsonData = JSON.parse(requestBody);
        console.log(userJsonData);
    
      });
      console.log(req.body);
      console.log(JSON.stringify(req.body));

      let response = {
        "commands":[
           {
              "type":"com.okta.user.profile.update",
              "value":{
                 "firstName": req.body.data.userProfile.firstName,
                "lastName": req.body.data.userProfile.lastName,
                "email": req.body.data.userProfile.email,
                "countryCode": req.body.data.userProfile.countryCode,	    
                "hpeProfileID": uuid()
              }
           },
        ]
     }
    res.send(response);
});



app.put('/ccs/update', (req, res) => {
    console.log('CCS update endpoint triggered');
    req.on('data', function (data) {
        requestBody += data;

      });
      console.log('requestBody: ' + JSON.stringify(requestBody));
      let response = {
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "totalResults": 1,
        "startIndex": 1,
        "itemsPerPage": 1,
        "Resources": [
            {
                "schemas": [
                    "urn:ietf:params:scim:schemas:core:2.0:User"
                ],
                "id": '939c6caef2eb65494a888d565b0c56551',
                "userName": 'rana.kuldeep@pwc.com',
                "name": {
                    "givenName": 'Ranaaaaaaaaaaaaaaaaaaaaaaa',
                    "middleName": 'middleName',
                    "familyName": 'Kuldeep'
                },
                "emails": [
                    {
                        "primary": true,
                        "value": 'rana.kuldeep@pwc.com',
                        "type": 'work',
                        "display": 'rana.kuldeep@pwc.com'
                    }
                ],
                "active": true,
                "groups": [],
                "meta": {
                    "resourceType": "User"
                }
            }
        ]
    };
    res.status(200);
    res.send(response);
});



app.delete('/ccs/delete/:userId', (req, res) => {
    console.log(`CCS delete endpoint triggered for ${+req.params.userId}`);
    console.log('req.url=======================' + JSON.stringify(req.url));
    console.log('req.headers=======================' + JSON.stringify(req.headers));
      let response = {
        "commands":[
           {
              "type":"com.okta.user.profile.update",
           },
        ]
     }
     res.status(204);
    res.send();
});


app.get('/scim/v2/Users', (req, res) => {
    console.log('inside getuser by username');
    console.log('req.url=======================' + JSON.stringify(req.url));
    console.log('req.headers=======================' + JSON.stringify(req.headers));
    const queryParam = req.query.filter;
    const id = '939c6caef2eb65494a888d565b0c56551';
    //   if (queryParam.trim().length > 0) {
    //         if (queryParam.includes('userName')) {        
    //          }
    //     }    
    //   const email = queryParam.split('"')[1];



    let response = {
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "totalResults": 1,
        "startIndex": 1,
        "itemsPerPage": 1,
        "Resources": [
            {
                "schemas": [
                    "urn:ietf:params:scim:schemas:core:2.0:User"
                ],
                "id": '939c6caef2eb65494a888d565b0c56551',
                "userName": 'rana.kuldeep@pwc.com',
                "name": {
                    "givenName": 'RanaaaaaaaaaaaaaaaaaaaaaaaA',
                    "middleName": 'middleName',
                    "familyName": 'Kuldeep'
                },
                "emails": [
                    {
                        "primary": true,
                        "value": 'rana.kuldeep@pwc.com',
                        "type": 'work',
                        "display": 'rana.kuldeep@pwc.com'
                    }
                ],
                "active": true,
                "groups": [],
                "meta": {
                    "resourceType": "User"
                }
            }
        ]
    };
    console.log('Query params: ' + queryParam);


    // let response = {
    //     "schemas": [
    //         "urn:ietf:params:scim:schemas:core:2.0:User"
    //     ],
    //     "details": 'sending 404 for testing',
    //     "status": 404,
    // };
    // res.status(404);

    console.log(response);
    res.send(response);
});

app.post('/scim/v2/Users', (req, res) => {
    let requestBody;

    req.on('data', function (data) {
        requestBody += data;
      });

      console.log(JSON.stringify(requestBody));
    //   let temp = JSON.stringify(requestBody);
      console.log('');
    //   console.log(temp['urn:ietf:params:scim:schemas:extension:enterprise:2.0:Home_Address']);
    console.log('inside create user SCIM');
    console.log(requestBody);
      console.log('Hardcoded response');
    let response1 = {
                "schemas": [
                    "urn:ietf:params:scim:api:messages:2.0:ListResponse"
                ],
                "totalResults": 1,
                "startIndex": 1,
                "itemsPerPage": 1,
                "Resources": [
                    {
                        "schemas": [
                            "urn:ietf:params:scim:schemas:core:2.0:User",
                            "Home_Address",
                            "hpeProfileID",
                            "Preference",
                            "Data"
                        ],
                        "totalResults": 0,
                        "startIndex": 1,
                        "itemsPerPage": 0,
                        "userName": "todaytest26@gmail.com",
                        "name": {
                            "givenName": "abc123",
                            "middleName":"abc123",
                            "familyName": "user"
                        },
                        "emails": [
                            {
                                "primary": true,
                                "value": "todaytest26@gmail.com"
                            }
                        ],
                        "phoneNumbers": [
                            {
                                "primary": true,
                                "value": "7888226666"
                            }
                        ],
                        "addresses": [
                            {
                                "primary": true,
                                "streetAddress": "Care road",
                                "locality": "fremont",
                                "region": "TA",
                                "postalCode": "94534"
                            }
                        ],
                        "preferredLanguage": "en",
                        "locale": "en-US",
                        "Home_Address": {
                            "hpePersonalStreetAddress": "RingRoad5",
                            "hpePersonalStreetAddress2": "BTM Layout",
                            "hpePersonalCity": "bangalore",
                            "hpePersonalState": "Delhi",
                            "hpePersonalZipCode": "700100",
                            "hpeCountryCode": "IN"
                        },
                        "hpeStreetAddress2": "Terrace update",
                        "Preference": {
                            "hpeContactPreferencePhone": "false",
                            "hpeContactPreferenceEmail": "true"
                        },
                        "Data": {
                            "hpeData1": "1003445632gh1",
                            "hpeData2": "alklkatty000111",
                            "hpeData3": "jlitrbwq"
                        },
                        "hpeCompanyName": "Intel Inc. Pvt",
                        "id": "1d55c043c07d46ecf9c66984e1ae33c9",
                        "statusCode": 200
                    }
                ]
            };
    let response2 = {
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User",
            "Home_Address",
            "hpeProfileID",
            "Preference",
            "Data"
        ],
        "totalResults": 0,
        "startIndex": 1,
        "itemsPerPage": 0,
        "userName": "todaytest26@gmail.com",
        "name": {
            "givenName": "abc123",
            "middleName":"abc123",
            "familyName": "user"
        },
        "emails": [
            {
                "primary": true,
                "value": "todaytest26@gmail.com"
            }
        ],
        "phoneNumbers": [
            {
                "primary": true,
                "value": "7888226666"
            }
        ],
        "addresses": [
            {
                "primary": true,
                "streetAddress": "Care road",
                "locality": "fremont",
                "region": "TA",
                "postalCode": "94534"
            }
        ],
        "preferredLanguage": "en",
        "locale": "en-US",
        "hpePersonalStreetAddress": "RingRoad5",
        "hpePersonalStreetAddress2": "BTM Layout",
        "hpePersonalCity": "bangalore",
        "hpePersonalState": "Delhi",
        "hpePersonalZipCode": "700100",
        "hpeCountryCode": "IN",
        "hpeStreetAddress2": "Terrace update",
        "hpeContactPreferencePhone": "false",
        "hpeContactPreferenceEmail": "true",
        "hpeData1": "1003445632gh1",
        "hpeData2": "alklkatty000111",
        "hpeData3": "jlitrbwq",
        "hpeCompanyName": "Intel Inc. Pvt",
        "id": "1d55c043c07d46ecf9c66984e1ae33c9",
        "hpeProfileID": "1d55c043c07d46ecf9c66984e1ae33c9"
    };
    let response3 = {
        "schemas": [
            "urn:ietf:params:scim:schemas:core:2.0:User",
            "Home_Address",
            "hpeProfileID",
            "Preference",
            "Data"
        ],
        "totalResults": 0,
        "startIndex": 1,
        "itemsPerPage": 0,
        "userName": "todaytest26@gmail.com",
        "name": {
            "givenName": "abc123",
            "middleName":"abc123",
            "familyName": "user"
        },
        "emails": [
            {
                "primary": true,
                "value": "todaytest26@gmail.com"
            }
        ],
        "phoneNumbers": [
            {
                "primary": true,
                "value": "7888226666"
            }
        ],
        "addresses": [
            {
                "primary": true,
                "streetAddress": "Care road",
                "locality": "fremont",
                "region": "TA",
                "postalCode": "94534"
            }
        ],
        "preferredLanguage": "en",
        "locale": "en-US",
        "Home_Address": {
            "hpePersonalStreetAddress": "RingRoad5",
            "hpePersonalStreetAddress2": "BTM Layout",
            "hpePersonalCity": "bangalore",
            "hpePersonalState": "Delhi",
            "hpePersonalZipCode": "700100",
            "hpeCountryCode": "IN"
        },
        "hpeStreetAddress2": "Terrace update",
        "Preference": {
            "hpeContactPreferencePhone": "false",
            "hpeContactPreferenceEmail": "true"
        },
        "Data": {
            "hpeData1": "1003445632gh1",
            "hpeData2": "alklkatty000111",
            "hpeData3": "jlitrbwq"
        },
        "hpeCompanyName": "Intel Inc. Pvt",
        "id": "1d55c043c07d46ecf9c66984e1ae33c9"
    };
    let response = {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "00ujl29u0le5T6Aj10h7rfsdffdf",
        "userName": "todaytest27@gmail.com",
        "name": {
            "givenName": "Test",
            "familyName": "User"
        },
        "emails": [{
            "primary": true,
            "value": "todaytest27@gmail.com",
            "type": "work"
        }],
        "displayName": "Test User",
        "locale": "en-US",
        "externalId": "00ujl29u0le5T6Aj10h7rfsdf",
        "active": true,
        "userType": "Contractor",
        "groups": [],
        "meta": {
            "resourceType": "User"
        }
    }
    console.log(response);
    res.send(response);
});


app.get('/scim/v2/Users/:profileId', (req, res) => {
    console.log('inside getuser by profileId');
    let response = {
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "id": '1fae24ef9e172568a596eb14944a9955',
        "totalResults": 0,
        "startIndex": 1,
        "itemsPerPage": 0,
        "Resources": []
    };
    // let response = {
    //     "schemas": [
    //         "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    //     ],
    //     "details": 'sending 404 for testing',
    //     "status": 404,
    // };
    // res.status(404);

    console.log(response);
    res.send(response);
});


app.patch('/scim/v2/Users/:profileId', (req, res) => {
    console.log('req.url=======================' + JSON.stringify(req.url));
    console.log('req.headers=======================' + JSON.stringify(req.headers));
    req.on('data', function (data) {
        requestBody += data;
        var userJsonData = JSON.parse(requestBody);
        console.log(userJsonData);
    
      });

    // const givenName = req.body.name.givenName;
    // const middleName = req.body.name.middleName;
    // const familyName = req.body.name.familyName;
    // const emailPrimary = req.body.emails[0].primary;
    // const emailValue = req.body.emails[0].value;
    // const emailType = req.body.emails[0].type;
    // const emailDisplay = req.body.emails[0].display;
    // const userName = req.body.userName;
    // const id = req.body.id;
    // let response ={
    //     "schemas": [
    //         "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    //     ],
    //     "id": id,
    //     "userName": userName,
    //     "name": {
    //         "givenName": givenName,
    //         "middleName": middleName,
    //         "familyName": familyName
    //     },
    //     "emails": [
    //         {
    //             "primary": emailPrimary,
    //             "value": emailValue,
    //             "type": emailType,
    //             "display": emailDisplay
    //         }
    //     ],
    //     "active": true,
    //     "groups": [],
    //     "meta": {
    //         "resourceType": "User"
    //     }
    // };
    let response = {
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "totalResults": 1,
        "startIndex": 1,
        "itemsPerPage": 1,
        "Resources": [
            {
                "schemas": [
                    "urn:ietf:params:scim:schemas:core:2.0:User"
                ],
                "id": '939c6caef2eb65494a888d565b0c56551',
                "userName": 'rana.kuldeep@pwc.com',
                "name": {
                    "givenName": 'Ranaaaaaaaaaaaaaaaaaaaaaaa',
                    "middleName": 'middleName',
                    "familyName": 'Kuldeep'
                },
                "emails": [
                    {
                        "primary": true,
                        "value": 'rana.kuldeep@pwc.com',
                        "type": 'work',
                        "display": 'rana.kuldeep@pwc.com'
                    }
                ],
                "active": true,
                "groups": [],
                "meta": {
                    "resourceType": "User"
                }
            }
        ]
    };
    res.send(response);
});


app.put("/scim/v2/Users/:userId", function (req, res) {
// 	var userId = req.params.userId;
// 	var url_parts = url.parse(req.url, true);
// 	var req_url = url_parts.pathname;
  var requestBody = "";
  console.log('req.url=======================' + JSON.stringify(req.url));
  console.log('req.headers=======================' + JSON.stringify(req.headers));
  console.log(JSON.stringify(req.body));
  console.log(JSON.stringify(req.payload));
  var userJsonData;
  req.on('data', function (data) {
    requestBody += data;
    userJsonData = JSON.parse(requestBody);
    console.log(userJsonData);

  });
  console.log('Home_Address');
  console.log(userJsonData['urn:ietf:params:scim:schemas:extension:enterprise:2.0:Home_Address']);
  let response = {
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "totalResults": 1,
    "startIndex": 1,
    "itemsPerPage": 1,
    "Resources": [ ]
};
res.send(response);
});



// app.put('/scim/v2/Users/:profileId', (req, res) => {
//     console.log('req.url=======================' + JSON.stringify(req.url));
//     console.log('req.headers===================' + JSON.stringify(req.headers));
//     console.dir(req);
//     // const givenName = req.body.name.givenName;
//     // const middleName = req.body.name.middleName;
//     // const familyName = req.body.name.familyName;
//     // const emailPrimary = req.body.emails[0].primary;
//     // const emailValue = req.body.emails[0].value;
//     // const emailType = req.body.emails[0].type;
//     // const emailDisplay = req.body.emails[0].display;
//     // const userName = req.body.userName;
//     // const id = req.body.id;
//     // let response ={
//     //     "schemas": [
//     //         "urn:ietf:params:scim:api:messages:2.0:ListResponse"
//     //     ],
//     //     "id": id,
//     //     "userName": userName,
//     //     "name": {
//     //         "givenName": givenName,
//     //         "middleName": middleName,
//     //         "familyName": familyName
//     //     },
//     //     "emails": [
//     //         {
//     //             "primary": emailPrimary,
//     //             "value": emailValue,
//     //             "type": emailType,
//     //             "display": emailDisplay
//     //         }
//     //     ],
//     //     "active": true,
//     //     "groups": [],
//     //     "meta": {
//     //         "resourceType": "User"
//     //     }
//     // };
//     let response = {
//         "schemas": [
//             "urn:ietf:params:scim:api:messages:2.0:ListResponse"
//         ],
//         "totalResults": 1,
//         "startIndex": 1,
//         "itemsPerPage": 1,
//         "Resources": [
//             {
//                 "schemas": [
//                     "urn:ietf:params:scim:schemas:core:2.0:User"
//                 ],
//                 "id": '939c6caef2eb65494a888d565b0c56551',
//                 "userName": 'rana.kuldeep@pwc.com',
//                 "name": {
//                     "givenName": 'RanaaaaaaaaaaaaaaaaaaaaaaaA',
//                     "middleName": 'middleName',
//                     "familyName": 'Kuldeep'
//                 },
//                 "emails": [
//                     {
//                         "primary": true,
//                         "value": 'rana.kuldeep@pwc.com',
//                         "type": 'work',
//                         "display": 'rana.kuldeep@pwc.com'
//                     }
//                 ],
//                 "active": true,
//                 "groups": [],
//                 "meta": {
//                     "resourceType": "User"
//                 }
//             }
//         ]
//     };
//     console.log(response);
//     res.send(response);
// });


app.get('/', (req, res) => {
    response = {
        "name": "maniraj",
        "role": "developer"
    }
    console.log(response);
    res.send(response);
});

const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));