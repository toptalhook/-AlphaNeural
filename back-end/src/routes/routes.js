/**
 * @notice module from online
 */
import express from "express";

/**
 * @notice module from online
 */
import Middlewares from './api/middlewares'
import Authentication from './api/authentication'
import UserRouter from './user/router'
const router = express.Router()

/**
 * @author Lee Jin
 * @title Application Routes
 * @notice Handle Get and Post request.
*/

const appController = require('../controllers/appController.js')

// Application Routes
app.get('/ping', (req, res) => res.send('pong'))
app.get('/', (req, res) => res.json({ 'source': 'https://github.com/amazingandyyy/mern' }))
app.post('/signUp', Authentication.signup)
app.post('/login', Authentication.signin)
app.post('/resetpassword', Authentication.resetPassword)

module.exports = router
