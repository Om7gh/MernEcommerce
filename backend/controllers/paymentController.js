const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../middleware/catchAsyncErrors");

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "eur",
    metadata: {
      company: "ElectroSmart",
    },
  });

  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripApiKey = catchAsyncError(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
