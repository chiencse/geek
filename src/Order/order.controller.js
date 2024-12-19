const OrderModel = require("./order.model");
const OrderDTO = require("./dtos/createOrder.dto");
const { sendOrderConfirmationEmail } = require("../Service/Email/mail.service");
let emailQueue = []; // A simple in-memory queue

// (simulating background processing)
const processEmailQueue = () => {
  if (emailQueue.length > 0) {
    const emailTask = emailQueue.shift();
    setTimeout(async () => {
      try {
        console.log("Sending email for Order");
        await sendOrderConfirmationEmail(
          emailTask.userEmail,
          emailTask.orderDetails
        );
        console.log(
          "Email sent successfully for Order ID:",
          emailTask.orderDetails.orderID
        );
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }, 1000);
  }
};

processEmailQueue();
setInterval(processEmailQueue, 5000);

exports.createOrder = async (req, res) => {
  try {
    const orderDTO = new OrderDTO(req.body); // Convert request body to DTO
    const result = await OrderModel.createOrder(orderDTO);

    const orderDetails = {
      // The ID of the created order
      productName: req.body.productName,
      quantity: req.body.quantity,
      totalPrice: req.body.price * req.body.quantity, // Calculate total price
    };

    // Add send email to queue

    emailQueue.push({
      userEmail: req.body.email, // Ensure the userEmail is passed correctly
      orderDetails: orderDetails,
    });

    res.status(200).json({
      message: "Order successfully placed!",
      data: result,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({
      message: "An error occurred while creating order.",
      details: err.message,
    });
  }
};
exports.executePayment = async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const result = await OrderModel.executePayment(orderID);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error executing payment:", err);
    res.status(500).json({
      message: "An error occurred while executing payment.",
      details: err.message,
    });
  }
};
