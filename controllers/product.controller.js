const { validationResult } = require("express-validator");
let productModel=require('../db/models/product')
let mongoose=require('mongoose')

let ObjectId=mongoose.Types.ObjectId

// let products=[
//     {
//         id:1,
//         name:"Air Conditioner",
//         desc:"Cools down",
//         price:99999,
//         category:"Electronocs",
//         imgUrl:"https://www.cruiseac.com/assets/images/product/M5xq3pI9BkYf2VTFsJmRjpg.jpg",
//     },{
//         id:2,
//         name:"Trophy for RCB",
//         desc:"Trophy",
//         price:999999.00,
//         category:"IPL",
//         imgUrl:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…F5oorkyVMaY01GxFFFCJ1wICKYV86KKZEbTGNFFT6Bn//2Q==",

//     }
// ]

let getAllProducts=async (req,res)=>{
    let skip=req.query.skip||0;
    let limit=req.query.limit||5;
    let category=req.query.category;
    let minPrice=req.query.minPrice;
    let maxPrice=req.query.maxPrice;
    let query={};
    if(category&&category!='')
    {
        query["category"]=category
    }
    if((minPrice&&minPrice>0)||(maxPrice&&maxPrice>0)){
        if(minPrice&&maxPrice&&minPrice>maxPrice)
        {
            return res.status(400).json({success:true,message:"Min price cant be greater then max price"})
        }
        if(minPrice&&maxPrice)
        {
            query["price"]={ $gte: minPrice, $lte: maxPrice };
        }else
        if(minPrice&&!maxPrice)
        {
        query["price"]={$gte:minPrice}
        }else{
        query["price"]={$lte:maxPrice}
        }
    }
  
    let getAllProducts=await productModel.find(query).skip(skip).limit(limit);
    return res.status(200).json({getAllProducts});
}

let getproductById=async (req,res)=>{
        let id=new ObjectId(req.params.id);
       
        // const product=await productModel.findOne({_id:new ObjectId(id)})
        let product=await productModel.findById(id);
        if(!product){
            return res.status(404).send({success:false,"message":"Product not found"})
        }
    return res.status(200).json({success:true,"message":"Products fetched successfully",data:product})
        }
    

    let createProduct=async (req,res)=>{
        try{
            const body=req.body;
            
            const errors=validationResult(req);
            if(errors&&errors.length){
             console.log(errors);
            }
            
        let product= new productModel({
            name:body.name,
            desc:body.desc,
            price:body.price,
            category:body.category,
            imgurl:body.imgUrl
        })
        await product.save()
        res.status(201).json({success:true,"message":"Product created successfully"})
        }
        catch(err)
        {
            res.status(400).json({success:false,"message":err.message})
        }

    }

    let updateProduct=async (req,res)=>{
       let id=req.params.id;
        let newDesc=req.body.desc;
        let newPrice=req.body.price;
        let product=await productModel.findById(id);
        if(newDesc&&newDesc!=='')
        {
           product.desc=newDesc;
        }
        if(newPrice&&newPrice>0)
            {
               product.price=newPrice;
            }
           await product.save()
        res.status(200).json({success:true,"message":"Product updated successfully"})   


    }

    let deleteProduct=async(req,res)=>{
        let id=req.params.id;
        await productModel.deleteOne({_id:new ObjectId(id)});
    

      res.status(200).json({success:true,"message":"Product deleted successfully"})   

    }
    let validateProduct=(product)=>{
        if(!product)
        {
            throw new Error('Product is required');
        }
        if(!product.name || !product.desc || !product.price || !product.category || !product.imgUrl)
        {
            throw new Error('Required fields are missing');
        }
        // if(isNaN(id))
        // {
        //     throw new Error('Id should be a number');
        // }
        return true;
    }


module.exports = {
    getAllProducts,
    getproductById,
    createProduct,
    updateProduct,
    deleteProduct
}