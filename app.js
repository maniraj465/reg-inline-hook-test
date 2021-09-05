const express = require('express');
const axios = require('axios');

const API_GATE_WAY_URL = 'https://0vv671dgs9.execute-api.us-east-1.amazonaws.com/test?TID=';
const GET_USER_BY_UID = 'api/v1/users?search=profile.uid+eq+';
const OKTA_BASE_URL = 'https://oie-3751727-admin.oktapreview.com/';
const API_TOKEN = 'SSWS 00TnKVnUZ0eziDta_OgvZJGK7mpChMSnQni_bL9K15';
let targetUrl;

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    const requestBody = req.body;
    const id = req.query.id;
    const dynamoDBTargetUrl = API_GATE_WAY_URL + id;
    const user = await getUserAWS(dynamoDBTargetUrl);

    // {
    //     "Count":1,
    //     "Items":[{
    //         "Address":{"S":"Bangalore"},
    //         "First_Name":{"S":"Gautam"},
    //         "Mobile":{"S":"1234567890"},
    //         "Experience":{"S":"10"},
    //         "Specialization":{"S":"Cyber Security"},
    //         "Last_Name":{"S":"Chatterjee"},
    //         "LatestDergee":{"S":"M.TECH"},
    //         "Position":{"S":"Professor"},
    //         "Email":{"S":"gautamkumarchatterjee@gmail.com"},
    //         "TID":{"S":"TID001"
    //         }
    //     }],
    //     "ScannedCount":1
    // }

    // {
    //     "LatestDegree":"M.TEch",
    //     "Specialization":"Cyber",
    //     "name": null,
    //     "email": null,
    //     "given_name":null,
    //     "family_name": null,
    //     "mobilePhone": "5454",
    //     "experience":"10",
    //     "postalAddress":"Bangalore"
    // }

    const userProfile = user.Items[0];
    console.log(userProfile);
    const oktaTargetUrl = `${OKTA_BASE_URL}${GET_USER_BY_UID}"${id}"`;
    const oktaData = await getUserOKTA(oktaTargetUrl);
    const payload = {
        profile: {
            "firstName": userProfile.First_Name.S,
            "lastName": userProfile.Last_Name.S,
            "email": userProfile.Email.S,
            "mobilePhone": userProfile.Mobile.S,
            "uid": userProfile.TID.S,
            "experience": userProfile.Experience.S,
            "postalAddress": userProfile.Address.S,
            "specialization": userProfile.Specialization.S,
            "latestDegree": userProfile.LatestDergee.S,
        }
    };
    const updateResponse = updateUserOKTA(targetUrl, payload)
    res.send(updateResponse);
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

async function getUserOKTA(targetUrl) {
    const response = await axios.get(targetUrl, {
        headers: {
            'Content_Type': 'application/json',
            Accept:  'application/json',
            Authorization: API_TOKEN
        }
    })
    .then(res => {
        return res.data;
    })
    .catch(error => {
        console.log(error);
        return error;
    });
    return await response;
}

async function updateUserOKTA(targetUrl, payload) {
    const response = await axios.put(targetUrl, payload, {
        headers: {
            'Content_Type': 'application/json',
            Accept:  'application/json',
            Authorization: API_TOKEN
        }
    })
    .then(res => {
        return res.data;
    })
    .catch(error => {
        console.log(error);
        return error;
    });
    return await response;
}

const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));