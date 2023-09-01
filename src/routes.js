'use strict'

const jwt = require('jsonwebtoken')
const { readFileSync, writeFileSync } = require('node:fs')
const router = require('express').Router()

const users = JSON.parse(readFileSync(`${process.cwd()}/data/users.json`, 'utf-8'))

router.post('/sign-up', async (req, res) => {
    const data = req.body
    users.push(data)
    writeFileSync(`${process.cwd()}/data/users.json`, JSON.stringify(users), { flag: 'w+' })
    const user = users.find((user) => user.username === data.username)
    res.status(200).json(user)
})

router.post('/sign-in', async (req, res) => {
    const { username, password } = req.body
    const user = users.find((user) => user.username === username)
    if (!user) return res.status(401).json({ message: 'User is not exists' })
    if (user.password !== password) return res.status(401).json({ message: 'Wrong Password' })
    const token = await jwt.sign({ username: user.username }, 'MY_SECRET')
    return res.status(200).json({ token })
})

router.get('/posts', verifyToken, (_req, res) => {
    const posts = JSON.parse(readFileSync(`${process.cwd()}/data/posts.json`, 'utf-8'))
    return res.status(200).json({ data: posts })
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
    } catch (err) {
        return res.status(401).send('Unauthorized Request')
    }
}

module.exports = router
