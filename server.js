require('dotenv').config({
    path: __dirname + '/./../envs/jwtauth/.env'
})

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [{
    username: 'Eden',
    title: 'Post 1'
}, {
    username: 'Hazard',
    title: 'Post 2'
}]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

// \/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/
// Create access token with "crypto": require ('crypto').randomBytes(64).toString('hex')
// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000, () => console.log(`Server up and listening on: 3000`))