const express = require('express');
const app = express();

app.use(express.json());

app.post('/reg', (req, res) => {
    let body = req.body;
    let profile = body.profile;
    profile.hpeProfileId = 123;
    
    let response = {
        profile: profile,
    }
    
    console.log(response);
    res.send(response);
});

const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));