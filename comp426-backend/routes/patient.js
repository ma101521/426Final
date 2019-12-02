import express from "express";
import { authenticateUser } from "../middlewares/auth";
import jwt from 'jsonwebtoken';

export const router = express.Router();
export const prefix = '/patient';


const { patientStore } = require('../data/DataStore');

//method to post patient

//router.post('/create', async function (req, res) {}

//method to get patient with username input

//method to get all patient 