import express from "express";
import {authenticateUser} from "../middlewares/auth";
import jwt from 'jsonwebtoken';

export const router = express.Router();
export const prefix = '/provider';



const {providerStore} = require('../data/DataStore');

//method to post provider
//router.post('/create', async function (req, res) {}

//method to get provider with username input

//method to get all providers 