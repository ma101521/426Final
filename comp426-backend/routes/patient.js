import express from "express";
import { authenticateUser } from "../middlewares/auth";
import { parseGet } from "../middlewares/parse_get";
import { parsePost } from "../middlewares/parse_post";
import jwt from 'jsonwebtoken';
import { userFilter } from "../filters/user";
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const router = express.Router();
export const prefix = '/patient';


const { patientStore } = require('../data/DataStore');

//method to post patient
//router.post('/create', async function (req, res) {}

router.post('/create', async function (req, res) {
    if (!req.body.name || !req.body.pass) {
        res.status(401).send({ msg: 'Expected a payload of name and pass.' });
        return;
    }

    const name = req.body.name.toLowerCase();
    const pass = req.body.pass;

    let user = patientStore.get(`users.${name}`);
    if (user) {
        res.status(401).send({ msg: `User '${req.body.name}' is already a registered user.` });
        return;
    }

    bcrypt.hash(pass, saltRounds, (err, hash) => {
        patientStore.set(`users.${name}`, {
            passwordHash: hash,
            data: req.body.data
        });
        res.send({ data: userFilter(patientStore.get(`users.${name}`)), status: 'Successfully made account' });
    });
});


//method to get patient with username input

router.get('/:username', parseGet, function (req, res) {
    const result = req.handleGet(patientStore);
    if (typeof result !== 'undefined') {
        res.send({ result })
    }
});


//method to get all patient 

router.get('/*', parseGet, function (req, res) {
    const result = req.handleGet(patientStore);
    if (typeof result !== 'undefined') {
        res.send({ result })
    }
});