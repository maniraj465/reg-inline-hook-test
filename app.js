const express = require('express');
const axios = require('axios');

const API_GATE_WAY_URL = 'https://0vv671dgs9.execute-api.us-east-1.amazonaws.com/test?TID=';

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
    const id = req.query.id;
    const dynamoDBTargetUrl = API_GATE_WAY_URL + id;
    const user = await getUserAWS(dynamoDBTargetUrl);
    res.send(user);
});

async function getUserAWS(targetUrl) {
    const response = await axios.get(targetUrl)
    .then(res => {
        return res.data;
    })
    .catch(error => {
        return error;
    });
    return response;
}

const port = '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));