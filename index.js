const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const path = require('path')
const colors = require('colors')
const errorHandler = require('./middleware/error')

// Implement Routes
const usersRoute = require('./routes/users')

const injectDb = require('./middleware/injectDb')

// Include configuration process
dotenv.config({path: './config/config.env'})

const db = require('./config/db')

const app = express();
app.use(express.json());
app.use(cors());

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});




app.use(injectDb(db))
app.use('/api/v1/user', usersRoute)

app.use(errorHandler);

db.sequelize.sync().then(result => {
    console.log(colors.info(`Syncing database!`))
}).catch(err => console.log(err, 'Error for syncing...'))

const server = app.listen(process.env.PORT, () => {
    console.log(colors.rainbow(`Up && Running *${process.env.PORT}`))
})

process.on('unhandledRejection', (err, promise) => {
    console.log(colors.red.underline(`Алдаа гарлаа: ${err.message}`))
    server.close(() => {
        process.exit(1)
    })
})