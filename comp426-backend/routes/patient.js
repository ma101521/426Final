import express from "express";
import { authenticateUser } from "../middlewares/auth";
import { userFilter } from "../filters/user";


const saltRounds = 10;

export const router = express.Router();
export const prefix = '/patient';


const { patientStore } = require('../data/DataStore');

//method to post patient
//router.post('/create', async function (req, res) {}

router.post('/create', authenticateUser, function (req, res) {
    if (!req.user.name) {
        res.status(401).send({ msg: 'Expected a payload of name.' });
        return;
    }
    //const name = req.body.name.toLowerCase();
    const username = req.user.name;
        patientStore.set(`users.${username}`, {
            data: req.body.data,
            q1: req.body.q1,
            q2: req.body.q2,
            q3: req.body.q3,
            q4: req.body.q4,
            q5: req.body.q5,
            q6: req.body.q6,
            q7: req.body.q7,
            q8: req.body.q8,
            q9: req.body.q9,
            q10: req.body.q10,
            q11: req.body.q11,
            q12: req.body.q12
        });
        //console.log(req);
        res.send({ data: userFilter(patientStore.get(`users.${username}`)), status: 'Successfully made survey response' });
    // });
});



router.get('/user', authenticateUser, function (req, res) {
    const username = req.user.name;
    //let user = patientStore.get(`users.${username}`);
    res.send({data: patientStore.get(`users.${username}`), status: 'Successfully found user '+username});
});


