import express from "express";
import { authenticateUser } from "../middlewares/auth";
import jwt from 'jsonwebtoken';

export const router = express.Router();
export const prefix = '/provider';



const { providerStore } = require('../data/DataStore');

//method to post provider
async function postProv() {

    const result = await axios({
        method: 'post',
        url: 'http://localhost:3000/' + prefix,
        data: {
            body: username
        },
    });
    return result.data;
}

//router.post('/create', async function (req, res) {}

router.postProv();

//method to get provider with username input

async function getOneProv() {
    // http request to get tweets
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3000/' + prefix,
    });
    return result.data;
}

//method to get all providers 

async function getAllProv() {
    // http request to get tweets
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3000/' + prefix,
    });
    return result.data;
}