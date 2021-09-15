const mongoose = require("mongoose");  // library that lets you create documents and save them to mongodb

const eventSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    location: { type: String },
    day: { type: String },
    month: { type: String },
    year: { type: String },

}, {

    timestamps: true
});

const Event = mongoose.model("event", eventSchema);

module.exports = Event;