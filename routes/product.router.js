
const express= require('express');
const {getAllProducts,getproductById,createProduct,updateProduct,deleteProduct}=require('../controllers/product.controller.js');
const productRouter=express.Router();
const {check}=require('express-validator');
const auth=require("../middleware/auth.js");
const isAdmin = require('../middleware/isAdmin.js');

productRouter.get('/',auth,getAllProducts)

productRouter.get('/:id',auth,getproductById)



productRouter.post('/',[
    check('id').isNumeric(),
    check('name').isLength({min:5}),isAdmin
],createProduct)

productRouter.patch('/:id',isAdmin,updateProduct)

productRouter.delete('/:id',isAdmin,deleteProduct)

module.exports=productRouter;