const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

// Route imports
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/users");
const imageGenRoute = require("./routes/imageGenerator");
const cityRoute = require("./routes/cities");
//const reviewRoutes1 = require("./routes/feedback"); // Cities route

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));


// Serve static files (e.g., images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);
app.use("/api", imageGenRoute);
app.use("/api/cities", cityRoute); 
const venueRoute = require('./routes/venues');
app.use('/api/venues', venueRoute);
// Mount cities route
const decorationRoutes = require('./routes/decoration');
app.use('/api/decorations', decorationRoutes);

const eventPlanRoutes = require('./routes/eventPlan');
const menusRouter = require('./routes/menu');
app.use('/api/menus', menusRouter);


const eventPlanRoutess = require('./routes/history');
app.use('/api/History', eventPlanRoutess);

const reviewRoutes = require('./routes/review');
app.use('/api/review', reviewRoutes);

const reviewRoutes1 = require('./routes/feedback');
app.use('/api/feedback', reviewRoutes1);

const otherservicesRoutes=require('./routes/otherservice');
app.use('/api/otherservices', otherservicesRoutes);

// Use routes
app.use('/api/eventPlans', eventPlanRoutes);
// Stripe Payment Intent
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/api/payment_intent", async (req, res) => {
  const { payment_method } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "usd",
      payment_method,
      confirmation_method: "manual",
      confirm: true
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
