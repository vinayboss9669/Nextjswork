import Product from "@/models/Product";
import connectDb from "../../middleware/db";

export default async function handler(req, res) {
    await connectDb();
    let products = await Product.find();
    
    res.status(200).json({ products: tshirts });
}