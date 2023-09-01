'use strict'

const express = require('express')
const config = require('./config')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
    res.json({
        text: 'API works!',
    })
})

app.use('/api', require('./routes'))

app.listen(config.port, config.host, () => {
    console.log(`Server is running on http://${config.host}:${config.port}`)
})
