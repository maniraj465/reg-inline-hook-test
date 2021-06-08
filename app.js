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
                "password2": req.body.data.userProfile.password2,
                "countryCode": req.body.data.userProfile.countryCode,	    
                "department": req.body.data.userProfile.department,	    
                "state": req.body.data.userProfile.state,	    
                "employeeNumber": req.body.data.userProfile.employeeNumber,	    
                "primaryPhone": req.body.data.userProfile.primaryPhone,
                "hpeProfileID": uuid()
              }
           },
        ]
     }
    
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