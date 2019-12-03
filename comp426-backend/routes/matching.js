import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {authenticateUser} from "../middlewares/auth";
import jwt from 'jsonwebtoken';
import { parseGet } from "../middlewares/parse_get";
import { parsePost } from "../middlewares/parse_post";

export const router = express.Router();
export const prefix = '/matching';


const {matchingStore} = require('../data/DataStore');

router.use(authenticateUser);

router.get('/*', parseGet, function (req, res) {
    const result = req.handleGet(matchingStore);
    if (typeof result !== 'undefined') {
      res.send({result})
    }
  });