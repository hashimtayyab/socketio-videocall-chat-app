const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const path = require('path');
// const { getEmployees } = require('./utility/cronjob/cron');


// const passport = require('passport');
// const {initializingPassport} = require("../../utility/passportConfig");
// initializingPassport(passport);
// app.use(passport.initialize());

require("dotenv").config();
const {connectMongoose} =  require("./config/db.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');



//Cron job to run at 12 am everyday
// const cron = require('node-cron');
// cron.schedule('0 0 * * *', getEmployees);

connectMongoose();
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started. Listening to PORT: ${process.env.PORT}`);
})




   