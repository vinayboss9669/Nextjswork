// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from '../../models/Order';
import Product from '../../models/Product';
import connectDb from '../../middleware/db';

export default async function handler(req, res) {
  await connectDb();

  if (req.method === "POST") {
    try {
      const { ORDERID, STATUS } = req.body;
      let order;

      if (STATUS === 'TXN_SUCCESS') {
        // Update order status to paid
        order = await Order.findOneAndUpdate(
          { orderId: ORDERID },
          {
            status: 'Paid',
            paymentInfo: JSON.stringify(req.body)
          },
          { new: true }
        );

        if (order) {
          // Update product quantities
          const products = order.products;
          for (let item of Object.values(products)) {
            await Product.findOneAndUpdate(
              { _id: item.id },
              { 
                $inc: { "availableQty": -item.qty }
              }
            );
          }
        }
      } else if (STATUS === 'PENDING') {
        // Update order status to pending
        order = await Order.findOneAndUpdate(
          { orderId: ORDERID },
          {
            status: 'Pending',
            paymentInfo: JSON.stringify(req.body)
          },
          { new: true }
        );
      } else {
        // Handle failed or other status
        order = await Order.findOneAndUpdate(
          { orderId: ORDERID },
          {
            status: 'Failed',
            paymentInfo: JSON.stringify(req.body)
          },
          { new: true }
        );
      }

      if (!order) {
        return res.status(404).json({ success: false, error: "Order not found" });
      }

      return res.status(200).json({ success: true, order });

    } catch (error) {
      console.error("Error processing payment:", error);
      return res.status(500).json({ 
        success: false, 
        error: "Internal Server Error",
        message: error.message 
      });
    }
  }

  res.status(405).json({ success: false, error: "Method not allowed" });
}


/**
 if(req.body.STATUS=='TXN_SUCCESS'){
   order = await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'Paid',paymentInfo:JSON.stringify(req.body)})   
   let products=order.products
   for(let slug in products){
      await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty": -products[slug].qty})
   }
  else if(req.body.STATUS=="PENDING"){
  order = await Order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'Pending',paymentInfo:JSON.stringify(req.body)}) 
  }
 }
 */