const express = require('express');
const axios = require('axios');

const GET_USER_BY_UID = 'api/v1/users?search=profile.uid+eq+';
const OKTA_BASE_URL = 'https://oie-3751727-admin.oktapreview.com/';
const API_TOKEN = 'SSWS 00TnKVnUZ0eziDta_OgvZJGK7mpChMSnQni_bL9K15';
const API_V1_USERS = 'api/v1/users/';
const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    const id = req.query.id;
    const payload = req.body;
    const oktaTargetUrl = `${OKTA_BASE_URL}${GET_USER_BY_UID}"${id}"`;
    let oktaData = await getUserOKTA(oktaTargetUrl);
    oktaData = oktaData[0];
    const firstName = payload.name || oktaData.profile.firstName;
    const lastName = payload.family_name || oktaData.profile.lastName;
    const email = payload.email || oktaData.profile.email;
    const mobilePhone = payload.mobilePhone || oktaData.profile.mobilePhone;
    const experience = payload.experience || oktaData.profile.experience;
    const postalAddress = payload.postalAddress || oktaData.profile.postalAddress;
    const specialization = payload.Specialization || oktaData.profile.specialization;
    const latestDegree = payload.LatestDegree || oktaData.profile.latestDegree;

    const userProfile = {
        profile: {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "mobilePhone": mobilePhone,
            "experience": experience,
            "postalAddress": postalAddress,
            "specialization": specialization,
            "latestDegree": latestDegree,
        }
    };
    const targetUrl = OKTA_BASE_URL + API_V1_USERS + oktaData.profile.email;
    const updateResponse = await updateUserOKTA(targetUrl, userProfile);
    console.log(updateResponse);
    res.send(updateResponse);
});

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
    const response = await axios.post(targetUrl, payload, {
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
        return error;
    });
    return await response;
}

const port = '6000';
app.listen(port, () => console.log(`Server started on Port ${port}`));