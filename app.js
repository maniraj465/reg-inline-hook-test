const express = require('express');
const {v4:uuid} = require('uuid');

const app = express();

app.use(express.json());

app.post('/reg', (req, res) => {
    
    let response = {
        "commands":[
           {
              "type":"com.okta.user.profile.update",
              "value":{
                    "firstName": req.body.data.userProfile.firstName,
                    "lastName": req.body.data.userProfile.lastName,
                    "email": req.body.data.userProfile.email,
                    "confirmPassword": req.body.data.userProfile.confirmPassword,
                    "countryCode": req.body.data.userProfile.countryCode,	    
                    "timezone": req.body.data.userProfile.timezone,	    
                    "city": req.body.data.userProfile.city,	    
                    "mobilePhone": req.body.data.userProfile.mobilePhone,	    
                    "userType": req.body.data.userProfile.userType,	    
                    "secondEmail": req.body.data.userProfile.secondEmail,	    
                    "organization": req.body.data.userProfile.organization,
                    "hpeProfileID": uuid()
              }
           },
           {
            "type":"com.okta.user.profile.update",
            "value":{
               "registration":"ALLOW"
            }
         }
        ]
     }
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