const fs= require('fs');
const os= require('os');

//sync way of reading files

// let data = fs.readFileSync('BASICS/abc.txt','utf-8');
// console.log(data); 
// console.log('hello');

//async way of reading files

//  fs.readFile('BASICS/abc.txt','utf-8',(err,data)=>{
//       console.log(err);
//       console.log(data);
//  });
 
// console.log('hello');

//writing files
// fs.writeFileSync('product.txt',"Apple");
// fs.writeFile('product.txt','Mango',(err)=>{
//     console.log(err);
// })

//NOTE => Writing files always overwrite the existing data
//But what if u dont't want to overwrite the existing data;

// fs.appendFile('product.txt','\nApple \torange',(err)=>{
//     console.log(err);
// })

//fs.unlink => to delete files

console.log(os.platform()); //research abt it
console.log(os.hostname());
console.log(os.freemem());




