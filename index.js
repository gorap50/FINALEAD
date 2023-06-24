const express = require("express");
const mongoose = require("mongoose");
const recipiSchema = require("./models/recipi");

mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.post("/createrecipi", async (req, res) => {
    try {
      const { title, description, ingredients, instructions } = req.body;
      const newRecipi = new recipiSchema({
        title,
        description,
        ingredients,
        instructions,
      });
      await newRecipi.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });

app.get("/", async (req, res) => {
  try {
    const recipis = await recipiSchema.find();
    console.log(recipis);
    res.render("recipis", { recipis });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/recipi/:id", async (req, res) => {
  try {
    const recipidtl = await recipiSchema.findById(req.params.id);
    res.render("recipidetails.ejs", { recipi: recipidtl });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/createrecipi", (req, res) => {
  res.render("createrecipi");
});



app.listen(3005, () => {
  console.log("Server running on port 3005");
});
