'use strict'

const express = require('express')
const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.json({
        text: 'API works!',
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`)
})
