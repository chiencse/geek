const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
  console.log("Sending order confirmation email to: ", userEmail);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Order Confirmation: ${orderDetails.productName}`,
    text: `Thank you for your order!\n\nProduct: ${orderDetails.productName}\nQuantity: ${orderDetails.quantity}\nTotal Price: ${orderDetails.totalPrice}\n\nWe will process your order shortly.`,
    html: `<p>Thank you for your order!</p>
           <p><strong>Order ID:</strong> ${orderDetails.orderID}</p>
           <p><strong>Product:</strong> ${orderDetails.productName}</p>
           <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
           <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
           <p>We will process your order shortly.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent: ", info.response);
  } catch (error) {
    console.error("Error sending order confirmation email: ", error);
  }
};

module.exports = { sendOrderConfirmationEmail };
