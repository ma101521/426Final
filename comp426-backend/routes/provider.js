import express from "express";
import { authenticateUser } from "../middlewares/auth";
import { userFilter } from "../filters/user";

export const router = express.Router();
export const prefix = '/provider';

const saltRounds = 10;

const { providerStore } = require('../data/DataStore');

/**
 * Given a name and pass, will create a user
 * if one with that name doesn't exist in the
 * database.
 */
router.post('/create', authenticateUser, function (req, res) {

    const username = req.user.name;
    providerStore.set(`users.${username}`, {
        //passwordHash: hash,
        data: req.body.data,
        drName: req.body.DrName,
        phone: req.body.phone,
        address: req.body.address,
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
    res.send({ data: userFilter(providerStore.get(`users.${username}`)), type: "merge", status: 'Successfully made provider' });

});


router.get('/all', authenticateUser, function (req, res) {
    res.send({ data: providerStore.get(`users`), status: 'Successfully found all' });
});
