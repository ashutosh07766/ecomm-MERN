const Product = require('../db/models/product');
const Order = require('../db/models/order');

const createOrder = async (req, res) => {
  try {
    const { itemList, address, paymentMethod } = req.body;
    const userId = req.userId;

    const itemIds = itemList.map(item => item.productId);

    const products = await Product.find({ _id: { $in: itemIds } });

    const orderItems = itemList.map(item => {
      const product = products.find(p => p._id.toString() === item.productId);
      if (!product) {
        throw new Error("Product not found");
      }
      return {
        product: product._id,
        price: product.price,
        quantity: item.quantity
      };
    });

    const totalAmount = orderItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const order = new Order({
      user: userId,
      orderItem: orderItems,
      address,
      paymentMethod,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json({ order: createdOrder });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllOrders=async (req,res)=>{

    try{
        const allOrders=await Order.find();

        return  res.status(200).json({"order fetched:":allOrders});
        
    }

    catch(err){
        console.log(err);
        res.status(500).json({message:"error fetching order"})
    }

}

const getAllUserOrder=async (req,res)=>{

    try{
        const userId=req.userId;
        const allOrders=await Order.find({
            user:userId
        })

        return  res.status(200).json({"order fetched:":allOrders});
        
    }

    catch(err){
        console.log(err);
        res.status(500).json({message:"error fetching order"})
    }
}

const updateOrder = async (req, res) => {
    const { status, paymentStatus } = req.body;
    const orderId = req.params.id;
  
    try {
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      await Order.updateOne(
        { _id: orderId },
        { status, paymentStatus }
      );
  
      return res.status(200).json({
        message: "Order updated successfully",
        orderId: orderId,
        updatedFields: { status, paymentStatus }
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating order" });
    }
  };


  const deleteOrder=async(req,res)=>{
   const orderId=req.params.id;
   try{
    await Order.deleteOne({_id:orderId})
    return res.status(200).json({message:"order deleted successfully"})
   }
   catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting order" });
  }




  }
module.exports = {
  createOrder,
  getAllOrders,
  getAllUserOrder,
  updateOrder,
  deleteOrder
};