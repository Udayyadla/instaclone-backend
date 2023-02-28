const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const User = require("./schema.js");
const path = require("path");
const app = express();
app.use(fileupload());
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

//Connecting to the MongoDb 
const uri="mongodb+srv://uday:uday1997@cluster0.3vwhve8.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, (err) => {
    if(err){
    console.log(err);
    } else {
        console.log("Connected to the MongoDb");
    }
})

app.get("/all", async (req, res) => {
    try {
        const posts = await User.find().sort({ _id: -1 });
        res.json(posts);
    }
    catch (err) {
        res.json({
            status: 400,
            message: err.message
        })
    }
});

app.post("/", async (req, res) => {
    const { author, location, description } = req.body
    const { image } = req.files
    console.log(author, location, description, image)
    image.mv("./uploads" + image.name, async (err) => {
        if (err) {
            res.json({ message: err.message })
        } else {
            const userData = new User({

                ...{ author, location, description },
                image: image.name
            })
            try {
                const data = await userData.save()
                console.log(data)
                res.json({ message: data })
            }
            catch (e) {
                res.json({ message: e.message })
            }
        }
    })

    // res.send({
    //     status:"Success"
    // })
})


/*Creating images api to upload images*/
app.get("/images/:filename", async (req, res) => {
    res.sendFile(path.join(__dirname, `./uploads/${req.params.filename}`))
})

const port = 8081;
app.listen(port, () => console.log("Server is up at port 8081"));