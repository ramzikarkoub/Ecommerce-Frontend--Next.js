import { connectToDB } from "@/utils/database";
import Product from "@/models/product";

export default async function handler(req, res) {
  const { id } = req.query;
  const arr = id.split(" ");
  console.log("arr", arr);

  if (req.method === "GET") {
    try {
      await connectToDB();
      const products = await Product.find({
        title: { $in: arr.map((el) => new RegExp(el, "i")) },
      });
      console.log(products);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send("Failed to fetch product");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
