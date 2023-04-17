const {createPool} = require('mysql2/promise')

const pool = createPool({
    host: process.env.HOSTDB,
    user: process.env.USER,
    password: process.env.PASS,
    port: process.env.PORTDB,
    database: process.env.DATABASE
})

module.exports = pool
