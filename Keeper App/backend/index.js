const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
// mongodb+srv://hellouser111:<password>@cluster0.jidvzlz.mongodb.net/?retryWrites=true&w=majority


// mongodb://localhost:27017/keeperAppDB

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://hellouser101 :Kp3e1cxnKAxE0sho@cluster0.jidvzlz.mongodb.net/keeperAppDB?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });

mongoose.connect('mongodb://localhost:27017/keeperAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const keeperSchema = mongoose.Schema({
    title: String,
    description: String
})

const Keeper = new mongoose.model("Keeper", keeperSchema);


app.get("/api/getAll", (req, res) => {
    Keeper.find({}, (err, keeperList) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(keeperList)
        }
    })
})

app.post("/api/addNew", (req, res) => {
    const { title, description } = req.body
    const keeperObj = new Keeper({
        title,
        description
    })
    keeperObj.save(err => {
        if (err) {
            console.log(err)
        }
        Keeper.find({}, (err, keeperList) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(keeperList)
            }
        })
    })

})

app.post("/api/delete", (req, res) => {
    const { id } = req.body
    Keeper.deleteOne({ _id: id }, () => {
        Keeper.find({}, (err, keeperList) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(keeperList)
            }
        })
    })

})

app.get("/api/get/:id", async (req, res) => {
    try {
        const note = await Keeper.findById(req.params.id);
        return res.status(200).json(note);
    } catch (err) {
        return res.status(500).json(err);
    }
})

app.put("/api/update/:id", async (req, res) => {
    try {
        const notes = await Keeper.findById(req.params.id)
        await notes.updateOne({
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        });
        res.status(200).json(notes);
    } catch (err) {
        return res.status(500).json(err);
    }
})

app.listen(5000, () => {
    console.log("Server is Running on port 5000");
})