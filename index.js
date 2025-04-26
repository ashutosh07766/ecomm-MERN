require('dotenv').config();
const express= require('express');
const bodyParser=require('body-parser');
const productRouter=require('./routes/product.router.js');
const userRouter=require('./routes/user.route.js');
const mongoose=require('./db/connection.js')
const orderRouter=require('./routes/order.router.js')
const app=express();
app.use(bodyParser.json())
app.use('/product',productRouter)
app.use('/user',userRouter)
app.use('/order',orderRouter)

app.use((req,res)=>{
    // res.status(404).json({success:false,"message":"Page not found"})
    res.status(404).send(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404</title>
</head>
<body>
    <h1>PAGE NOT FOUND</h1>
</body>
</html>`)
})
app.listen(8080,(err)=>{
    if(err)
    {
    console.log(err);
    }
console.log('Server is running on port 8080');
})