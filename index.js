const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());  //parse incomming requests to json

app.listen(5000, () => console.log("Server started on port 5000"));


// set up routers

app.use("/event", require("./routers/eventsRouter"));  // http://localhost:5000/events/test

//connect to mongodb

mongoose.connect(process.env.MDB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
});

//mongodb+srv://events:<password>@event-manager.mx11w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority