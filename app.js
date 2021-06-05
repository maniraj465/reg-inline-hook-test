const express = require('express');
const app = express();

app.use(express.json());

app.post('/reg', (req, res) => {
    // let body = req.body;
    // let profile = body.profile;
    // profile.hpeProfileId = 123;
    
    // let body = req.body;
    // let profile = body.profile;
    let id = 12345
    let response = {
        "commands":[
           {
              "type":"com.okta.user.pre-registration",
              "value":{
                 "firstName": req.data.userProfile.firstName,
                 "lastName": req.data.userProfile.lastName,
                 "email": req.data.userProfile.email,
                 "password": req.data.userProfile.password,
                 "hpeProfileId": id
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