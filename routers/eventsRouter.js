const router = require("express").Router();
const Event = require("../models/eventModel");

router.get("/", async (req, res) => {
    try {
        const events = await Event.find();  //find all events
        res.json(events); //give us a json response
    }
    catch (err) {
        res.status(500).send();
    }
});



router.post("/", async (req, res) => { //create event
    try {
        const { title, description, location, day, month, year } = req.body;  //if key of title, description or code in the object create a variable for it with value of the corresponding key in the body
        console.log(year);

        //validation
        if (!description && !location) {
            return res.status(400).json({ errorMessage: "You need to enter at least a description and location." });
        }

        const newEvent = new Event({   //create new event
            title, description, location, day, month, year
        });

        const savedEvent = await newEvent.save();  //save this to the db

        res.json(savedEvent);
    }
    catch (err) {
        res.status(500).send();
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { title, description, location, day, month, year } = req.body;
        const eventId = req.params.id;


        // validation
        if (!description && !location) {
            return res.status(400).json({ errorMessage: "You need to enter at least a description and location." });
        }
        if (!eventId) return res.status(400).json({ errorMessage: "Event ID not given. Please contact the developer" });

        const originalEvent = await Event.findById(eventId);
        if (!originalEvent)
            return res.status(400).json({ errorMessage: "No event with this id was found. Please contact the developer" });

        originalEvent.title = title;
        originalEvent.description = description;
        originalEvent.location = location;
        originalEvent.day = day;
        originalEvent.month = month;
        originalEvent.year = year;

        const savedEvent = await originalEvent.save();

        res.json(savedEvent);
    }
    catch (err) {
        res.status(500).send();
    }
});

router.delete("/:id", async (req, res) => {  //delete by id
    try {
        const eventId = req.params.id;
        console.log(eventId);

        // validation
        if (!eventId) return res.status(400).json({ errorMessage: "Event ID not given. Please contact the developer" });

        const existingEvent = await Event.findById(eventId);
        if (!existingEvent)
            return res.status(400).json({ errorMessage: "No event with this id was found. Please contact the developer" });
        await existingEvent.delete();

        res.json(existingEvent);


    }
    catch (err) {
        res.status(500).send();
    }
});

module.exports = router;