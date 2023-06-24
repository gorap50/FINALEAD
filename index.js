const express = require("express");
const mongoose = require("mongoose");
const recipiSchema = require("./models/recipi");

mongoose
  .connect("mongodb://127.0.0.1:27017/BookStore", {
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

// app.get("/", async (req, res) => {
//   try {
//     const recipis = await recipiSchema.find();
//     console.log(recipis)
//     res.render("recipis", { recipis }); 
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.get("/createrecipi", (req, res) => {
  res.render("createrecipi");
});

app.listen(3005, () => {
  console.log("Server running on port 3005");
});
