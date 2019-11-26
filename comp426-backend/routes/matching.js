import express from "express";
import {authenticateUser} from "../middlewares/auth";
import jwt from 'jsonwebtoken';

export const router = express.Router();
export const prefix = '/matching';


const {matchingStore} = require('../data/DataStore');