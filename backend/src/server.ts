import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";
import cors from "cors";

const app = express();
const port = 4000;

// Load environment variables
dotenv.config();

// Enable CORS
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/checkout", async (req, res) => {
  try {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2023-10-16",
    });

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item: any) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
