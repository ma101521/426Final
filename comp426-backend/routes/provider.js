import express from "express";
import { authenticateUser } from "../middlewares/auth";
import bcrypt from 'bcrypt';
import { userFilter } from "../filters/user";
import jwt from 'jsonwebtoken';

export const router = express.Router();
export const prefix = '/provider';

const saltRounds = 10;

const { providerStore } = require('../data/DataStore');

/**
 * Given a name and pass, will create a user
 * if one with that name doesn't exist in the
 * database.
 */
router.post('/create', function (req, res) {
    if (!req.body.name || !req.body.pass) {
        res.status(401).send({ msg: 'Expected a payload of name and pass.' });
        return;
    }

    const name = req.body.name.toLowerCase();
    const pass = req.body.pass;


    let user = providerStore.get(`users.${name}`);
    if (user) {
        res.status(401).send({ msg: `User '${req.body.name}' is already a registered user.` });
        return;
    }

    bcrypt.hash(pass, saltRounds, (err, hash) => {
        providerStore.set(`users.${name}`, {
            passwordHash: hash,
            data: req.body.data
        });
        res.send({ data: userFilter(providerStore.get(`users.${name}`)), status: 'Successfully made account' });
    });

});

/**
 * This route requires a valid JWT token.
 * This means that if you hit this route with a valid JWT then
 * you will be given the user data. If not, then you know you
 * know you are not logged in.
 */
router.get('/:username', authenticateUser, function (req, res) {
    res.send(
        {
            user: {
                name: req.user.name,
                ...userFilter(providerStore.get(`users.${req.user.name}`))
            }
        }
    );
});


async function checkUser(username, password) {
    const user = accountStore.get(`users.${username}`);
    return await bcrypt.compare(password, user.passwordHash);
}
