const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path: './config.env'})
const port = process.env.PORT || 8080;
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);


mongoose.connect(DB).then(() => console.log(`Recipe Database Connected Successfully!`))

process.on("unhandledRejection", err => {
    console.log(err.name, err.message)
    process.exit(-1)
})


app.listen(port, () => {
    console.log(`App Run on Port No :  ${port}`);
})

