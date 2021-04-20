const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

//Route imports 
const userRouter = require('./users/users-router')

/**
  Do what needs to be done to support sessions with the `express-session` package!
  To respect users' privacy, do NOT send them a cookie unless they log in.
  This is achieved by setting 'saveUninitialized' to false, and by not
  changing the `req.session` object unless the user authenticates.

  Users that do authenticate should have a session persisted on the server,
  and a cookie set on the client. The name of the cookie should be "chocolatechip".

  The session can be persisted in memory (would not be adecuate for production)
  or you can use a session store like `connect-session-knex`.
 */

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

//ROUTES 
server.use('/api/users', userRouter)


server.get("/", (req, res) => {
 res.status(200).json('Welcome to the Node Auth1 project server! 😃 Head to /api to get started.')
}) 
server.get("/api", (req, res) => {
  res.status(200).json('Hello, this is the API! See all registered users at /api/users , and register your own account at /api/auth 🤩')
 }) 

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})


module.exports = server
