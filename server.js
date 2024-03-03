const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/errorMiddleware')
const userRoute = require('./routes/userRoute');
const bookRoute = require('./routes/bookRoute');


dotenv.config();

const PORT = process.env.PORT || 4000
const MONGO_URL = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@bookshelf.5tgmqsm.mongodb.net/?retryWrites=true&w=majority&appName=bookshelf`
const app = express()

app.use(express.json())

//user routes
app.use('/api/user', userRoute)

//book routes
app.use('/api/book', bookRoute)


app.use(errorMiddleware)
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Database Connected!')
        app.listen(PORT, () => console.log('Server is running on port', PORT))

    })
    .catch((error) => console.log(error));