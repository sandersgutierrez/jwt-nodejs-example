'use strict'

const { readFileSync } = require('fs')
const { Router } = require('express')

const router = Router()

router.get('/posts', (req, res) => {
    const posts = JSON.parse(readFileSync(`${process.cwd()}/data/posts.json`, 'utf-8'))
    res.json(posts)
})

module.exports = router
