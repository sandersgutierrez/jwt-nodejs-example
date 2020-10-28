'use strict'

const jwt = require('jsonwebtoken')
const { readFileSync } = require('fs')
const { Router } = require('express')

const router = Router()

const users = []

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

router.get('/posts', (req, res) => {
    const posts = JSON.parse(readFileSync(`${process.cwd()}/data/posts.json`, 'utf-8'))
    res.json(posts)
})

module.exports = router
