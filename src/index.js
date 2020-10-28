'use strict'

const express = require('express')
const config = require('./config')

const app = express()

app.get('/', (req, res) => {
    res.json({
        text: 'API works!',
    })
})

app.use('/api', require('./routes'))

app.listen(config.port, () => {
    console.log(`Server is running on http://${config.host}:${config.port}`)
})
