import express from "express";
import { authenticateUser } from "../middlewares/auth";
import bcrypt from 'bcrypt';
import { userFilter } from "../filters/user";
import jwt from 'jsonwebtoken';
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/provider';

const saltRounds = 10;

const { providerStore } = require('../data/DataStore');

/**
 * Given a name and pass, will create a user
 * if one with that name doesn't exist in the
 * database.
 */
router.post('/create', async function (req, res) {
    if (!req.body.name) {
        res.status(401).send({ msg: 'Expected a payload of name.' });
        return;
    }
    const name = req.body.name.toLowerCase();
    providerStore.set(`users.${name}`, {
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
    console.log(req);
    res.send({ data: userFilter(providerStore.get(`users.${name}`)), status: 'Successfully made account' });

});



router.get('/*', parseGet, function (req, res) {
    const result = req.handleGet(providerStore);
    if (typeof result !== 'undefined') {
        res.send({ result })
    }
});

/* async function checkUser(username, password) {
    const user = providerStore.get(`users.${username}`);
    return await bcrypt.compare(password, user.passwordHash);
} */
