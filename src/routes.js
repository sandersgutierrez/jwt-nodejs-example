'use strict'

const jwt = require('jsonwebtoken')
const { readFileSync } = require('fs')
const router = require('express').Router()

let users = []

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    users.push({ username, password })
    const user = users.find((user) => user.username === username)
    const token = await jwt.sign({ username: user.username }, 'MY_SECRET')
    return res.status(200).json({ token })
})

router.post('/signin', async (req, res) => {
    const { username, password } = req.body
    const user = users.find((user) => user.username === username)
    if (!user) return res.status(401).json({ message: 'User is not exists' })
    if (user.password !== password) return res.status(401).json({ message: 'Wrong Password' })
    const token = await jwt.sign({ username: user.username }, 'MY_SECRET')
    return res.status(200).json({ token })
})

router.get('/posts', verifyToken, (req, res) => {
    const posts = JSON.parse(readFileSync(`${process.cwd()}/data/posts.json`, 'utf-8'))
    return res.status(200).json(posts)
})

function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized Request')
        }

        let token = req.headers.authorization.split(' ')[1]
        if (token === null) {
            return res.status(401).send('Unauthorized Request')
        }

        const payload = jwt.verify(token, 'MY_SECRET')
        if (!payload) {
            return res.status(401).send('Unauthorized Request')
        }

        req.username = payload.username

        next()
    } catch (error) {
        return res.status(401).send('Unauthorized Request')
    }
}

module.exports = router
