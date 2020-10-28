'use strict'

const jwt = require('jsonwebtoken')
const { readFileSync } = require('fs')
const { Router } = require('express')

const router = Router()

const users = []

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    users.push({ username, password })
    const newUser = users.find((user) => user.username === username)
    const token = await jwt.sign({ username: newUser.username }, 'MY_SECRET')
    res.status(201).json({ token })
})

router.get('/posts', (req, res) => {
    const posts = JSON.parse(readFileSync(`${process.cwd()}/data/posts.json`, 'utf-8'))
    res.json(posts)
})

module.exports = router
