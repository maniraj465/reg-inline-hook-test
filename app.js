const express = require('express');
const {v4:uuid} = require('uuid');

const app = express();


app.use(express.json());


const allowCrossDomain = function (req, res, next) {
    console.log('req.url>>>>>>>>>>>>>>>>>>>>>>>>>> '+ JSON.stringify(req.url));
    console.log('req.headers<<<<<<<<<<<<<<<<<<<<<<<<<<<' + JSON.stringify(req.headers));
    next();
  };
app.use(allowCrossDomain);

app.post('/reg', (req, res) => {
    
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

app.get('/scim/v2/Users', (req, res) => {
    console.log('req.url=======================' + JSON.stringify(req.url));
    console.log('req.headers=======================' + JSON.stringify(req.headers));
    // let response = {
    //     "schemas": [
    //         "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    //     ],
    //     "id": "939c6caef2eb65494a888d565b0c55a0",
    //     "totalResults": 1,
    //     "startIndex": 1,
    //     "itemsPerPage": 0,
    //     "Resources": []
    // };
    let response = {
        "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
        "id": "23a35c27-23d3-4c03-b4c5-6443c09e7173",
        "userName": "test.user@okta.local",
        "name": {
            "givenName": "Another",
            "middleName": "",
            "familyName": "User"
        },
        "emails": [{
            "primary": true,
            "value": "test.user@okta.local",
            "type": "work",
            "display": "test.user@okta.local"
        }],
        "active": true,
        "groups": [],
        "meta": {
            "resourceType": "User"
        }
    };
    console.log(response);
    res.send(response);
});

app.get('/scim/v2/Users/:profileId', (req, res) => {
    console.log('req.url=======================' + JSON.stringify(req.url));
    console.log('req.headers=======================' + JSON.stringify(req.headers));
    let response = {
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "id": profileId,
        "totalResults": 0,
        "startIndex": 1,
        "itemsPerPage": 0,
        "Resources": []
    };
    console.log(response);
    res.send(response);
});

app.patch('/scim/v2/Users/:profileId', (req, res) => {
    console.log('req.url=======================' + JSON.stringify(req.url));
    console.log('req.headers=======================' + JSON.stringify(req.headers));
    console.log('req.body-------------------' + JSON.stringify(req.body));
    const givenName = req.body.name.givenName;
    const middleName = req.body.name.middleName;
    const familyName = req.body.name.familyName;
    const emailPrimary = req.body.emails[0].primary;
    const emailValue = req.body.emails[0].value;
    const emailType = req.body.emails[0].type;
    const emailDisplay = req.body.emails[0].display;
    const userName = req.body.userName;
    const id = req.body.id;
    let response ={
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "id": id,
        "userName": userName,
        "name": {
            "givenName": givenName,
            "middleName": middleName,
            "familyName": familyName
        },
        "emails": [
            {
                "primary": emailPrimary,
                "value": emailValue,
                "type": emailType,
                "display": emailDisplay
            }
        ],
        "active": true,
        "groups": [],
        "meta": {
            "resourceType": "User"
        }
    };
    console.log(response);
    res.send(response);
});

app.put('/scim/v2/Users/:profileId', (req, res) => {
    console.log('req.url=======================' + JSON.stringify(req.url));
    console.log('req.headers===================' + JSON.stringify(req.headers));
    console.log('req.body-------------------' + JSON.stringify(req.body));
    const givenName = req.body.name.givenName;
    const middleName = req.body.name.middleName;
    const familyName = req.body.name.familyName;
    const emailPrimary = req.body.emails[0].primary;
    const emailValue = req.body.emails[0].value;
    const emailType = req.body.emails[0].type;
    const emailDisplay = req.body.emails[0].display;
    const userName = req.body.userName;
    const id = req.body.id;
    let response ={
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:ListResponse"
        ],
        "id": id,
        "userName": userName,
        "name": {
            "givenName": givenName,
            "middleName": middleName,
            "familyName": familyName
        },
        "emails": [
            {
                "primary": emailPrimary,
                "value": emailValue,
                "type": emailType,
                "display": emailDisplay
            }
        ],
        "active": true,
        "groups": [],
        "meta": {
            "resourceType": "User"
        }
    };
    console.log(response);
    res.send(response);
});


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