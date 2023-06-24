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

const validateProductMiddleware=(req,res,next)=>{
    const {title,description,ingredients,instructions}=req.body
    if(!title||!description||!ingredients||!instructions)
    {
        return res.redirect('/')
    }
    next()
    }

app.post("/createrecipi",validateProductMiddleware, async (req, res) => {
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
    res.render("recipis.ejs", { recipis });
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

app.get("/recipi/:id/edit", async (req, res) => {
    const filteredrecipi = await recipiSchema.find({ _id: req.params.id });
    res.render("editrecipi.ejs", { book: filteredrecipi[0] });
  });

app.get("/createrecipi", (req, res) => {
  res.render("createrecipi");
});

app.post("/recipi/:id/upate-data", (req, res) => {
    recipiSchema.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        console.log("Updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/");
  });

  app.post("/recipi/:id/method=DELETE", async (req, res) => {
    recipiSchema.deleteOne({ _id: req.params.id })
      .then(() => {
        console.log("Deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/");
  });
  


app.listen(3005, () => {
  console.log("Server running on port 3005");
});
