//                 03_GET_&_POST_REQUEST_NODEJS


const http = require("http");
const fs = require("fs");
const url = require("url"); //this module gives u a function called as parsed, this method help us to divide the url and extract data from it

//create a server
// 127.0.0.1:8000 or localhost:8000 (Base Address)

http
  .createServer((req, res) => {

    let parsedUrl = url.parse(req.url, true); //true=> plz parse query string
    //console.log(parsedUrl);

    let data = fs.readFileSync("./api-fundamentals/data.json", "utf-8");
   //console.log(products);

  //  if(parsedUrl.path=="/products" && req.method=="GET" && parsedUrl.query.id == undefined){
  //         res.end(data);
  //  }

       const productArray = JSON.parse(data);
    

      // let product = productArray.products.find((product) => {
      //    return product.id == parsedUrl.query.id;
      //  });
      // console.log(product);

      // if (product != undefined) {
      //   res.end(JSON.stringify(product));
      // } 
      // else {
      //   res.end(JSON.stringify({ message: "Product not found" }));
      // }
    

       if(parsedUrl.path=="/products" && req.method=="POST") // task is to add the data in database
       {
         //2events => req.on("data",(chunk)=>{});  req.on("end",()=>{recieved data})
         let newProduct= "";
         req.on("data",(chunk)=>{
            newProduct= newProduct+ chunk;
           // console.log(newProduct);
         });
         req.on('end',()=>{
            //  console.log(newProduct);

           let newProductobj= JSON.parse(newProduct);
           productArray.products.push(newProductobj);
           console.log(productArray);

           fs.writeFile("api-fundamentals/data.json",JSON.stringify(productArray),(err)=>{
              if(err==null)
              {
                res.end(JSON.stringify({"message":"product added successfully"}))
              }
              else{
                res.end(JSON.stringify({"error":"not added"}))
              }
           });


         })
       }



    }
  )

  .listen(8000);
