const express = require("express");
const mongoose = require("mongoose");

const app = express();

//app.use(middleman)// apply middleware at each and every endpoint

app.use(express.json()); // inbuilt middleware to read request data in post and put and convert to js object

// database connection

mongoose
  .connect("mongodb://localhost:27017/mongotuts")
  .then(() => {
    console.log("Database Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

//schema for products

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is mandatory"],
    },
    price: {
      type: Number,
      required: [true, "price is mandatory"],
      min: 1,
    },
    quantity: {
      type: Number,
      required: [true, "quantity is mandatory"],
    },
    category: {
      type: String,
      enum: ["Clothing", "Electronics", "Household"],
    },
  },
  { timestamps: true }
);

//model creation

const productModel = mongoose.model("products", productSchema);

//endpoint to fetch all products

app.get("/products", (req, res) => {
  productModel
    .find()
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "some problem" });
    });
});

//endpoint to fetch single product

app.get("/products/:id", (req, res) => {
  productModel
    .findOne({ _id: req.params.id })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "some problem" });
    });
});

//endpoint to create 

app.post("/products", (req, res) => {
  let product = req.body;

  productModel
    .create(product)
    .then((doc) => {
      res.send({ data: doc, message: "Product Created" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "some problem" });
    });
});

//endpoint to delete 

app.delete("/products/:id", (req, res) => {

  productModel
    .deleteOne({ _id: req.params.id })
    .then((info) => {
      res.send({ message: "Product deletedd" });
    })
    .catch((err) => {
      console.log(err);
      res.end({ message: "some problem happened" });
    });
});

//refresher: in put method we pass both body data as well as query parameters
//put => updation

//endpoint to update product

app.put("/products/:id", (req, res) => {
  let product = req.body;

  productModel
    .updateOne({ _id: req.params.id }, product)
    .then((info) => {
      res.send({ message: "Product updated" });
    })
    .catch((err) => {
      console.log(err);
      res.end({ message: "some problem happened" });
    });
});

//BTS //sampleIdea

// express.json(req,res,next)
// {
//     let product= "";
//     req.on("data",(chunck)=>{
//        product+=chunck;
//     })

//     req.on("end",()=>{
//         req.body= (JSON.parse(product));
//         next();
//     })
// }

//middleware logic

// in coding terms is simply a function that sits between request(server wall) and endpoint
// is used for err handling , formatting request Data or other security purposes
// 3parameters req,res,next;
//next is used to navigate to next function

// app.get("/testing/:id",middleman,(req,res)=>{

//     res.send({message:"Testing request"})
// })

// function middleman(req,res,next)
// {
//      if(req.params.id<10)
//      {
//         res.send({message:"You are blocked"})
//      }
//      else
//      {
//         next();
//      }
// }

//server setup

app.listen(8000, () => {
  console.log("Server up and running");
});
