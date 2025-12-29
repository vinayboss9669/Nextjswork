import Order from "../models/Order";
import connectDb from "../middleware/db";

export default async function MyOrder({ orders }) {
     const token=req.body.token;
     const data=jwt.verify(token,process.env.JWT_SECRET);
     let orders=await Order.find({email:data.email});
     res.status(200).json({orders});
}